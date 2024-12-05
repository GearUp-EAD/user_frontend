describe('Header Navigation', () => {
    beforeEach(() => {
      // Visit the application's base URL before each test
      cy.visit('http://localhost:3000'); // Replace with your app's running URL
    });
  
    it('should navigate to the correct pages when navigation links are clicked', () => {
      // Check and click the Home link
      cy.get('a').contains('Home').should('be.visible').click();
      cy.url().should('eq', 'http://localhost:3000/'); // Assert URL change
  
      // Check and click the Equipments link
      cy.get('a').contains('Equipments').should('be.visible').click();
      cy.url().should('include', '/equipments'); // Assert URL includes '/equipments'
  
      // Check and click the Apparels link
      cy.get('a').contains('Apparels').should('be.visible').click();
      cy.url().should('include', '/apparels'); // Assert URL includes '/apparels'
  
      // Check and click the Footwear link
      cy.get('a').contains('Footwear').should('be.visible').click();
      cy.url().should('include', '/footwear'); // Assert URL includes '/footwear'
  
      // Check and click the Accessories link
      cy.get('a').contains('Accessories').should('be.visible').click();
      cy.url().should('include', '/accessories'); // Assert URL includes '/accessories'
  
      // Check and click the Nutrition & Health link
      cy.get('a').contains('Nutrition & Health').should('be.visible').click();
      cy.url().should('include', '/nutritionHealth'); // Assert URL includes '/nutritionHealth'
    });
  
    it('should navigate to the cart page when the cart icon is clicked', () => {
      // Find and click the cart icon
      cy.get('[data-testid="cart-icon"]').should('be.visible').click();
      cy.url().should('include', '/cart'); // Assert URL includes '/cart'
    });
  
    
  });
  