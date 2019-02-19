// 이더리움 주소 체크
export const checkAddress = (address) => {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return false;
  }
  // else if (/^(0x|0X)?[0-9a-f]{40}$/.test(address) || /^(0x|0X)?[0-9A-F]{40}$/.test(address)) {
  // 	return true;
  // }
  return true;
};