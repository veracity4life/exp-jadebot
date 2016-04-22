function Jadebot() {
    this.NAME = 'Jadebot';
    this.VERSION = '0.0.4';

    this.context = 'greeting';

    this.definitions = {
        name: {
            filter: {
                templates: [
                    '%name% is the name',
                    'name is %name%',
                    'i\'m %name%',
                    'call me %name%'
                ],
                words: []
            },
            log: {
                names: [],
                responses: [],
                words: []
            },
            findName: function (response) {
                let w = _.words(_.toLower(response));
                let n = "";

                n = _.pullAll(w, this.filter.words);
                n = _.join((n.length > 1 ? _.takeRight(n) : n), " ");

                this.insertLog(_.toLower(response), n);

                return _.capitalize(n);
            },
            insertLog: function (response, name) {
                let r = _.replace(response, name, "");
                let scope = this;
                this.log.responses.push({response, name});
                this.log.names.push(name);

                _.map(_.words(r), function (n) {
                    if(_.indexOf(scope.log.words, n) === -1) {
                        scope.log.words.push(n);
                    }
                });
            },
            updateFilter: function (arr) {
                this.filter.words = _.union(this.filter.words, arr);
                this.filter.words = _.pullAll(this.filter.words, this.log.names);
            },
            addToFilter: function (str) {
                this.filter.words.push(str);
            },
            sliceRecentName: function () {
                let n = this.log.names.pop();

                return n;
            }
        }
    };

    this.defaults = {
        "greeting": "Hello, My name is Jadebot. What is your name?",
        "exp": 0
    };
}

// @param integer val
Jadebot.prototype.increaseExp = function (val) {
    this.exp += val;
};

// @param integer val
Jadebot.prototype.decreaseExp = function (val) {
    this.exp -= val;
};

Jadebot.prototype.getExp = function () {
    return this.exp;
};


Jadebot.prototype.addToRule = function (definition) {
    if (_.has(this.definitions, definition)) {
        _.concat(this.definitions[definition], regex);
    } else {
        return this.showError("No definition found for { " + definition + " }, try `addNewDefinition` if trying to add a new definition.");
    }
};

// @param array || string args
Jadebot.prototype.showError = function (args) {
    if(!_.isArray(args)) {
        return console.error(this.NAME + " Error! : " + args);
    }
};

Jadebot.prototype.getGreeting = function () {
    let greeting = this.defaults.greeting;
    if(!_.isUndefined(this.learnedGreeting) && !_.isNull(this.learnedGreeting)) {
        greeting = this.learnedGreeting;
    }

    return (greeting);
};

Jadebot.prototype.conversation = function (conv) {
    let msg = "";

    if(this.context == 'greeting') {
        this.context = 'question';
        return this.findName(conv);
    }

    if(this.context == 'question') {
        this.context = 'greeting';
        if(_.toLower(conv) == "yes" || _.toLower(conv) == "y") {
            this.definitions.name.updateFilter(this.definitions.name.log.words);
            msg = "The updateFilter completed. I am returning to the greeting context. Please tell me your name?";
        } else {
            this.definitions.name.addToFilter(this.definitions.name.sliceRecentName());
            msg = "Update filter was not run, I apologize for being wrong, what is your name again?";
        }
    }

    return msg;
};

Jadebot.prototype.findName = function (name) {
    return "Hello " + this.definitions.name.findName(name) + ", if i got your name right can I update the filter?";
};