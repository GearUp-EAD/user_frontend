describe("Login Functionality", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/login"); 
    });
  
  
    it("should allow login with correct email and password", () => {
      cy.get("input[name='email']").type("user@example.com"); // Replace with a valid test email
      cy.get("input[name='password']").type("123456"); // Replace with a valid test password
      cy.get("button[type='submit']").click();
  
      // Check if redirected to the home page (or dashboard)
      cy.url().should("include", "/"); // Adjust path based on your app
  
      // Optional: Check for success indicator
      cy.contains("Welcome ").should("be.visible"); // Replace with any success message or page content
    });
  });
  