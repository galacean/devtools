import { colord } from 'colord'
import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

const blue = '#42b983'

export const themeDef = {
  colors: {
    'black': '#000000',

    // primary
    'primary-100': colord(blue).lighten(0.3).toHex(), // '#4ecb9c
    'primary-200': colord(blue).lighten(0.2).toHex(), // '#4ecb9c
    'primary-300': colord(blue).lighten(0.1).toHex(), // '#4ecb9c
    'primary-400': colord(blue).lighten(0.05).toHex(), // '#4ecb9c
    'primary-500': blue,
    'primary-600': colord(blue).darken(0.05).toHex(),
    'primary-700': colord(blue).darken(0.1).toHex(),
    'primary-800': colord(blue).darken(0.15).toHex(),
    'primary-900': colord(blue).darken(0.2).toHex(),
  },
}

export const theme = {
  colors: Object.entries(themeDef.colors).reduce((acc, [key, value]) => {
    acc[key] = value
    acc[`${key}-lighter`] = colord(value).lighten(0.025).toHex()
    acc[`${key}-darker`] = colord(value).darken(0.08).toHex()
    return acc
  }, {} as Record<string, any>),
  fontFamily: {
    sans: 'Avenir, Helvetica, Arial, sans-serif',
  },
}

export default defineConfig({
  theme,
  rules: [
    /**
     * Credit to Nanda Syahrasyad (https://github.com/narendrasss)
     *
     * - https://github.com/narendrasss/NotANumber
     * - https://www.nan.fyi/grid.svg
     * - https://www.nan.fyi/grid-dark.svg
     */
    ['panel-grids-light', {
      'background-image': 'url("data:image/svg+xml,%0A%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\' transform=\'scale(3)\'%3E%3Crect x=\'0\' y=\'0\' width=\'100%25\' height=\'100%25\' fill=\'white\'/%3E%3Cpath d=\'M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z\' stroke-width=\'0.2\' stroke=\'hsla(0, 0%25, 98%25, 1)\' fill=\'none\'/%3E%3C/svg%3E")',
      'background-size': '40px 40px',
    }],
    ['panel-grids-dark', {
      'background-image': `url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' transform='scale(3)'%3E%3Crect x='0' y='0' width='100%25' height='100%25' fill='${encodeURIComponent(themeDef.colors.black)}'/%3E%3Cpath d='M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z' stroke-width='0.2' stroke='${encodeURIComponent('#141b24')}' fill='none'/%3E%3C/svg%3E");`,
      'background-size': '40px 40px',
    }],
  ],
  variants: [
    // @children:[span]:bg-red => .@children\:\[span\]\:bg-red > span { bg-red }
    (input: string) => {
      const prefix = '@children:'
      const reg = /(@children:)\[(.*)\]:(.*)$/
      if (input.startsWith(prefix)) {
        return {
          matcher: input.replace(reg, '$3'),
          selector: s => `${s} > ${input.replace(reg, '$2')}`,
        }
      }
    },
    {
      name: '@active',
      match(matcher) {
        if (!matcher.startsWith('@active'))
          return matcher

        return {
          matcher: matcher.slice(8),
          selector: s => `${s}.active`,
        }
      },
    },
  ],
  shortcuts: [{
    'flex-center': 'flex items-center justify-center',

    // general
    'bg-base': 'bg-white dark:bg-black',
    'text-base': 'text-black dark:text-white',
    'bg-active': 'bg-gray:5',
    'border-base': 'border-gray/20',
    'navbar-base': 'border-b border-base h-50px',
    'transition-base': 'transition-all duration-200',

    'x-divider': 'h-1px w-full bg-gray/15',

    // glass
    'glass-effect': 'backdrop-blur-6 bg-white/80 dark:bg-black/90',
    'navbar-glass': 'sticky z-10 top-0 glass-effect',

    // code
    'code-block': 'dark:bg-[#121212] bg-white',

    // panel grids
    'panel-grids': 'panel-grids-light dark:panel-grids-dark',
    'panel-grids-center': 'panel-grids flex flex-col h-full gap-2 items-center justify-center',

    'selectable-item': 'flex items-center px-2 py-1 rounded cursor-pointer hover:bg-primary-200 dark:(hover:bg-gray-800) @active:(text-white bg-primary-600 hover:(text-white bg-primary-600))',

    // component state
    'state-key': 'text-purple-700 dark:text-purple-300',
    'colon': 'text-#444 dark:(text-white)',
    'state-value': 'text-#444 dark:(text-#bdc6cf)',
    'state-value-label': 'text-gray-500',
    'state-value-literal': 'text-#03c dark:(text-#997fff)',
    'state-value-string': 'text-#c41a16',
  }, [/^theme-card-(\w+)$/, $ => `p2 flex gap2 border border-base bg-base items-center rounded min-w-40 min-h-25 justify-center transition-all saturate-0 op50 shadow hover:(op100 bg-${$[1]}/10 text-${$[1]}6 saturate-100)`]],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      prefix: 'i-',
    }),
  ],
  safelist: [
    'state-value-literal',
    'state-value-string',
    'i-carbon-ibm-watson-discovery',
  ],
})
