describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('CoolSchrank')
    cy.contains('CoolSchrank anlegen')
  })
})

describe('Create Fridge', () => {
  it('should show Button to add Items', () => {
    cy.intercept('POST', '**/fridge', { fixture: 'fridge-created-response.json' });
    cy.get('[cy-create-fridge]').click();
    cy.get('[cy-btn-add-item]').its('length').should('eq', 1);
  });
  it('reload should list inventory', () => {
    cy.intercept('GET', '**/fridge/aeb7821c-7e62-4912-8f50-ce53646aab20', {
      fixture: 'fridge-inventory-response.json'
    });
    cy.get('[cy-btn-reload-items]').click();
    cy.get('[cy-fridge-item]').its('length').should('be.gt', 0);
  })

  it('should show Button CoolSchrank entfernen', () => {
    cy.get('[cy-btn-remove-fridge]').its('length').should('eq', 1);
  });
});

describe('Reload Items of existing Fridge', () => {
  it('should list inventory', () => {
    cy.intercept('GET', '**/fridge/aeb7821c-7e62-4912-8f50-ce53646aab20', {
      fixture: 'fridge-inventory-response.json'
    });
    cy.get('[cy-btn-reload-items]').click();
    cy.get('[cy-fridge-item]').its('length').should('be.gt', 0);
  })
});

describe('Press Button add item', () => {
  it('should show ItemCreateForm', () => {
    cy.get('[cy-btn-add-item]').click();
    cy.contains('Neuen Inhalt anlegen');
  });
  it('should fill ItemCreateForm', () => {
    cy.get('[cy-sheet-create-new] input[name=name]').type('Apfelsaft');
    cy.get('[cy-sheet-create-new] input[name=actualDiff]').type('1');
    cy.get('[cy-sheet-create-new] input[name=target]').type('2');
  });
  it('sending should create new item', () => {
    const numItemsBefore = cy.$$('[cy-fridge-item]').length;
    const numItemsAfter = eval("numItemsBefore + 1");
    cy.intercept('POST', '**/item', { fixture: 'item-response-apfelsaft.json'});
    cy.intercept('GET', '**/fridge', { fixture: 'fridge-inventory-with-apfelsaft.json' });
    cy.get('[cy-sheet-create-new] [cy-btn-submit-item]').click();
    cy.wait(1000);
    cy.get('[cy-fridge-item').its('length').should('eq', numItemsAfter);
  })
})
