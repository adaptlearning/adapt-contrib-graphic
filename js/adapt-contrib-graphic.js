define([
  'core/js/adapt',
  'core/js/views/componentView',
  'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

  class GraphicView extends ComponentView {

    events() {
      return {
        'click .js-graphic-link': 'onClick'
      };
    }

    preRender() {
      this.listenTo(Adapt, 'device:changed', this.resizeImage);

      this.checkIfResetOnRevisit();
    }

    postRender() {
      this.resizeImage(Adapt.device.screenSize, true);
    }

    checkIfResetOnRevisit() {
      const isResetOnRevisit = this.model.get('_isResetOnRevisit');

      if (isResetOnRevisit) {
        this.model.reset(isResetOnRevisit);
      }
    }

    resizeImage(width, setupInView) {
      const imageWidth = width === 'medium' ? 'small' : width;
      const imageSrc = (this.model.get('_graphic')) ? this.model.get('_graphic')[imageWidth] : '';
      this.$('.js-graphic-set-image-src').attr('src', imageSrc);

      this.$('.graphic__widget').imageready(() => {
        this.setReadyStatus();

        if (setupInView) {
          this.setupInviewCompletion('.graphic__widget');
        }
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

  GraphicView.template = 'graphic';

  return Adapt.register('graphic', {
    model: ComponentModel.extend({}), // create a new class in the inheritance chain so it can be extended per component type if necessary later
    view: GraphicView
  });

});
