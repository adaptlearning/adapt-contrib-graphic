define(function(require) {

	var ComponentView = require("coreViews/componentView");
	var Adapt = require("coreJS/adapt");

    var Graphic = ComponentView.extend({

    	init: function() {
    		// TODO -- Will the next line always be required?
    		this.constructor.template = this.model.get('_component');
			this.listenTo(Adapt, 'device:resize', this.resizeImage);

			// this.$('.widget').imageready(function(){
			// 	this.model.set('ready', true);
			// });
  		},
        postRender: function() {
            console.log("rendering");
            this.setReadyStatus();
            this.setCompletionStatus();
        },
        resizeImage: function(width) {
        	var attribute = '';
        	switch (true) {
        		case (width < 760):
        			console.log('small');
        			attribute = 'data-small';
        			break;
    			case (width >= 760 && width < 960):
    				console.log('medium');
    				attribute = 'data-medium';
    				break;
				case (width >= 960):
					console.log('large');
					attribute = 'data-large';
					break;
        	}

        	if (attribute.length != 0) {
        		// Swap in one image for another
				var src = this.$('.widget img').attr(attribute);
        		this.$('.widget img').attr('src', src);
        	}

        	
        }
    });
    
    Adapt.register("graphic", Graphic);
    
});