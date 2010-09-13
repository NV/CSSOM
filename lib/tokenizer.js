/**
 * @param {String} token
 * @param {String} [state]
 */
function tokenize(token, state) {
	state = state || "selector";
	var tokens = [];
	var index;
	var j = 0;
	var buffer = "";
	var SIGNIFICANT_WHITESPACE = {
		"selector": true,
		"atRule": true,
		"atBlock": true
	};

	for (var i=0, character; character = token.charAt(i); i++) {
		
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
			j = i + 1;
			if (token.charAt(j) == "*") {
				index = token.indexOf("*/", j) + 2;
				if (index == -1) {
					tokens.push(["comment", token.slice(i)]);
					return tokens;
				} else {
					tokens.push(["comment", token.slice(i, index)]);
					i = index - 1;
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
			// terminate
			if (state == "selector" || state == "atRule") {
				// flush
				tokens.push(["selector", buffer.trim()]);
				buffer = "";
				state = "name";
			} else if (state == "atBlock") {
				tokens.push(["atBlock", buffer]);
				buffer = "";
				state = "selector";
			}
			break;

		case ":":
			if (state == "name") {
				tokens.push(["name", buffer]);
				buffer = "";
				state = "value";
			} else {
				buffer += character;
			}
			break;
		
		case ";":
			if (state == "value") {
				tokens.push(["value", buffer]);
				buffer = "";
				state = "name";
			} else if (state == "atRule") {
				tokens.push(["atRule", buffer]);
				buffer = "";
				state = "selector";
			} else {
				buffer += character;
			}
			break;

		case "}":
			if (state == "value") {
				tokens.push(["value", buffer]);
				buffer = "";
			} else if (state == "selector") {
				tokens.push(["atBlockEnd", "}"]);
				buffer = "";
			}
			state = "selector";
			break;

		default:
			buffer += character;
			break;

		}
	}

	return tokens;
}
