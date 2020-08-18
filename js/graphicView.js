import Adapt from 'core/js/adapt';
import ComponentView from 'core/js/views/componentView';

class GraphicView extends ComponentView {

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
}

GraphicView.template = 'graphic.jsx';

export default GraphicView;