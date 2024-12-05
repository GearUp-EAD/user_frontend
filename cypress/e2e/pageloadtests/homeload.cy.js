describe('Home Page Load Time Test', () => {
    it('should load the homepage within 3 seconds', () => {
      cy.visit('http://localhost:3000');
      cy.window().should('have.property', 'performance'); // Check if the window has performance data
      cy.window().then((win) => {
        const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart;
        expect(loadTime).to.be.lessThan(3000); // Ensure load time is less than 3 seconds
      });
    });
  });
  