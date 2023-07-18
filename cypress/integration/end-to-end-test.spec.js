// <reference types="cypress" />

describe("Bad User Credentials", () => {
  it("Visits NodeJS Starter", () => {
    cy.visit("/");
    cy.contains("Starter App");
    cy.get("input[id='username']").type("Hello World");
    cy.get("input[id='password']").type("ABC123");
    cy.get("button[id='submit']").click();
    cy.contains("incorrect details");
  });
});

describe("Admin Login", () => {
  it("Visits NodeJS Starter", () => {
    cy.visit("/");
    cy.contains("Starter App");
    cy.get("input[id='username']").type("admin");
    cy.get("input[id='password']").type("123");
    cy.get("button[id='submit']").click();
    cy.contains("Column1");
    cy.contains("Column2");
  });
});

describe("Create Record", () => {
  it("Visits NodeJS Starter", () => {
    cy.visit("/");
    cy.contains("Starter App");
    cy.get("input[id='username']").type("admin");
    cy.get("input[id='password']").type("123");
    cy.get("button[id='submit']").click();
    cy.get("i[class='fa-solid fa-square-plus form']").click();
    cy.wait(500);
    cy.get("label[for=col1]").contains("Column 1");
    cy.get("label[for=col2]").contains("Column 2");
    cy.get("input[id='column1']").type("E2E TEST");
    cy.get("input[id='column2']").type("E2E TEST");
    cy.get("button[id='create']").click();
    cy.get("i[class='fa-solid fa-table dashboard']").click();
    cy.contains("E2E TEST");
  });
});
