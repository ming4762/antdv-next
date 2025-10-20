// https://github.com/ant-design/ant-design/issues/14324
import type { LiteralUnion } from '@v-c/util/dist/type'
import { defineComponent } from 'vue'

type ColSpanType = number | string

type FlexType = number | LiteralUnion<'none' | 'auto'>

export interface ColSize {
  flex?: FlexType
  span?: ColSpanType
  order?: ColSpanType
  offset?: ColSpanType
  push?: ColSpanType
  pull?: ColSpanType
}

export interface ColProps {
  flex?: FlexType
  span?: ColSpanType
  order?: ColSpanType
  offset?: ColSpanType
  push?: ColSpanType
  pull?: ColSpanType
  prefixCls?: string
}

function parseFlex(flex: FlexType): string {
  if (typeof flex === 'number') {
    return `${flex} ${flex} auto`
  }

  if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
    return `0 0 ${flex}`
  }

  return flex
}
const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const

const Col = defineComponent<ColProps>(
  () => {
    return () => {
      return null
    }
  },
)

export default Col
