function given(str, fn) {
    var args = [].slice.call(arguments, 0, -1);
    return jasmine.getEnv().it(str.toString(), function() {
        fn.apply(this, args);
    });
}

beforeEach(function() {
    this.addMatchers(objectDiff.jasmine);
});
