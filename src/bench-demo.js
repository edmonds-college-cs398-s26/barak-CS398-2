// @ts-check

import { benchmark } from "./toolkit/bench.js";
import { Queue } from "./toolkit/Queue.js";
import { makeJobs, runQueueSimulation } from "./week2/queueSimulation.js";

/*
Later, you can compare with an earlier version like this:

import { Queue as Queue1 } from "./toolkit/Queue1.js";

runScenario("Queue1", () => new Queue1(), 2000, 10);
runScenario("Queue", () => new Queue(), 2000, 10);
*/

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

/**
 * Clear #output if it exists.
 */
function clearOutput() {
	const output = document.getElementById("output");
	if (output) {
		output.textContent = "";
	}
}

/**
 * Run one benchmark scenario for a particular queue factory.
 *
 * @param {string} label
 * @param {() => {
 *   enqueue: (value: number) => void,
 *   dequeue: () => number | undefined,
 *   isEmpty: () => boolean,
 *   size: () => number
 * }} createQueue
 * @param {number} jobCount
 * @param {number} workUnitsPerJob
 * @param {number} [runs]
 */
function runScenario(label, createQueue, jobCount, workUnitsPerJob, runs = 5) {
	const jobs = makeJobs(jobCount, workUnitsPerJob);
	const expectedSteps = jobCount * workUnitsPerJob;

	const result = benchmark(() => {
		const stats = runQueueSimulation(jobs, createQueue);

		// Sanity check so we do not benchmark a broken simulation silently.
		if (stats.processedSteps !== expectedSteps) {
			throw new Error(
				`Expected ${expectedSteps} processed steps, got ${stats.processedSteps}`
			);
		}
	}, runs);

	writeLine(
		`${label} | jobs=${jobCount}, workUnits=${workUnitsPerJob}, totalSteps=${expectedSteps}`
	);
	writeLine(
		`  median: ${result.medianMs.toFixed(2)} ms | runs: ${result.times
			.map((t) => t.toFixed(2))
			.join(", ")}`
	);
	writeLine("");
}

clearOutput();

writeLine("Queue simulation benchmark");
writeLine("These are rough timings only. Look for trends, not exact numbers.");
writeLine("");

// Start with moderate sizes so the shift-based version remains usable.
runScenario("Current Queue", () => new Queue(), 1000, 10);
runScenario("Current Queue", () => new Queue(), 2000, 10);
runScenario("Current Queue", () => new Queue(), 4000, 10);

// Later, after adding a different version, compare both implementations directly.