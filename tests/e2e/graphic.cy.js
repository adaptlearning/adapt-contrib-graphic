describe('Graphic', function () {
  beforeEach(function () {
    cy.getData()
    cy.visit('/');
  });

  it('should display the graphic component', function () {
    const graphicComponents = this.data.components.filter((component) => component._component === 'graphic')
    graphicComponents.forEach((graphicComponent) => {
      let waited = false
      cy.visit(`/#/preview/${graphicComponent._id}`);
      const bodyWithoutHtml = graphicComponent.body.replace(/<[^>]*>/g, '');

      function waitOneSecond() {
        // return a promise that resolves after 1 second
        return new Cypress.Promise((resolve, reject) => {
          setTimeout(() => {
            // set waited to true
            waited = true
    
            // resolve with 'foo' string
            resolve()
          }, 1000)
        })
      }

      cy.wrap(null).then(() => {
        // return a promise to cy.then() that
        // is awaited until it resolves
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