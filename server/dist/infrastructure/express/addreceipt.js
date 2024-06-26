"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReceipt = void 0;
const ocr_1 = require("../../application/ocr");
const sendReward_1 = require("../../application/sendReward");
const addReceipt = (client) => async (req, res) => {
    const { account } = req.body;
    const { receipt } = req.files ?? {};
    if (!account || !receipt || Array.isArray(receipt)) {
        res.sendStatus(404);
        return;
    }
    const receiptData = await (0, ocr_1.createInvoice)(receipt.data);
    if ((0, ocr_1.isError)(receiptData)) {
        res.sendStatus(400);
        return;
    }
    (0, sendReward_1.sendReward)(client, account).then(result => {
        res.send({ result: result, data: receiptData });
    }).catch(err => {
        console.error(err);
        res.send({ error: 'cannot parse send reward' });
    });
};
exports.addReceipt = addReceipt;
