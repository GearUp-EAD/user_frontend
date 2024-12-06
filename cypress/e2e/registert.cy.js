describe("Register Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/register"); 
    });
  
    it("should display validation errors when fields are empty", () => {
      // Click the submit button without entering any data
      cy.get('button[type="submit"]').click();
  
      // Assert that the appropriate validation messages are displayed
      cy.contains("Email is required.").should("be.visible");
      cy.contains("Password is required.").should("be.visible");
      cy.contains("Address is required.").should("be.visible");
  
      // Ensure "Passwords do not match" is not shown
      cy.contains("Passwords do not match.").should("not.exist");
    });
  
    it("should validate password length", () => {
      // Enter a password less than the required length and submit
      cy.get('input[name="password"]').type("123");
      cy.get('input[name="confirmPassword"]').type("123");
      cy.get('button[type="submit"]').click();
  
      // Assert the error message for password length
      cy.contains("Password must be at least 6 characters.").should("be.visible");
    });
  
    it("should show an error if passwords do not match", () => {
      // Enter mismatched passwords
      cy.get('input[name="password"]').type("password1");
      cy.get('input[name="confirmPassword"]').type("password2");
      cy.get('button[type="submit"]').click();
  
      // Assert the "Passwords do not match" error is displayed
      cy.contains("Passwords do not match.").should("be.visible");
    });
  
    
    it("should submit the form successfully when all fields are valid", () => {
      // Fill in all required fields
      cy.get('input[name="email"]').type("test@example.com");
      cy.get('input[name="password"]').type("password1");
      cy.get('input[name="confirmPassword"]').type("password1");
      cy.get('input[name="address"]').type("123 Test Address");
  
      // Submit the form
      cy.get('button[type="submit"]').click();
  
      // Assert the redirection URL or success behavior
      cy.url().should("eq", "http://localhost:3000/"); // Update to the correct URL
    });
  });
  