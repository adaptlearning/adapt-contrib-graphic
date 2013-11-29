define(["coreViews/componentView", "coreJS/adapt"], function(ComponentView, Adapt) {

    var Graphic = ComponentView.extend({
        
        postRender: function() {
            console.log("rendering");
            this.setReadyStatus();
            this.setCompletionStatus();
        }
        
    });
    
    Adapt.register("graphic", Graphic);
    
});