if (typeof require != "undefined") {
	var CSSStyleDeclaration = require("./CSSStyleDeclaration").CSSStyleDeclaration;
	var CSSRule = require("./CSSRule").CSSRule;
}

/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#cssstylerule
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleRule
 */
function CSSStyleRule() {
	this.selectorText = "";
	this.style = new CSSStyleDeclaration;
}

CSSStyleRule.prototype = new CSSRule;
CSSStyleRule.prototype.type = 1;
CSSStyleRule.prototype.__defineGetter__("cssText", function() {
	return this.selectorText + " {" + this.style.cssText + "}"
});


if (typeof exports != "undefined") {
	exports.CSSStyleRule = CSSStyleRule;
}
