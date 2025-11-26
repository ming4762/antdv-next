import { clsx } from '@v-c/util'
import { computed, defineComponent, shallowRef, watch } from 'vue'
import InputNumber from '../../input-number'

export interface ColorSteppersProps {
  prefixCls: string
  value?: number
  min?: number
  max?: number
  onChange?: (value: number | null) => void
  className?: string
  formatter?: (value: number | null) => string | number
}

export default defineComponent<ColorSteppersProps>(
  (props) => {
    const internalValue = shallowRef<number | undefined>(0)

    watch(
      () => props.value,
      (val) => {
        if (typeof val === 'number') {
          internalValue.value = val
        }
      },
    )

    const stepValue = computed(() => (!Number.isNaN(props.value) ? props.value : internalValue.value))

    return () => (
      <InputNumber
        class={clsx(`${props.prefixCls}-steppers`, props.className)}
        min={props.min ?? 0}
        max={props.max ?? 100}
        value={stepValue.value as number | undefined}
        formatter={props.formatter as any}
        size="small"
        onChange={(step) => {
          internalValue.value = (step ?? 0) as number
          props.onChange?.(step ?? null)
        }}
      />
    )
  },
  {
    name: 'ColorSteppers',
    inheritAttrs: false,
  },
)
