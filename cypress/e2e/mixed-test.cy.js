// show more information in each assertion
chai.config.truncateThreshold = 300

describe('TodoMVC API', () => {
  it('reloads the todos every minute', () => {
    cy.fixture('four-todos').then((data) => {
      cy.request('POST', '/reset', data)
    })
    cy.clock()
    cy.visit('/')
    cy.get('.todo-list li').should('have.length', 4)
    // delete the first todo
    // use cy.request and not cy.api to avoid
    // overwriting the web application
    cy.request('DELETE', '/todos/101')
    // advance the clock by 1 minute
    cy.tick(60_000)
    // confirm the new data has loaded
    cy.get('.todo-list li').should('have.length', 3)
  })
})
