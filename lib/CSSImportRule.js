if (typeof require != "undefined") {
	var CSSRule = require("./CSSRule").CSSRule;
	var CSSStyleSheet = require("./CSSStyleSheet").CSSStyleSheet;
	var MediaList = require("./MediaList").MediaList;
}

/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#cssimportrule
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSImportRule
 */
function CSSImportRule() {
	this.href = "";
	this.media = new MediaList;
	this.styleSheet = new CSSStyleSheet;
}

CSSImportRule.prototype = new CSSRule;
CSSImportRule.prototype.type = 3;
CSSImportRule.prototype.__defineGetter__("cssText", function() {
	return "@import url("+ this.href +") "+ this.media.mediaText +";"
});

if (typeof exports != "undefined") {
	exports.CSSImportRule = CSSImportRule;
}
