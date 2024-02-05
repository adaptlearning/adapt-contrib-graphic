describe('Graphic', function () {
  beforeEach(function () {
    cy.getData()
    cy.visit('/');
  });

  it('should display the graphic component', function () {
    const graphicComponents = this.data.components.filter((component) => component._component === 'graphic')
    graphicComponents.forEach((graphicComponent) => {
      cy.visit(`/#/preview/${graphicComponent._id}`);
      const bodyWithoutHtml = graphicComponent.body.replace(/<[^>]*>/g, '');
      
      // Make sure the current component is tested before moving to the next one
      // Custom cypress tests are async so we need to wait for them to pass first
      let waited = false
      function waitOneSecond() {
        return new Cypress.Promise((resolve, reject) => {
          setTimeout(() => {
            waited = true
    
            resolve()
          }, 1000)
        })
      }

      cy.wrap(null).then(() => {
        return waitOneSecond().then(() => {
          cy.testContainsOrNotExists('.graphic__title', graphicComponent.displayTitle)
          cy.testContainsOrNotExists('.graphic__body', bodyWithoutHtml)
          if(graphicComponent._graphic.large) {
            cy.get('.graphic__image').should('have.attr', 'src', graphicComponent._graphic.large)
          } else if(graphicComponent._graphic.src) {
            cy.get('.graphic__image').should('have.attr', 'src', graphicComponent._graphic.src)
          }
          expect(waited).to.be.true
        })
      })
    });
  });
});