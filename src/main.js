import { clearOutput, printSummary, runTests as runHarnessTests } from "./toolkit/test.js";
import { runTests as runQueueTests } from "./toolkit/Queue.test.js";
import { runTests as runQueue2Tests } from "./toolkit/Queue2.test.js";

clearOutput();

console.log("=== Running Queue Tests ===");
runHarnessTests();
runQueueTests();

console.log("\n=== Running Queue2 Tests ===");
runQueue2Tests();

printSummary();
