import { users, url } from './Mock';
import { doSignIn } from './Utils';

describe('Inventory - Products', () => {
  beforeEach(() => {
    cy.visit(url);

    doSignIn(users.standard_user);
  });

  it('Should see the product details and add to cart', () => {
    cy.get('[data-test="inventory-item-sauce-labs-backpack-img"]').click()

    cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Backpack')
      .should('have.text', 'Sauce Labs Backpack');

    cy.get('[data-test="add-to-cart"]').click();

    cy.get('[data-test="shopping-cart-badge"]')
      .should('be.visible')
      .contains(1);
  });

  it('Should sort products by price properly (high to low)', () => {
    let itemsPrices = [];

    cy.get('[data-test="product-sort-container"]').select('hilo')
    cy.get('[data-test="product-sort-container"]').should('have.value', 'hilo');

    cy.get('[data-test="inventory-item-price"]')
      .each((itemPrice) => {
        cy.wrap(itemPrice).invoke('text').then((text) => {
          const price = parseFloat(text.replace('$', ''));
          itemsPrices.push(price);
        });
      })
      .then(() => {
        const sortedPrices = itemsPrices.slice().sort((firstNumber, secondNumber) => secondNumber - firstNumber);
        expect(itemsPrices).to.deep.equal(sortedPrices);
      });
  });

  it('Should sort products by price properly (low to high)', () => {
    let itemsPrices = [];

    cy.get('[data-test="product-sort-container"]').select('lohi');
    cy.get('[data-test="product-sort-container"]').should('have.value', 'lohi');

    cy.get('[data-test="inventory-item-price"]')
      .each((itemPrice) => {
        cy.wrap(itemPrice).invoke('text').then((text) => {
          const price = parseFloat(text.replace('$', ''));
          itemsPrices.push(price);
        });
      })
      .then(() => {
        const sortedPrices = itemsPrices.slice().sort((firstNumber, secondNumber) => firstNumber - secondNumber);
        expect(itemsPrices).to.deep.equal(sortedPrices);
      });
  });
});
