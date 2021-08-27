import ComponentView from 'core/js/views/componentView';

class GraphicView extends ComponentView {

  postRender() {
    this.$('.graphic__widget').imageready(() => {
      this.setReadyStatus();
      this.setupInviewCompletion('.graphic__widget');
    });
  }

}

GraphicView.template = 'graphic.jsx';

export default GraphicView;
