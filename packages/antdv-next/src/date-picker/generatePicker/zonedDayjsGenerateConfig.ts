import type { GenerateConfig } from '@v-c/picker/generate'
import type { Dayjs } from 'dayjs'
import dayjsGenerateConfig from '@v-c/picker/generate/dayjs'

function supportTz(date: Dayjs) {
  return 'tz' in date && typeof date.tz === 'function'
}

interface TzDayjs extends Dayjs {
  tz: () => TzDayjs
}

const localeMap: Record<string, string> = {
  bn_BD: 'bn-bd',
  by_BY: 'be',
  en_GB: 'en-gb',
  en_US: 'en',
  fr_BE: 'fr',
  fr_CA: 'fr-ca',
  hy_AM: 'hy-am',
  kmr_IQ: 'ku',
  nl_BE: 'nl-be',
  pt_BR: 'pt-br',
  zh_CN: 'zh-cn',
  zh_HK: 'zh-hk',
  zh_TW: 'zh-tw',
}
function parseLocale(locale: string) {
  return (localeMap[locale] || locale.split('_')[0]) as string
}

export default {
  ...dayjsGenerateConfig,
  getHour: (date: Dayjs) => {
    if (supportTz(date)) {
      return (date as TzDayjs).tz().hour()
    }
    return date.hour()
  },
  setHour: (date: Dayjs, hour: number) => {
    if (supportTz(date)) {
      return (date as TzDayjs).tz().hour(hour)
    }
    return date.hour(hour)
  },
  locale: {
    ...dayjsGenerateConfig.locale,
    format: (locale: string, date: Dayjs, format: string) => {
      if (supportTz(date)) {
        return (date as TzDayjs).tz().locale(parseLocale(locale)).format(format)
      }
      return date.locale(parseLocale(locale)).format(format)
    },
  },
} as GenerateConfig<Dayjs>
