define(function(require) {

    var ComponentView = require("coreViews/componentView");
    var Adapt = require("coreJS/adapt");

    var Graphic = ComponentView.extend({

        preRender: function() {
            this.listenTo(Adapt, 'device:changed', this.resizeImage);
        },

        postRender: function() {
            this.resizeImage(Adapt.device.screenSize);
            this.$('.graphic-widget').on('inview', _.bind(function(visible) {
                if (visible) {
                    this.setCompletionStatus();
                }
            }, this));
        },
        
        resizeImage: function(width) {
            var src = this.$('.graphic-widget img').attr('data-' + width);
            this.$('.graphic-widget img').attr('src', src);

            this.$('.graphic-widget').imageready(_.bind(function() {
                this.setReadyStatus();
            }, this));
        }
    });

    Adapt.register("graphic", Graphic);
});