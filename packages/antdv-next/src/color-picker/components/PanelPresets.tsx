import { defineComponent } from 'vue'
import { usePanelPresetsContext } from '../context'
import ColorPresets from './ColorPresets'

export default defineComponent(
  () => {
    const presetsContext = usePanelPresetsContext()

    return () => {
      const { prefixCls, value, presets, onChange } = presetsContext.value!
      return Array.isArray(presets)
        ? (
            <ColorPresets
              value={value}
              presets={presets}
              prefixCls={prefixCls}
              onChange={onChange}
            />
          )
        : null
    }
  },
  {
    name: 'ColorPanelPresets',
    inheritAttrs: false,
  },
)
