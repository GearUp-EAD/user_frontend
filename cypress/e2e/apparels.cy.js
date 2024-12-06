describe('Apparels Page Tests', () => {
    beforeEach(() => {
      // Visit the Apparels page
      cy.visit('http://localhost:3000/apparels'); // Adjust the path as needed based on your routing
    });
  
    it('should display all items by default', () => {
      // Verify all items are displayed when no category is selected
      cy.get('[data-cy="item-card"]').should('have.length', 6); // Check total items
    });
  
    it('should filter items by each category', () => {
      const categories = [
        {
          name: 'Compression Wear',
          count: 2, // Number of items in this category
          items: [
            { title: 'Item 1', description: 'Description 1', price: '$100' },
            { title: 'Item 6', description: 'Description 6', price: '$600' },
          ],
        },
        {
          name: 'Jackets & Hoodies',
          count: 1,
          items: [
            { title: 'Item 2', description: 'Description 2', price: '$200' },
          ],
        },
        {
          name: 'Shorts',
          count: 1,
          items: [
            { title: 'Item 3', description: 'Description 3', price: '$300' },
          ],
        },
        {
          name: 'Swimwear',
          count: 1,
          items: [
            { title: 'Item 4', description: 'Description 4', price: '$400' },
          ],
        },
        {
          name: 'T-shirts & Jerseys',
          count: 1,
          items: [
            { title: 'Item 5', description: 'Description 5', price: '$500' },
          ],
        },
      ];
  
      // Iterate through each category
      categories.forEach((category) => {
        // Click on the category
        cy.contains(category.name).click();
  
        // Verify the number of filtered items displayed
        cy.get('[data-cy="item-card"]').should('have.length', category.count);
  
        // Validate each item's details in the category
        category.items.forEach((item, index) => {
          cy.get('[data-cy="item-card"]').eq(index).within(() => {
            cy.get('img')
              .should('have.attr', 'src')
              .and('contain', 'https://via.placeholder.com/150'); // Update for real image URLs
            cy.contains(item.title).should('be.visible');
            cy.contains(item.description).should('be.visible');
            cy.contains(`Price: ${item.price}`).should('be.visible');
          });
        });
  
        // Reset to view all items before testing the next category
        // Uncomment this line if a reset option exists
        // cy.contains('All Categories').click();
      });
    });
  
    
  });
  