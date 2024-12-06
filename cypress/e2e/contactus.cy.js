describe('ContactUs Form Tests', () => {
    beforeEach(() => {
      
      cy.visit('http://localhost:3000/contact-us'); 
    });
  
    it('should load the ContactUs form', () => {
      cy.get('form').should('exist');
      cy.get('input[name="name"]').should('exist');
      cy.get('input[name="email"]').should('exist');
      cy.get('textarea[name="message"]').should('exist');
      cy.get('button[type="submit"]').should('exist');
    });
  
    it('should display validation errors for empty fields', () => {
      cy.get('button[type="submit"]').click();
  
      cy.get('p').contains('Name is required.').should('be.visible');
      cy.get('p').contains('Valid email is required.').should('be.visible');
    });
  
    it('should display an error for invalid email format', () => {
      cy.get('input[name="name"]').type('John Doe');
      cy.get('input[name="email"]').type('invalid-email');
      cy.get('textarea[name="message"]').type('Test message');
  
      cy.get('button[type="submit"]').click();
  
      
    });
  
    it('should successfully submit the form with valid inputs', () => {
      cy.intercept('POST', 'https://api.emailjs.com/api/v1.0/email/send', {
        statusCode: 200,
        body: { success: true },
      }).as('emailSend');
  
      cy.get('input[name="name"]').type('John Doe');
      cy.get('input[name="email"]').type('john.doe@example.com');
      cy.get('textarea[name="message"]').type('This is a test message.');
  
      cy.get('button[type="submit"]').click();
  
      // Wait for the email service API to respond
      cy.wait('@emailSend');
  
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Message sent successfully!');
      });
  
      cy.get('input[name="name"]').should('have.value', '');
      cy.get('input[name="email"]').should('have.value', '');
      cy.get('textarea[name="message"]').should('have.value', '');
    });
  
    it('should display an alert for failed form submission', () => {
      cy.intercept('POST', 'https://api.emailjs.com/api/v1.0/email/send', {
        statusCode: 500,
      }).as('emailSendFail');
  
      cy.get('input[name="name"]').type('John Doe');
      cy.get('input[name="email"]').type('john.doe@example.com');
      cy.get('textarea[name="message"]').type('This is a test message.');
  
      cy.get('button[type="submit"]').click();
  
      cy.wait('@emailSendFail');
  
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Message failed to send. Please try again.');
      });
    });
  });
  