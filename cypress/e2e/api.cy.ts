// https://github.com/filiphric/cypress-plugin-api
import 'cypress-plugin-api'
// https://github.com/bahmutov/cypress-each
import 'cypress-each'

// confirm we have 4 todo item ids
const todoIds = Cypress.env('todoIds')
expect(todoIds, '4 todo ids')
  .to.be.an('array')
  .and.to.have.length(4)

describe('4 todos', () => {
  // create a separate test for each todo ID
  // from the todoIds array
  it.each(todoIds)(
    'checking todo %K / 4 with id "%s"',
    // @ts-ignore
    (id, k) => {
      // make an API request using cy.api command
      // to fetch the todo with the given id /todos/:id
      // confirm each todo has the expected id
      // and the title "todo 1", "todo 2", etc
      cy.api(`/todos/${id}`)
        .its('body')
        .should('have.include', {
          id,
          title: `todo ${k + 1}`,
        })
        // and that the todo has keys "id", "title", "completed"
        .and('have.keys', ['id', 'title', 'completed'])
    },
  )
})
