//.CommonJS
var CSSOM = {};
///CommonJS

function updateIndexedProps(style) {
	var props = [];
	var nums = [];
	var i, len;

	for (var name in style) {
		if (name.match(/^\d+$/)) {
			nums.push(name);
		}
		else if (name.charAt(0) != '_' && style.hasOwnProperty(name)) {
			props.push(name);
		}
	}

	len = 0;
	for (i=0; i < props.length; i++) {
		if (style[props[i]] !== "") {
			style[len++] = props[i];
		}
	}
	for (i=0; i < nums.length; i++) {
		if (nums[i] >= len) {
			delete style[nums[i]];
		}
	}
	return len;
}

/**
 * @constructor
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration
 */
CSSOM.CSSStyleDeclaration = function CSSStyleDeclaration(){
	// NON-STANDARD
	this._importants = {};
};


CSSOM.CSSStyleDeclaration.prototype = {

	constructor: CSSOM.CSSStyleDeclaration,

	/**
	 *
	 * @param {string} name
	 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-getPropertyValue
	 * @return {string} the value of the property if it has been explicitly set for this declaration block. 
	 * Returns the empty string if the property has not been set.
	 */
	getPropertyValue: function(name) {
		return this[name] || ""
	},

	/**
	 *
	 * @param {string} name
	 * @param {string} value
	 * @param {string} [priority=null] "important" or null
	 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-setProperty
	 */
	setProperty: function(name, value, priority) {
		this[name] = value;
		this._importants[name] = priority;
		updateIndexedProps(this);
	},

	/**
	 *
	 * @param {string} name
	 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-removeProperty
	 * @return {string} the value of the property if it has been explicitly set for this declaration block.
	 * Returns the empty string if the property has not been set or the property name does not correspond to a known CSS property.
	 */
	removeProperty: function(name) {
		var prevValue = this[name];
		this[name] = "";
		this._importants[name] = "";
		updateIndexedProps(this);
		return prevValue;
	},

	getPropertyCSSValue: function() {
		//FIXME
	},

	/**
	 *
	 * @param {String} name
	 */
	getPropertyPriority: function(name) {
		return this._importants[name] || "";
	},


	/**
	 *   element.style.overflow = "auto"
	 *   element.style.getPropertyShorthand("overflow-x")
	 *   -> "overflow"
	 */
	getPropertyShorthand: function() {
		//FIXME
	},

	isPropertyImplicit: function() {
		//FIXME
	},

	get length() {
		return updateIndexedProps(this);
	},

	get cssText() {
		var properties = [];
		for (var name in this) {
			if (this.hasOwnProperty(name) && !name.match(/^_.*|\d+$/)) {
				var value = this.getPropertyValue(name);
				if (value !== "") {
					var priority = this.getPropertyPriority(name);
					if (priority) {
						priority = " !" + priority;
					}
					properties.push(name + ': ' + value + priority + ';');
				}
			}
		}
		return properties.join(" ");
	}

};


//.CommonJS
exports.CSSStyleDeclaration = CSSOM.CSSStyleDeclaration;
///CommonJS
