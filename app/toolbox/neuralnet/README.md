# neuralnet.js
**v0.2.0**

Simple implementations of Neural Networks and learning systems

## Implementation

Using ```neuralnet.js``` to test a simple neural network implementation.
```
var n = neuralnet({
    "trainingInputs": [[0,0,1],[1,1,1],[1,0,1],[0,1,1]],
    "trainingOutputs": [0,1,1,0]
    });
n.runTrainingProcess(10000);
n.testNewInput([1,0,0]);
```
Output for the test after 10,000 iterations is expected to be 1.  Actual returned value is approx ```0.99993``` so its very close after that many iterations.

I cannot take full credit as I basically converted this post into my own JS version:

[How to build a simple neural network in 9 lines of python code](https://medium.com/technology-invention-and-more/how-to-build-a-simple-neural-network-in-9-lines-of-python-code-cc8f23647ca1#.o8cp4gd5l)
