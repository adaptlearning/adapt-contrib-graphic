import Components from '../../src/course/en/components.json'
const graphicComponent = Components[4]

describe('Graphic', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('should display the graphic component', () => {
    cy.get('.menu-item').first().should('contain', 'Presentation Components').within(() => {
      cy.get('button').contains('View').click()
    });

    cy.get('.graphic').eq(1).within(() => {
      cy.get('.graphic__title').should('contain', graphicComponent.displayTitle)
      cy.get('.graphic__body').should('contain', 'Graphic')
      cy.get('.graphic__image').should('have.attr', 'src', graphicComponent._graphic.src)
    })
  });
});
