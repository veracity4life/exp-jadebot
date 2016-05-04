function botAPI(params) {
    'use strict';

    params = params || {};

    const bot_VERSION = '0.1.0';
    const bot_REGEX = function () {
        return {
            'order': new RegExp('(' + bot_name + ')[,\\s]+(\\S+)[,\\s]*([\\S+\\s]*)')
        }
    };

    let definedResponses = {
        "templates": [
            "What is your favorite color?",
            "What purpose do you have?",
            "Are you a learning bot?",
            "Do you have any api connections?"
        ],
        "responses": [
            "I am technically colorblind but if I had to pick one it would be Circuit board green.",
            "My purpose is to respond to your inquiries.",
            "As of now my functionality is very limited. So the answer is no.",
            "No current api connections found, let me know if if you have one for me."
        ]
    };

    let bot_obj = {};
    let bot_name = params.name || 'Jadebot',
        bot_exp = 0.00,
        bot_conversation = params.conversation || [];

    let currentContext = {};

    function actionExecute(args) {
        let fn = args.fn || 'actionError',
            options = args.options || {};

        if (fn === 'actionError')
            options = {'msg': "Action not found or error executing."};

        return [fn](options);
    }

    function actionError(args) {
        return console.error(args.msg);
    }

    function getBotExp() {
        return bot_exp;
    }

    function updateBotExp(args) {
        if (args[0] == 'set')
            bot_exp = _.toNumber(args[1]);

        if (args[0] == 'update')
            bot_exp += _.toNumber(args[1]);

        bot_exp = _.round(bot_exp, 2);

        return getBotExp();
    }

    function beginConversation() {
        let conv = {};

        conv.recipient = undefined;
        conv.memory = [{
            'author': bot_name,
            'msg': 'Hello my name is ' + bot_name + ', how may I be of assistance?'
        }];

        bot_conversation.push(conv);
        currentContext.recipient = conv.recipient;
        currentContext.conversationID = bot_conversation.length-1;
        return conv.memory[0].msg;
    }

    function addToConversation(args) {
        let memoryItem = {};

        memoryItem = {
            'author': args[0],
            'msg': args[1]
        };

        bot_conversation[currentContext.conversationID].memory.push(memoryItem);
    }

    function replyToConversation(args) {
        let results = {},
            response = 'I could not find a template match for a proper response.';
        let temp = templateMatch({
            'string': args,
            'templates': definedResponses.templates,
            'confidence': 0.75
        });

        temp.getMatchingTemplate();
        results = temp.getResults();

        if (results.isMatch)
            response = definedResponses.responses[results.templateId];

        return response;
    }

    function getConversation() {
        return console.debug(bot_conversation);
    }

    return bot_obj = {
        order: function (args) {
            return this.action(args);
        },
        action: function (args) {
            if (_.isString(args)) {
                let matches = args.match(bot_REGEX().order);

                return actionExecute({
                    'fn': matches[2],
                    'options': _.split(matches[3], /[,\s]+/)
                })
            }
        },
        converse: function (args) {
            let response = currentContext.recipient + ", how may I help you?";

            if (currentContext.conversationID === undefined) {
                return response = beginConversation();
            }

            if (_.isString(args)) {
                addToConversation([currentContext.recipient, args]);
                return response = replyToConversation(args);
            }

            return response;
        }
    };
}