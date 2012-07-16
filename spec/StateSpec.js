describe("a State", function(){
    it("should be defined", function(){
	expect(FA.State).toBeDefined();
    });

    it("should default not accept any string", function(){
	var state = new FA.State();
	
	console.log(state);

	expect(state.accept("")).toBe(false);
	expect(state.accept("A")).toBe(false);
	expect(state.accept("B")).toBe(false);
    });
});