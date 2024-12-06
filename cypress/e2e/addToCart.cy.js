describe('Add Item to Cart', () => {
    it('should add an item to the cart successfully', () => {
      // Visit the main page
      cy.visit('http://localhost:3000/');
  
      // Click on the first item card to navigate to the product page
      cy.get('.bg-white.border.rounded-lg.shadow-lg').first().click();
  
      // Verify navigation to the product page
      cy.url().should('include', 'http://localhost:3000/product-item');
  
      // Simulate adding the item to the cart
      // Assuming the "Add to Cart" button has a specific class or text
      cy.contains('Add to Cart').click();
  
      
  
      // Verify the cart page URL
      cy.url().should('include', '/cart');
  
      // Check that the item appears in the cart
      cy.get('.flex.items-start.p-4').should('exist'); // Matches the CartItem structure
      cy.contains('Nike Air Max 1 Essential').should('exist'); // Check item name
    });
  });
  
  