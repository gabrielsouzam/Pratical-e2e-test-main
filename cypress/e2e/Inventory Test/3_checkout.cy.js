import { users, url } from "./Mock";
import { doSignIn, calculateSubtotalPrice, calculateTotalPrice } from "./Utils";

describe("Inventory - Products", () => {
  beforeEach(() => {
    cy.visit(url);

    doSignIn(users.standard_user);
  });

  it("Should do checkout with the correct flow", () => {
    let productPrices = [];

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('be.visible').contains(2);
    cy.get('[data-test="shopping-cart-link"]').click();

    cy.get('[data-test="title"]').should('have.text', 'Your Cart');
    cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Backpack')
      .should('have.text', 'Sauce Labs Backpack');
    cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Bolt T-Shirt')
      .should('have.text', 'Sauce Labs Bolt T-Shirt');
    cy.get('[data-test="inventory-item"]').should('have.length', 2);
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="title"]').should('have.text', 'Checkout: Your Information');
    cy.get('[data-test="firstName"]').type('firstname')
    cy.get('[data-test="lastName"]').type('lastname')
    cy.get('[data-test="postalCode"]').type('12345-678')
    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="title"]').should('have.text', 'Checkout: Overview');
    cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Backpack')
      .should('have.text', 'Sauce Labs Backpack');
    cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Bolt T-Shirt')
      .should('have.text', 'Sauce Labs Bolt T-Shirt');
    cy.contains('[data-test="inventory-item-price"]', '$29.99').as('firstProductPrice');
    cy.contains('[data-test="inventory-item-price"]', '$15.99').as('secondProductPrice');
    cy.get('[data-test="inventory-item"]').should('have.length', 2);

    cy.get('[data-test="inventory-item-price"]').each((productPriceElement) => {
      cy.wrap(productPriceElement).invoke('text').then((productPriceText) => {
        productPrices.push(productPriceText);
      });
    }).then(() => {
      cy.get('[data-test="subtotal-label"]').invoke('text').then((subtotalText) => {
        const subtotalPrice = parseFloat(subtotalText.replace(/[^0-9.]/g, ''));

        cy.wrap(calculateSubtotalPrice(productPrices))
          .should('equal', subtotalPrice);
      });

      cy.get('[data-test="tax-label"]').invoke('text').then((taxLabelText) => {
        cy.get('[data-test="total-label"]').invoke('text').then((totalLabelText) => {
          const totalPrice = parseFloat(totalLabelText.replace(/[^0-9.]/g, ''));

          cy.wrap(calculateTotalPrice(productPrices, taxLabelText))
            .should('equal', totalPrice);
        });
      });
    });

    cy.get('[data-test="finish"]').click();

    cy.get('[data-test="title"]').should('have.text', 'Checkout: Complete!');
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
  });

  it("Should select some products, go to cart, and go back to continue shopping", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('be.visible').contains(3);
    cy.get('[data-test="shopping-cart-link"]').click();

    cy.get('[data-test="title"]').should('have.text', 'Your Cart');
    cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Backpack')
      .should('have.text', 'Sauce Labs Backpack');
    cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Bolt T-Shirt')
      .should('have.text', 'Sauce Labs Bolt T-Shirt');
    cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Fleece Jacket')
      .should('have.text', 'Sauce Labs Fleece Jacket');
    cy.get('[data-test="inventory-item"]').should('have.length', 3);
    cy.get('[data-test="continue-shopping"]').click();

    cy.get('[data-test="title"]').should('have.text', 'Products');
  });

  it("Should not continue checkout with empty delivery information", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('be.visible').contains(2);
    cy.get('[data-test="shopping-cart-link"]').click();

    cy.get('[data-test="title"]').should('have.text', 'Your Cart');
    cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Backpack')
      .should('have.text', 'Sauce Labs Backpack');
    cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Bolt T-Shirt')
      .should('have.text', 'Sauce Labs Bolt T-Shirt');
    cy.get('[data-test="inventory-item"]').should('have.length', 2);
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="title"]').should('have.text', 'Checkout: Your Information');
    cy.get('[data-test="continue"]').click();

    cy.get('.error-message-container').should('be.visible');
    cy.get('[data-test="error"]').should('include.text', 'Error: First Name is required');
  });

});