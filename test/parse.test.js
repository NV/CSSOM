module("parse");

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
						__starts: 2,
						length: 1
					},
					__starts: 0,
					__ends: 14
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
						__starts: 6,
						length: 1
					},
					__starts: 0,
					__ends: 20
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
						__starts: 3,
						length: 1
					},
					__starts: 0,
					__ends: 64
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
						font: "normal\n1.6em\r\nTimes New Roman,\tserif",
						__starts: 3,
						length: 1
					},
					__starts: 0,
					__ends: 50
				}
			]
		}
	},
	{
		input: "h3 {font-family: 'times new roman'} ",
		result: {
			cssRules: [
				{
					selectorText: "h3",
					style: {
						0: "font-family",
						'font-family': "'times new roman'",
						__starts: 3,
						length: 1
					},
					__starts: 0,
					__ends: 35
				}
			]
		}
	},
	{
		input: ".icon>*{background-image: url(../images/ramona_strong.gif);}",
		result: {
			cssRules: [
				{
					selectorText: ".icon>*",
					style: {
						0: "background-image",
						"background-image": "url(../images/ramona_strong.gif)",
						__starts: 7,
						length: 1
					},
					__starts: 0,
					__ends: 60
				}
			]
		}
	},
	{
		input: "*/**/{}",
		result: {
			cssRules: [
				{
					selectorText: "*",
					style: {
						__starts: 5,
						length: 0
					},
					__starts: 0,
					__ends: 7
				}
			]
		}
	},
	{
		input: "/**/*{}",
		result: {
			cssRules: [
				{
					selectorText: "*",
					style: {
						__starts: 5,
						length: 0
					},
					__starts: 4,
					__ends: 7
				}
			]
		}
	},
	{
		input: "* /**/*{}",
		result: {
			cssRules: [
				{
					selectorText: "* *",
					style: {
						__starts: 7,
						length: 0
					},
					__starts: 0,
					__ends: 9
				}
			]
		}
	},
	{
		input: "*/*/*/ *{}",
		result: {
			cssRules: [
				{
					selectorText: "* *",
					style: {
						__starts: 8,
						length: 0
					},
					__starts: 0,
					__ends: 10
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
						__starts: 3,
						length: 1
					},
					__starts: 0,
					__ends: 9
				}, {
					selectorText: "#d",
					style: {
						0: "e",
						e: "f",
						__starts: 13,
						length: 1
					},
					__starts: 10,
					__ends: 18
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
						__starts: 2,
						length: 1
					},
					__starts: 0,
					__ends: 18
				},
				{
					selectorText: "#foo",
					style: {
						0: "font-size",
						"font-size": "12px",
						1: "background",
						background: "#fff",
						__starts: 25,
						length: 2
					},
					__starts: 20,
					__ends: 60
				}
			]
		}
	},
	{
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
						__starts: 5,
						length: 2
					},
					__starts: 0,
					__ends: 74
				},
				{
					selectorText: ".error",
					style: {
						0: "color",
						color: "red",
						__starts: 81,
						length: 1
					},
					__starts: 75,
					__ends: 103
				}
			]
		}
	},
	{
		input: 'img:not(/*)*/[src]){background:url(data:image/png;base64,FooBar)}',
		result: {
			cssRules: [
				{
					selectorText: 'img:not([src])',
					style: {
						0: 'background',
						background: 'url(data:image/png;base64,FooBar)',
						length: 1
					}
				}
			]
		}
	},
	{
		input: ".gradient{background: -moz-linear-gradient(/*);*/top, #1E5799 0%, #7db9e8 100%)}",
		result: {
			cssRules: [
				{
					selectorText: '.gradient',
					style: {
						0: 'background',
						background: '-moz-linear-gradient(top, #1E5799 0%, #7db9e8 100%)',
						length: 1
					}
				}
			]
		}
	},
	{
		input: "@media handheld, only screen and (max-device-width: 480px) {body{max-width:480px}}",
		result: {
			cssRules: [
				{
					media: {
						0: "handheld",
						1: "only screen and (max-device-width: 480px)",
						length: 2
					},
					cssRules: [
						{
							selectorText: "body",
							style: {
								0: "max-width",
								"max-width": "480px",
								__starts: 64,
								length: 1
							},
							__starts: 60,
							__ends: 81
						}
					],
					__starts: 0,
					__ends: 82
				}
			]
		}
	},
	{
		input: "@media screen, screen, screen {/* Match Firefox and Opera behavior here rather than WebKit. \nSane person shouldn't write like this anyway. */}",
		result: {
			cssRules: [
				{
					media: {
						0: "screen",
						1: "screen",
						2: "screen",
						length: 3
					},
					cssRules: [],
					__starts: 0,
					__ends: 142
				}
			]
		}
	},
	{
		input: "@media/**/print {*{background:#fff}}",
		result: {
			cssRules: [
				{
					media: {
						0: "print",
						length: 1
					},
					cssRules: [
						{
							selectorText: "*",
							style: {
								0: "background",
								background: "#fff",
								__starts: 18,
								length: 1
							},
							__starts: 17,
							__ends: 35
						}
					],
					__starts: 0,
					__ends: 36
				}
			]
		}
	},
	{
		input: "a{}@media all{b{color:#000}}",
		result: {
			cssRules: [
				{
					selectorText: "a",
					style: {
						__starts: 1,
						length: 0
					},
					__starts: 0,
					__ends: 3
				},
				{
					media: {
						0: "all",
						length: 1
					},
					cssRules: [
						{
							selectorText: "b",
							style: {
								0: "color",
								color: "#000",
								__starts: 15,
								length: 1
							},
							__starts: 14,
							__ends: 27
						}
					],
					__starts: 3,
					__ends: 28
				}
			]
		}
	},
	{
		input: "@mediaall {}",
		result: {
			cssRules: []
		}
	},
	{
		input: "some invalid junk @media projection {body{background:black}}",
		result: {
			cssRules: [
				{
					media: {
						0: "projection",
						length: 1
					},
					cssRules: [
						{
							selectorText: "body",
							style: {
								0: "background",
								background: "black",
								__starts: 41,
								length: 1
							},
							__starts: 37,
							__ends: 59
						}
					],
					__starts: 18,
					__ends: 60
				}
			]
		}
	},
	{
		input: '@import url(partial.css);\ni {font-style: italic}',
		result: {
			cssRules: [
				{
					href: 'partial.css',
					media: {
						length: 0
					},
					styleSheet: {
						cssRules: []
					}
				},
				{
					selectorText: "i",
					style: {
						0: 'font-style',
						'font-style': 'italic',
						length: 1
					}
				}
			]
		}
	},
	{
		input: '@import "partial.css";\ni {font-style: italic}',
		result: {
			cssRules: [
				{
					href: 'partial.css',
					media: {
						length: 0
					},
					styleSheet: {
						cssRules: []
					}
				},
				{
					selectorText: "i",
					style: {
						0: 'font-style',
						'font-style': 'italic',
						length: 1
					}
				}
			]
		}
	},
	{
		input: "@import 'partial.css';\ni {font-style: italic}",
		result: {
			cssRules: [
				{
					href: 'partial.css',
					media: {
						length: 0
					},
					styleSheet: {
						cssRules: []
					}
				},
				{
					selectorText: "i",
					style: {
						0: 'font-style',
						'font-style': 'italic',
						length: 1
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
