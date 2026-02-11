import type { ConfigProviderProps, GlobalToken } from 'antdv-next'
import type { UseTheme } from '.'
import type { StylesResult } from './types.ts'
import { theme } from 'antdv-next'
import { useToken } from 'antdv-next/theme/internal'
import { computed } from 'vue'

function createStyles(cssVar: GlobalToken): StylesResult {
  return {
    boxBorder: {
      border: `${cssVar.lineWidth} ${cssVar.lineType} color-mix(in srgb, ${cssVar.colorBorder} 80%, #000)`,
    },
    alertRoot: {
      color: cssVar.colorInfoText,
      textShadow: '0 1px 0 rgba(255, 255, 255, 0.8)',
    },
    modalContainer: {
      padding: 0,
      borderRadius: cssVar.borderRadiusLG,
    },
    modalHeader: {
      borderBottom: `${cssVar.lineWidth} ${cssVar.lineType} ${cssVar.colorSplit}`,
      padding: `${cssVar.padding} ${cssVar.paddingLG}`,
    },
    modalBody: {
      padding: `${cssVar.padding} ${cssVar.paddingLG}`,
    },
    modalFooter: {
      borderTop: `${cssVar.lineWidth} ${cssVar.lineType} ${cssVar.colorSplit}`,
      padding: `${cssVar.padding} ${cssVar.paddingLG}`,
      backgroundColor: cssVar.colorBgContainerDisabled,
      boxShadow: `inset 0 1px 0 ${cssVar.colorBgContainer}`,
    },
    buttonRoot: {
      backgroundImage: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.2))',
      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15)',
      transition: 'none',
      borderColor: 'rgba(0, 0, 0, 0.3)',
      textShadow: '0 -1px 0 rgba(0, 0, 0, 0.2)',
    },
    buttonColorDefault: {
      textShadow: 'none',
      color: cssVar.colorText,
      borderBottomColor: 'rgba(0, 0, 0, 0.5)',
    },
    popupBox: {
      borderRadius: cssVar.borderRadiusLG,
      backgroundColor: cssVar.colorBgContainer,
    },
    dropdownItem: {
      borderRadius: 0,
      transition: 'none',
      paddingBlock: cssVar.paddingXXS,
      paddingInline: cssVar.padding,
    },
    selectPopupRoot: {
      paddingInline: 0,
    },
    switchRoot: {
      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.4)',
    },
    progressTrack: {
      backgroundImage: `linear-gradient(to bottom, ${cssVar.colorPrimaryHover}, ${cssVar.colorPrimary})`,
      borderRadius: cssVar.borderRadiusSM,
    },
    progressRail: {
      borderRadius: cssVar.borderRadiusSM,
    },
  }
}

function useStyles() {
  const [, , , token] = useToken()
  const styles = computed(() => createStyles(token.value))

  return { styles }
}

const useBootstrapTheme: UseTheme = () => {
  const { styles } = useStyles()

  return computed<ConfigProviderProps>(() => ({
    theme: {
      algorithm: theme.defaultAlgorithm,
      token: {
        borderRadius: 4,
        borderRadiusLG: 6,
        colorInfo: '#3a87ad',
      },
      components: {
        Tooltip: {
          fontSize: 12,
        },
        Checkbox: {
          colorBorder: '#666',
          borderRadius: 2,
          algorithm: true,
        },
        Radio: {
          colorBorder: '#666',
          borderRadius: 2,
          algorithm: true,
        },
      },
    },
    wave: {
      showEffect: () => {},
    },
    modal: {
      styles: {
        container: styles.value.boxBorder,
        content: styles.value.modalContainer,
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
        root: styles.value.alertRoot,
      },
    },
    colorPicker: {
      styles: {
        root: styles.value.boxBorder,
        popup: styles.value.popupBox,
      },
    },
    dropdown: {
      styles: {
        root: styles.value.popupBox,
      },
    },
    select: {
      styles: {
        root: styles.value.boxBorder,
        popup: styles.value.selectPopupRoot,
      },
    },
    switch: {
      styles: {
        root: styles.value.switchRoot,
      },
    },
    progress: {
      styles: {
        track: { ...styles.value.progressTrack, height: '20px' },
        rail: { ...styles.value.progressRail, height: '20px' },
      },
    },
  }))
}

export default useBootstrapTheme
