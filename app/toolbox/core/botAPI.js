function botAPI(params) {
    'use strict';

    params = params || {};

    const bot_VERSION = '0.1.0';
    const bot_REGEX = function () {
        return {
            'order': new RegExp('(' + bot_name + ')[,\\s]+(\\S+)[,\\s]*([\\S+\\s]*)')
        }
    }

    let bot_obj = {};
    let bot_name = params.name || 'Jadebot',
        bot_exp = 0.00,
        bot_conversation = [];

    return bot_obj = {
        order: function (args) {
            return this.action(args);
        },
        action: function (args) {
            if (_.isString(args)) {
                let matches = args.match(bot_REGEX().order);

                return this.actionExecute({
                    'fn': matches[2],
                    'options': _.split(matches[3], /[,\s]+/)
                })
            }
        },
        actionExecute: function (args) {
            let fn = args.fn || 'actionError',
                options = args.options || {};

            if (fn === 'actionNotFound')
                options = {'msg': "Action not found or error executing."};

            return this[fn](options);
        },
        actionError: function (args) {
            return console.error(args.msg);
        },
        getBotExp: function () {
            return bot_exp;
        },
        updateBotExp: function (args) {
            if (args[0] == 'set')
                bot_exp = _.toNumber(args[1]);

            if (args[0] == 'update')
                bot_exp += _.toNumber(args[1]);

            bot_exp = _.round(bot_exp, 2);

            return this.getBotExp();
        },
        createConversation: function () {
            
        }
    };
}