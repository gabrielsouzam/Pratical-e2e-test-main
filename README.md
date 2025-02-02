## Instalação do Projeto
> Requirements:
> - Node >= 18
> - NPM >= 10

 #### Execute
```
npm install
```

#### Rodando os testes
``` 
npm run e2e:chrome
```

#### Abrindo o Cypress
``` 
npm run cy:open
```

# Objetivo do teste
1. O participante deverá planejar e criar os fluxos de testes descritos nos `it.skip()`.
   1. Não será cobrada uma maneira "certa" de se fazer o teste.
   2. O participante não é obrigado a completar todos os testes para poder enviar o desafio.
   3. O entendimento do caso de teste poderá ser diferente do exigido, caso isso aconteça, a avaliação será feita pelo teste que foi criado a partir da interpretação do candidato.
2. Todos os testes deverão ser executados na aplicação de testes [Sauce Demo](https://www.saucedemo.com/).
3. O participante terá que cobrir ao máximo os detalhes dos casos de testes solicitados.
   1. Checar se todos os elementos da página foram corretamente modificados depois de uma operação _X_.
   2. Checar se a mensagem de _ERROR_ ou _SUCCESS_ contém a informação correta.
4. O participante está livre pra tentar checar os casos além do _Happy Flows_, como os _Bad flows_ ou os _Cancel Flows_, ou flows com diferentes users.
   1. Não será cobrado testes com outros navegadores (ou sistemas operacionais diferentes), testes com zoom in/zoom out, testes com diferentes _ViewPorts_, e testes com _Clicks_ simultâneos.
   2. Os flows extras deverão ser adicionados em um arquivo de teste separados dos demais, com o nome `4_extras.cy.js`.
5. Ao terminar todos os testes, o participante deverá criar um repositório no [github](https://github.com/) e compartilhar com o email `max@heavyconnect.com` com o Assunto `Pratical Test: [NOME_DO_CANDIDATO]`. 