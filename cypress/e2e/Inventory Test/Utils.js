export function doSignIn(user){
    cy.get('[data-test="username"]').type(user.username);
    cy.get('[data-test="password"]').type(user.password);
    cy.get('[data-test="login-button"]').click();

    cy.contains('Products');
}

export function doCheckOut() {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('be.visible').contains(2);
    cy.get('[data-test="shopping-cart-link"]').click();

    cy.get('[data-test="title"]').should('have.text', 'Your Cart');
    cy.get('[data-test="inventory-item"]').should('have.length', 2);
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="title"]').should('have.text', 'Checkout: Your Information');
    cy.get('[data-test="firstName"]').type('firstname')
    cy.get('[data-test="lastName"]').type('lastname')
    cy.get('[data-test="postalCode"]').type('12345-678')
    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="title"]').should('have.text', 'Checkout: Overview');
    cy.get('[data-test="inventory-item"]').should('have.length', 2);

    cy.get('[data-test="finish"]').click();

    cy.get('[data-test="title"]').should('have.text', 'Checkout: Complete!');
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
}