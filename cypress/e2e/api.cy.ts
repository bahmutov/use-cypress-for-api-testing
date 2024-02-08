// https://github.com/filiphric/cypress-plugin-api
import 'cypress-plugin-api'
// https://github.com/bahmutov/cy-spok
import spok from 'cy-spok'

// show more information in each assertion
chai.config.truncateThreshold = 300

describe('TodoMVC API', () => {
  it('adds one item', () => {
    // clear all existing backend data
    cy.request('POST', '/reset', { todos: [] })
    // confirm there are no todo items
    cy.api('GET', '/todos')
      .its('body')
      .should('have.length', 0)
    // add a new todo item
    const todo = {
      title: 'write a test',
      completed: false,
      id: 1,
    }
    cy.api('POST', '/todos', todo)
    // confirm all todos now has a single item
    cy.api('GET', '/todos')
      .its('body')
      .should('deep.equal', [todo])
  })

  it('completes an item', () => {
    // clear all existing backend data
    cy.request('POST', '/reset', { todos: [] })
    // add a new todo item
    const todo = {
      title: 'write a test',
      completed: false,
      id: 1,
    }
    cy.api('POST', '/todos', todo)
    // complete an item by patching the existing item
    cy.api('PATCH', '/todos/1', { completed: true })
    // confirm the item is now completed
    cy.api('GET', '/todos')
      .its('body')
      .should('deep.equal', [
        {
          ...todo,
          completed: true,
        },
      ])
  })

  it('deletes an item', () => {
    // set several todos at once
    const todos = [
      {
        title: 'write a test',
        completed: false,
        id: 1,
      },
      {
        title: 'write another test',
        completed: true,
        id: 2,
      },
    ]
    cy.api('POST', '/reset', { todos })
    // delete the first item
    cy.api('DELETE', '/todos/1')
    // confirm the remaining items
    cy.api('GET', '/todos')
      .its('body')
      .should('deep.equal', [todos[1]])
  })

  it('gets an id from the server', () => {
    cy.request('POST', '/reset', { todos: [] })
    const todo = {
      title: 'write a test',
      completed: false,
    }
    cy.api('POST', '/todos', todo).then((response) => {
      expect(response.status, 'status code').to.equal(201)
      // we don't know what id the server will assign
      // thus we cannot compare the whole response body
      expect(response.body, 'body').to.deep.include(todo)
      expect(response.body.id, 'id').to.be.a('number')
    })
  })

  it('gets an id from the server (cy-spok)', () => {
    cy.request('POST', '/reset', { todos: [] })
    const todo = {
      title: 'write a test',
      completed: false,
    }
    cy.api('POST', '/todos', todo).should(
      spok({
        status: 201,
        body: {
          ...todo,
          id: spok.number,
        },
      }),
    )
  })
})
