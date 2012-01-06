describe('CSSOM', function() {
describe('CSSStyleSheet', function() {

	it('insertRule, deleteRule', function() {
		var s = new CSSOM.CSSStyleSheet;
		expect(s.cssRules).toEqual([]);

		s.insertRule("a {color: blue}", 0);
		expect(s.cssRules.length).toBe(1);

		s.insertRule("a *:first-child, a img {border: none}", 1);
		expect(s.cssRules.length).toBe(2);

		s.deleteRule(1);
		expect(s.cssRules.length).toBe(1);

		s.deleteRule(0);
		expect(s.cssRules).toEqual([]);
	});

});
});
