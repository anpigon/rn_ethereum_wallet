import { createAction, handleActions } from 'redux-actions';
import { AsyncStorage } from 'react-native';

// 액션 타입을 정의해줍니다.
const LOADED_WALLETS = 'wallet/loadedWallets';
const GET_WALLET = 'wallet/getWallet';
const ADD_WALLET = 'wallet/addWallet';
const MOD_WALLET = 'wallet/modWallet';
const DEL_WALLET = 'wallet/delWallet';

// 액션 생성 함수를 만듭니다.
export const _loadedWallets = createAction(LOADED_WALLETS);

// Storage에서 지갑 정보를 가져온다.
export const loadWallets = () => {
	return (dispatch, state) => {
		AsyncStorage.getItem('WALLETS').then(wallets => {
			console.log('loadWallets', wallets);
			dispatch(_loadedWallets(JSON.parse(wallets) || {}));
		});
	}
}

// 초기 State를 정의합니다.
const initialState = {
	loaded: false,
  wallets: []
}

// 리듀서 함수를 정의합니다.
export default handleActions({
  [LOADED_WALLETS]: (state, action) => {
    return {
			...state,
			loaded: true,
      wallets: {
        ...state.wallets,
        ...action.payload
			}
    };
  },
}, initialState);