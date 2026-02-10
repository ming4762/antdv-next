import type { ConfigProviderProps } from 'antdv-next'
import type { CSSProperties } from 'vue'
import type { UseTheme } from '.'
import { theme } from 'antdv-next'
import { useToken } from 'antdv-next/theme/internal'
import { computed } from 'vue'

type CSSVar = Record<string, string>

function createCssVar(prefix = 'ant'): CSSVar {
  return new Proxy({} as CSSVar, {
    get(_, key: string) {
      return `var(--${prefix}-${key.replace(/([A-Z])/g, '-$1').toLowerCase()})`
    },
  })
}

interface StylesResult {
  [key: string]: CSSProperties
}

function createStyles(cssVar: CSSVar): StylesResult {
  const glassBorder: CSSProperties = {
    border: `${cssVar.lineWidth} solid rgba(255,255,255,0.3)`,
    boxShadow: [
      `${cssVar.boxShadowSecondary}`,
      `inset 0 0 5px 2px rgba(255, 255, 255, 0.3)`,
      `inset 0 5px 2px rgba(255, 255, 255, 0.2)`,
    ].join(','),
  }

  const glassBox: CSSProperties = {
    ...glassBorder,
    background: `color-mix(in srgb, ${cssVar.colorBgContainer} 15%, transparent)`,
    backdropFilter: 'blur(12px)',
  }

  const glassBoxNoBackdrop: CSSProperties = {
    ...glassBox,
    backdropFilter: 'none',
  }

  return {
    glassBorder,
    glassBox,
    glassBoxNoBackdrop,
    app: {
      textShadow: '0 1px rgba(0,0,0,0.1)',
    },
    cardRoot: {
      ...glassBox,
      backgroundColor: `color-mix(in srgb, ${cssVar.colorBgContainer} 40%, transparent)`,
    },
    modalContainer: {
      ...glassBox,
      backdropFilter: 'none',
    },
    buttonRoot: {
      ...glassBorder,
    },
    buttonRootDefaultColor: {
      background: 'transparent',
      color: cssVar.colorText,
    },
    dropdownRoot: {
      ...glassBox,
      borderRadius: cssVar.borderRadiusLG,
    },
    switchRoot: {
      ...glassBorder,
      border: 'none',
    },
    progressTrack: {
      ...glassBorder,
      height: '12px',
    },
    progressRail: {
      height: '12px',
    },
  }
}

function useStyles() {
  const [, , , , cssVarConfig] = useToken()
  const cssVar = createCssVar(cssVarConfig.value?.prefix)
  const styles = computed(() => createStyles(cssVar))
  return { styles }
}

const useGlassTheme: UseTheme = () => {
  const { styles } = useStyles()

  return computed<ConfigProviderProps>(() => ({
    theme: {
      algorithm: theme.defaultAlgorithm,
      token: {
        borderRadius: 12,
        borderRadiusLG: 12,
        borderRadiusSM: 12,
        borderRadiusXS: 12,
        motionDurationSlow: '0.2s',
        motionDurationMid: '0.1s',
        motionDurationFast: '0.05s',
      },
    },
    app: {
      styles: {
        root: styles.value.app,
      },
    },
    card: {
      styles: {
        root: styles.value.cardRoot,
      },
    },
    modal: {
      styles: {
        container: styles.value.modalContainer,
      },
    },
    button: {
      styles: {
        root: styles.value.buttonRoot,
      },
    },
    alert: {
      styles: {
        root: styles.value.glassBoxNoBackdrop,
      },
    },
    colorPicker: {
      styles: {},
    },
    dropdown: {
      styles: {
        root: styles.value.dropdownRoot,
      },
    },
    select: {
      styles: {
        root: styles.value.glassBoxNoBackdrop,
        popup: styles.value.glassBox,
      },
    },
    popover: {
      styles: {
        root: styles.value.glassBox,
      },
    },
    switch: {
      styles: {
        root: styles.value.switchRoot,
      },
    },
    progress: {
      styles: {
        track: styles.value.progressTrack,
        rail: styles.value.progressRail,
      },
    },
  }))
}

export default useGlassTheme
