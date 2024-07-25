"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewardAccountHandler = void 0;
const sendReward_1 = require("../../../application/sendReward");
const rewardAccountHandler = (client) => (req, res) => {
    const account = req.params.account;
    if (!account) {
        res.sendStatus(404);
        return;
    }
    (0, sendReward_1.sendReward)(client, account).then(result => {
        res.send(result);
    }).catch(err => res.send(err));
};
exports.rewardAccountHandler = rewardAccountHandler;
