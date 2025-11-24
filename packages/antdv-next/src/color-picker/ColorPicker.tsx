import type { SlotsType } from 'vue'
import type { PopoverProps } from '../popover'
import type { ColorFormatType, ColorPickerEmits, ColorPickerProps, ColorPickerSlots, ModeType } from './interface'
import { clsx } from '@v-c/util'
import { filterEmpty } from '@v-c/util/dist/props-util'
import { computed, defineComponent, shallowRef } from 'vue'
import { ContextIsolator } from '../_util/ContextIsolator.tsx'
import { getAttrStyleAndClass, useMergeSemantic, useToArr, useToProps } from '../_util/hooks'
import { getStatusClassNames } from '../_util/statusUtils.ts'
import { toPropsRefs } from '../_util/tools'
import { useComponentBaseConfig } from '../config-provider/context'
import { useDisabledContext } from '../config-provider/DisabledContext'
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls'
import { useSize } from '../config-provider/hooks/useSize'
import { useFormItemInputContext } from '../form/context'
import Popover from '../popover'
import { useCompactItemContext } from '../space/Compact'
import { AggregationColor } from './color'
import useModeColor from './hooks/useModeColor'
import useStyle from './style'
import { genAlphaColor, generateColor, getColorAlpha } from './util'

const defaults = {
  trigger: 'click',
  arrow: true,
  placement: 'bottomLeft',
  autoAdjustOverflow: true,
  disabledAlpha: false,
  allowClear: false,
} as any

const ColorPicker = defineComponent<
  ColorPickerProps,
  ColorPickerEmits,
  string,
  SlotsType<ColorPickerSlots>
