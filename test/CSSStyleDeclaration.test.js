test("CSSStyleDeclaration", function(){
	var d = new CSSOM.CSSStyleDeclaration;

	d.setProperty("color", "purple");
	equalOwnProperties(d, {
		0: "color",
		length: 1,
		color: "purple"
	});

	d.setProperty("width", "128px", "important");
	equalOwnProperties(d, {
		0: "color",
		1: "width",
		length: 2,
		color: "purple",
		width: "128px"
	});

	equal(d.cssText, "color: purple; width: 128px !important;");

	equal(d.getPropertyValue("color"), "purple");
	equal(d.getPropertyValue("width"), "128px");
	equal(d.getPropertyValue("position"), "");
	
	strictEqual(d.getPropertyPriority("color"), "");
	strictEqual(d.getPropertyPriority("width"), "important");
	strictEqual(d.getPropertyPriority("position"), "");
	
	d.setProperty("color", "green");
	d.removeProperty("width");
	
	equal(d.cssText, "color: green;");
	equal(d.length, 1);

	d.width = "100%";
	equal(d.length, 2);
	equal(d[0], "color");
	equal(d[1], "width");

	d.color = "papayawhip";
	equal(d.cssText, "color: papayawhip; width: 100%;");
});
