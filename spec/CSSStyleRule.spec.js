describe('CSSOM', function() {
describe('CSSStyleRule', function() {

	given('h1:first-of-type {\n\tfont-size: 3em\n}', function(cssText) {
		var rule = new CSSOM.CSSStyleRule;
		rule.cssText = cssText;

		expect(rule.cssText).toBe('h1:first-of-type {font-size: 3em;}');
		expect(rule.selectorText).toBe('h1:first-of-type');

		rule.selectorText = 'h1.title';
		expect(rule.selectorText).toBe('h1.title');
		expect(rule.cssText).toBe('h1.title {font-size: 3em;}');
	});

});
});
