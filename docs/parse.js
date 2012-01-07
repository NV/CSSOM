if (!Array.isArray) {
	Array.isArray = function(array) {
		return {}.toString.call(array) === '[object Array]';
	};
}

function byId(id) {
	return document.getElementById(id);
}

/**
 * @param {number} depth
 * @return {string}
 */
function makeIndent(depth) {
	var INDENT = '    ';
	if (depth === 1) {
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
 * @return {DocumentFragment}
 */
function inspect(object) {

	var root = document.createDocumentFragment();
	_inspect(root, object, 0);
	return root;

	/**
	 * @param {DocumentFragment} root
	 * @param {Object} object
	 * @param {number} depth
	 */
	function _inspect(root, object, depth) {
		switch (typeof object) {
			case 'object':
			case 'null': // ES 5.1
				if (!object) {
					//null
					root.appendChild(document.createTextNode('null'));
					break;
				}
				depth++;
				var indent = document.createTextNode(makeIndent(depth));
				var span = document.createElement('span');
				span.textContent = ',\n';
				var comma = span;
				if (Array.isArray(object)) {
					var length = object.length;
					if (length === 0) {
						span = span.cloneNode(false);
						span.textContent = '[]';
						root.appendChild(span);
					} else {
						span = span.cloneNode(false);
						span.textContent = '[\n';
						root.appendChild(span);
						for (var i = 0; i < length; i++) {
							root.appendChild(indent.cloneNode(true));
							_inspect(root, object[i], depth);
							if (i < length - 1) {
								root.appendChild(comma.cloneNode(true));
							}
						}
						span = span.cloneNode(false);
						span.textContent = '\n' + makeIndent(depth - 1) + ']';
						root.appendChild(span);
					}
				} else {
					var keys = Object.keys(object);
					length = keys.length;
					if (length === 0) {
						span = span.cloneNode(false);
						span.textContent = '{}';
						root.appendChild(span);
					} else {
						span = span.cloneNode(false);
						span.textContent = '{\n';
						root.appendChild(span);
						var colon = span.cloneNode(false);
						colon.textContent = ': ';
						for (i = 0; i < length; i++) {
							var key = keys[i];
							root.appendChild(indent.cloneNode(true));
							root.appendChild(document.createTextNode(stringifyObjectKey(key)));
							root.appendChild(colon.cloneNode(true));
							_inspect(root, object[key], depth);
							if (i < length - 1) {
								root.appendChild(comma.cloneNode(true));
							}
						}
						span = span.cloneNode(false);
						span.textContent = '\n' + makeIndent(depth - 1) + '}';
						root.appendChild(span);
					}
				}
				break;

			case 'string':
				root.appendChild(document.createTextNode(JSON.stringify(object)));
				break;

			default:
				root.appendChild(document.createTextNode(object.toString()));
		}
	}

}


var errors = [];
if (!("__defineGetter__" in {})) {
	errors.push("Object.prototype.__defineGetter__ isn’t supported");
}
if (errors.length) {
	byId("message").innerHTML = errors.join("<br>");
	document.body.className = "error";
	throw errors.join("\n\n");
}

var style = byId("style");
var output = byId("output");
var serialized = byId("serialized");

function outputUpdated() {
	var value = style.value;
	if (value !== style.prevValue) {
		style.prevValue = value;
		var css = CSSOM.parse(value);
		uncircularOwnProperties(css);
		output.innerHTML = '';
		output.appendChild(inspect(css));
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
	if (name === "#css") {
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
