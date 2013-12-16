define(function(require) {

    var ComponentView = require("coreViews/componentView");
    var Adapt = require("coreJS/adapt");

    var Graphic = ComponentView.extend({

        init: function() {
            this.listenTo(Adapt, 'device:changed', this.resizeImage);
        },
        postRender: function() {
            this.resizeImage(Adapt.device.screenSize);
            this.setCompletionStatus();
        },
        resizeImage: function(width) {
            var src = this.$('.widget img').attr('data-' + width);
            this.$('.widget img').attr('src', src);

            this.$('.widget').imageready(_.bind(function() {
                this.setReadyStatus();
            }, this));
        }
    });

    Adapt.register("graphic", Graphic);
});