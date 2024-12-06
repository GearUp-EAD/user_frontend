describe('Accessories Page Tests', () => {
    beforeEach(() => {
      // Visit the Accessories page
      cy.visit('http://localhost:3000/accessories'); 
        });
  
    it('should display all items by default', () => {
      // Verify that all items are displayed when no category is selected
      cy.get('[data-cy="item-card"]').should('have.length', 6); // Total items
    });
  
    
     
    
  
    it('should filter items by each category', () => {
      const categoryData = [
        {
          name: 'Caps and Hats',
          count: 2, // Items with categoryId "cat1"
        },
        {
          name: 'Gloves',
          count: 1, // Items with categoryId "cat2"
        },
        {
          name: 'Head and Wrist Bands',
          count: 1, // Items with categoryId "cat3"
        },
        {
          name: 'Socks',
          count: 1, // Items with categoryId "cat4"
        },
        {
          name: 'Sunglasses',
          count: 1, // Items with categoryId "cat5"
        },
      ];
  
      // Iterate through each category and validate the filter
      categoryData.forEach((category) => {
        // Click on the category card
        cy.contains(category.name).click();
  
        // Verify the number of items displayed matches the category
        cy.get('[data-cy="item-card"]').should('have.length', category.count);
  
        // Reset the selection if necessary
        cy.reload(); // Or navigate back if the app supports an "All Categories" option
      });
    });
  
    it('should display item details correctly', () => {
      // Check for an item and its details
      cy.get('[data-cy="item-card"]').first().within(() => {
        cy.get('img').should('be.visible');
        cy.contains('Item 1').should('be.visible');
        cy.contains('Description 1').should('be.visible');
        cy.contains('Price: $100').should('be.visible');
      });
    });
  
    it('should reset to show all items', () => {
      // Click a category
      cy.contains('Caps and Hats').click();
  
      // Verify filtered items
      cy.get('[data-cy="item-card"]').should('have.length', 2);
  
      // Simulate reset action (if available, or navigate to default state)
      cy.reload(); // Or use navigation to "All Categories" if implemented
  
      // Verify all items are shown again
      cy.get('[data-cy="item-card"]').should('have.length', 6);
    });
  });
  