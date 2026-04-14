const results = {
	passed: 0,
	failed: 0,
};

function getOutputElement() {
	if (typeof document === "undefined") {
		return null;
	}

	return document.getElementById("output");
}

export function clearOutput() {
	const output = getOutputElement();
	if (output) {
		output.textContent = "";
	}
}

function writeLine(message) {
	console.log(message);
	const output = getOutputElement();
	if (output) {
		output.textContent += message + "\n";
	}
}

function formatValue(value) {
	if (typeof value === "string") {
		return `"${value}"`;
	}

	try {
		const json = JSON.stringify(value);
		if (typeof json === "undefined") {
			return String(value);
		}
		return json;
	} catch {
		return String(value);
	}
}

function isObject(value) {
	return value !== null && typeof value === "object";
}

function deepEqual(a, b) {
	if (a === b) {
		return true;
	}

	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) {
			return false;
		}

		for (let i = 0; i < a.length; i += 1) {
			if (!deepEqual(a[i], b[i])) {
				return false;
			}
		}

		return true;
	}

	if (isObject(a) && isObject(b)) {
		const aKeys = Object.keys(a);
		const bKeys = Object.keys(b);

		if (aKeys.length !== bKeys.length) {
			return false;
		}

		for (const key of aKeys) {
			if (!Object.prototype.hasOwnProperty.call(b, key)) {
				return false;
			}

			if (!deepEqual(a[key], b[key])) {
				return false;
			}
		}

		return true;
	}

	return false;
}

export function assertEqual(actual, expected) {
	if (actual !== expected) {
		throw new Error(
			`Expected ${formatValue(expected)}, but got ${formatValue(actual)}`,
		);
	}
}

export function assertDeepEqual(actual, expected) {
	if (!deepEqual(actual, expected)) {
		throw new Error(
			`Expected ${formatValue(expected)}, but got ${formatValue(actual)}`,
		);
	}
}

export function test(name, fn) {
	try {
		fn();
		results.passed += 1;
		writeLine(`PASS ${name}`);
	} catch (error) {
		results.failed += 1;
		writeLine(`FAIL ${name}`);
		if (error instanceof Error) {
			writeLine(`  ${error.message}`);
		} else {
			writeLine(`  ${formatValue(error)}`);
		}
	}
}

export function printSummary() {
	writeLine("");
	writeLine(`Summary: ${results.passed} passed, ${results.failed} failed`);
}

export function resetTestResults() {
	results.passed = 0;
	results.failed = 0;
}

export function runTests() {
	test("test harness is running", () => {
		assertEqual(true, true);
	});
}
