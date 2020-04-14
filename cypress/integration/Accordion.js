describe("Accordion", () => {
  before(() => {
    cy.visit("/");
  });

  describe("Space", () => {
    it("When focus is on the accordion header of a collapsed section, expands the section", () => {
      // accordion is collapsed
      cy.get("body")
        .find("[role=region]")
        .first()
        .should("have.attr", "hidden");

      // find the button to interact with accordion
      cy.get("body").find("[role=button]").first().focus();

      // press space key to interact with accordion
      cy.focused().type(" ");

      // check if accordion is expanded
      cy.get("body")
        .find("[role=region]")
        .first()
        .should("not.have.attr", "hidden");
    });

    it("When focus is on the accordion header of a expanded section, collapse the section", () => {
      cy.get("body")
        .find("[role=region]")
        .first()
        .should("not.have.attr", "hidden");

      cy.get("body").find("[role=button]").first().focus();

      cy.focused().type(" ");

      cy.get("body")
        .find("[role=region]")
        .first()
        .should("have.attr", "hidden");
    });
  });

  describe("Tab", () => {
    it("Moves focus to the next focusable element.", () => {
      cy.get("body").tab();
      cy.focused().contains("section 1");
    });
    it("All focusable elements in the accordion are included in the page Tab sequence.", () => {
      cy.focused().tab();
      cy.focused().contains("section 2");
      cy.focused().tab();
      cy.focused().contains("Test link Alice");
    });
  });

  describe("Mouse", () => {
    it("When clicks on the accordion header of a expanded section, collapse the section", () => {
      cy.get("body")
        .find("[role=region]")
        .last()
        .should("not.have.attr", "hidden");

      cy.get("body").find("[role=button]").last().click();

      cy.get("body").find("[role=region]").last().should("have.attr", "hidden");
    });
  });

  describe("Down Arrow", () => {
    it("When focus is on an accordion header, moves focus to the next accordion header", () => {
      cy.contains("section 1").focus();
      cy.focused().type("{downarrow}");
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(100); // we need to wait to make sure React has enough time to switch focus
      cy.focused().contains("section 2");
    });
  });

  describe("Up Arrow", () => {
    it("When focus is on an accordion header, moves focus to the previous accordion header", () => {
      cy.contains("section 2").focus();
      cy.focused().type("{uparrow}");
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(100); // we need to wait to make sure React has enough time to switch focus
      cy.focused().contains("section 1");
    });
  });
});
