import { AsyncStorage } from 'react-native';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";

const Collections = {
  WALLETS: 'WALLETS'
}

export default class Storage {
  // 지갑 목록 조회
  static getWallets = () => {
    return AsyncStorage.getItem(Collections.WALLETS)
      .then(wallets => JSON.parse(wallets) || {});
  }

  static addWallet = async (wallet) => {
    try {
      // 기존 지갑 목록 가져오기
      const wallets = await Storage.getWallets()

      // 기존에 있는 지갑인지 체크
      // console.log(wallets.map(w => w.coin+w.address));

      const { id, privateKey } = wallet;

      // 지갑 개인키 저장
      await Storage.storeSecret(id, privateKey);
      delete wallet['privateKey'];
      
      // 지갑 저장
      wallets[id] = wallet;
      await AsyncStorage.setItem(Collections.WALLETS, JSON.stringify(wallets));
      // console.log('wallets', JSON.stringify(wallets));
      return wallets;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  static storeSecret(key, value) {
    return RNSecureKeyStore.set(key, value, {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY});
  }
}