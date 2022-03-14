import ComponentView from 'core/js/views/componentView';

class GraphicView extends ComponentView {

  className() {
    return [
      super.className(),
      this.model.get('_isScrollable') && 'is-scrollable'
    ].filter(Boolean).join(' ');
  }

  events() {
    return {
      'click .js-graphic-link': 'onClick',
      'keydown .js-graphic-scrollbar': 'onKeyDown'
    };
  }

  postRender() {
    this.$('.graphic__widget').imageready(() => {
      this.setReadyStatus();
      this.setupInviewCompletion('.graphic__widget');
      this.setupScrollable();
    });
  }

  setupScrollable() {
    if (!this.model.get('_isScrollable')) return;
    this.onScroll = _.debounce(this.onScroll.bind(this), 17);
    const $scrollbar = this.$('.js-graphic-scrollbar');
    const $scrollContainer = this.$(`#${$scrollbar.attr('aria-controls')}`);
    $scrollContainer.on('scroll', this.onScroll);
    this.onKeyDown();
  }

  onScroll(event) {
    if (!this.model.get('_isScrollable')) return;
    const $scrollbar = this.$('.js-graphic-scrollbar');
    const $scrollContainer = this.$(`#${$scrollbar.attr('aria-controls')}`);
    const { clientWidth, scrollWidth } = $scrollContainer[0];
    const scrollableWidth = (scrollWidth - clientWidth);
    const left = $scrollContainer.scrollLeft();
    const calculatedScrollPercent = parseInt(left / scrollableWidth * 100);
    this.model.set('_scrollPercent', calculatedScrollPercent);
  }

  onKeyDown(event) {
    if (!this.model.get('_isScrollable')) return;
    const $scrollbar = this.$('.js-graphic-scrollbar');
    const $scrollContainer = this.$(`#${$scrollbar.attr('aria-controls')}`);
    const { clientWidth, scrollWidth } = $scrollContainer[0];
    const scrollableWidth = (scrollWidth - clientWidth);
    const step = (clientWidth * 0.1);
    let left = $scrollContainer.scrollLeft();
    const calculatedScrollPercent = parseInt(left / scrollableWidth * 100);
    const definedScrollPercent = this.model.get('_scrollPercent');
    if (definedScrollPercent !== calculatedScrollPercent) {
      // set inital position
      left = definedScrollPercent / 100 * scrollableWidth;
    }
    switch (event?.which) {
      case 37: // left
        left -= step;
        break;
      case 39: // right
        left += step;
        break;
    }
    left = _.max([0, _.min([scrollableWidth, left])]);
    $scrollContainer.scrollLeft(left);
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

  preRemove() {
    if (!this.model.get('_isScrollable')) return;
    const $scrollbar = this.$('.js-graphic-scrollbar');
    const $scrollContainer = this.$(`#${$scrollbar.attr('aria-controls')}`);
    $scrollContainer.off('scroll', this.onScroll);
  }

}

GraphicView.template = 'graphic.jsx';

export default GraphicView;
