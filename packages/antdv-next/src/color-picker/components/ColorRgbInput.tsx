import type { RGB } from '@v-c/color-picker'
import type { AggregationColor } from '../color'
import { defineComponent, shallowRef } from 'vue'
import { generateColor } from '../util'
import ColorSteppers from './ColorSteppers'

export interface ColorRgbInputProps {
  prefixCls: string
  value?: AggregationColor
  onChange?: (value: AggregationColor) => void
}

export default defineComponent<ColorRgbInputProps>(
  (props) => {
    const internalValue = shallowRef<AggregationColor>(generateColor(props.value || '#000'))

    const rgbValue = () => props.value || internalValue.value

    const handleRgbChange = (step: number | null, type: keyof RGB) => {
      const rgb = rgbValue().toRgb()
      rgb[type] = step || 0
      const genColor = generateColor(rgb)

      internalValue.value = genColor
      props.onChange?.(genColor)
    }

    return () => {
      const prefix = props.prefixCls
      const rgb = rgbValue().toRgb()

      return (
        <div class={`${prefix}-rgb-input`}>
          <ColorSteppers
            max={255}
            min={0}
            value={Number(rgb.r)}
            prefixCls={prefix}
            className={`${prefix}-rgb-input`}
            onChange={step => handleRgbChange(Number(step), 'r')}
          />
          <ColorSteppers
            max={255}
            min={0}
            value={Number(rgb.g)}
            prefixCls={prefix}
            className={`${prefix}-rgb-input`}
            onChange={step => handleRgbChange(Number(step), 'g')}
          />
          <ColorSteppers
            max={255}
            min={0}
            value={Number(rgb.b)}
            prefixCls={prefix}
            className={`${prefix}-rgb-input`}
            onChange={step => handleRgbChange(Number(step), 'b')}
          />
        </div>
      )
    }
  },
  {
    name: 'ColorRgbInput',
    inheritAttrs: false,
  },
)
