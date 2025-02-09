describe('HomeView', () => {
  beforeEach(() => {
    cy.visit('/'); 
  });

  it('should emit search event when clicking the search button', () => {
    cy.get('input[placeholder="Enter in an artist..."]').type('Coldplay');
    cy.get('button').contains('Search').click();
    cy.get('input[placeholder="Enter in an artist..."]').should('have.value', 'Coldplay');
  });

  it('should emit search event when pressing enter', () => {
    cy.get('input[placeholder="Enter in an artist..."]').type('Coldplay{enter}');
    cy.get('input[placeholder="Enter in an artist..."]').should('have.value', 'Coldplay');
  });

  it('should not emit search event when input is empty', () => {
    cy.get('button').contains('Search').click();
    cy.get('input[placeholder="Enter in an artist..."]').should('have.value', '');
  })

});
