// https://on.cypress.io/api

describe('My First Test', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    //cy.contains('h1', 'You did it!')
  })

  
})

describe('SearchBar Component', () => {
  beforeEach(() => {
    cy.visit('/'); // Ensure this is the correct route for your app
  });

 

  it('should emit search event when clicking the search button', () => {
    cy.get('input[placeholder="Enter in an artist..."]').type('Coldplay');
    cy.get('button').contains('Search').click();

    // If the search event updates the UI, check for the expected result
  });
});
