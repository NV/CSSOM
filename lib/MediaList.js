//.CommonJS
var CSSOM = {};
///CommonJS


/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#the-medialist-interface
 */
CSSOM.MediaList = function MediaList(){};

CSSOM.MediaList.prototype = {
	__proto__: Array.prototype,

	constructor: CSSOM.MediaList,

	/**
	 * @return {string}
	 */
	get mediaText() {
		return this.join(", ");
	},

	/**
	 * @param {string} value
	 */
	set mediaText(value) {
		var values = value.split(",");
		var length = this.length = values.length;
		for (var i=0; i<length; i++) {
			this[i] = values[i].trim();
		}
	},

	/**
	 * @param {string} medium
	 */
	appendMedium: function(medium) {
		if (this.indexOf(medium) == -1) {
			this.push(medium);
		}
	},

	/**
	 * @param {string} medium
	 */
	deleteMedium: function(medium) {
		var index = this.indexOf(medium);
		if (index != -1) {
			this.splice(index, 1);
		}
	}
	
};


//.CommonJS
exports.MediaList = CSSOM.MediaList;
///CommonJS
