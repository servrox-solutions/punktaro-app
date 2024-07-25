"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendReward = sendReward;
const ed25519_1 = require("@mysten/sui/keypairs/ed25519");
const transactions_1 = require("@mysten/sui/transactions");
async function sendReward(client, recipient) {
    const txb = new transactions_1.Transaction();
    const treasuryCapId = process.env.TREASURY_CAP_ID ?? '';
    const amount = 100;
    // Add the transaction call
    txb.moveCall({
        target: `${process.env.MODULE_ID}::punktaro_token::reward`,
        arguments: [
            txb.object(treasuryCapId),
            txb.pure.u64(amount),
            txb.pure.address(recipient)
        ]
    });
    txb.setGasBudget(10000000);
    const keypair = ed25519_1.Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from(process.env.PRIVATE_KEY ?? '', 'hex')));
    return client.signAndExecuteTransaction({
        signer: keypair,
        transaction: txb,
    });
}
