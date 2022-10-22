module.exports = {
    useTabs: false,
    trailingComma: 'none',
    tabWidth: 4,
    printWidth: 80,
    semi: false,
    singleQuote: true,
    bracketSpacing: true,
    arrowParens: 'avoid',
    pugAttributeSeparator: 'none',
    pugEmptyAttributes: 'none',
    pugBracketSameLine: false,
    pugSortAttributes: 'asc',
    pugClassNotation: 'literal',
    plugins: [require.resolve('@prettier/plugin-pug')]
}
