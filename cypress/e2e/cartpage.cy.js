describe('Cart Page Functionality', () => {
    beforeEach(() => {
      // Visit the cart page before each test
      cy.visit('http://localhost:3000/cart');
    });
  
    it('should display cart items correctly', () => {
      // Verify that the correct number of cart items are displayed
      cy.get('.flex.items-start.p-4').should('have.length', 3);
  
      // Verify that a specific item is displayed with the correct details
      cy.contains('Nike Air Max 1 Essential').should('exist');
      cy.contains("Men's Shoes, White/Summit White/Black, Size 6.5").should('exist');
      cy.contains('Price: $140.00').should('exist');
      cy.contains('Total: $140.00').should('exist');
    });
  
    it('should increase the quantity of an item', () => {
      // Find the first item's "increase" button and click it
      cy.get('.flex.items-center button').contains('+').first().click();
  
      // Verify the quantity is updated
      cy.get('.flex.items-center span').first().should('contain.text', 'GearUp');
  
      // Verify the total price is updated
      cy.contains('Total: $280.00').should('exist');
    });
  
    it('should decrease the quantity of an item', () => {
      // Find the first item's "decrease" button and click it
      cy.get('.flex.items-center button').contains('-').first().click();
  
      // Verify the quantity is updated (but not below 1)
      cy.get('.flex.items-center span').first().should('contain.text', 'GearUp');
  
      // Verify the total price is updated
      cy.contains('Total: $140.00').should('exist');
    });
  
    it('should remove an item from the cart', () => {
      // Click the "Remove" button for the first item
      cy.get('.bg-red-500').first().click();
  
      // Verify the item is removed from the cart
      cy.get('.flex.items-start.p-4').should('have.length', 2);
  
      // Ensure the removed item's name is no longer displayed
      cy.contains('Nike Air Max 1 Essential').should('not.exist');
    });
  });
  