(function(_, Backbone, FA, undefined){
    var isEmptyString = function(target){
	return target === "";
    };

    var State = Backbone.Model.extend({
	defaults : { "final" : false },

        initialize : function(){
	    this.set({ "transitions" : {} });  
	},

	accept : function(target){
	    if (isEmptyString(target)) {
		return _.any(_.map(this._startOptions(), function(option){
		    return option._isFinal();
		}));
	    } else {
		var head = target.slice(0,1);
		var tail = target.slice(1);
		return _.any(_.map(this._startOptions(), function(option){
		    return _.any(_.map(option._transitions(head), function(state){
		        return state.accept(tail);
		    }));
                }));
	    }
	},

	under : function(symbol) {
	    var start = this;
	    return {
		transitionsTo : function(finish){
		    start._transitions(symbol).push(finish);
		    return finish;
		}
	    };
	},

	_isFinal : function(){
	    return this.get("final");
	},

	_transitions : function(symbol) {
	    var transitions = this.get("transitions");
	    if (transitions)
	    if (! transitions.hasOwnProperty(symbol)) {
		transitions[symbol] = [];
	    }
	    return transitions[symbol];
	},

        _startOptions : function() {
	    var result = [this];
	    var toVisit = [this];
	    while (toVisit.length > 0) {
		var current = toVisit[0];
		toVisit = toVisit.slice(1);
		var transitions = current._transitions("");
		result = result.concat(transitions);
		toVisit = toVisit.concat(transitions);
	    }
	    return result;
	}
    });

    FA.State = State;    
})(_, Backbone, FA);