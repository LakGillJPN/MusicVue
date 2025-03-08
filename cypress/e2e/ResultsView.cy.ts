describe('ResultsView Correct', () => {
  beforeEach(() => {
    cy.visit('/'); 
  });

  it('should ', () => {
    cy.get('input[placeholder="Enter in an artist..."]').type('Coldplay');
    cy.get('button').contains('Search').click();
    cy.get('input[placeholder="Enter in an artist..."]').should('have.value', 'Coldplay');
  });


});

describe('ResultsView False', () => {
  beforeEach(() => {
    cy.visit('/'); 
  });

  it('should emit search event when clicking the search button', () => {
    cy.get('input[placeholder="Enter in an artist..."]').type('Coldplay');
    cy.get('button').contains('Search').click();
    cy.get('input[placeholder="Enter in an artist..."]').should('have.value', 'Coldplay');
  });


});