describe('CSSOM', function() {
describe('MediaList', function() {

	it('appendMedium, deleteMedium, mediaText', function() {
		var m = new CSSOM.MediaList;
		expect(m.length).toBe(0);

		m.appendMedium("handheld");
		m.appendMedium("screen");
		m.appendMedium("only screen and (max-device-width: 480px)");

		m.deleteMedium("screen");

		expect(m[2]).toBeUndefined();

		var expected = {
			0: "handheld",
			1: "only screen and (max-device-width: 480px)",
			length: 2
		};

		expect(m).toEqualOwnProperties(expected);
		expect(m.mediaText).toBe([].join.call(expected, ", "));
	});

});
});