>(
  (props = defaults, { slots, expose, emit, attrs }) => {
    const {
      prefixCls,
      direction,
      class: contextClassName,
      style: contextStyle,
      classes: contextClassNames,
      styles: contextStyles,
    } = useComponentBaseConfig('colorPicker', props, [], 'color-picker')
    const { size: customizeSize, classes, styles, value, mode } = toPropsRefs(props, 'size', 'classes', 'styles', 'value', 'mode')
    const contextDisabled = useDisabledContext()
    const mergedDisabled = computed(() => props.disabled ?? contextDisabled.value)

    // ================== Size ==================
    const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction)
    const mergedSize = useSize(ctx => customizeSize.value ?? compactSize.value ?? ctx)

    // =========== Merged Props for Semantic ===========
    const mergedProps = computed(() => {
      return {
        ...props,
        disabled: mergedDisabled.value,
        size: mergedSize.value,
      } as ColorPickerProps
    })

    const [mergedClassNames, mergedStyles] = useMergeSemantic<
      NonNullable<ColorPickerProps['classes']>,
      NonNullable<ColorPickerProps['styles']>,
      ColorPickerProps
    >(
      useToArr(contextClassNames, classes),
      useToArr(contextStyles, styles),
      useToProps(mergedProps),
      computed(() => ({
        popup: {
          _default: 'root',
        },
      })),
    )

    const internalPopupOpen = shallowRef(props?.open ?? false)

    const popupOpen = computed(() => !mergedDisabled.value && internalPopupOpen.value)
    const formatValue = shallowRef(props?.format ?? props.defaultFormat)

    const triggerFormatChange = (newFormat?: ColorFormatType) => {
      formatValue.value = newFormat
      if (formatValue.value !== newFormat) {
        emit('formatChange', newFormat)
      }
    }

    const triggerOpenChange = (visible: boolean) => {
      if (!visible || !mergedDisabled.value) {
        internalPopupOpen.value = visible
        emit('openChange', visible)
      }
    }

    // ================== Value & Mode =================
    const [mergedColor, setColor, modeState, setModeState, modeOptions] = useModeColor(
      value as any,
      mode,
      props?.defaultValue,
    )

    const isAlphaColor = computed(() => getColorAlpha(mergedColor.value) < 100)

    // ==================== Change =====================
    // To enhance user experience, we cache the gradient color when switch from gradient to single
    // If user not modify single color, we will use the cached gradient color.
    const cachedGradientColor = shallowRef<AggregationColor>()

    const onInternalChangeComplete = (color: AggregationColor) => {
      let changeColor = generateColor(color)
      // ignore alpha color
      if (props?.disabledAlpha && isAlphaColor) {
        changeColor = genAlphaColor(color)
      }
      emit('changeComplete', changeColor)
    }

    const onInternalChange = (data?: AggregationColor, changeFromPickerDrag?: boolean) => {
      let color: AggregationColor = generateColor(data!)
      // ignore alpha color
      if (props?.disabledAlpha && isAlphaColor.value) {
        color = genAlphaColor(color)
      }

      setColor(color)
      cachedGradientColor.value = undefined

      // Trigger change event
      emit('change', color, color.toCssString())
      emit('update:value', color.toCssString())

      // Only for drag-and-drop color picking
      if (!changeFromPickerDrag) {
        onInternalChangeComplete(color)
      }
    }

    // =================== Gradient ====================
    const activeIndex = shallowRef(0)
    const gradientDragging = shallowRef(false)

    // Mode change should also trigger color change
    const onInternalModeChange = (newMode: ModeType) => {
      setModeState(newMode)
      if (newMode === 'single' && mergedColor.value?.isGradient()) {
        activeIndex.value = 0
        onInternalChange(new AggregationColor(mergedColor.value.getColors()[0]!.color!))
        // Should after `onInternalChange` since it will clear the cached color
        cachedGradientColor.value = mergedColor.value
      }
      else if (newMode === 'gradient' && !mergedColor.value?.isGradient()) {
        const baseColor = isAlphaColor.value ? genAlphaColor(mergedColor.value) : mergedColor.value

        onInternalChange(
          new AggregationColor(
            cachedGradientColor.value || [
              {
                percent: 0,
                color: baseColor,
              },
              {
                percent: 100,
                color: baseColor,
              },
            ],
          ),
        )
      }
    }

    // ================== Form Status ==================
    const formItemInputContext = useFormItemInputContext()
    const contextStatus = computed(() => formItemInputContext.value?.status)

    // ===================== Style =====================
    const rootCls = useCSSVarCls(prefixCls)
    const [hashId, cssVarCls] = useStyle(prefixCls, rootCls)

    return () => {
      const { rootClass, trigger, placement, arrow, getPopupContainer, autoAdjustOverflow, destroyOnHidden } = props
      const { className, style, restAttrs } = getAttrStyleAndClass(attrs)
      const children = filterEmpty(slots?.default?.() ?? [])
      const rtlCls = {
        [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
      }
      const mergedRootCls = clsx(mergedClassNames.value.root, rootClass, cssVarCls.value, rootCls.value, rtlCls)

      const mergedCls = clsx(
        getStatusClassNames(prefixCls.value, contextStatus.value),
        {
          [`${prefixCls.value}-sm`]: mergedSize.value === 'small',
          [`${prefixCls.value}-lg`]: mergedSize.value === 'large',
        },
        compactItemClassnames.value,
        contextClassName.value,
        mergedRootCls,
        className,
        hashId.value,
      )
      const mergedPopupCls = clsx(prefixCls.value, mergedRootCls, mergedClassNames.value?.popup?.root)
      const popoverProps: PopoverProps = {
        open: popupOpen.value,
        trigger,
        placement,
        arrow,
        rootClass,
        getPopupContainer,
        autoAdjustOverflow,
        destroyOnHidden,
      }
      const mergedStyle = {
        ...mergedStyles.value.root,
        ...contextStyle.value,
        ...style,
      }

      // ============================ zIndex ============================

      return (
        <Popover
          classes={{
            root: mergedRootCls,
          }}
          styles={{
            root: mergedStyles.value?.popup?.root,
            container: styles.value?.popupOverlayInner,
          }}
          onOpenChange={triggerOpenChange}
          content={(
            <ContextIsolator form>
              {/*    */}
            </ContextIsolator>
          )}
          {...popoverProps}
        >
        </Popover>
      )
    }
  },
  {
    name: 'AColorPicker',
    inheritAttrs: false,
  },
)

export default ColorPicker
