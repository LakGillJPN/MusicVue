describe('ResultsView', () => {

  beforeEach(() => {
    cy.visit('/'); 
  });

  const searchArtist = (artistName: string) => {
    cy.get('input[type="text"]').clear();
    cy.get('input[type="text"]').type(artistName);
    cy.get('button').contains('Search').click();
  };

  it('should display results when searching for "Coldplay"', () => {
    searchArtist('Coldplay');
    cy.url().should('include', '/results');
    cy.get('ul').children('li').should('have.length.greaterThan', 0);
  });

  it('should display results when searching with artist name in all capitals', () => {
    searchArtist('COLDPLAY');
    cy.url().should('include', '/results');
    cy.get('ul').children('li').should('have.length.greaterThan', 0);
  });

  it('should display results when searching with artist name in all lowercase', () => {
    searchArtist('coldplay');
    cy.url().should('include', '/results');
    cy.get('ul').children('li').should('have.length.greaterThan', 0);
  });

  it('should display results when searching with artist name in mixed case', () => {
    searchArtist('CoLdPlAy');
    cy.url().should('include', '/results');
    cy.get('ul').children('li').should('have.length.greaterThan', 0);
  });

  it('should display "No results found." when searching for a non-existent artist', () => {
    searchArtist('NonExistentArtistName');
    cy.url().should('include', '/results');
    cy.contains('No results found.').should('be.visible');
  });
});

describe('ResultsView Page Search Tests', () => {
 
  beforeEach(() => {
    cy.visit('/'); 
    cy.get('input[type="text"]').type("Radiohead");
    cy.get('button').contains('Search').click();
  });

  const searchArtist = (artistName: string) => {
    cy.visit('/'); 
    cy.get('input[type="text"]').type(artistName);
    cy.get('button').contains('Search').click();
  };

  it('should display results when searching for "Kendrick Lamar"', () => {
    searchArtist('Kendrick Lamar');
    cy.url().should('include', '/results');
    cy.get('ul').children('li').should('have.length.greaterThan', 0);
  });

  it('should display results when searching with artist name in all capitals', () => {
    searchArtist('KENDRICK LAMAR');
    cy.url().should('include', '/results');
    cy.get('ul').children('li').should('have.length.greaterThan', 0);
  });

  it('should display results when searching with artist name in all lowercase', () => {
    searchArtist('kendrick lamar');
    cy.url().should('include', '/results');
    cy.get('ul').children('li').should('have.length.greaterThan', 0);
  });

  it('should display results when searching with artist name in mixed case', () => {
    searchArtist('KeNdRiCk LaMaR');
    cy.url().should('include', '/results');
    cy.get('ul').children('li').should('have.length.greaterThan', 0);
  });

  it('should display "No results found." when searching for a non-existent artist', () => {
    searchArtist('NonExistentArtistName');
    cy.url().should('include', '/results');
    cy.contains('No results found.').should('be.visible');
  });
});
