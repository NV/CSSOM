/**
 * @param {number} depth
 * @return {string}
 */
function makeIndent(depth) {
	var INDENT = '    ';
	if (depth == 1) {
		return INDENT;
	} else if (depth < 1) {
		return '';
	}

	if (depth in makeIndent.cache) {
		return makeIndent.cache[depth];
	} else {
		var result = INDENT;
		for (var i = depth; --i;) {
			result += INDENT;
		}
		makeIndent.cache[depth] = result;
		return result;
	}
}
makeIndent.cache = {};


/**
 * buildPath(2) -> '../..'
 * @param {number} level
 * @return {string}
 */
function buildPath(level) {
	if (level == 0) {
		return '.';
	} else {
		var result = '..';
		for (var i = 1; i < level; i++) {
			result += '/..';
		}
		return result;
	}
}


/**
 * stringifyObjectKey('color') -> 'color'
 * stringifyObjectKey('background-color') -> '"background-color"'
 * @param {string} key
 * @return {string}
 */
function stringifyObjectKey(key) {
	return /^[a-z0-9_$]+$/i.test(key) ?
		key :
		JSON.stringify(key);
}


/**
 * @param {Object} object
 * @param {number} [depth]
 * @param {Array} [stack]
 * @return {string}
 */
function inspect(object, depth, stack) {
	depth ? depth++ : (depth = 1);
	stack = stack || (stack = []);

	switch (typeof object) {
		case 'object':
			var level = stack.indexOf(object);
			if (level != -1) {
				return buildPath(level);
			}
			stack = [object].concat(stack);

			var properties = [];
			var indent = makeIndent(depth);
			for (var key in object) {
				if (object.hasOwnProperty(key)) {
					properties.push(indent + stringifyObjectKey(key) + '<span>: </span>' + inspect(object[key], depth, stack));
				}
			}
			var indentInside = makeIndent(depth - 1);
			return '<span>{</span>\n' + properties.join('<span>,</span>\n') + '\n' + indentInside + '<span>}</span>';

		case 'string':
			return '"' + object + '"';

		default:
			return object.toString();
	}
}


var errors = [];
if (!("__defineGetter__" in {})) {
	errors.push("Object.prototype.__defineGetter__ isn’t supported");
}
if (errors.length) {
	document.getElementById("message").innerHTML = errors.join("<br>");
	document.body.className = "error";
	throw errors.join("\n\n");
}

var style = document.getElementById("style");
var output = document.getElementById("output");
var serialized = document.getElementById("serialized");

function outputUpdated() {
	var value = style.value;
	if (value != style.prevValue) {
		style.prevValue = value;
		var css = CSSOM.parse(value);
		output.innerHTML = inspect(css);
		serialized.innerHTML = css.toString();
	}
}

/**
 * @return {boolean} update happend or not
 */
function hashChanged() {
	var hash = location.hash;
	var splitted = hash.split("=");
	if (splitted.length < 2) {
		return false;
	}
	var name = splitted[0];
	var value = splitted[1];
	if (name == "#css") {
		style.value = decodeURIComponent(value);
		outputUpdated();
		return true;
	}
	return false;
}

window.onload = function() {
	hashChanged() || outputUpdated();
};

window.onhashchange = hashChanged;
style.onkeyup = style.onpaste = function changed(){
	outputUpdated();
};
style.onchange = function updateLocation() {
	if (style.value.length < 1024) {
		location.hash = "css=" + encodeURIComponent(style.value);
	} else {
		// Huge location.hash slows down the browser :(
		location.hash = 'css_is_too_big';
	}
};
