import fixture from '../fixtures/example.json';

describe('auth, drag and drop and modal tests', () => {
    before(() => {
        cy.visit('http://localhost:3000/react-burger');
    });

    it('checks if button "personal cabinet is loaded', () => {
        cy.contains('Личный кабинет');
    });

    it('goes to login page', () => {
        cy.get('span').contains('Личный кабинет').click();
        cy.contains('Вход');
    });

    it('tries to login', () => {
        cy.get('input').first().as('email');
        cy.get('input').last().as('password');
        cy.get('.input__icon-action').first().as('email_edit_button');
        cy.get('.input__icon-action').last().as('password_edit_button');

        cy.get('@email_edit_button').click();
        cy.get('@email').type('kotya@igcomment.com');

        cy.get('@password_edit_button').click();
        cy.get('@password').type('qazswx');

        cy.get('@email').should('have.value', 'kotya@igcomment.com');
        cy.get('@password').should('have.value', 'qazswx');
    });

    it('successful login', () => {
        cy.get('button').contains('Войти').click();
        cy.contains('Профиль');
        cy.get('span').contains('Конструктор').click();
        cy.contains('Соберите бургер');
    });

    it('opens modal with Ingredient', () => {
        cy.get('div').contains('Краторная булка N-200i').click();
        cy.get('#modal').contains('Детали ингредиента');
    });

    it('check if Ingredient details exist', () => {
        cy.get('#calories').contains('420');
        cy.get('#proteins').contains('80');
        cy.get('#fats').contains('24');
        cy.get('#carbs').contains('53');
    });

    it('close modal with Ingredient', () => {
        cy.get('#closeModalIcon').click();
        cy.get('#root').not('#modal');
    });

    it('Drag and Drop Ingredients to Burger Constructor', () => {
        cy.get('div').contains('Краторная булка N-200i').as('bun');
        cy.get('div').contains('Соус Spicy-X').as('ingredient');
        cy.get('div').get('#burgerConstructor').as('contructor_container');

        cy.get('@bun').trigger('dragstart');
        cy.get('@contructor_container').trigger('drop');

        cy.get('@ingredient').trigger('dragstart');
        cy.get('@contructor_container').trigger('drop');

        cy.get('@contructor_container').contains('Краторная булка N-200i');
        cy.get('@contructor_container').contains('Соус Spicy-X');
    });

    it('try to send a created order to server', () => {
        cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', { fixture: 'example.json' }).as('order');
        cy.get('button').contains('Оформить заказ').click();
        cy.wait('@order').then(res => expect(res.response.body.order.number).equal(fixture.order.number));
        cy.get('#modal').contains(`${fixture.order.number}`);
    });

    it('close modal with Order', () => {
        cy.get('#closeModalIcon').click();
        cy.get('#root').not('#modal');
    });


});