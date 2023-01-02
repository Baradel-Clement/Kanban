module.exports = {
  plugins: [
    'tailwindcss',
    process.env.NODE_ENV === 'production' ?
      [ '@fullhuman/postcss-purgecss', {
          content: [
            "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
            "./pages/**/*.{js,ts,jsx,tsx}",
            "./components/**/*.{js,ts,jsx,tsx}",
          ],
          defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        },
      ] : undefined,
    'postcss-preset-env',
  ],
}