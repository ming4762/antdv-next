import type { Ref } from 'vue'
import type { ScreenSizeMap } from '../_util/responsiveObserver'
import { inject, provide, ref } from 'vue'

export type AvatarSize = 'large' | 'small' | 'default' | number | ScreenSizeMap

export interface AvatarContextType {
  size?: AvatarSize
  shape?: 'circle' | 'square'
}

const AvatarContextKey = Symbol('AvatarContext')

export function useAvatarContext() {
  return inject(AvatarContextKey, ref({} as AvatarContextType))
}

export function useAvatarProvider(value: Ref<AvatarContextType>) {
  provide(AvatarContextKey, value)
}
