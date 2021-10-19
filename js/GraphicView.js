import ComponentView from 'core/js/views/componentView';

class GraphicView extends ComponentView {

  events() {
    return {
      'click .js-graphic-link': 'onClick'
    };
  }

  postRender() {
    this.$('.graphic__widget').imageready(() => {
      this.setReadyStatus();
      this.setupInviewCompletion('.graphic__widget');
    });
  }

  onClick(event) {
    if (event) event.preventDefault();

    const item = this.model.get('_graphic');
    const url = item._url;
    const target = item._target || '_blank';

    switch (target) {
      case '_self':
        if (url.substr(0, 1) === '#') {
          Backbone.history.navigate(url, { trigger: true });
          return;
        }
        window.location.href = url;
        break;
      default:
        window.open(url, target);
    }
  }

}

GraphicView.template = 'graphic.jsx';

export default GraphicView;
