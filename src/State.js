(function(Backbone, FA, undefined){
    var State = Backbone.Model.extend({
	defaults : { final : false },

	accept : function(target){
	    return this.get("final") && target === "";
	}
    });

    FA.State = State;    
})(Backbone, FA);