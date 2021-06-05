describe('Ingresos Test', () => {
    // Limpio la db antes de cada test
    beforeEach(() => {
        cy.task('seed');
    });

    it('Deberia cargar el formulario al editar un ingreso', () => {
        cy.visit('/income');

        cy.get('[data-testid=movement]')
            .find('button')
            .contains('editar')
            .click();

        cy.get('input[name=id]').should('have.value', '3');
        cy.get('input[name=category]').should('have.value', 'Sueldo');
        cy.get('input[name=amount]').should('have.value', '50000');
    });

    it('Deberia poder crear un nuevo ingreso', () => {
        cy.visit('/income');

        cy.get('input[name=date]').type('2021-04-26');
        cy.get('input[name=category]').type('Bono');
        cy.get('input[name=amount]').type('100000');
        cy.contains('Guardar').click();
        cy.reload();

        cy.get('[data-testid=movement]').should('have.length', 5);
    });



    it('Deberia aparecer alerta de guardado', () => {
        cy.visit('/income');
        cy.get('input[name=date]').type('2021-05-30');
        cy.get('input[name=category]').type('Extra');
        cy.get('input[name=amount]').type('6000');
        cy.contains('Guardar').click();
        cy.on('window:alert', (str) => {
          expect(str).to.equal('Se ha dado de alta el movimiento');

        });
      });
});
