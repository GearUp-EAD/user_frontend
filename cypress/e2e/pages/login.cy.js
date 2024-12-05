describe('Login Page Tests', () => {
    // Test to check if login form is displayed
    it('should display login form with email and password fields', () => {
      cy.visit('http://localhost:3000/login');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('contain', 'Sign In');
    });
  
    // Test to check error message for invalid email
    it('should show an error for invalid email', () => {
      cy.visit('http://localhost:3000/login');
      cy.get('input[name="email"]').type("invalidemail");
      cy.get('input[name="password"]').type("validpassword123");
      cy.get('button[type="submit"]').click();
  
      // Ensure error message appears
      cy.get('.text-red-500', { timeout: 5000 }).should('contain', 'Please enter an email address');
    });
  
    // Test to check error message when password is empty
    it('should show an error for empty password', () => {
      cy.visit('http://localhost:3000/login');
      cy.get('input[name="email"]').type('valid@example.com');
      cy.get('input[name="password"]').clear();
      cy.get('button[type="submit"]').click();
  
      cy.get('.text-red-500', { timeout: 5000 }).should('contain', 'Password is required');
    });
  
    // Test to check error message for short password
    it('should show an error for short password', () => {
      cy.visit('http://localhost:3000/login');
      cy.get('input[name="email"]').type('valid@example.com');
      cy.get('input[name="password"]').type('short');
      cy.get('button[type="submit"]').click();
  
      cy.get('.text-red-500', { timeout: 5000 }).should('contain', 'Password must be at least 6 characters');
    });
  
    // Test to check successful login and redirect to home page
    it('should navigate to home page after successful login', () => {
      cy.visit('http://localhost:3000/login');
      cy.get('input[name="email"]').type('valid@example.com');
      cy.get('input[name="password"]').type('validpassword');
      cy.get('button[type="submit"]').click();
  
      cy.url().should('include', '/'); // Verify redirection to the home page
    });
  });
  
  