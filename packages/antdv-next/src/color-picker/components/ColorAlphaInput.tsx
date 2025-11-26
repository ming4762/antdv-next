import type { AggregationColor } from '../color'
import { computed, defineComponent, shallowRef, watch } from 'vue'
import { generateColor, getColorAlpha } from '../util'
import ColorSteppers from './ColorSteppers'

export interface ColorAlphaInputProps {
  prefixCls: string
  value?: AggregationColor
  onChange?: (value: AggregationColor) => void
}

export default defineComponent<ColorAlphaInputProps>(
  (props) => {
    const internalValue = shallowRef<AggregationColor>(generateColor(props.value || '#000'))

    watch(
      () => props.value,
      (val) => {
        if (val)
          internalValue.value = val
      },
    )

    const alphaValue = computed(() => props.value ?? internalValue.value)

    const handleAlphaChange = (step: number | null) => {
      const hsba = alphaValue.value.toHsb()
      hsba.a = (step || 0) / 100
      const genColor = generateColor(hsba)

      internalValue.value = genColor
      props.onChange?.(genColor)
    }

    return () => (
      <ColorSteppers
        value={getColorAlpha(alphaValue.value)}
        prefixCls={props.prefixCls}
        formatter={step => `${step}%`}
        className={`${props.prefixCls}-alpha-input`}
        onChange={handleAlphaChange}
      />
    )
  },
  {
    name: 'ColorAlphaInput',
    inheritAttrs: false,
  },
)
