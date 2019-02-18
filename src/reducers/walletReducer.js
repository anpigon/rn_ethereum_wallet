import { createAction, handleActions } from 'redux-actions';
import { AsyncStorage } from 'react-native';
import Storage from '../storage';

// 액션 타입을 정의해줍니다.
const LOADED_WALLETS = 'wallet/loadedWallets';

// 지갑 등록
const STORE_WALLET_START = 'addWallet/storeWalletStart';
const STORE_WALLET_OK = 'addWallet/storeWalletOk';
const STORE_WALLET_FAIL = 'addWallet/storeWalletFail';

// 액션 생성 함수를 만듭니다.
export const _loadedWallets = createAction(LOADED_WALLETS);
// export const _storeWalletFail = createAction(STORE_WALLET_FAIL);

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
		dispatch({ type: STORE_WALLET_START });

		// setTimeout(async () => {
			try {
				// 지갑 저장
				const wallets = await Storage.addWallet(wallet);

				dispatch({ 
					type: STORE_WALLET_OK, 
					payload: wallets
				});
			} catch (error) {
				console.log(error);
				dispatch({
					type: STORE_WALLET_FAIL,
					payload: error
				});
			}
		// }, 10000)
	}
}

// 초기 State를 정의합니다.
const initialState = {
	loaded: false, 	// 지갑 불러오기 완료 여부
	// busy: false,
	// error: null,
	// walletCount: 0,	// 지갑 갯수
	wallets: {},			// 지갑 데이터
	
	addWallet: {
		busy: false,
		error: null,
	}
}

// 리듀서 함수를 정의합니다.
export default handleActions({
  [LOADED_WALLETS]: (state, action) => {
		let loadedWallets = action.payload;
		// let loadedWalletCount = Object.keys(loadedWallets).length;
    return {
			...state,
			loaded: true,
			// walletCount: loadedWalletCount,
      wallets: {
        ...state.wallets,
        ...loadedWallets
			}
    };
	},
	[STORE_WALLET_START]:  (state, action) => {
		return {
			...state,
			addWallet: {
				busy: true,
				error: null,
			}
		}
	},
	[STORE_WALLET_OK]:  (state, action) => {
		return {
			...state,
			wallets: {
        ...state.wallets,
        ...action.payload,
			},
			addWallet: {
				busy: false,
				error: null,
			}
		}
	},
	[STORE_WALLET_FAIL]:  (state, action) => {
		return {
			...state,
			addWallet: {
				busy: false,
				error: action.payload,
			}
		}
	},
}, initialState);