test("MediaList", function(){
	var m = new MediaList;
	strictEqual(m.length, 0);

	m.appendMedium("handheld");
	m.appendMedium("screen");
	m.appendMedium("only screen and (max-device-width: 480px)");

	m.deleteMedium("screen");

	var expected = [
		"handheld",
		"only screen and (max-device-width: 480px)"
	];

	equalOwnProperties(m, expected);
	equal(m.mediaText, expected.join(", "));
});
