if (typeof require != "undefined") {
	var CSSStyleDeclaration = require("./CSSStyleDeclaration").CSSStyleDeclaration;
	var CSSRule = require("./CSSRule").CSSRule;
	var parse = require("./parse").parse;
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
	var text;
	if (this.selectorText) {
		text = this.selectorText + " {" + this.style.cssText + "}";
	} else {
		text = "";
	}
	return text;
});

CSSStyleRule.prototype.__defineSetter__("cssText", function(cssText) {
	var rule = parse(cssText).cssRules[0];
	this.style = rule.style;
	this.selectorText = rule.selectorText;
});


if (typeof exports != "undefined") {
	exports.CSSStyleRule = CSSStyleRule;
}
