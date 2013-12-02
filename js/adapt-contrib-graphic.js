define(function(require) {

	var ComponentView = require("coreViews/componentView");
	var Adapt = require("coreJS/adapt");

    var Graphic = ComponentView.extend({

    	init: function() {
    		// TODO -- Will the next line always be required?
    		this.constructor.template = this.model.get('_component');
			this.listenTo(Adapt, 'device:changed', this.resizeImage);
  		},
        postRender: function() {
            this.resizeImage(Adapt.screenSize);
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