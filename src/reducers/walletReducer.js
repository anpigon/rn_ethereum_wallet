import { createAction, handleActions } from 'redux-actions';

// 액션 타입을 정의해줍니다.
const GET_WALLETS = 'wallet/getWallets';
const GET_WALLET = 'wallet/getWallet';
const ADD_WALLET = 'wallet/addWallet';
const MOD_WALLET = 'wallet/modWallet';
const DEL_WALLET = 'wallet/delWallet';

// 액션 생성 함수를 만듭니다.
export const getWallets = createAction(GET_WALLETS);

// export const getWallets = () => {
//   return (dispatch, state) => {
// 		dispatch(_getWallets(res.result))
// 	}
// }

// 초기 State를 정의합니다.
const initialState = {
  wallets: []
}

// 리듀서 함수를 정의합니다.
export default handleActions({
  [GET_WALLETS]: (state, action) => {
    state = {
      ...state,
      wallets: [
        ...state.wallets,
        ...action.payload
      ]
    }
    return state;
  },
}, initialState);