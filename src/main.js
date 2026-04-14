import { clearOutput, printSummary, runTests as runHarnessTests } from "./toolkit/test.js";
import { runTests as runQueueTests } from "./toolkit/Queue.test.js";

clearOutput();

runHarnessTests();
runQueueTests();

printSummary();
