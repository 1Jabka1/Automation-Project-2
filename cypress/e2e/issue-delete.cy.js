describe('Issue task deletion', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
        cy.get('[data-testid="modal:issue-details"]').should('be.visible')
      });
    });



    it('Test Case 1: Issue Deletion', () => {


        //Clicking on Trash button
        cy.get('[data-testid="icon:trash"]').click();

        //Checking confirmation window
        cy.get('[data-testid="modal:confirm"]').should('be.visible');
        cy.contains('Are you sure you want to delete this issue?').should('be.visible');
        cy.contains("Once you delete, it's gone for good.").should('be.visible');

        //Clicking deletion button    
        cy.contains('Delete issue').click();

        //Checking that Issue is no longer existing
        cy.contains('This is an issue of type: Task.').should('not.exist');
        
       });
    });



describe('Issue task deletion', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
        cy.get('[data-testid="modal:issue-details"]').should('be.visible')
        });
    });


    
    it.only('Test Case 2: Issue Deletion Cancellation', () => {

        //Clicking on Trash button
        cy.get('[data-testid="icon:trash"]').click();

        //Checking confirmation window
        cy.get('[data-testid="modal:confirm"]').should('be.visible');
        cy.contains('Are you sure you want to delete this issue?').should('be.visible');
        cy.contains("Once you delete, it's gone for good.").should('be.visible');

        //Clicking Cancel button  
        cy.contains('Cancel').click();

        //Checking confirmation window is gone
        cy.contains('Are you sure you want to delete this issue?').should('not.exist');
        cy.contains("Once you delete, it's gone for good.").should('not.exist');

        //Closing window window
        cy.get('[data-testid="icon:close"]').first().click();

        //Checking that Issue exist
        cy.contains('This is an issue of type: Task.').should('exist');
       });

});
