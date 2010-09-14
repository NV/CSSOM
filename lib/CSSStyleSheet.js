if (typeof require != "undefined") {
	var StyleSheet = require("./StyleSheet").StyleSheet;
	var CSSRule = require("./CSSRule").CSSRule;
	var parse = require("./parse").parse;
}

/**
 * @constructor
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleSheet
 */
function CSSStyleSheet() {
	this.cssRules = [];
	this.media = new MediaList;
	/*
	if (typeof rules == "string") {
		return parse(rules);
	} else {
		this.cssRules = [];
		if (rules) {
			for (var i=0, length=rules.length; i<length; i++) {
				var rule = rules[i];
				if (rule instanceof CSSRule) {
					this.cssRules[i] = rule;
				} else {
					//FIXME
					//this.cssRules[i] = new CSSRule(rule);
				}
			}
		}
	}
	*/
}


CSSStyleSheet.prototype = new StyleSheet;


/**
 * NON-STANDARD
 */
CSSStyleSheet.prototype.toHash = function(){
	//FIXME
};


/**
 * Used to insert a new rule into the style sheet. The new rule now becomes part of the cascade.
 *
 *   sheet = new Sheet("body {margin: 0}")
 *   sheet.toString()
 *   -> "body{margin:0;}"
 *   sheet.insertRule("img {border: none}", 0)
 *   -> 0
 *   sheet.toString()
 *   -> "img{border:none;}body{margin:0;}"
 *
 * @param {string} rule
 * @param {number} index
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleSheet-insertRule
 * @return {number} The index within the style sheet's rule collection of the newly inserted rule.
 */
CSSStyleSheet.prototype.insertRule = function(rule, index) {
	if (index < 0 || index > this.cssRules.length) {
		throw new RangeError("INDEX_SIZE_ERR")
	}
	this.cssRules.splice(index, 0, new StyleRule(rule));
	return index
};


/**
 * Used to delete a rule from the style sheet.
 *
 *   sheet = new Sheet("img{border:none} body{margin:0}")
 *   sheet.toString()
 *   -> "img{border:none;}body{margin:0;}"
 *   sheet.deleteRule(0)
 *   sheet.toString()
 *   -> "body{margin:0;}"
 *
 * @param {number} index
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleSheet-deleteRule
 * @return {number} The index within the style sheet's rule list of the rule to remove.
 */
CSSStyleSheet.prototype.deleteRule = function(index) {
	if (index < 0 || index >= this.cssRules.length) {
		throw new RangeError("INDEX_SIZE_ERR");
	}
	this.cssRules.splice(index, 1);
};


if (typeof exports != "undefined") {
	exports.CSSStyleSheet = CSSStyleSheet;
}
