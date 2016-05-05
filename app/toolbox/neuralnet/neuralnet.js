function neuralnet(params) {
    'use strict';

    params = params || {};

    const neuron_VERSION = '0.2.0';

    let weights = [],
        trainingInputs = params.trainingInputs,
        trainingOutputs = params.trainingOutputs;

    let traingingOutputVals,
        input = [],
        outputVal = [];

    function sigmoidFn(n) {
        return 1 / ( 1 + Math.exp(-n) );
    }

    function sigmoidDerivativeFn(n) {
        return n * (1 - n);
    }

    function initWeights() {
        if (weights === [] || weights.length != trainingInputs[0].length) {
            _.forEach(trainingInputs[0], function (v,k) {
                addNewWeight(k);
            });
        }
    }

    function addNewWeight(key) {
        weights.push(Math.random());
    }

    function adjustWeights(args) {
        let index = args[0],
            error = args[1],
            temps = [],
            adjustment;

        adjustment = error * sigmoidDerivativeFn(outputVal[index]);

        _.forEach(trainingInputs[index], function (value, key) {
            weights[key] += value * adjustment;
        });
    }

    function trainingProcess() {
        let output = [],
            temps = [];

        let tOutput = trainingOutputs,
            tInput = trainingInputs;

        initWeights();

        _.forEach(tInput, function (value, key) {
            _.forEach(value, function (v, k) {
                temps[key] = !_.isArray(temps[key]) ? [] : temps[key];
                temps[key].push(v * weights[k]);
            });
        });

        _.forEach(temps, function (value) {
            output.push(sigmoidFn(_.sum(value)));
        });

        outputVal = output;

        _.forEach(output, function (v, k) {
            let error = tOutput[k] - v;

            if (error != 0) {
                adjustWeights([k, error]);
            }
        });

        return outputVal;
    }

    function getOutputFrom(input) {
        let set = input || [],
            temps = [],
            output = undefined;

        if (set === [])
            return console.log('Set is underfined.');

        _.forEach(set, function (v, k) {
            temps.push(v * weights[k]);
        });

        output = sigmoidFn(_.sum(temps));

        return output;
    }

    return {
        runTrainingProcess : function (iterations) {
            do {
                trainingProcess();
                iterations -= 1;
            } while (iterations > 0)
        },
        testNewInput: function (input) {
            return getOutputFrom(input);
        }
    };
}
