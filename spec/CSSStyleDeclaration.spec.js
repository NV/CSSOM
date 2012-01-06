describe('CSSOM', function() {
describe('CSSStyleDeclaration', function() {

	it('setProperty, removeProperty, cssText, getPropertyValue, getPropertyPriority', function() {
		var d = new CSSOM.CSSStyleDeclaration;

		d.setProperty('color', 'purple');
		expect(d).toEqualOwnProperties({
			0: 'color',
			length: 1,
			parentRule: null,
			color: 'purple',
			_importants: {
				color: undefined
			}
		});

		d.setProperty('width', '128px', 'important');
		expect(d).toEqualOwnProperties({
			0: 'color',
			1: 'width',
			length: 2,
			parentRule: null,
			color: 'purple',
			width: '128px',
			_importants: {
				color: undefined,
				width: 'important'
			}
		});

		expect(d.cssText).toBe('color: purple; width: 128px !important;');

		expect(d.getPropertyValue('color')).toBe('purple');
		expect(d.getPropertyValue('width')).toBe('128px');
		expect(d.getPropertyValue('position')).toBe('');

		expect(d.getPropertyPriority('color')).toBe('');
		expect(d.getPropertyPriority('width')).toBe('important');
		expect(d.getPropertyPriority('position')).toBe('');

		d.setProperty('color', 'green');
		d.removeProperty('width');

		expect(d.cssText).toBe('color: green;');
	});

	given('color: pink; outline: 2px solid red;', function(cssText) {
		var d = new CSSOM.CSSStyleDeclaration;
		d.cssText = cssText;
		expect(d.cssText).toBe(cssText);
	});

});
});
