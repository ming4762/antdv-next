import type { HSB } from '@v-c/color-picker'
import type { AggregationColor } from '../color'
import { defineComponent, shallowRef } from 'vue'
import { generateColor, getRoundNumber } from '../util'
import ColorSteppers from './ColorSteppers'

export interface ColorHsbInputProps {
  prefixCls: string
  value?: AggregationColor
  onChange?: (value: AggregationColor) => void
}

export default defineComponent<ColorHsbInputProps>(
  (props) => {
    const internalValue = shallowRef<AggregationColor>(generateColor(props.value || '#000'))

    const hsbValue = () => props.value || internalValue.value

    const handleHsbChange = (step: number | null, type: keyof HSB) => {
      const hsb = hsbValue().toHsb()
      hsb[type] = type === 'h' ? step || 0 : (step || 0) / 100
      const genColor = generateColor(hsb)

      internalValue.value = genColor
      props.onChange?.(genColor)
    }

    return () => {
      const prefix = props.prefixCls
      const hsb = hsbValue().toHsb()

      return (
        <div class={`${prefix}-hsb-input`}>
          <ColorSteppers
            max={360}
            min={0}
            value={Number(hsb.h)}
            prefixCls={prefix}
            className={`${prefix}-hsb-input`}
            formatter={step => getRoundNumber(step || 0).toString()}
            onChange={step => handleHsbChange(Number(step), 'h')}
          />
          <ColorSteppers
            max={100}
            min={0}
            value={Number(hsb.s) * 100}
            prefixCls={prefix}
            className={`${prefix}-hsb-input`}
            formatter={step => `${getRoundNumber(step || 0)}%`}
            onChange={step => handleHsbChange(Number(step), 's')}
          />
          <ColorSteppers
            max={100}
            min={0}
            value={Number(hsb.b) * 100}
            prefixCls={prefix}
            className={`${prefix}-hsb-input`}
            formatter={step => `${getRoundNumber(step || 0)}%`}
            onChange={step => handleHsbChange(Number(step), 'b')}
          />
        </div>
      )
    }
  },
  {
    name: 'ColorHsbInput',
    inheritAttrs: false,
  },
)
