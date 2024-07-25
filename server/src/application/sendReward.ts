import { SuiClient } from '@mysten/sui/dist/cjs/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';

export async function sendReward(client: SuiClient, recipient: string) {
    const txb = new Transaction();

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

    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from(process.env.PRIVATE_KEY ?? '', 'hex')));


    return client.signAndExecuteTransaction({
        signer: keypair,
        transaction: txb,
    });
}
