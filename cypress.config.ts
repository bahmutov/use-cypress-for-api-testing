import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
    viewportHeight: 1000,
    async setupNodeEvents(on, config) {
      // create 4 todo items
      // when the project loads.
      // Do not delete existing todos,
      // instead make calls from this Node process
      // to create new todos with some titles
      // Grab the ids and somehow pass them to the test
      // Tip: config.env is your friend
      // https://on.cypress.io/configuration
      config.env.todoIds = []
      for (let k = 0; k < 4; k++) {
        const res = await fetch(
          'http://localhost:3000/todos',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: `todo ${k + 1}`,
              completed: false,
            }),
          },
        )
        const json = await res.json()
        console.log('created todo', json)
        config.env.todoIds.push(json.id)
        console.log('prepared todo ids', config.env.todoIds)
      }

      return config
    },
  },
})
