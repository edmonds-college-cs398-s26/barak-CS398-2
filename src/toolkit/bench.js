// @ts-check

/**
 * Measure a function several times and report the individual timings.
 *
 * @param {() => void} fn
 * @param {number} [runs]
 * @returns {{ times: number[], medianMs: number }}
 */
export function benchmark(fn, runs = 5) {
  if (!Number.isInteger(runs) || runs < 1) {
    throw new Error("runs must be a positive integer.");
  }

  const times = [];

  for (let index = 0; index < runs; index += 1) {
    const start = performance.now();
    fn();
    times.push(performance.now() - start);
  }

  const sortedTimes = [...times].sort((a, b) => a - b);
  const middle = Math.floor(sortedTimes.length / 2);
  const medianMs =
    sortedTimes.length % 2 === 0
      ? (sortedTimes[middle - 1] + sortedTimes[middle]) / 2
      : sortedTimes[middle];

  return {
    times,
    medianMs,
  };
}