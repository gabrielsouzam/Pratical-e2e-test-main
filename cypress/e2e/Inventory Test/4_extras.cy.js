import { users, url } from "./Mock";
import { doSignIn, doCheckOut } from "./Utils";

describe('Inventory - Login - Extras', () => {
  beforeEach(() => {
    cy.visit(url);
  });

  it('Should not login with empty credentials', () => {
    cy.get('[data-test="login-button"]').click();

    cy.get('.error-message-container').should('be.visible')
    cy.get('[data-test="error"]').should('include.text', 'Epic sadface: Username is required');
  });

  it('Should not login with empty password', () => {
    cy.get('[data-test="username"]').type(users.standard_user.username);
    cy.get('[data-test="login-button"]').click();

    cy.get('.error-message-container').should('be.visible')
    cy.get('[data-test="error"]').should('include.text', 'Epic sadface: Password is required');
  });
})


describe('Inventory - Produtcs - Extras', () => {
  beforeEach(() => {
    cy.visit(url);

    doSignIn(users.standard_user);
  });

  it('Should remove a product from the cart', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('be.visible').contains(1);

    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
  });

  it('Should sort products by name properly (Z to A)', () => {
    let itemsNames = [];

    cy.get('[data-test="product-sort-container"]').select('za')
    cy.get('[data-test="product-sort-container"]').should('have.value', 'za');

    cy.get('[data-test="inventory-item-name"]')
      .each((itemName) => {
        cy.wrap(itemName).invoke('text').then((text) => {
          itemsNames.push(text.trim());
        });
      })
      .then(() => {
        const sortedNames = itemsNames.slice().sort().reverse();
        expect(itemsNames).to.deep.equal(sortedNames);
      });
  });

  it('Should reset the application to its initial state', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('be.visible').contains(2);

    cy.get("#react-burger-menu-btn").click();
    cy.get('.bm-menu').should('be.visible');
    cy.get('[data-test="reset-sidebar-link"]').click();

    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    cy.get('[data-test="remove-sauce-labs-backpack"]').should('have.length', 0);
    cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').should('have.length', 0);
  });

});


describe('Inventory - Products/Checkout - Extras', () => {
  beforeEach(() => {
    cy.visit(url);

    doSignIn(users.standard_user);
  });

  it('Should sort products by name properly (Z to A) and do checkout', () => {
    let itemsNames = [];

    cy.get('[data-test="product-sort-container"]').select('za')
    cy.get('[data-test="product-sort-container"]').should('have.value', 'za');

    cy.get('[data-test="inventory-item-name"]')
      .each((itemName) => {
        cy.wrap(itemName).invoke('text').then((text) => {
          itemsNames.push(text.trim());
        });
      })
      .then(() => {
        const sortedNames = itemsNames.slice().sort().reverse();
        expect(itemsNames).to.deep.equal(sortedNames);
      });

    doCheckOut();

  });

  it('Should sort products by price properly (high to low) and do checkout', () => {
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

    doCheckOut();

  });

  it('Should sort products by price properly (low to high) and do checkout', () => {
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

    doCheckOut();
  });
});

describe('Inventory - Checkout - Extras', () => {

  beforeEach(() => {
    cy.visit(url);

    doSignIn(users.standard_user);
  });

  it('Should not do checkout with expired session', () => {
    cy.clock();

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('be.visible').contains(2);

    const TEN_MINUTES_IN_MILLISECONDS = 10 * 60 * 1000 // 10 minutos

    cy.tick(TEN_MINUTES_IN_MILLISECONDS);

    cy.clearCookies();

    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('.error-message-container').should('be.visible');
    cy.get('[data-test="error"]').should('include.text', "You can only access '/cart.html' when you are logged in.");
  });

  it('Should not do checkout with empty cart list', () => {
    cy.get('[data-test="shopping-cart-link"]').click();
    
    cy.get('[data-test="checkout"]').should('be.disabled');
    cy.contains('Your cart is empty.');
  });

})