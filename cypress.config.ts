import { defineConfig } from 'cypress'
// https://github.com/bahmutov/cypress-await
// @ts-ignore
import * as cyAwaitPreprocessor from 'cypress-await/src/preprocessor-sync-mode'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
    viewportHeight: 1000,
    // https://github.com/archfz/cypress-terminal-report
    setupNodeEvents(on, config) {
      // @ts-ignore
      require('cypress-terminal-report/src/installLogsPrinter')(
        on,
        {
          printLogsToConsole: 'always',
        },
      )
    },
    // setupNodeEvents(on, config) {
    //   on(
    //     'file:preprocessor',
    //     cyAwaitPreprocessor({
    //       // @ts-ignore
    //       typescript: require.resolve('typescript'),
    //     }),
    //   )
    // },
  },
})
