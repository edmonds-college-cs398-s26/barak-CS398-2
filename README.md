# week2
simple structure for JS-based algorithmic problem solutions

week 2: to support demo solution for Queue and stack

NOTE: 
``` javascript
// Stack in JS: arrays are a natural fit
const stack = [];
stack.push(10);
stack.push(20);
console.log(stack.pop()); // 20
```

run from terminal in Codespaces:
   python3 -m http.server 8080

## Reflection
I went to town with Claude code on this one. I first asked about additional tests we could run for Queue.js and it suggested 8 tests (5 more than I thought of off the top of my head.) I had it generate the code and then I read over each test function to make sure I understood what was going on (pretty straightforward). 

Next I wrote basic instructions for implementing the queue as a linked list (which can be seen in the Queue2.js comments) and had Claude generate that code. It all looked good. At this point I was distracted, but I had it generate test code for Queue2. Somehow it broke the site and I wasted time debugging it. I was really distracted at this time (riding the bus) so I reset the repo to the last commit so that I could start over with the tests. This was a good experience! Generating code while distracted is as dangerous (or more dangerous) than writing code while distracted.

Finally I had Claude generate benchmark code and then had it print the results on the front end, rather than just the console log. The linked list implementation performs faster than the array implementation, as expected.
