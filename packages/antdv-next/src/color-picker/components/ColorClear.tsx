import type { AggregationColor } from '../color'
import { defineComponent } from 'vue'
import { generateColor } from '../util'

export interface ColorClearProps {
  prefixCls: string
  value?: AggregationColor
  disabled?: boolean
  onChange?: (value: AggregationColor) => void
}

export default defineComponent<ColorClearProps>(
  (props) => {
    const handleClick = () => {
      if (props.disabled || !props.onChange || !props.value || props.value.cleared) {
        return
      }
      const hsba = props.value.toHsb()
      hsba.a = 0
      const genColor = generateColor(hsba)
      genColor.cleared = true
      props.onChange(genColor)
    }

    return () => <div class={`${props.prefixCls}-clear`} onClick={handleClick} />
  },
  {
    name: 'ColorClear',
    inheritAttrs: false,
  },
)
