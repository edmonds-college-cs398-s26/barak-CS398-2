// queueSimulation.js to support week 2 homework
// @ts-check

import { Queue } from "../toolkit/Queue.js";

/**
 * Create an array of jobs.
 * Each job is represented by a positive integer: the number of work units left.
 *
 * Example:
 *   makeJobs(3, 4) -> [4, 4, 4]
 *
 * @param {number} jobCount
 * @param {number} workUnitsPerJob
 * @returns {number[]}
 */
export function makeJobs(jobCount, workUnitsPerJob) {
	if (!Number.isInteger(jobCount) || jobCount < 0) {
		throw new Error("jobCount must be a nonnegative integer.");
	}
	if (!Number.isInteger(workUnitsPerJob) || workUnitsPerJob < 1) {
		throw new Error("workUnitsPerJob must be a positive integer.");
	}

	return Array(jobCount).fill(workUnitsPerJob);
}

/**
 * Run a simple FIFO simulation.
 *
 * Each job is a positive integer representing remaining work units.
 * When a job is dequeued:
 *   - one work unit is processed
 *   - if work remains, the job is enqueued again with one less unit
 *
 * This creates many enqueue/dequeue operations, which makes it useful
 * for testing queue correctness and for rough performance comparisons.
 *
 * @param {number[]} jobs
 * @param {() => {
 *   enqueue: (value: number) => void,
 *   dequeue: () => number | undefined,
 *   isEmpty: () => boolean,
 *   size: () => number
 * }} [createQueue]
 * @returns {{
 *   processedSteps: number,
 *   completedJobs: number,
 *   maxQueueSize: number
 * }}
 */
export function runQueueSimulation(jobs, createQueue = () => new Queue()) {
	const queue = createQueue();

	for (const job of jobs) {
		if (!Number.isInteger(job) || job < 1) {
			throw new Error("Each job must be a positive integer.");
		}
		queue.enqueue(job);
	}

	let processedSteps = 0;
	let completedJobs = 0;
	let maxQueueSize = queue.size();

	while (!queue.isEmpty()) {
		const remainingWork = queue.dequeue();

		if (remainingWork === undefined) {
			throw new Error("Queue returned undefined before reporting empty.");
		}

		processedSteps += 1;

		if (remainingWork > 1) {
			queue.enqueue(remainingWork - 1);
		} else {
			completedJobs += 1;
		}

		maxQueueSize = Math.max(maxQueueSize, queue.size());
	}

	return {
		processedSteps,
		completedJobs,
		maxQueueSize,
	};
}