import { Request, Response } from 'express';
import { SuiClient } from '@mysten/sui/dist/cjs/client';
import { createInvoice, isError } from '../../application/ocr';
import { sendReward } from '../../application/sendReward';

export const addReceipt = (client: SuiClient) => async (req: Request, res: Response) => {
    const {account} = req.body;
    const {receipt} = req.files ?? {};
    if (!account || !receipt || Array.isArray(receipt)) {
        res.sendStatus(404);
        return;
    }

    const receiptData = await createInvoice(receipt.data);
    if (isError(receiptData)) {
        res.sendStatus(400);
        return;
    }

    sendReward(client, account).then(result => {
        res.send({result: result, data: receiptData});
    }).catch(err => {
        console.error(err);
        res.send({error: 'cannot parse send reward'});
    });    
}