/**
 * @param {Object} object
 * @return {Object}
 */
function uncircularOwnProperties(object) {
	function _uncircular(object, depth, stack) {
		var stackLength = stack.push(object);
		depth++;
		var keys = Object.keys(object);
		for (var i = 0, length = keys.length; i < length; i++) {
			var key = keys[i];
			var value = object[key];
			if (value && typeof value === 'object') {
				var level = stack.indexOf(value);
				if (level !== -1) {
					object[key] = buildPath(depth - level - 1);
				} else {
					_uncircular(value, depth, stack);
					stack.length = stackLength;
				}
			}
		}
	}
	_uncircular(object, 0, []);
	return object;
}

/**
 * buildPath(2) -> '../..'
 * @param {number} level
 * @return {string}
 */
function buildPath(level) {
	if (level === 0) {
		return '.';
	} else {
		var result = '..';
		for (var i = 1; i < level; i++) {
			result += '/..';
		}
		return result;
	}
}
