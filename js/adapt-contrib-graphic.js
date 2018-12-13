define([
  'core/js/adapt',
  'core/js/views/componentView'
], function(Adapt, ComponentView) {

  var Graphic = ComponentView.extend({

    preRender: function() {
      this.listenTo(Adapt, 'device:changed', this.resizeImage);

      this.checkIfResetOnRevisit();
    },

    postRender: function() {
      this.resizeImage(Adapt.device.screenSize, true);
    },

    checkIfResetOnRevisit: function() {
      var isResetOnRevisit = this.model.get('_isResetOnRevisit');

      if (isResetOnRevisit) {
        this.model.reset(isResetOnRevisit);
      }
    },

    resizeImage: function(width, setupInView) {
      var imageWidth = width === 'medium' ? 'small' : width;
      var imageSrc = (this.model.get('_graphic')) ? this.model.get('_graphic')[imageWidth] : '';
      this.$('.graphic-widget img').attr('src', imageSrc);

      this.$('.graphic-widget').imageready(function() {
        this.setReadyStatus();

        if (setupInView) {
          this.setupInviewCompletion('.component-widget');
        }

      }.bind(this));
    }

  });

  return Adapt.register('graphic', Graphic);

});
