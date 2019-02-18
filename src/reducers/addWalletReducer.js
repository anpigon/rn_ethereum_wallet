import { createAction, handleActions } from 'redux-actions';
import { AsyncStorage } from 'react-native';
import Storage from '../storage';

// 액션 타입을 정의해줍니다.
const STORE_WALLET_START = 'addWallet/storeWalletStart';
const STORE_WALLET_OK = 'addWallet/storeWalletOk';
const STORE_WALLET_FAIL = 'addWallet/storeWalletFail';

// Storage에서 지갑 정보를 가져온다.
export const loadWallets = () => {
	return async (dispatch, getState) => {
		let wallets = await Storage.getWallets();
		dispatch(_loadedWallets(wallets));
	}
}

// 지갑을 저장합니다.
export const storeWallet = (wallet) => {
	return async (dispatch, getState) => {
		// console.log('wallet', wallet);
		try {
      dispatch({ type: STORE_WALLET_START });

			// 지갑 저장
			await Storage.addWallet(wallet);
			// console.log(await Storage.getWallets());
      
      // dispatch({ type: 'wallet/loadedWallets' });
			dispatch({ type: STORE_WALLET_OK });
		} catch (error) {
			console.log(error);
			dispatch({
				type: STORE_WALLET_FAIL,
				payload: error
			});
		}
	}
}

// 초기 State를 정의합니다.
const initialState = {
    busy: false,
    error: null,
}

// 리듀서 함수를 정의합니다.
export default handleActions({
  [STORE_WALLET_START]:  (state, action) => {
		return {
			...state,
			busy: true,
			error: null,
		}
	},
	[STORE_WALLET_OK]:  (state, action) => {
		return {
			...state,
			busy: false,
			error: null,
		}
	},
	[STORE_WALLET_FAIL]:  (state, action) => {
		return {
			...state,
			busy: false,
			error: action.payload,
		}
	},
}, initialState);