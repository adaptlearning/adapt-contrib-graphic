define(function(require) {

	var ComponentView = require("coreViews/componentView");
	var Adapt = require("coreJS/adapt");

    var Graphic = ComponentView.extend({

    	init: function() {
            this.$('.graphic-widget').imageready(function(){
                this.model.set('ready', true);
            });

			this.listenTo(Adapt, 'device:changed', this.resizeImage);
  		},
        postRender: function() {
            this.resizeImage(Adapt.device.screenSize);
            this.setReadyStatus();
            this.setCompletionStatus();
        },
        resizeImage: function(width) {
    		var src = this.$('.graphic-widget img').attr('data-' + width);
        	this.$('.graphic-widget img').attr('src', src);
        }
    });
    
    Adapt.register("graphic", Graphic);
    
});