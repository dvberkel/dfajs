beforeEach(function() {
    this.addMatchers({
	toAccept : function(target) {
	    return this.actual.accept(target) === true;
	}
    });
});
