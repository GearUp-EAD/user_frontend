describe("Register Page", () => {
    beforeEach(() => {
      // Visit the register page
      cy.visit("http://localhost:3000/register");
    });
  
    it("should load the register page", () => {
      // Check if the Register form is visible
      cy.get("h1").should("contain", "Register");
      cy.get("form").should("be.visible");
    });
  
    it("should show validation errors for empty fields", () => {
      // Try to submit the form with empty fields
      cy.get("button[type='submit']").click();
  
      // Check for validation errors
      cy.get("p.text-red-500").should("have.length", 3); // All fields should show an error
    });
  
    it("should show validation error for invalid email", () => {
      // Fill in the form with an invalid email
      cy.get("input[name='email']").type("invalidemail");
      cy.get("input[name='password']").type("password123");
      cy.get("input[name='confirmPassword']").type("password123");
      cy.get("input[name='address']").type("27/11, Moratuwa , Katubedda");
  
      // Submit the form
      cy.get("button[type='submit']").click();
  
      // Check if the email error is shown
      cy.get("p.text-red-500").contains("Email is invalid.");
    });
  
    it("should show validation error for mismatched passwords", () => {
      // Fill in the form with mismatched passwords
      cy.get("input[name='email']").type("testuser@gmail.com");
      cy.get("input[name='password']").type("password123");
      cy.get("input[name='confirmPassword']").type("differentpassword123");
      cy.get("input[name='address']").type("27/11, Moratuwa , Katubedda");
  
      // Submit the form
      cy.get("button[type='submit']").click();
  
      // Check if the password mismatch error is shown
      cy.get("p.text-red-500").contains("Passwords do not match.");
    });
  
    it("should submit the form when all fields are correct", () => {
      // Fill in the form with valid data
      cy.get("input[name='email']").type("testuser@gmail.com");
      cy.get("input[name='password']").type("password123");
      cy.get("input[name='confirmPassword']").type("password123");
      cy.get("input[name='address']").type("27/11, Moratuwa , Katubedda");
  
      // Stub the navigation to ensure the form is submitted successfully
      cy.stub(window, "alert").as("alert");
  
      // Submit the form
      cy.get("button[type='submit']").click();
  
      // Ensure that the form submission redirects to the home page
      cy.url().should("eq", "http://localhost:3000/"); // Update this URL based on your base URL
    });
  });
  