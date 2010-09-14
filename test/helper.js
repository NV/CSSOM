/**
 * Compare two stylesheets
 * @param {string} css
 * @param {Object} expected
 * @param {string} [message]
 */
function compare(css, expected, message) {

	var actual = parse(css);

	expected.__proto__ = CSSStyleSheet.prototype;
	expected.media = new MediaList;
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
