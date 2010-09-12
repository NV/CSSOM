test("comment", function(){
	deepEqual(
		tokenize("/* fuuuu */"),
		[["comment", "/* fuuuu */"]]
	);
	deepEqual(
		tokenize("/**/"),
		[["comment", "/**/"]]
	);
});


test("a {color: red}", function(){
	deepEqual(tokenize("a {color: red}"),	[
		["selector", "a"],
		["name", "color"],
		["value", "red"]
	]);
});

test("* {	border:	none	} \n\
	#foo {font-size: 12px; background:#fff;}", function(){
	
	var tokens = tokenize("* {	border:	none} \n\
	#foo {font-size: 12px; background:#fff;}");

	deepEqual(
		tokens,
		[
			["selector", "*"],
			["name", "border"],
			["value", "none"],
			["selector", "#foo"],
			["name", "font-size"],
			["value", "12px"],
			["name", "background"],
			["value", "#fff"]
		]
	);
});



test(".link {/**/color: red}", function(){
	var css = ".link {/**/color: red}";
	var tokens = tokenize(css);

	deepEqual(
		tokens,
		[
			["selector", ".link"],
			["comment", "/**/"],
			["name", "color"],
			["value", "red"]
		]
	);
});


test("string", function(){
	var css = '.comment:before {content: "/**/"; content: \'* {}\'}';
	var tokens = tokenize(css);

	deepEqual(
		tokens,
		[
			["selector", ".comment:before"],
			["name", "content"],
			["value", '"/**/"'],
			["name", "content"],
			["value", "'* {}'"]
		]
	);

});

test("html|:not(.main-page) {background-color: rgb(90%, 90.8%, 0)}", function(){
	var css = "html|:not(.main-page) {background-color: rgb(90%, 90.8%, 0)}";
	var tokens = tokenize(css);
	deepEqual(
		tokens,
		[
			["selector", "html|:not(.main-page)"],
			["name", "background-color"],
			["value", "rgb(90%,90.8%,0)"]
		]
	);

//	equals(tokens[0][0])
});
