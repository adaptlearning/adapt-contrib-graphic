import ComponentView from 'core/js/views/componentView';

class GraphicView extends ComponentView {

  preRender() {
    this.checkIfResetOnRevisit();
  }

  postRender() {
    this.$('.graphic__widget').imageready(() => {
      this.setReadyStatus();
      this.setupInviewCompletion('.graphic__widget');
    });
  }

  checkIfResetOnRevisit() {
    const isResetOnRevisit = this.model.get('_isResetOnRevisit');

    if (!isResetOnRevisit) return;

    this.model.reset(isResetOnRevisit);
  }
}

GraphicView.template = 'graphic.jsx';

export default GraphicView;
