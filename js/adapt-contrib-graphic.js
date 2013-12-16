define(function(require) {

    var ComponentView = require("coreViews/componentView");
    var Adapt = require("coreJS/adapt");

    var Graphic = ComponentView.extend({

        init: function() {
            this.$('.widget').imageready(_.bind(function() {
                this.setReadyStatus();
            }, this));

            this.listenTo(Adapt, 'device:changed', this.resizeImage);
        },
        postRender: function() {
            this.resizeImage(Adapt.device.screenSize);
            this.setCompletionStatus();
        },
        resizeImage: function(width) {
            var src = this.$('.widget img').attr('data-' + width);
            this.$('.widget img').attr('src', src);
        }
    });
    
    Adapt.register("graphic", Graphic);
    
});