describe('Nutrition & Health Page Tests', () => {
    beforeEach(() => {
      // Visit the Nutrition & Health page
      cy.visit('http://localhost:3000/nutritionHealth'); // Adjust the path as per your routing
    });
  
    it('should display all items by default', () => {
      // Check all items are displayed when no category is selected
      cy.get('[data-cy="item-card"]').should('have.length', 6); // Total items count
    });
  
    it('should filter items by each category', () => {
      const categories = [
        {
          name: 'Energy Bars & Drinks',
          count: 2, // Items belonging to this category
          items: [
            { title: 'Item 1', description: 'Description 1', price: '$100' },
            { title: 'Item 6', description: 'Description 6', price: '$600' },
          ],
        },
        {
          name: 'Protein Powders',
          count: 1,
          items: [
            { title: 'Item 2', description: 'Description 2', price: '$200' },
          ],
        },
        {
          name: 'Supplements',
          count: 1,
          items: [
            { title: 'Item 3', description: 'Description 3', price: '$300' },
          ],
        },
      ];
  
      // Iterate through each category
      categories.forEach((category) => {
        // Click the category
        cy.contains(category.name).click();
  
        // Verify the number of filtered items displayed
        cy.get('[data-cy="item-card"]').should('have.length', category.count);
  
        // Validate the displayed item details
        category.items.forEach((item, index) => {
          cy.get('[data-cy="item-card"]').eq(index).within(() => {
            cy.get('img')
              .should('have.attr', 'src')
              .and('contain', 'https://via.placeholder.com/150'); // Update with real image URL
            cy.contains(item.title).should('be.visible');
            cy.contains(item.description).should('be.visible');
            cy.contains(`Price: ${item.price}`).should('be.visible');
          });
        });
      });
    });
  
  });
  