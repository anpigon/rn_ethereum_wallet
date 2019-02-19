import React, { Component } from 'react';
import { StyleSheet, View, Slider, TouchableOpacity, Alert, AsyncStorage, Image, BackHandler, Linking } from 'react-native';
import { Container, Spinner, Content, Header, Card, CardItem, Body, Text, Icon, Button, Left, Right, Thumbnail, Title, Toast, Form, Item, Input, Label } from 'native-base'; 
// import { ethers } from '../assets/complete.png';

export default function(props) {
  // 뒤로 가기 방지
  // BackHandler.addEventListener('hardwareBackPress', () => {
  //   props.navigation.popToTop();
  //   return true
  // });

  let {
    hash,
    network,
    coin,
  } = props.navigation.state.params;

  function goBlockExplorer() {
    switch(coin) {
      case 'ETH':
        if(network==='mainnet') {
          Linking.openURL(`https://etherscan.io/tx/${hash}`);
        } else {
          Linking.openURL(`https://${network||'ropsten'}.etherscan.io/tx/${hash}`);
        }
      break;
    }
    // Linking.openURL(`https://stellar.expert/explorer/testnet/tx/${txId}`);
  }

  return (
    <Container style={styles.container}>
      <Header noLeft>
        {/* <Left /> */}
        <Body>
          <Title>거래 완료</Title>
        </Body>
        {/* <Right /> */}
      </Header>
      <View style={{ flex: 1, marginTop: 50 }}>
        <View style={{ alignItems:'center', justifyContent:'space-evenly', marginHorizontal: 25, height: 300 }}>
          <Icon name='checkcircle' type='AntDesign' style={{color:'#2c952c', fontSize: 150}} />
          <Text>거래가 완료되었습니다.</Text>
          <TouchableOpacity
            onPress={goBlockExplorer}
          >
            <Text note style={{ color:'#07C', textDecorationLine: 'underline' }}>{hash}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginHorizontal: 10, marginBottom: 30 }}>
        <Button block
          onPress={() => { 
            // props.navigation.goBack('WalletInfo');
            // props.navigation.goBack(null);
            // BackHandler.removeEventListener('hardwareBackPress');
            props.navigation.popToTop();
          }}>
          <Text>확인</Text>
        </Button>
      </View>
    </Container>
  )
}

/*
export default class CompleteScreen extends Component {
  static navigationOptions = {
    // header: null,
    title: "완료",
    headerLeft: null,
    // gesturesEnabled: false,
  }

  constructor(props) {
		super(props);

		this.state = {
      hash: props.navigation.state.params
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <View style={{ flex: 1, marginTop: 50 }}>
          <View style={{ alignItems:'center', justifyContent:'space-evenly', marginHorizontal: 25, height: 300 }}>
            <Icon name='checkcircle' type='AntDesign' style={{color:'#2c952c', fontSize: 150}} />
            <Text>거래가 완료되었습니다.</Text>
            <TouchableOpacity>
              <Text note style={{ color:'#07C', textDecorationLine: 'underline' }}>{this.state.hash}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginHorizontal: 10, marginBottom: 30 }}>
          <Button block
            onPress={() => { 
              this.props.navigation.go
            }}>
            <Text>확인</Text>
          </Button>
        </View>
      </Container>
    )
  }
}*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },
});
