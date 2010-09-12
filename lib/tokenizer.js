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

	for (var i=0, character; character = token.charAt(i); i++) {
		
		switch (character) {

		case " ":
		case "	":
		case "\n":
			// Ignore white-space.
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
			}
			break;

		// At-rule
		case "@":
			if (state == "block") {
				state = "atRule";
			}
			break;

		case "{":
			// terminate
			if (state == "selector") {
				// flush
				tokens.push(["selector", buffer]);
				buffer = "";
			}
			state = "name";
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
			}
			state = "name";
			break;

		case "}":
			if (state == "value") {
				tokens.push(["value", buffer]);
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
