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

  it('Should show urls to user', () => {
    cy.get('.url-short').should('be.visible')
      .get('.url-short').should('contain', 'http')
  })

  it('Should display all existing urls', () => {
    cy.get('.url').should('be.visible')
      .get('.url').should('have.length', 1)
  })

  it('Should display the form for the user', () => {
    cy.get('form').find('input').should('be.visible')
      .get('form input[type=text]').should('be.visible')
      .get('form').find('input[type=text]').should('have.length', 2)
      
      .get('.url-to-shorten').should('be.visible')
  })

  it('Should show placeholders for inputs of title and url', () => {
    cy.get('.title-input').type('Title...')
      .get('.url-to-shorten').type('URL to Shorten...')
  })

  it('Should give the user a button to invite url shortening', () => {
    cy.get('.shorten-button').should('be.visible')
      .get('.shorten-button').should('contain', 'Shorten Please!')
      .get('.shorten-button').click()
  })

  it('Should reflect the users input in the title field', () => {
    cy.get('.title-input').should('be.visible').type('url title')
    cy.get('.title-input').should('have.attr', 'value', 'url title')

    cy.get('.url-to-shorten').should('be.visible').type('a url')
    cy.get('.url-to-shorten').should('have.attr', 'value', 'a url')

      .get('.shorten-button').should('be.visible').click()
  })

  it('Should the user should see their new shortened url on display', () => {
    cy.get('form').find('input[type=text]').eq(0)
      .type('Awesome Photo')
    cy.get('form input').eq(0).should('have.attr', 'value', 'Awesome Photo')

    cy.get('form').find('input[type=text]').eq(1)
      .type('https://images.unsplash.com/photo...')
    cy.get('form input').eq(1).should('have.attr', 'value', 'https://images.unsplash.com/photo...')

    cy.get('.shorten-button').click()
    cy.get('.App').find('.url').should('be.visible')
      .get('.App').find('.url').should('have.length', 3)
  })

})
