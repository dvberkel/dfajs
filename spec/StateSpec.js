describe("a State", function(){
    it("should be defined", function(){
	expect(FA.State).toBeDefined();
    });

    it("should default not accept any string", function(){
	var state = new FA.State();

	expect(state).not.toAccept("");
	expect(state).not.toAccept("A");
	expect(state).not.toAccept("B");
    });
    
    describe("(final)", function(){
	it("should only accept the empty string", function(){
	    var state = new FA.State({ "final" : true });

	    expect(state).toAccept("");
	    expect(state).not.toAccept("A");
	    expect(state).not.toAccept("B");
	});
    });

    it ("should be able to transition to a final State", function(){
	var state = new FA.State();

	state.under("A").transitionsTo(new FA.State({ "final" : true }));

	expect(state).not.toAccept("");
	expect(state).toAccept("A");
	expect(state).not.toAccept("B");
    });

    it ("should be able to transition to an final State via an other State", function(){
	var state = new FA.State();
	
	state
	  .under("A").transitionsTo(new FA.State())
	  .under("B").transitionsTo(new FA.State({ "final" : true }));

	expect(state).not.toAccept("");
	expect(state).not.toAccept("A");
	expect(state).toAccept("AB");
    });

    it ("should be able to transition under different symbols", function(){
	var state = new FA.State();
	
	state.under("A").transitionsTo(new FA.State({ "final" : true }));
	state.under("B").transitionsTo(new FA.State({ "final" : true }));

	expect(state).not.toAccept("");
	expect(state).toAccept("A");
	expect(state).toAccept("B");
	expect(state).not.toAccept("AB");
    });

    it ("should be able to transition to different States under same symbol", function(){
	var state = new FA.State();
	
	state.under("A").transitionsTo(new FA.State());
	state.under("A").transitionsTo(new FA.State({ "final" : true }));

	expect(state).not.toAccept("");
	expect(state).toAccept("A");
	expect(state).not.toAccept("AB");
    });

    it ("should be able to transition to itself", function(){
	var state = new FA.State({ "final" : true });
	
	state.under("A").transitionsTo(state);

	expect(state).toAccept("");
	expect(state).toAccept("A");
	expect(state).toAccept("AA");
	expect(state).toAccept("AAA");
    });

    it ("should be able to make epsilon transitions at the start", function(){
	var state = new FA.State();
	
	state
	  .under("").transitionsTo(new FA.State())
	  .under("A").transitionsTo(new FA.State({ "final" : true }));

	expect(state).not.toAccept("");
	expect(state).toAccept("A");
	expect(state).not.toAccept("B");
    });

    it ("should be able to make epsilon transitions at the end", function(){
	var state = new FA.State();
	
	state.under("").transitionsTo(new FA.State({ "final" : true }));

	expect(state).toAccept("");
	expect(state).not.toAccept("A");
	expect(state).not.toAccept("B");
    });
});