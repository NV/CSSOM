/**
 * Use it for developing CSSKit, otherwise use build/CSSKit.js
 */

var exports = {};

function require(path) {
	path = path.replace(/^\.\//, '');
	if (!exports[path]) {
		window.console && console.warn(path, 'is missing. Most likely just a mutual inclusion.');
	}
	return exports;
}

loadScripts(['../src/files'], function() {
	loadScripts(exports.files, function() {
		delete exports.files;
		window.CSSOM = exports;
	});
});

/**
 * Simplefied version of https://gist.github.com/603980
 * @param {Array.<string>} paths
 * @param {Function} callback
 */
function loadScripts(paths, callback) {
	var length = paths.length;
	for (var i = 0, ii = length; i < ii; i++) {
		var script = document.createElement('script');
		script.async = false;
		script.src = '../lib/' + paths[i] + '.js';
		script.onload = function() {
		    if (--length === 0) {
				callback();
			}
		};
		document.documentElement.appendChild(script);
	}
}
