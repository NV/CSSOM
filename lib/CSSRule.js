if (typeof require != "undefined") {
	var CSSStyleDeclaration = require("./CSSStyleDeclaration").CSSStyleDeclaration;
}

/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#the-cssrule-interface
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSRule
 */
function CSSRule() {
	this.parentRule = null;
}

CSSRule.STYLE_RULE = 1;
CSSRule.IMPORT_RULE = 3;
CSSRule.MEDIA_RULE = 4;
CSSRule.FONT_FACE_RULE = 5;
CSSRule.PAGE_RULE = 6;
CSSRule.WEBKIT_KEYFRAMES_RULE = 8;
CSSRule.WEBKIT_KEYFRAME_RULE = 9;

// Obsolete in CSSOM http://dev.w3.org/csswg/cssom/
//CSSRule.UNKNOWN_RULE = 0;
//CSSRule.CHARSET_RULE = 2;

// Never implemented
//CSSRule.VARIABLES_RULE = 7;

CSSRule.prototype = {
	//FIXME
};


if (typeof exports != "undefined") {
	exports.CSSRule = CSSRule;
}
