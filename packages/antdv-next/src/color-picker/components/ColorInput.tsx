import type { EmptyEmit } from '../../_util/type.ts'
import type { AggregationColor } from '../color'
import type { ColorFormatType } from '../interface'
import { computed, defineComponent, shallowRef, watch } from 'vue'
import Button from '../../button'
import Dropdown from '../../dropdown'
import { FORMAT_HEX, FORMAT_HSB, FORMAT_RGB } from '../interface'
import ColorAlphaInput from './ColorAlphaInput'
import ColorHexInput from './ColorHexInput'
import ColorHsbInput from './ColorHsbInput'
import ColorRgbInput from './ColorRgbInput'

export interface ColorInputProps {
  prefixCls: string
  format?: ColorFormatType
  onFormatChange?: (format: ColorFormatType) => void
  disabledAlpha?: boolean
  value?: AggregationColor
  onChange?: (value: AggregationColor) => void
  disabledFormat?: boolean
}

const selectOptions: ColorFormatType[] = [FORMAT_HEX, FORMAT_HSB, FORMAT_RGB]

export default defineComponent<
  ColorInputProps,
  EmptyEmit,
  string
>(
  (props) => {
    const colorFormat = shallowRef<ColorFormatType>(props.format ?? FORMAT_HEX)

    watch(
      () => props.format,
      (val) => {
        if (val)
          colorFormat.value = val
      },
    )

    const triggerFormatChange = (fmt: ColorFormatType) => {
      colorFormat.value = fmt
      props.onFormatChange?.(fmt)
    }

    const steppersNode = computed(() => {
      const inputProps = { value: props.value, prefixCls: props.prefixCls, onChange: props.onChange }
      switch (colorFormat.value) {
        case FORMAT_HSB:
          return <ColorHsbInput {...inputProps} />
        case FORMAT_RGB:
          return <ColorRgbInput {...inputProps} />
        default:
          return <ColorHexInput {...inputProps} />
      }
    })

    return () => {
      const prefixCls = props.prefixCls
      const menuItems = selectOptions.map(opt => ({
        key: opt,
        label: opt.toUpperCase(),
      }))

      return (
        <div class={`${prefixCls}-input-container`}>
          {!props.disabledFormat && (
            <Dropdown
              trigger={['click']}
              placement="bottomRight"
              menu={{
                items: menuItems,
                selectedKeys: [colorFormat.value],
                onClick: ({ key }: any) => triggerFormatChange(key as ColorFormatType),
              } as any}
            >
              <Button
                size="small"
                type="text"
                class={`${prefixCls}-format-select`}
              >
                {colorFormat.value.toUpperCase()}
              </Button>
            </Dropdown>
          )}
          <div class={`${prefixCls}-input`}>
            {steppersNode.value}
            {!props.disabledAlpha && (
              <ColorAlphaInput prefixCls={prefixCls} value={props.value} onChange={props.onChange} />
            )}
          </div>
        </div>
      )
    }
  },
  {
    name: 'ColorInput',
    inheritAttrs: false,
  },
)
