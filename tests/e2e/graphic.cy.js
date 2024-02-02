describe('Graphic', function () {
  beforeEach(function () {
    cy.getData()
    cy.visit('/');
  });

  it('should display the graphic component', function () {
    const graphicComponents = this.data.components.filter((component) => component._component === 'graphic')

    this.data.contentObjects.filter((page) => page._classes !== 'assessment').forEach((page) => {
      cy.visit(`/#/id/${page._id}`);
      const articlesOnPage = this.data.articles.filter((article) => article._parentId === page._id).map(article => article._id)
      const blocksOnPage = this.data.blocks.filter((block) => articlesOnPage.includes(block._parentId)).map(blocks => blocks._id)
      const componentsOnPage = graphicComponents.filter((component) => blocksOnPage.includes(component._parentId))

      componentsOnPage.forEach(({ body, displayTitle, _graphic }) => {
        const bodyWithoutHtml = body.replace(/<[^>]*>/g, '');

        cy.testContainsOrNotExists('.graphic__title', displayTitle)
        cy.testContainsOrNotExists('.graphic__body', bodyWithoutHtml)
        if(_graphic.src) {
          cy.get('.graphic__image').should('have.attr', 'src', _graphic.src)
        } else if(_graphic.large) {
          cy.get('.graphic__image').should('have.attr', 'src', _graphic.large)
        }
      })

      cy.visit('/');
    });
  });
});
