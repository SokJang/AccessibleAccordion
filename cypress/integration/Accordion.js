describe("Accordion", () => {
  before(() => {
    cy.visit("/");
  });
  // describe - adds one more level to the hierarchy (it is optional)
  describe("Space or Enter", () => {
    // xit - a test which will be skipped, as soon as we will implement actual test we will change it to it
    xit("When focus is on the accordion header of a collapsed section, expands the section", () => {});
  });

  describe("Tab", () => {
    xit("Moves focus to the next focusable element.", () => {});
    xit("All focusable elements in the accordion are included in the page Tab sequence.", () => {});
  });
});
