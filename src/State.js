(function(Backbone, FA, undefined){
    var State = Backbone.Model.extend({
	accept : function(target){
	    return false;
	}
    });

    FA.State = State;    
})(Backbone, FA);