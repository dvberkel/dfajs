(function(Backbone, FA, undefined){
    var isEmptyString = function(target){
	return target === "";
    };

    var State = Backbone.Model.extend({
	defaults : { final : false, transitions : {} },

	accept : function(target){
	    if (isEmptyString(target)) {
		return this._isFinal();
	    } else {
		var head = target.slice(0,1);
		var transitions = this._transitions(head);
		if (transitions.length > 0) {
		    var tail = target.slice(1);
		    var state = transitions[0];
		    return state.accept(tail);
		} else {
		    return false;
		}
	    }
	    return this._isFinal() && isEmptyString(target);
	},

	under : function(symbol) {
	    var start = this;
	    return {
		transitionsTo : function(finish){
		    start._transitions(symbol).push(finish);
		}
	    }
	},

	_isFinal : function(){
	    return this.get("final");
	},

	_transitions : function(symbol) {
	    var transitions = this.get("transitions");
	    if (! transitions.hasOwnProperty(symbol)) {
		transitions[symbol] = [];
	    }
	    return transitions[symbol];
	}
    });

    FA.State = State;    
})(Backbone, FA);