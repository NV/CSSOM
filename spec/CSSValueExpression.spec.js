describe('CSSOM', function() {
describe('CSSValueExpression', function() {

	var END = '__EOL__';


	var cssExpressionValue = [
"(function(hash){",
"	if (!hash.match(/#[0-9a-f]{3,6}/g)) {",
"		hash = hash.substr(1);",
"		if (!hash) {",
"			hash = '#ccc';",
"		}",
"	}",

"	var n1 = 4/5;",

"	// hello line comment",

"	var n2 = 5/6;",

"	var r1 = /hello ( /img;",

"	// hello line comment",

"	/* hello block comment */",

"	return hash;",
"}(location.hash))",

END

	].join('\n');



	given(cssExpressionValue, function(token) {
		var i = 0;

		var info = (new CSSOM.CSSValueExpression(token, i)).parse();

		expect(info.idx).toBeDefined();

		var end = token.substr(info.idx + 1);
		end = end.trim();
		expect(end).toBe(END);
	});


});
});
