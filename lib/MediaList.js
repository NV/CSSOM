/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#the-medialist-interface
 */
function MediaList(){}

MediaList.prototype = {
	get mediaText() {
		return this.join(", ");
	},

	appendMedium: function(){
		//FIXME
	},

	deleteMedium: function(){
		//FIXME
	},

	item: function(index){
		return this[index];
	}
};

MediaList.prototype.__proto__ = Array.prototype;

if (typeof exports != "undefined") {
	exports.MediaList = MediaList;
}
