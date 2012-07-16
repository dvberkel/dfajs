beforeEach(function() {
    this.addMatchers({
	toAccept : function(target) {
	    var actual = this.actual;

	    this.message = function() {
		return "Expected a state to accept " + target;
	    };
	    
	    return actual.accept(target) === true;
	}
    });
});
