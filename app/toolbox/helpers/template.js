function templateMatch(params) {
    'use strict';

    params = params || {};

    let percentTarget,
        percentWords = 0.00,
        percentPos = 0.00,
        input = '',
        templates = [];

    input = params.string;
    templates = params.templates;
    percentTarget = params.confidence || 0.67;

    if(!_.isArray(templates) || !_.isString(input)) {
        return handleError('Templates must be an array and Input must be a string');
    }

    function handleError(e) {
        return console.error("Error: " + e);
    }

    return findTemplate = {
        results: {
            input: '',
            template: '',
            isMatch: false,
            confidence: 0.00
        },
        setInputString: function (str) {
            if(!_.isString(str)) {
                return handleError('Input must be a string');
            }

            input = str || input;
        },
        getInputString: function () {
            return input;
        },
        setTemplates: function (obj) {
            if(!_.isArray(templates)) {
                return handleError('Templates must be an array');
            }

            templates = obj || templates;
        },
        getTemplates: function () {
            return templates;
        },
        getMatchingTemplate: function () {
            let sWords = _.split(_.toLower(input), ' ');

            _.map(templates, function (row) {
                let w = _.split(row, ' '),
                    subW = 0.00,
                    subP = 0.00;

                _.forEach(w, function (value, key) {
                    let i = _.indexOf(sWords, _.toLower(value), key);

                    if(i !== -1 || /%(\w*)%/ig.test(value)) {
                        subW += (1/w.length);

                        if(i !== key) {
                            if(w[key+1] !== undefined && (w[key+1] === sWords[i+1] || /%(\w*)%/ig.test(w[key+1]))) {
                                subP += (1/w.length);
                            }
                        } else {
                            subP += (1/w.length);
                        }
                    }
                });

                if(subW > percentWords) {
                    percentWords = subW;
                    percentPos = subP;
                    this.results.template = row;
                    
                    if(w.length != sWords.length) {
                        percentWords = percentWords * (0.85);
                    }
                }
            });

            this.results.confidence = _.round((percentWords * 0.6) + (percentPos * 0.4), 4);

            if(this.results.confidence >= target)
                this.results.isMatch = true;
        },
        getResults: function () {
            return this.results;
        }
    };
}