import { createStackNavigator, createAppContainer } from 'react-navigation';
import WalletsScreen from './components/WalletsScreen';
import CreateWalletScreen from './components/CreateWalletScreen';

const AppStackNavigator = createStackNavigator({
	Wallets: { screen: WalletsScreen },
	CreateWallet: { screen: CreateWalletScreen },
}, 
{
  defaultNavigationOptions: {
    headerBackTitle: null, // 뒤로가기 버튼 타이틀 없음.
  },
});

export default createAppContainer(AppStackNavigator);