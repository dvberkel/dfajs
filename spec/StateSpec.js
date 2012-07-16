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
});