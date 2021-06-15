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

  it('Should display title on main page', () => {
    cy.get('.main-title').should('be.visible')
      .get('.main-title').should('contain', 'URL')
  })

  it('Should display the existing url titles on page load, for ui', () => {
    cy.get('.url-title').should('be.visible')
      .get('.url-title').should('contain', 'Awesome')
  })













})
