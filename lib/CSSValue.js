//.CommonJS
var CSSOM = {};
///CommonJS


/**
 * @constructor
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSValue
 *
 * TODO: add if needed
 */
CSSOM.CSSValue = function CSSValue() {
};

CSSOM.CSSValue.prototype = {
	constructor: CSSOM.CSSValue,

	// @see: http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSValue
	set cssText() {
		var c = getConstructorName(this);

		throw new Exception('DOMException: property "cssText" of "' + name + '" is readonly!');
	},

	get cssText() {
		var name = getConstructorName(this);

		throw new Exception('getter "cssText" of "' + name + '" is not implemented!');
	}
};

function getConstructorName(instance) {
	var s = instance.constructor.toString(),
			c = s.match(/function\s([^\(]+)/),
			name = c[1];

	return name;
}


//.CommonJS
exports.CSSValue = CSSOM.CSSValue;
///CommonJS
