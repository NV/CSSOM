if (typeof require != "undefined") {
	var CSSRule = require("./CSSRule").CSSRule;
	var CSSStyleSheet = require("./CSSStyleSheet").CSSStyleSheet;
	var MediaList = require("./MediaList").MediaList;
}

/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#cssmediarule
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSMediaRule
 */
function CSSMediaRule() {
	this.media = new MediaList;
	this.cssRules = [];
	this.type = 4;
}

CSSMediaRule.prototype = new CSSRule;
CSSMediaRule.prototype.type = 4;
CSSMediaRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
CSSMediaRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;
CSSMediaRule.prototype.__defineGetter__("cssText", function() {
	var cssTexts = [];
	for (var i=0, length=this.cssRules.length; i < length; i++) {
		cssTexts.push(this.cssRules[i].cssText);
	}
	return "@media " + this.media.mediaText + " {" + cssTexts.join("") + "}"
});


if (typeof exports != "undefined") {
	exports.CSSMediaRule = CSSMediaRule;
}
