describe('Graphic', function () {
  beforeEach(function () {
    cy.getData();
  });

  it('should display the graphic component', function () {
    const graphicComponents = this.data.components.filter(component => component._component === 'graphic');
    const stripHtml = cy.helpers.stripHtml;
    graphicComponents.forEach(graphicComponent => {
      cy.visit(`/#/preview/${graphicComponent._id}`);

      cy.testContainsOrNotExists('.graphic__body', stripHtml(graphicComponent.body));
      cy.testContainsOrNotExists('.graphic__title', stripHtml(graphicComponent.displayTitle));
      if(graphicComponent._graphic.large) {
        cy.get('.graphic__image').should('have.attr', 'src', graphicComponent._graphic.large);
      } else if(graphicComponent._graphic.src) {
        cy.get('.graphic__image').should('have.attr', 'src', graphicComponent._graphic.src);
      };

      // Make sure the current component is tested before moving to the next one
      // Custom cypress tests are async so we need to wait for them to pass first
      cy.wait(1000);
    });
  });
});