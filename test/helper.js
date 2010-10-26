/**
 * @param {string} actual
 * @param {string} expected
 * @param {string} [message]
 * TODO: http://github.com/jquery/qunit/issues#issue/39
 */
function equalOwnProperties(actual, expected, message) {
	var actualDummy = cloneOwnProperties(actual);
	var expectedDummy = cloneOwnProperties(expected);
	deepEqual(actualDummy, expectedDummy, message);
}


/**
 * Make a deep copy of an object
 * @param {Object|Array} object
 * @return {Object|Array}
 */
function cloneOwnProperties(object) {
	var result = {};
	for (var key in object) {
		if (object.hasOwnProperty(key)) {
			if (typeof object[key] == "object") {
				result[key] = cloneOwnProperties(object[key]);
			} else {
				result[key] = object[key];
			}
		}
	}
	return result;
}


/**
 * Compare two stylesheets
 * @param {string} css
 * @param {Object} expected
 * @param {string} [message]
 */
function compare(css, expected, message) {
	var actual = parse(css);
	test(css, function(){
		equalOwnProperties(actual, expected, message || "");
	});
}
