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
		input: "h1 {font-family: 'Times New Roman', Helvetica Neue, sans-serif }",
		result: {
			cssRules: [
				{
					selectorText: "h1",
					style: {
						0: "font-family",
						"font-family": "'Times New Roman', Helvetica Neue, sans-serif",
						length: 1
					}
				}
			]
		}
	},
	{
		input: "h2 {font: normal\n1.6em\r\nTimes New Roman,\tserif  ;}",
		result: {
			cssRules: [
				{
					selectorText: "h2",
					style: {
						0: "font",
						font: "normal 1.6em Times New Roman, serif",
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
					style: {
						0: "b",
						b: "c",
						length: 1
					}
				}, {
					selectorText: "#d",
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
					style: {
						0: "border",
						border: "none",
						length: 1
					}
				},
				{
					selectorText: "#foo",
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
	}, {
		input: "span {display: inline-block !important; vertical-align: middle !important} .error{color:red!important;}",
		result: {
			cssRules: [
				{
					selectorText: "span",
					style: {
						0: "display",
						1: "vertical-align",
						display: "inline-block",
						"vertical-align": "middle",
						length: 2
					}
				},
				{
					selectorText: ".error",
					style: {
						0: "color",
						color: "red",
						length: 1
					}
				}
			]
		}
	}, {
		input: "@media handheld {}",
		result: {
			cssRules: [
				{
					
				}
			]
		}
	}
];


// Run tests.
for (var i=0; i<TESTS.length; i++) {
	compare(TESTS[i].input, TESTS[i].result, TESTS[i].name);
}
