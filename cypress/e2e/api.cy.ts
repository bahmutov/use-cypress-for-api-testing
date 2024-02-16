// https://github.com/filiphric/cypress-plugin-api
import 'cypress-plugin-api'
// https://github.com/bahmutov/cypress-each
import 'cypress-each'

const testIds: string[] = []

before(() => {
  // create 4 todo items
  // when the project loads.
  // Do not delete existing todos,
  // instead make calls from this Node process
  // to create new todos with some titles
  for (let k = 0; k < 4; k++) {
    cy.request('POST', '/todos', {
      title: `todo ${k + 1}`,
      completed: false,
    }).then((response) => {
      testIds.push(response.body.id)
    })
  }
})

describe('4 todos', () => {
  // create a separate test for each todo ID
  // from the todoIds array
  it.each(testIds)(
    'checking todo %K / 4 with id "%s"',
    // @ts-ignore
    (id, k) => {
      // make an API request using cy.api command
      // to fetch the todo with the given id /todos/:id
      // confirm each todo has the expected id
      // and the title "todo 1", "todo 2", etc
      // and that the todo has keys "id", "title", "completed"
    },
  )
})
