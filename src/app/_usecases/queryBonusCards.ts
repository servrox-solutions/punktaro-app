import { BONUS_CARD_STRUCT_TYPE } from '../_config/config';
import { queryAssets } from '../_sui/queryAssets';


interface BonusCard {
  name: string;
  address: string;
  curStamps: number;
  maxStamps: number;
}

export const queryBonusCards = (userAddress: string): Promise<BonusCard[]> => {
    return queryAssets({address: userAddress, assetType: BONUS_CARD_STRUCT_TYPE}).then((suiCards) => 
        suiCards.map(suiCard => ({
            name: suiCard.name,
            address: suiCard.issuer,
            curStamps: suiCard.curStamps,
            maxStamps: suiCard.maxStamps,
        }))
    )
}