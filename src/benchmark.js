// @ts-check

import { benchmark } from "./toolkit/bench.js";
import { Queue } from "./toolkit/Queue.js";
import { Queue2 } from "./toolkit/Queue2.js";
import { makeJobs, runQueueSimulation } from "./week2/queueSimulation.js";

/*
Compare implementations - Queue (array-based) vs Queue2 (linked list-based)
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
 * Run one benchmark scenario for a particular queue factory.
 *
 * @param {string} label
 * @param {() => {
 *   enqueue: (value: unknown) => void,
 *   dequeue: () => unknown,
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

export function runBenchmarks() {
	writeLine("Queue Implementation Comparison Benchmark");
	writeLine("Comparing Queue (array-based, shift) vs Queue2 (linked list)");
	writeLine("These are rough timings only. Look for trends, not exact numbers.");
	writeLine("");

	// Test with moderate sizes
	writeLine("Test 1: 1000 jobs × 10 work units each");
	runScenario("Queue  (array)", () => new Queue(), 1000, 10);
	runScenario("Queue2 (linked-list)", () => new Queue2(), 1000, 10);

	writeLine("Test 2: 2000 jobs × 10 work units each");
	runScenario("Queue  (array)", () => new Queue(), 2000, 10);
	runScenario("Queue2 (linked-list)", () => new Queue2(), 2000, 10);

	writeLine("Test 3: 4000 jobs × 10 work units each");
	runScenario("Queue  (array)", () => new Queue(), 4000, 10);
	runScenario("Queue2 (linked-list)", () => new Queue2(), 4000, 10);

	writeLine("Test 4: Larger scale - 10000 jobs × 10 work units each");
	runScenario("Queue  (array)", () => new Queue(), 10000, 10);
	runScenario("Queue2 (linked-list)", () => new Queue2(), 10000, 10);
}
