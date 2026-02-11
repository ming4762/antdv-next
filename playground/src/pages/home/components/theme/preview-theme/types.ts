import type { GlobalToken } from 'antdv-next'
import type { CSSProperties } from 'vue'

export type CSSVar = GlobalToken

export interface StylesResult {
  [key: string]: CSSProperties
}
