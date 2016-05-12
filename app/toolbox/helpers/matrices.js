function matrices() {

    function rowXvalue(row, value) {
        var i = 0,
            cols = row.length,
            result = [];

        for ( ; i < cols; i += 1) {
            result.push(row[i] * value);
        }

        return result;
    }

    return {
        newFillRandom: function(params) {
            var tmp = [],
                params = params || {},
                rows = params.rows || 3,
                cols = params.cols || 1,
                type = params.type || 'gaussian';
        
            for (var r = 0; r < rows; r++) {
                tmp[r] = []
                for (var c = 0; c < cols; c++) {
                    tmp[r].push((Math.random() + Math.random())/2);
                }
            }
        
            return tmp;
        },
        multiply: function(a, b) {
            var iA, iB, resultMatrix = [];

            if (a[0].length != b.length)
                return console.error('Matrices are not compatible for multiplication.');

            resultMatrix = new Array(a.length);

            for (var iR = 0; iR < resultMatrix.length; iR += 1) {
                resultMatrix[iR] = new Array(b[0].length);
            }

            for ( iB = 0; iB < b.length; iB += 1) {
                for ( iA = 0 ; iA < a.length; iA += 1) {
                    var tmparr = rowXvalue(b[iB], a[iA][iB]);

                    for (var iT = 0; iT < tmparr.length; iT += 1) {
                        resultMatrix[iA][iT] = isNaN(resultMatrix[iA][iT]) ? tmparr[iT] : resultMatrix[iA][iT] + tmparr[iT];
                    }
                }
            }

            return resultMatrix;
        }
    }
}