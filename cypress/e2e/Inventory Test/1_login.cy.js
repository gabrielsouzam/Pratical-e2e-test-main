import { users, url } from "./Mock";

describe('Inventory - Login', () => {
  beforeEach(() => {
    cy.visit(url);
  });

  it('Should login with valid credentials', () => {
    cy.get('[data-test="username"]').type(users.standard_user.username);
    cy.get('[data-test="password"]').type(users.standard_user.password);
    cy.get('[data-test="login-button"]').click();

    cy.contains('Products');
  });

  it('Should login with valid credentials and do logout', () => {
    cy.get('[data-test="username"]').type(users.standard_user.username);
    cy.get('[data-test="password"]').type(users.standard_user.password);
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="title"]').should('have.text', 'Products');
    cy.get("#react-burger-menu-btn").click();
    cy.get('.bm-menu').should('be.visible');

    cy.get('[data-test="logout-sidebar-link"]').click();

    cy.get('.login_wrapper-inner').should('be.visible')
    cy.get('[data-test="login-button"]').should('be.visible');
  });


  it('Should not login with invalid credentials', () => {
    cy.get('[data-test="username"]').type('invalid_username');
    cy.get('[data-test="password"]').type('invalidpassoword');
    cy.get('[data-test="login-button"]').click();

    cy.get('.error-message-container').should('be.visible')
    cy.get('[data-test="error"]')
      .should('include.text', 'Epic sadface: Username and password do not match any user in this service');

  });

  it('Should not allow "locked_out_user" do sign in', () => {
    cy.get('[data-test="username"]').type(users.locked_out_user.username);
    cy.get('[data-test="password"]').type(users.locked_out_user.password);
    cy.get('[data-test="login-button"]').click();

    cy.get('.error-message-container').should('be.visible')
    cy.get('[data-test="error"]').should('include.text', 'Epic sadface: Sorry, this user has been locked out.');
  });

  it('Should login with "performance_glitch_user" and wait the products page loads', () => {
    cy.get('[data-test="username"]').type(users.performance_glitch_user.username);
    cy.get('[data-test="password"]').type(users.performance_glitch_user.password);
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="title"]', { timeout: 7000 }).should('have.text', 'Products');
  });
})