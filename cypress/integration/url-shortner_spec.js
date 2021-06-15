describe('Show opening page view of Url Shortener App', () => {
  beforeEach(() => {
    cy.fixture('stubbingData.json')
      .then(mockData => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
          statusCode: 200,
          delay: 100,
          body: mockData
        })
      })

      cy.fixture('mockPost.json')
        .then(mockPost => {
          cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
            statusCode: 200,
            delay: 100,
            body: mockPost
          })
        })
      cy.visit('http://localhost:3000')
  })

  it('Should be able to visit the main page', () => {
  cy.visit('http://localhost:3000/')
  cy.url().should('eq', 'http://localhost:3000/')
})

})
