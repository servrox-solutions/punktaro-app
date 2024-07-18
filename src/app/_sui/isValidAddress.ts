
export function isValidSuiAddress(address: string): boolean {
  // Remove the '0x' prefix if it exists
  const cleanedAddress = address.startsWith('0x') ? address.slice(2) : address;

  // Check if the address is 64 characters long (32 bytes in hexadecimal)
  const isCorrectLength = cleanedAddress.length === 64;

  // Check if the address is a valid hexadecimal
  // const isHexadecimal = isHex(cleanedAddress);

  // Return true if both conditions are met
  return isCorrectLength;
}
