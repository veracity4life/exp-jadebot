function getRandomNum(obj) {
    var obj = obj || {},
        type = obj.type || 'gaussian',
        stdev = obj.stdev || 1,
        mean = obj.mean || 0;

    var randGen = {
        limitTheorem: function() {
            var omega = 0;
            for (var i = 0; i < 12; i += 1) {
                omega += Math.random();
            }
            return (omega - 6)/2;
        },
        boxMuller: function() {
            var alpha, beta;
            alpha = 1 - Math.random();
            beta = 1 - Math.random();

            return Math.sqrt(-2 * Math.log(alpha)) * Math.sin((2 * Math.PI) * beta);
        },
        gaussian: function() {
            var alpha, beta, delta, omega;

            do {
                alpha = 2.0 * Math.random() - 1.0;
                beta = 2.0 * Math.random() - 1.0;
                delta = (alpha * alpha) + (beta * beta);
            } while ( delta >= 1.0 || delta == 0 );

            delta = Math.sqrt( (-2 * Math.log(delta))/delta );
            omega = alpha * delta;

            return omega;
        }
    };

    return randGen[type]() * stdev + mean;
}