import type { ConfigProviderProps } from 'antdv-next'
import type { CSSProperties } from 'vue'
import type { UseTheme } from '.'
import type { CSSVar, StylesResult } from './types.ts'
import { theme } from 'antdv-next'
import { useToken } from 'antdv-next/theme/internal'
import { computed } from 'vue'

function createStyles(cssVar: CSSVar): StylesResult {
  const illustrationBorder: CSSProperties = {
    border: `${cssVar.lineWidth} solid ${cssVar.colorBorder}`,
  }

  const illustrationBox: CSSProperties = {
    ...illustrationBorder,
    boxShadow: `4px 4px 0 ${cssVar.colorBorder}`,
  }

  return {
    illustrationBorder,
    illustrationBox,
    buttonRoot: {
      ...illustrationBox,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    modalContainer: {
      ...illustrationBox,
    },
    tooltipRoot: {
      padding: cssVar.padding,
    },
    popupBox: {
      ...illustrationBox,
      borderRadius: cssVar.borderRadiusLG,
      backgroundColor: cssVar.colorBgContainer,
    },
    progressRail: {
      border: `${cssVar.lineWidth} solid ${cssVar.colorBorder}`,
      boxShadow: `2px 2px 0 ${cssVar.colorBorder}`,
      height: '16px',
    },
    progressTrack: {
      border: 'none',
      height: '10px',
    },
    inputNumberActions: {
      width: '12px',
    },
  }
}

function useStyles() {
  const [, , , token] = useToken()
  const styles = computed(() => createStyles(token.value))
  return { styles }
}

const useIllustrationTheme: UseTheme = () => {
  const { styles } = useStyles()

  return computed<ConfigProviderProps>(() => ({
    theme: {
      algorithm: theme.defaultAlgorithm,
      token: {
        colorText: '#2C2C2C',
        colorPrimary: '#52C41A',
        colorSuccess: '#51CF66',
        colorWarning: '#FFD93D',
        colorError: '#FA5252',
        colorInfo: '#4DABF7',
        colorBorder: '#2C2C2C',
        colorBorderSecondary: '#2C2C2C',
        lineWidth: 3,
        lineWidthBold: 3,
        borderRadius: 12,
        borderRadiusLG: 16,
        borderRadiusSM: 8,
        controlHeight: 40,
        controlHeightSM: 34,
        controlHeightLG: 48,
        fontSize: 15,
        fontWeightStrong: 600,
        colorBgBase: '#FFF9F0',
        colorBgContainer: '#FFFFFF',
      },
      components: {
        Button: {
          primaryShadow: 'none',
          dangerShadow: 'none',
          defaultShadow: 'none',
          fontWeight: 600,
        },
        Modal: {
          boxShadow: 'none',
        },
        Card: {
          boxShadow: '4px 4px 0 #2C2C2C',
          colorBgContainer: '#FFF0F6',
        },
        Tooltip: {
          colorBorder: '#2C2C2C',
          colorBgSpotlight: 'rgba(100, 100, 100, 0.95)',
          borderRadius: 8,
        },
        Select: {
          optionSelectedBg: 'transparent',
        },
        Slider: {
          dotBorderColor: '#237804',
          dotActiveBorderColor: '#237804',
          colorPrimaryBorder: '#237804',
          colorPrimaryBorderHover: '#237804',
        },
      },
    },
    button: {
      styles: {
        root: styles.value.buttonRoot,
      },
    },
    modal: {
      styles: {
        container: styles.value.modalContainer,
      },
    },
    alert: {
      styles: {
        root: styles.value.illustrationBorder,
      },
    },
    colorPicker: {
      styles: {
        root: styles.value.illustrationBox,
      },
    },
    popover: {
      styles: {
        root: styles.value.illustrationBox,
      },
    },
    tooltip: {
      styles: {
        root: styles.value.tooltipRoot,
        inner: styles.value.illustrationBox,
      },
    },
    dropdown: {
      styles: {
        root: styles.value.popupBox,
      },
    },
    select: {
      styles: {
        root: styles.value.illustrationBox,
        popup: styles.value.popupBox,
      },
    },
    input: {
      styles: {
        root: styles.value.illustrationBox,
      },
    },
    inputNumber: {
      styles: {
        root: styles.value.illustrationBox,
        actions: styles.value.inputNumberActions,
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

export default useIllustrationTheme
