import React from 'react';
import { Root } from "native-base";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import WalletsScreen from './components/WalletsScreen';
import CreateWalletScreen from './components/CreateWalletScreen';
import WalletInfoScreen from './components/WalletInfoScreen';
import ReceiveScreen from './components/ReceiveScreen';
import SendScreen from './components/SendScreen';

const AppStackNavigator = createStackNavigator({
  Wallets: { screen: WalletsScreen },
	CreateWallet: { screen: CreateWalletScreen },
  WalletInfo: { screen: WalletInfoScreen },
  ReceiveScreen: { screen: ReceiveScreen },
  SendScreen: { screen: SendScreen },
}, 
{
  defaultNavigationOptions: {
    headerBackTitle: null, // 뒤로가기 버튼 타이틀 없음.
  },
});

const AppContainer = createAppContainer(AppStackNavigator);

export default () => (
  <Root>
    <AppContainer />
  </Root>
);