import { SUI_API_ENDPOINT } from '../_config/config';
import { SuiClient } from '@mysten/sui/client';

interface Id {
  id: string;
}

interface BonusCard {
  curStamps: number;
  id: Id;
  issuer: string;
  lastStamp: string;
  maxStamps: number;
  name: string;
  tags: string[];
}

interface QueryAssetsOptions {
  address: string;
  assetType: string;
}

export async function queryAssets(options: QueryAssetsOptions): Promise<BonusCard[]> {
  const suiClient = new SuiClient({ url: SUI_API_ENDPOINT });
  return suiClient.getOwnedObjects({
    owner: options.address,
    filter: {
      MatchAll: [
        {
          StructType: options.assetType,
        }
      ]
    },
    options: {
      showType: true,
      showContent: true,
    }
  }).then(res => res.data.map(data => (data.data?.content as any)?.fields as BonusCard));
}