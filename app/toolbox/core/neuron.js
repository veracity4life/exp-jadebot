function neuron(params) {
    let weights = {};
    let outputWeights = [];
    let dendrites = null;
    let layer = [];

    function init() {
        dendrites = (dendrites == null ? params.inputs : dendrites);

        if(layer.length < 1) {
            for (let i = 0; i < params.layers; i++) {
                layer[i] = [];
                outputWeights[i] = Math.random();
            }
        }

        for (let w in weights) {
            if (weights.hasOwnProperty(w) && weights[w] == null) {
                weights[w] = Math.random();
            }
        }
    }

    function sigmoidFn(n) {
        return 1 / ( 1 + Math.exp(-n) );
    }

    function nucleus() {
        if (dendrites == null)
            init();

        let returnVal = 0;

        for (let i = 0; i < layer.length; i++) {
            for (var j in dendrites) {
                if (dendrites.hasOwnProperty(j)) {
                    if (weights[i] == undefined)
                        weights[i] = {};

                    if (weights[i][j] == undefined)
                        weights[i][j] = Math.random();

                    layer[i].push(dendrites[j] * weights[i][j]);
                }
            }

            let sum = 0;
            for (var k = 0; k < layer[i].length; k++) {
                sum += layer[i][k];
            }

            layer[i] = sigmoidFn(sum);
            returnVal += (layer[i] * outputWeights[i]);
        }

        return sigmoidFn(returnVal);
    }

    return nucleus();
}