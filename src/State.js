(function(Backbone, FA, undefined){
    var isEmptyString = function(target){
	return target === "";
    };

    var State = Backbone.Model.extend({
	defaults : { final : false },

	accept : function(target){
	    return this._isFinal() && isEmptyString(target);
	},

	_isFinal : function(){
	    return this.get("final");
	}
    });

    FA.State = State;    
})(Backbone, FA);