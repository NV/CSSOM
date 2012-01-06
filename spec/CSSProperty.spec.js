describe('CSSOM', function() {
describe('CSSProperty', function() {

	given('letter-spacing: -0.1em !important', function(cssText) {
		var property = new CSSOM.CSSProperty;
		property.name = 'letter-spacing';
		property.value = '-0.1em';
		property.important = true;
		expect(property.toString()).toBe('letter-spacing: -0.1em !important');
		expect(property).toEqualOwnProperties({
			name: 'letter-spacing',
			value: '-0.1em',
			important: true,
			__original: ''
		});
	});

});
});
