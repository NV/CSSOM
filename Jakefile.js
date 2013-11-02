var PATH = require("path");
var FS = require("fs");

function readFile(path) {
	var abs_path = PATH.join(__dirname, path);
	return FS.readFileSync(abs_path, "utf8");
}

function stripCommonJS(text) {
	return text.replace(/\/\/\.CommonJS(?:.|\n)*?\/\/\/CommonJS/g, "");
}

desc("Packages lib files into the one huge");
task("default", ["dist/CSSOM.js"]);

directory("dist");

file("dist/CSSOM.js", ["src/files.js", "src/CSSOM.js", "dist"], function() {
	var parts = [readFile("src/CSSOM.js")];
	require("./src/files").files.forEach(function(path) {
		var text = readFile("lib/" + path + ".js");
		parts.push(stripCommonJS(text).trimLeft());
	});
	FS.writeFileSync("dist/CSSOM.js", parts.join(""));
	process.stdout.write("dist/CSSOM.js is done\n");
});

desc("Creates index file for npm package");
task("lib", ["lib/index.js"]);

file("lib/index.js", ["src/files.js"], function() {
	FS.writeFileSync("lib/index.js", "'use strict';\n\n" + require('./src/files').files.map(function(fileName) {
		return "exports." + fileName + " = require('./" + fileName + "')." + fileName + ";\n";
	}).join(""));
});
