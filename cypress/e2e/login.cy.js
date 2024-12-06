describe("Login Component", () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit("http://localhost:3000/login");
  });

  it("should render the login form correctly", () => {
    // Check if the email input, password input, and submit button are visible
    cy.get("input[name='email']").should("be.visible");
    cy.get("input[name='password']").should("be.visible");
    cy.get("button[type='submit']").should("be.visible");
  });

  it("should display an error for empty email and password", () => {
    // Click the submit button without entering any input
    cy.get("button[type='submit']").click();

    // Check for error messages
    cy.contains("Email is required.").should("be.visible");
    cy.contains("Password is required.").should("be.visible");
  });

  it("should display an error for invalid email format", () => {
    // Enter an invalid email and valid password
    cy.get("input[name='email']").type("invalid-email");
    cy.get("input[name='password']").type("123456");

    // Submit the form
    cy.get("button[type='submit']").click();

    // Check for email validation error
    cy.contains("Email is invalid.").should("be.visible");
  });

  it("should display an error for short password", () => {
    // Enter a valid email and short password
    cy.get("input[name='email']").type("user@example.com");
    cy.get("input[name='password']").type("12345");

    // Submit the form
    cy.get("button[type='submit']").click();

    // Check for password validation error
    cy.contains("Password must be at least 6 characters.").should("be.visible");
  });

  it("should allow form submission with valid inputs", () => {
    // Enter valid email and password
    cy.get("input[name='email']").type("user@example.com");
    cy.get("input[name='password']").type("123456");

    // Mock navigation after successful submission
    cy.get("button[type='submit']").click();

    // Check if the navigation or success message is displayed
    // Adjust according to your implementation
    cy.url().should("eq", Cypress.config().baseUrl + "/"); // Replace with the actual path
  });

  it("should toggle password visibility", () => {
    // Enter a password
    cy.get("input[name='password']").type("mypassword");

    // Check if the password is hidden by default
    cy.get("input[name='password']").should("have.attr", "type", "password");

    // Click the toggle button
    cy.get("span.cursor-pointer").click();

    // Check if the password is visible
    cy.get("input[name='password']").should("have.attr", "type", "text");

    // Click the toggle button again
    cy.get("span.cursor-pointer").click();

    // Check if the password is hidden again
    cy.get("input[name='password']").should("have.attr", "type", "password");
  });
});
