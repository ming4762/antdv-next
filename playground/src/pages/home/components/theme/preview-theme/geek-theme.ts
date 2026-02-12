import type { ConfigProviderProps } from 'antdv-next'
import type { CSSProperties } from 'vue'
import type { UseTheme } from '.'
import type { CSSVar, StylesResult } from './types.ts'
import { theme } from 'antdv-next'
import { useToken } from 'antdv-next/theme/internal'
import { computed } from 'vue'

function createStyles(cssVar: CSSVar): StylesResult {
  const lightBorder: CSSProperties = {
    border: `${cssVar.lineWidth} solid ${cssVar.colorPrimary}`,
    boxShadow: `0 0 3px ${cssVar.colorPrimary}, inset 0 0 10px ${cssVar.colorPrimary}`,
  }

  return {
    lightBorder,
    app: {
      textShadow: `0 0 5px color-mix(in srgb, currentColor 50%, transparent)`,
    },
    modalContainer: {
      ...lightBorder,
      padding: 0,
      backgroundColor: '#1F1F1F',
    },
    modalHeader: {
      padding: `${cssVar.padding} ${cssVar.paddingLG}`,
      margin: 0,
      position: 'relative',
    },
    modalBody: {
      padding: `${cssVar.padding} ${cssVar.paddingLG}`,
    },
    modalFooter: {
      padding: `${cssVar.padding} ${cssVar.paddingLG}`,
    },
    buttonRoot: {
      ...lightBorder,
      border: undefined,
      borderWidth: cssVar.lineWidth,
      borderColor: cssVar.colorPrimary,
    },
    buttonRootSolid: {
      color: cssVar.colorBgContainer,
      border: 'none',
      fontWeight: 'bolder',
    },
    buttonRootSolidDanger: {
      boxShadow: `0 0 5px ${cssVar.colorError}`,
    },
    colorPickerBody: {
      pointerEvents: 'none',
    },
    tooltipRoot: {
      padding: cssVar.padding,
    },
    tooltipContainer: {
      ...lightBorder,
      color: cssVar.colorPrimary,
    },
    progressTrack: {
      backgroundColor: cssVar.colorPrimary,
    },
  }
}

function useStyles() {
  const [, , , token] = useToken()
  const styles = computed(() => createStyles(token.value))
  return { styles }
}

const useGeekTheme: UseTheme = () => {
  const { styles } = useStyles()

  return computed<ConfigProviderProps>(() => ({
    theme: {
      algorithm: theme.darkAlgorithm,
      token: {
        borderRadius: 0,
        lineWidth: 2,
        colorPrimary: '#39ff14',
        colorText: '#39ff14',
        controlHeightSM: 26,
        controlHeight: 34,
      },
      components: {
        Button: {
          colorPrimary: '#39ff14',
          colorText: '#39ff14',
        },
      },
    },
    app: {
      styles: {
        root: styles.value.app,
      },
    },
    modal: {
      styles: {
        container: styles.value.modalContainer,
        header: styles.value.modalHeader,
        body: styles.value.modalBody,
        footer: styles.value.modalFooter,
      },
    },
    button: {
      styles: {
        root: styles.value.buttonRoot,
      },
    },
    alert: {
      styles: {
        root: styles.value.lightBorder,
      },
    },
    colorPicker: {
      styles: {
        root: styles.value.lightBorder,
        body: styles.value.colorPickerBody,
      },
    },
    select: {
      styles: {
        root: styles.value.lightBorder,
      },
    },
    input: {
      styles: {
        root: styles.value.lightBorder,
      },
    },
    inputNumber: {
      styles: {
        root: styles.value.lightBorder,
      },
    },
    tooltip: {
      styles: {
        root: styles.value.tooltipRoot,
        inner: styles.value.tooltipContainer,
      },
    },
    progress: {
      styles: {
        track: styles.value.progressTrack,
      },
    },
  }))
}

export default useGeekTheme
