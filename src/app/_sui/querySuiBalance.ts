import { SUI_API_ENDPOINT } from '../_config/config';
import { SuiClient } from '@mysten/sui/client';

export async function querySuiBalance(address: string): Promise<string> {
  const suiClient = new SuiClient({ url: SUI_API_ENDPOINT });
  return suiClient.getBalance({owner: address}).then(res => res.totalBalance);
}