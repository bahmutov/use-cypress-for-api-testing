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
    })
      .its('body.id')
      .then(testIds.push.bind(testIds))
  }
})

describe('4 todos', () => {
  // create 4 different tests
  // tip: use it.each(N) method
  // inside the test, grab the id from the testIds array
  // by now, the testIds array should have 4 ids
  // grab the id at index K and confirm it is a string
  // make an API request using cy.api command
  // to fetch the todo with the given id /todos/:id
  // confirm each todo has the expected id
  // and the title "todo 1", "todo 2", etc
  // and that the todo has keys "id", "title", "completed"
})

// bonus: can you test all ids by splitting them up into 2 tests?
// and check each id from the testIds array / 2 batch?
describe('2 tests', () => {})
