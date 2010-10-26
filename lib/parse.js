if (typeof require != "undefined") {
	var CSSStyleSheet = require("./CSSStyleSheet").CSSStyleSheet;
	var CSSStyleRule = require("./CSSStyleRule").CSSStyleRule;
	var CSSMediaRule = require("./CSSMediaRule").CSSMediaRule;
	var StyleDeclaration = require("./CSSStyleDeclaration").CSSStyleDeclaration;
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
		"value": true,
		"atRule": true,
		"atBlock": true
	};

	var styleSheet = new CSSStyleSheet;

	// @type CSSStyleSheet|CSSMediaRule
	var currentScope = styleSheet;
	
	var selector, name, value, priority="", styleRule, mediaRule, styleDeclaration;

	for (var character; character = token.charAt(i); i++) {

		switch (character) {

		case " ":
		case "\t":
		case "\r":
		case "\n":
		case "\f":
			if (SIGNIFICANT_WHITESPACE[state]) {
				// Squash 2 or more white-spaces in the row into 1
				switch (token.charAt(i - 1)) {
					case " ":
					case "\t":
					case "\r":
					case "\n":
					case "\f":
						break;
					default:
						buffer += " ";
						break;
				}
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
				mediaRule = new CSSMediaRule;
				mediaRule.selectorText = buffer.trim();
				currentScope = mediaRule;
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

		case "!":
			if (state == "value" && token.indexOf("!important", i) === i) {
				priority = "important";
				i += "important".length;
			} else {
				buffer += character;
			}
			break;

		case ";":
			if (state == "value") {
				styleRule.style.setProperty(name, buffer.trim(), priority);
				priority = "";
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
				styleRule.style.setProperty(name, buffer.trim(), priority);
				priority = "";
				buffer = "";
				currentScope.cssRules.push(styleRule);
			} else if (state == "name") {
				currentScope.cssRules.push(styleRule);
				buffer = "";
			} else if (state == "selector") {
				// End of media rule.
				// Nesting of media rules isn't supported
				styleSheet.cssRules.push(mediaRule);
				currentScope = styleSheet;
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


if (typeof exports != "undefined") {
	exports.parse = parse;
}
