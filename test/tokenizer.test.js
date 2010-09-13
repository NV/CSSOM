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


test("a img {border-width: 0}", function(){
	var css = "a img {border-width: 0}";
	var tokens = tokenize(css);

	deepEqual(
		tokens,
		[
			["selector", "a img"],
			["name", "border-width"],
			["value", "0"]
		]
	);
});


test('.comment:before {content: "/**/"; content: \'* {}\'}', function(){
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

});


test("@import url(http://ya.ru/foo.css);", function(){
	var css = "@import url(http://ya.ru/foo.css);";
	var tokens = tokenize(css);
	deepEqual(
		tokens,
		[
			["atRule", "@import url(http://ya.ru/foo.css)"]
		]
	);
});

test('@namespace svg "http://www.w3.org/2000/svg";', function(){
	var css = '@namespace svg "http://www.w3.org/2000/svg";';
	var tokens = tokenize(css);
	deepEqual(
		tokens,
		[
			["atRule", '@namespace svg "http://www.w3.org/2000/svg"']
		]
	);
});
