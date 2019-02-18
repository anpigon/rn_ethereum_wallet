import React from 'react';
import { Root } from "native-base";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import WalletsScreen from './components/WalletsScreen';
import CreateWalletScreen from './components/CreateWalletScreen';
import WalletInfoScreen from './components/WalletInfoScreen';
import ReceiveScreen from './components/ReceiveScreen';
import SendScreen from './components/SendScreen';
import ConfimTxScreen from './components/ConfimTxScreen';
import CompleteScreen from './components/CompleteScreen';
import ImportWalletScreen from './components/ImportWalletScreen';
// import IntroScreen from './components/IntroScreen';

const AppStackNavigator = createStackNavigator({
  // Intro: { screen: IntroScreen,  },
  Wallets: { screen: WalletsScreen,  },
	CreateWallet: { screen: CreateWalletScreen },
  WalletInfo: { screen: WalletInfoScreen },
  ReceiveScreen: { screen: ReceiveScreen },
  SendScreen: { screen: SendScreen },
  ConfimTx: { screen: ConfimTxScreen, }, //
  ImportWallet: { screen: ImportWalletScreen, },
  CompleteScreen: { screen: CompleteScreen, navigationOptions: { title: '완료', headerLeft: null } },
}, 
{
  defaultNavigationOptions: {
    header: null,
    headerBackTitle: null, // 뒤로가기 버튼 타이틀 없음.
  },
});

const AppContainer = createAppContainer(AppStackNavigator);

export default () => (
  <Root>
    <AppContainer />
  </Root>
);