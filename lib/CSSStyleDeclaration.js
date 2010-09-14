/**
 * @constructor
 * @param {string} properties
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration
 */
function CSSStyleDeclaration(properties){
	//FIXME
}


CSSStyleDeclaration.prototype = {

	/**
	 *
	 * @param {string} name
	 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-getPropertyValue
	 * @return {string} the value of the property if it has been explicitly set for this declaration block. 
	 * Returns the empty string if the property has not been set.
	 */
	getPropertyValue: function(name){
		return this[name] || ""
	},

	/**
	 *
	 * @param {string} name
	 * @param {string} value
	 * @param {string} [priority]
	 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-setProperty
	 */
	setProperty: function(name, value, priority){
		if (this[name]) {
			// Property already exist. Overwrite it.
			var index = this.indexOf(name);
			if (index < 0) {
				this.push(name);
			}
		} else {
			// New property.
			this.push(name);
		}
		this[name] = value;
	},

	/**
	 *
	 * @param {string} name
	 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-removeProperty
	 * @return {string} the value of the property if it has been explicitly set for this declaration block.
	 * Returns the empty string if the property has not been set or the property name does not correspond to a known CSS property.
	 */
	removeProperty: function(name){
		if (!(name in this)) {
			return ""
		}
		var index = this.indexOf(name);
		if (index < 0) {
			return ""
		}
		var prevValue = this[name];
		this[name] = "";

		// That's what WebKit and Opera do
		this.splice(index, 1);

		// That's what Firefox does
		//this[index] = ""

		return prevValue
	},

	getPropertyCSSValue: function(){
		//FIXME
	},

	getPropertyPriority: function(){
		//FIXME
	},

	getPropertyShorthand: function(){
		//FIXME
	},

	isPropertyImplicit: function(){
		//FIXME
	},

	item: function(index){
		return this[index]
	},


	// Doesn't work in IE < 9
	get cssText(){
		var properties = [];
		for (var i=0, length=this.length; i < length; ++i) {
			var name = this[i];
			var value = this.getPropertyValue(name);
			properties[i] = name + ": " + value + ";";
		}
		return properties.join(" ")
	}

};

// Inherit from Array to use splice and indexOf methods.
// __proto__ isn't a part of ECMAScript 5 spec. It doesn't work in IE, even in IE9.
CSSStyleDeclaration.prototype.__proto__ = Array.prototype;


if (typeof exports != "undefined") {
	exports.CSSStyleDeclaration = CSSStyleDeclaration;
}
