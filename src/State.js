(function(Backbone, FA, undefined){
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
		var options = this._startOptions();
		for (var current = 0; current < options.length; current++) {
		    var option = options[current];
		    if (option._isFinal()) {
			return true;
		    }
		}
		return false;
	    } else {
		var head = target.slice(0,1);
		var options = this._startOptions();
		for (var current = 0; current < options.length; current++) {
		    var option = options[current];
		    var transitions = option._transitions(head);
		    if (transitions.length > 0) {
			var tail = target.slice(1);
			for (var index = 0; index < transitions.length; index++) {
			    var state = transitions[index];
			    if (state.accept(tail)) {
				return true;
			    }
			}
		    }
		}
		return false;
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
})(Backbone, FA);