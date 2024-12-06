describe('FootWear Component Tests', () => {
    beforeEach(() => {
      // Visit the page where the FootWear component is rendered
      cy.visit('http://localhost:3000/footwear'); 
    });
    it('should filter items correctly for each category', () => {
        // Define categories and their expected item counts and details
        const categories = [
          {
            name: 'Cleats',
            count: 2,
            items: [
              { title: 'Item 1', description: 'Description 1', price: '$100' },
              { title: 'Item 6', description: 'Description 6', price: '$600' },
            ],
          },
          {
            name: 'Hiking Boots',
            count: 1,
            items: [
              { title: 'Item 2', description: 'Description 2', price: '$200' },
            ],
          },
          {
            name: 'Running Shoes',
            count: 1,
            items: [
              { title: 'Item 3', description: 'Description 3', price: '$300' },
            ],
          },
          {
            name: 'Sandals & Slippers',
            count: 1,
            items: [
              { title: 'Item 4', description: 'Description 4', price: '$400' },
            ],
          },
          {
            name: 'sneakers',
            count: 1,
            items: [
              { title: 'Item 5', description: 'Description 5', price: '$500' },
            ],
          },
        ];
      
        // Iterate over categories to test each one
        categories.forEach((category) => {
          // Click on the category
          cy.contains(category.name).click();
      
          // Verify the number of items displayed
          cy.get('[data-cy="item-card"]').should('have.length', category.count);
      
          // Validate the details of each item in the category
          category.items.forEach((item, index) => {
            cy.get('[data-cy="item-card"]').eq(index).within(() => {
              cy.get('img')
                .should('have.attr', 'src')
                .and('contain', 'https://via.placeholder.com/150'); // Update if using real image URLs
              cy.contains(item.title).should('be.visible');
              cy.contains(item.description).should('be.visible');
              cy.contains(`Price: ${item.price}`).should('be.visible');
            });
          });
      
          // Reset the filter (if required) or navigate back to default view
          // Uncomment the line below if the app requires a reset
          // cy.contains('All Categories').click();
        });
      });
      
      
      
      

  });
  