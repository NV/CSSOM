/**
 * @param {string} actual
 * @param {string} expected
 * @param {string} [message]
 * TODO: http://github.com/jquery/qunit/issues#issue/39
 */
function equalOwnProperties(actual, expected, message) {
	var dummy;

	// Damn QUnit.deepEqual thinks ["a"] isn't equal {0:"a", length:1}
	if (expected instanceof Array) {
		dummy = [];
		for (var i=0; i<actual.length; i++) {
			dummy[i] = actual[i];
		}
	} else {
		dummy = {};
		for (var key in actual) {
			if (actual.hasOwnProperty(key)) {
				dummy[key] = actual[key];
			}
		}
	}
	deepEqual(dummy, expected, message);
}


/**
 * Compare two stylesheets
 * @param {string} css
 * @param {Object} expected
 * @param {string} [message]
 */
function compare(css, expected, message) {

	var actual = parse(css);

	expected.__proto__ = CSSStyleSheet.prototype;
	if (expected.cssRules) {
		for (var i=0, length=expected.cssRules.length; i<length; i++) {
			expected.cssRules[i].__proto__ = CSSStyleRule.prototype;
			if (expected.cssRules[i].style) {
				expected.cssRules[i].style.__proto__ = CSSStyleDeclaration.prototype;
			}
		}
	}

	test(css, function(){
		deepEqual(actual, expected, message || "");
	});
}
