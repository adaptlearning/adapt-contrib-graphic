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
    const { _url: url, _target: target = '_blank' } = item;

    const isNewWindow = (target !== '_self');
    if (isNewWindow) return window.open(url, target);
    const isRouterNavigation = (url.substr(0, 1) === '#');
    if (isRouterNavigation) return Backbone.history.navigate(url, { trigger: true });
    window.location.href = url;
  }

}

GraphicView.template = 'graphic.jsx';

export default GraphicView;
