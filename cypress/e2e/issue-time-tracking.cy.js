describe('Issue Time Tracking', () => {
    //Creating new ticket
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board?modal-issue-create=true');
            cy.get('[data-testid="modal:issue-create"]').within(() => {
                    cy.get('[data-testid="select:type"]').click();
                    cy.get('[data-testid="select-option:Story"]').click();
                    cy.get(".ql-editor").type('Time Tracker');
                    cy.get('input[name="title"]').type('Time Tracker Issue');
                    cy.get('[data-testid="select:userIds"]').click();
                    cy.get('[data-testid="select-option:Lord Gaben"]').click();
                    cy.get('button[type="submit"]').click();
                });
                cy.contains('Issue has been successfully created.').should('be.visible');
                cy.reload();
                cy.get('[data-testid="board-list:backlog').should('be.visible').contains('Time Tracker Issue').click();
            
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    const TimeInputField =  'input[placeholder="Number"]';
    
    const estimatedTimeValue = '5';
    const EditedEstimatedTimeValue = '7';  

    it('Add, update and remove Time Tracking estimation', () => {
        getIssueDetailsModal().within(() => {
            cy.get(TimeInputField).type(estimatedTimeValue);
            cy.get(TimeInputField).should('have.value', estimatedTimeValue);

            cy.get(TimeInputField).clear().type(EditedEstimatedTimeValue)
            cy.get(TimeInputField).should('have.value', EditedEstimatedTimeValue);

            cy.get(TimeInputField).click().clear()
        });  
    });

    const TimeTracking = '[data-testid="modal:tracking"]';
    const TimeTrackerButton = '[data-testid="icon:stopwatch"]';

    const spentTimeField = 'Time spent (hours)';
    const remainingTimeField = 'Time remaining (hours)';

    const SpentTimeTrackingValue = '4';
    const RemainTimeTrackingValue = '11';  

    const EditedSpentTimeTrackingValue = '8';
    const EditedRemainTimeTrackingValue = '3';  
    
    it('Should add and remove logged time', () => {
    
        cy.get(TimeTrackerButton).click();
        cy.get(TimeTracking).should('be.visible');
        cy.contains('div', spentTimeField).next('div').find('input').type(SpentTimeTrackingValue);
        cy.contains('div', remainingTimeField).next('div').find('input').type(RemainTimeTrackingValue)
        cy.contains('button', 'Done').click();

        cy.get(TimeTrackerButton).click();
        cy.get(TimeTracking).should('be.visible');
        cy.contains('div', spentTimeField).next('div').find('input').clear().type(EditedSpentTimeTrackingValue);
        cy.contains('div', remainingTimeField).next('div').find('input').clear().type(EditedRemainTimeTrackingValue)
        cy.contains('button', 'Done').click();
    
        cy.get(TimeTrackerButton).click()
        cy.get(TimeTracking).should('be.visible');
        cy.contains('div', spentTimeField).next('div').find('input').clear('');
        cy.contains('div', remainingTimeField).next('div').find('input').clear('');
        cy.contains('button', 'Done').click();
    });
});