import { SuiClient } from '@mysten/sui/client';
import { useEffect, useState } from 'react';

export function usePunktaroBalance(address: `0x${string}`, refreshTimeMs = 5000) {
    const [balance, setBalance] = useState(0);

    useEffect(() => {    
        fetchPunktaroBalance(address).then(b => setBalance(b));    
        const intervalId = setInterval(() => {
            fetchPunktaroBalance(address).then(b => setBalance(b));    
        }, refreshTimeMs);
        return () => clearInterval(intervalId);
    });

    return balance;
}

export function fetchPunktaroBalance(owner: string): Promise<number> {
    if (!owner) {
        return Promise.resolve(0);
    }
    const suiClient = new SuiClient({ url: process.env.REACT_APP_SUI_API_ENDPOINT ?? '' });
    return suiClient.getOwnedObjects(
        {
            owner,
            filter: {
                MatchAll: [{ StructType: '0x2::token::Token<0x989111ab58677ffbd5a8353431757ccf8cc405391e944d4a94f0853cdf6969d8::punktaro_token::PUNKTARO_TOKEN>' }]
            },
            options: {
                showContent: true,
            }
        },
    ).then(res => {
        return res.data.reduce((prev, cur) => {
            const res = prev + parseInt((cur.data?.content as any)?.fields?.balance, 10) ?? 0;
            return res;
        }, 0);
    });
}
