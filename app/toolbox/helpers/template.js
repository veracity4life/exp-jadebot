function getTemplateMatch(templates, string) {
    let target = 0.66,
        percentWords = 0.00,
        percentPos = 0.00;

    let returnVal = {
            string: string,
            template: '',
            hasMatch: false,
            confidence: 0.00
        };

    let sWords = _.split(_.toLower(string), ' ')

    if(!_.isArray(templates) || !_.isString(string)) {
        return console.debug("Templates or String args not of correct type.");
    }

    _.map(templates, function (row) {
        let w = _.split(row, ' '),
            subW = 0.00,
            subP = 0.00;

        _.forEach(w, function (value, key) {
            let i = _.indexOf(sWords, _.toLower(value), key);

            if(i !== -1 || /%(\w*)%/ig.test(value)) {
                subW += (1/w.length);

                if(i !== key) {
                    if(w[key+1] != undefined && (w[key+1] === sWords[i+1] || /%(\w*)%/ig.test(w[key+1]))) {
                        subP += (1/w.length);
                    }
                } else {
                    subP += (1/w.length);
                }
            }
            // console.debug({row:row, i:i, value:value, subW:subW, subP:subP});
        });

        if(subW > percentWords) {
            percentWords = subW;
            percentPos = subP;
            returnVal.template = row;
            
            if(w.length != sWords.length) {
                percentWords = percentWords * (.85);
            }
        }
    });

    returnVal.confidence = _.round((percentWords * .6) + (percentPos * .4), 4);
    // console.debug(returnVal);

    if(returnVal.confidence >= target)
        returnVal.hasMatch = true;

    return returnVal;
}