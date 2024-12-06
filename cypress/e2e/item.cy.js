describe("Apparels Page", () => {
    beforeEach(() => {
      // Visit the apparels page
      cy.visit("http://localhost:3000/apparels"); // Update the route if necessary
    });
  
    it("should navigate to the product item page when an item is clicked", () => {
        // Ensure the ItemCard is rendered
        cy.get('[data-cy="item-card"]', { timeout: 10000 }).should("be.visible");
      
        // Click the first item card
        cy.get('[data-cy="item-card"]').first().click();
      
        // Verify navigation to the product-item page
        cy.url().should("include", "http://localhost:3000/product-item");
      });
      
  });
  