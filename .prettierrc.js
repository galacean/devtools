module.exports = {
  // https://prettier.io/docs/en/options.html#prose-wrap
  proseWrap: 'never',
  endOfLine: 'lf',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  // Print semicolons at the ends of statements.
  semi: true,
  // Quotes in JSX will always be double and ignore this setting
  singleQuote: true,
  // TODO: 解构赋值、数组等场景不超过行款时，不会保留换行
  // https://github.com/prettier/prettier/issues/2550
  trailingComma: 'all',
  // true - Example: { foo: bar }
  bracketSpacing: true,
  // jsxBracketSameLine: false,
  // Always include parens. Example: (x) => x
  // Why? Minimizes diff churn when adding or removing arguments.
  arrowParens: 'always',
}
