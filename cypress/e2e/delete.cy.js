require('cypress-terminal-report/src/installLogsCollector')()

// https://github.com/filiphric/cypress-plugin-api
import 'cypress-plugin-api'

// show more information in each assertion
chai.config.truncateThreshold = 300

describe('TodoMVC API', () => {
  beforeEach(() => {
    // load the fixture with four todos
    cy.fixture('four-todos').as('data')
  })

  // we can access the fixture data using "this.data"
  // inside the "it... function () {}"
  it('deletes all items one by one', function () {
    expect(this.data, 'loaded todos')
      .to.have.property('todos')
      .and.have.length(4)
    cy.request('POST', '/reset', this.data)
    // confirm there are four todo items
    cy.api('GET', '/todos')
      .its('body')
      .should('have.length', 4)
    // delete each item one by one
    this.data.todos.forEach((todo) => {
      cy.api('DELETE', `/todos/${todo.id}`)
    })
    // there should be no todos left
    cy.api('GET', '/todos')
      .its('body')
      .should('have.length', 0)
  })
})
