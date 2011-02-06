//.CommonJS
var CSSOM = {
	CSSStyleSheet: require("./CSSStyleSheet").CSSStyleSheet,
	CSSStyleRule: require("./CSSStyleRule").CSSStyleRule,
	CSSMediaRule: require("./CSSMediaRule").CSSMediaRule
};
///CommonJS


/**
 * @param {string} token
 * @param {Object} [options]
 */
CSSOM.parse = function parse(token, options) {

	options = options || {};
	var i = options.startIndex || 0;

	/**
	  "before-selector" or
	  "selector" or
	  "atRule" or
	  "atBlock" or
	  "before-name" or
	  "name" or
	  "before-value" or
	  "value"
	*/
	var state = options.state || "before-selector";

	var index;
	var j = i;
	var buffer = "";

	var SIGNIFICANT_WHITESPACE = {
		"selector": true,
		"value": true,
		"atRule": true,
		"atBlock": true
	};

	var styleSheet = new CSSOM.CSSStyleSheet;

	// @type CSSStyleSheet|CSSMediaRule
	var currentScope = styleSheet;
	
	var selector, name, value, priority="", styleRule, mediaRule;

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
			if (state == 'before-value') {
				state = 'value';
			}
			break;

		case "'":
			j = i + 1;
			index = token.indexOf("'", j) + 1;
			if (!index) {
				throw "' is missing";
			}
			buffer += token.slice(i, index);
			i = index - 1;
			if (state == 'before-value') {
				state = 'value';
			}
			break;

		// Comment
		case "/":
			if (token.charAt(i + 1) == "*") {
				i += 2;
				index = token.indexOf("*/", i);
				if (index == -1) {
					throw SyntaxError("Missing */");
				} else {
					i = index + 1;
				}
			} else {
				buffer += character;
			}
			break;

		// At-rule
		case "@":
			if (token.indexOf("@media", i) == i) {
				state = "atBlock";
				mediaRule = new CSSOM.CSSMediaRule;
				mediaRule.__starts = i;
				i += "media".length;
				buffer = "";
				break;
			} else if (token.indexOf("@import", i) == i) {
				state = "atRule";
				i += "import".length;
				buffer = "";
				break;
			} else if (state == "selector") {
				state = "atRule";
			}
			buffer += character;
			break;

		case "{":
			if (state == "selector" || state == "atRule") {
				styleRule.selectorText = buffer.trimRight();
				styleRule.style.__starts = i;
				buffer = "";
				state = "before-name";
			} else if (state == "atBlock") {
				mediaRule.media.mediaText = buffer.trim();
				currentScope = mediaRule;
				buffer = "";
				state = "before-selector";
			}
			break;

		case ":":
			if (state == "name") {
				name = buffer.trim();
				buffer = "";
				state = "before-value";
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
				state = "before-name";
			} else if (state == "atRule") {
				buffer = "";
				state = "before-selector";
			} else {
				buffer += character;
			}
			break;

		case "}":
			switch (state) {
				case "value":
					styleRule.style.setProperty(name, buffer.trim(), priority);
					priority = "";
				case "before-name":
				case "name":
					styleRule.__ends = i + 1;
					currentScope.cssRules.push(styleRule);
					buffer = "";
					break;
				case "before-selector":
				case "selector":
					// End of media rule.
					// Nesting rules aren't supported yet
					if (!mediaRule) {
						throw "unexpected }";
					}
					mediaRule.__ends = i + 1;
					styleSheet.cssRules.push(mediaRule);
					currentScope = styleSheet;
					buffer = "";
					break;
			}
			state = "before-selector";
			break;

		default:
			switch (state) {
				case "before-selector":
					state = "selector";
					styleRule = new CSSOM.CSSStyleRule;
					styleRule.__starts = i;
					break;
				case "before-name":
					state = "name";
					break;
				case "before-value":
					state = "value";
					break;
			}
			buffer += character;
			break;
		}
	}

	return styleSheet;
};


//.CommonJS
exports.parse = CSSOM.parse;
///CommonJS
