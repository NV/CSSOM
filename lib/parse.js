if (typeof require != "undefined") {
	var CSSStyleSheet = require("CSSStyleSheet").CSSStyleSheet;
	var CSSStyleRule = require("CSSStyleRule").CSSStyleRule;
	var StyleDeclaration = require("CSSStyleDeclaration").StyleDeclaration;
}

/**
 * @param {string} token
 * @param {Object} [options]
 */
function parse(token, options) {

	options = options || {};
	var i = options.startIndex || 0;
	var state = options.state || "selector";

	var index;
	var j = i;
	var buffer = "";

	var SIGNIFICANT_WHITESPACE = {
		"selector": true,
		"atRule": true,
		"atBlock": true
	};

	//temp vars
	var styleSheet = new CSSStyleSheet;
	var selector, name, value, styleRule, styleDeclaration;

	for (var character; character = token.charAt(i); i++) {

		switch (character) {

		case " ":
		case "\t":
		case "\r":
		case "\n":
		case "\f":
			if (SIGNIFICANT_WHITESPACE[state]) {
				buffer += character;
			}
			break;

		// String
		case '"':
			j = i + 1;
			index = token.indexOf('"', j) + 1;
			if (!index) {
				throw '" is missing';
			}
			buffer += token.slice(i, index);
			i = index - 1;
			break;

		case "'":
			j = i + 1;
			index = token.indexOf("'", j) + 1;
			if (!index) {
				throw "' is missing";
			}
			buffer += token.slice(i, index);
			i = index - 1;
			break;

		// Comment
		case "/":
			if (token.charAt(++i) == "*") {
				index = token.indexOf("*/", ++i);
				if (index == -1) {
					throw SyntaxError("Missing */");
				} else {
					i = index + 2;
				}
			} else {
				buffer += character;
			}
			break;

		// At-rule
		case "@":
			if (token.indexOf("@media", i) == 0) {
				state = "atBlock";
			} else if (state == "selector") {
				state = "atRule";
			}
			buffer += character;
			break;

		case "{":
			if (state == "selector" || state == "atRule") {
				styleRule = new CSSStyleRule;
				styleRule.selectorText = buffer.trim();
				buffer = "";
				state = "name";
			} else if (state == "atBlock") {
				//tokens.push(["atBlock", buffer]);
				buffer = "";
				state = "selector";
			}
			break;

		case ":":
			if (state == "name") {
				name = buffer.trim();
				buffer = "";
				state = "value";
			} else {
				buffer += character;
			}
			break;

		case ";":
			if (state == "value") {
				styleRule.style.setProperty(name, buffer.trim());
				buffer = "";
				state = "name";
			} else if (state == "atRule") {
				//tokens.push(["atRule", buffer]);
				buffer = "";
				state = "selector";
			} else {
				buffer += character;
			}
			break;

		case "}":
			if (state == "value") {
				value = buffer.trim();
				if (value) {
					styleRule.style.setProperty(name, value);
				}
				styleSheet.cssRules.push(styleRule);
				buffer = "";
			} else if (state == "name") {
				styleSheet.cssRules.push(styleRule);
				buffer = "";
			} else if (state == "selector") {
				//tokens.push(["atBlockEnd", "}"]);
				buffer = "";
			}
			state = "selector";
			break;

		default:
			buffer += character;
			break;

		}
	}

	return styleSheet;
}
