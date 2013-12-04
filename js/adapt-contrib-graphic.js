define(function(require) {

	var ComponentView = require("coreViews/componentView");
	var Adapt = require("coreJS/adapt");

    var Graphic = ComponentView.extend({

    	init: function() {
            this.$('.widget').imageready(function(){
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
    		var src = this.$('.widget img').attr('data-' + width);
        	this.$('.widget img').attr('src', src);
        }
    });
    
    Adapt.register("graphic", Graphic);
    
});