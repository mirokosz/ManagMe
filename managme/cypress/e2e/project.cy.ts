/// <reference types="cypress" />

describe('Zarządzanie projektami, historyjkami i zadaniami', () => {

  beforeEach(() => {
    //odwiedź stronę logowania
    cy.visit('/login');

    //zaloguj się jako admin
    cy.get('input[placeholder="Login"]').type('admin');
    cy.get('input[placeholder="Hasło"]').type('admin123');
    cy.get('button').contains('Zaloguj się').click();

    //sprawdź, że przeszliśmy na stronę główną
    cy.url().should('include', '/');
  });

  it('Pełny cykl: tworzenie, edycja, zmiana statusu i usuwanie', () => {
    
    //PROJEKTY
    
    //dodaj nowy projekt
    cy.get('input[placeholder="Nazwa projektu"]').type('Projekt testowy');
    cy.get('textarea[placeholder="Opis projektu"]').type('Opis projektu testowego');
    cy.get('button').contains('Zapisz').click();
    cy.contains('Projekt testowy').should('exist');

    //edytuj projekt
    cy.contains('li.list-group-item', 'Projekt testowy')
      .within(() => {
        cy.contains('Edytuj').click();
      });
    cy.get('input[placeholder="Nazwa projektu"]').clear().type('Projekt edytowany');
    cy.get('textarea[placeholder="Opis projektu"]').clear().type('Opis edytowany');
    cy.get('button').contains('Zapisz').click();
    cy.contains('Projekt edytowany').should('exist');

    //wybierz projekt jako aktywny
    cy.contains('label', 'Wybierz aktywny projekt:')
      .parent()
      .find('select')
      .should('contain', 'Projekt edytowany')
      .select('Projekt edytowany');
    cy.reload();

    
    //HISTORYJKI
    

    //dodaj historyjkę
    cy.contains('form', 'Dodaj historyjkę')
      .within(() => {
        cy.get('input[placeholder="Nazwa"]').type('Historyjka testowa');
        cy.get('textarea[placeholder="Opis"]').type('Opis historyjki');
        cy.get('select').eq(0).select('Wysoki');
        cy.get('select').eq(1).select('Do zrobienia');
        cy.contains('Zapisz').click();
      });
    cy.contains('Historyjka testowa', { timeout: 6000 }).should('exist');

    //edytuj historyjkę
    cy.contains('.card', 'Historyjka testowa')
      .contains('Edytuj').click();
    cy.contains('Edytuj historyjkę').parent().within(() => {
      cy.get('input[placeholder="Nazwa"]').clear().type('Historyjka edytowana');
      cy.get('textarea[placeholder="Opis"]').clear().type('Zmieniony opis');
      cy.get('select').eq(0).select('Średni');
      cy.get('select').eq(1).select('W trakcie');
      cy.contains('Zapisz').click();
    });
    cy.contains('Historyjka edytowana', { timeout: 6000 }).should('exist');
    cy.contains('Zmieniony opis').should('exist');

    
    //ZADANIA
    

    //przejdź do szczegółów historyjki
    cy.contains('.card', 'Historyjka edytowana')
      .contains('Zadania').click();
    cy.url().should('include', '/historyjki/');
    cy.contains('Szczegóły Historyjki').should('exist');

    //dodaj zadanie
    cy.intercept('POST', '**/api/tasks').as('createTask');
    cy.contains('form', 'Dodaj zadanie').within(() => {
      cy.get('input[placeholder="Nazwa"]').type('Zadanie testowe');
      cy.get('textarea[placeholder="Opis"]').type('Opis zadania');
      cy.get('input[type="number"]').clear().type('2');
      cy.get('select').select('Średni');
      cy.get('button[type="submit"]').click();
    });
    cy.wait('@createTask').its('response.statusCode').should('eq', 200);
    cy.get('.task-card', { timeout: 8000 })
      .contains('Zadanie testowe').should('exist');
    cy.get('.task-card').contains('Opis zadania').should('exist');

    //edytuj zadanie
    cy.contains('.task-card', 'Zadanie testowe')
      .contains('Edytuj').click();
    cy.intercept('PUT', '**/api/tasks/*').as('updateTask');
    cy.get('input[placeholder="Nazwa"]').clear().type('Zadanie edytowane');
    cy.get('textarea[placeholder="Opis"]').clear().type('Opis zmieniony');
    cy.get('input[type="number"]').clear().type('5');
    cy.get('select').select('Wysoki');
    cy.contains('Zapisz zmiany').click();
    cy.wait('@updateTask').its('response.statusCode').should('eq', 200);
    cy.contains('.task-card', 'Zadanie edytowane', { timeout: 8000 }).should('exist');
    cy.contains('.task-card', 'Opis zmieniony').should('exist');

    //oznacz jako zrobione
    cy.contains('.task-card', 'Zadanie edytowane')
      .contains('Szczegóły').click();
    cy.contains('Szczegóły zadania').should('exist');
    cy.contains('p', 'Stan:').should('contain.text', 'todo');
    cy.contains('Oznacz jako zrobione').click();
    cy.get('.column')
      .contains('Zrobione').parent().within(() => {
        cy.contains('Zadanie edytowane').should('exist');
      });

    
    //USUWANIE
    

    //usuń zadanie
    cy.contains('.task-card', 'Zadanie edytowane')
      .contains('Szczegóły').click();
    cy.contains('Usuń').click();
    cy.contains('.task-card', 'Zadanie edytowane').should('not.exist');

    //wróć do projektów
    cy.contains('Projekty').click();

    //usuń historyjkę
    cy.contains('.card', 'Historyjka edytowana')
      .contains('Usuń').click();
    cy.contains('.card', 'Historyjka edytowana').should('not.exist');

    //usuń projekt
    cy.contains('.card', 'Projekt edytowany')
      .contains('Usuń').click();
    cy.contains('.card', 'Projekt edytowany').should('not.exist');
  });
});
