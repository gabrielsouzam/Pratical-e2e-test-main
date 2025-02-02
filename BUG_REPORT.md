# Bug Report 

Este arquivo contém uma lista de bugs identificados para a aplicação SauceDemo.

## Lista de Bugs Encontrados

### 1️. **Reset da aplicação não restaura totalmente o estado inicial**
- **Localização do teste:**  [`cypress/e2e/Inventory Test/4_extras.cy.js`](cypress/e2e/Inventory%20Test/4_extras.cy.js) 
- **Descrição:** Após resetar a aplicação, o carrinho é esvaziado, mas os botões "Remove" dos itens adicionados não voltam para "Add to cart".
- **Reprodução:**
  1. Adicione itens ao carrinho:
     - Clique em "Add to cart" no item "Sauce Labs Backpack"
     - Clique em "Add to cart" no item "Sauce Labs Bolt T-Shirt"
  2. Confirme que o ícone do carrinho exibe a quantidade correta (2 itens).
  3. Abra o menu lateral e clique em "Reset App State".
  4. Verifique o estado da aplicação.
- **Comportamento Esperado:** Após o reset, o carrinho deve estar vazio e os botões dos produtos devem voltar para "Add to cart".

### 2️. **Checkout permitido com carrinho vazio**
- **Localização do teste:**  [`cypress/e2e/Inventory Test/4_extras.cy.js`](cypress/e2e/Inventory%20Test/4_extras.cy.js) 
- **Descrição:** O botão de checkout não está desabilitado e a aplicação não exibe uma mensagem informando que o carrinho está vazio.
- **Reprodução:**
  1. Acesse o carrinho de compras sem adicionar itens.
  2. Verifique o estado do botão de checkout.
  3. Verifique se há mensagem informando que o carrinho está vazio.
- **Comportamento Esperado:** O botão de checkout deve estar desabilitado e uma mensagem clara deve ser exibida informando que o carrinho está vazio.

## Possíveis Correções

- **Bug 1:** Após resetar a aplicação, garantir que os botões "Remove" dos produtos retornem ao estado "Add to cart".
- **Bug 2:** Garantir que o botão de checkout esteja desabilitado quando o carrinho estiver vazio e que uma mensagem informativa seja exibida.


