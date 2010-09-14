var TESTS = [
	{
		input: "/* fuuuu */",
		result: {
			cssRules: []
		}
	},
	{
		input: "/**/",
		result: {
			cssRules: []
		}
	},
	{
		input: "/*a {content: '* {color:#000}'}*/",
		result: {
			cssRules: []
		}
	},
	{
		input: "a {color: red}",
		result: {
			cssRules: [
				{
					selectorText: "a",
					type: 1,
					style: {
						0: "color",
						color: "red",
						length: 1
					}
				}
			]
		}
	},
	{
		input: ".left {float: left;}",
		result: {
			cssRules: [
				{
					selectorText: ".left",
					type: 1,
					style: {
						0: "float",
						float: "left",
						length: 1
					}
				}
			]
		}
	},
	{
		input: "#a {b:c;}\n#d {e:f}",
		result: {
			cssRules: [
				{
					selectorText: "#a",
					type: 1,
					style: {
						0: "b",
						b: "c",
						length: 1
					}
				}, {
					selectorText: "#d",
					type: 1,
					style: {
						0: "e",
						e: "f",
						length: 1
					}
				}
			]
		}
	},
	{
		input: "* {	border:	none	} \n#foo {font-size: 12px; background:#fff;}",
		result: {
			cssRules: [
				{
					selectorText: "*",
					type: 1,
					style: {
						0: "border",
						border: "none",
						length: 1
					}
				},
				{
					selectorText: "#foo",
					type: 1,
					style: {
						0: "font-size",
						"font-size": "12px",
						1: "background",
						background: "#fff",
						length: 2
					}
				}
			]
		}
	}
];


// Run tests.
for (var i=0; i<TESTS.length; i++) {
	compare(TESTS[i].input, TESTS[i].result, TESTS[i].name);
}
