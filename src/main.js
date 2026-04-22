import { clearOutput, printSummary, runTests as runHarnessTests } from "./toolkit/test.js";
import { runTests as runQueueTests } from "./toolkit/Queue.test.js";
import { runTests as runQueue2Tests } from "./toolkit/Queue2.test.js";
import { runBenchmarks } from "./benchmark.js";

/**
 * Write a line to both the console and the page, if an #output element exists.
 *
 * @param {string} message
 */
function writeLine(message) {
	console.log(message);

	const output = document.getElementById("output");
	if (output) {
		output.textContent += message + "\n";
	}
}

clearOutput();

writeLine("=== Running Queue Tests ===");
runHarnessTests();
runQueueTests();

writeLine("\n=== Running Queue2 Tests ===");
runQueue2Tests();

writeLine("\n=== Running Benchmarks ===");
runBenchmarks();

printSummary();
