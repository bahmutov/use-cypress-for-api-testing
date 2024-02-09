import { defineConfig } from 'cypress'
// https://github.com/bahmutov/cypress-await
// @ts-ignore
import * as cyAwaitPreprocessor from 'cypress-await/src/preprocessor-sync-mode'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
    viewportHeight: 1000,
    setupNodeEvents(on, config) {
      on(
        'file:preprocessor',
        cyAwaitPreprocessor({
          // @ts-ignore
          typescript: require.resolve('typescript'),
        }),
      )
    },
  },
})
