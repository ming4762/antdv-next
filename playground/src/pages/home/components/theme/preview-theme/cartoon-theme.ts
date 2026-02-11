import type { ConfigProviderProps } from 'antdv-next'
import type { CSSProperties } from 'vue'
import type { UseTheme } from '.'
import type { CSSVar, StylesResult } from './types.ts'
import { theme } from 'antdv-next'
import { useToken } from 'antdv-next/theme/internal'
import { computed } from 'vue'

function createStyles(cssVar: CSSVar): StylesResult {
  const sharedBorder: CSSProperties = {
    border: `${cssVar.lineWidth} ${cssVar.lineType} ${cssVar.colorBorder}`,
  }

  return {
    sharedBorder,
    progressRail: {
      ...sharedBorder,
      height: '16px',
    },
    progressTrack: {
      ...sharedBorder,
      marginInlineStart: `calc(-1 * ${cssVar.lineWidth})`,
      marginBlockStart: `calc(-1 * ${cssVar.lineWidth})`,
      height: '16px',
    },
  }
}

function useStyles() {
  const [, , , token] = useToken()
  const styles = computed(() => createStyles(token.value))
  return { styles }
}

const useCartoonTheme: UseTheme = () => {
  const { styles } = useStyles()

  return computed<ConfigProviderProps>(() => ({
    theme: {
      algorithm: theme.defaultAlgorithm,
      token: {
        colorText: '#51463B',
        colorPrimary: '#225555',
        colorError: '#DA8787',
        colorInfo: '#9CD3D3',
        colorInfoBorder: '#225555',
        colorBorder: '#225555',
        colorBorderSecondary: '#225555',
        lineWidth: 2,
        lineWidthBold: 2,
        borderRadius: 18,
        borderRadiusLG: 18,
        borderRadiusSM: 18,
        controlHeightSM: 28,
        controlHeight: 36,
        colorBgBase: '#FAFAEE',
      },
      components: {
        Button: {
          primaryShadow: 'none',
          dangerShadow: 'none',
          defaultShadow: 'none',
        },
        Modal: {
          boxShadow: 'none',
        },
        Card: {
          colorBgContainer: '#BBAA99',
        },
        Tooltip: {
          borderRadius: 6,
          colorBorder: '#225555',
          algorithm: true,
        },
        Select: {
          optionSelectedBg: '#CBC4AF',
        },
      },
    },
    modal: {
      styles: {
        container: styles.value.sharedBorder,
      },
    },
    colorPicker: {
      styles: {},
    },
    popover: {
      styles: {
        root: styles.value.sharedBorder,
      },
    },
    progress: {
      styles: {
        rail: styles.value.progressRail,
        track: styles.value.progressTrack,
      },
    },
  }))
}

export default useCartoonTheme
