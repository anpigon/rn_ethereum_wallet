import { createStackNavigator, createAppContainer } from 'react-navigation';
import WalletsScreen from './components/WalletsScreen';
import CreateWalletScreen from './components/CreateWalletScreen';


import WalletInfoScreen from './components/WalletInfoScreen';

const AppStackNavigator = createStackNavigator({
  Wallets: { screen: WalletsScreen },
	CreateWallet: { screen: CreateWalletScreen },
  WalletInfo: { screen: WalletInfoScreen },
}, 
{
  defaultNavigationOptions: {
    headerBackTitle: null, // 뒤로가기 버튼 타이틀 없음.
  },
});

export default createAppContainer(AppStackNavigator);