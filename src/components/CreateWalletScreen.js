import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, Clipboard, Platform } from 'react-native';
import { Container, Content, Card, CardItem, Text, Button, Form, Item, Textarea, Picker, Toast, Icon, Header, Left, Body, Title, Right, Alert, Label, Input } from 'native-base'; 
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import bip39 from 'react-native-bip39';
import bip32 from 'bip32';
import ethUtil from 'ethereumjs-util';
import { ethers } from 'ethers';
import { randomBytes } from 'react-native-randombytes'

// import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import LoadingView from './LoadingView';

import Wallet from '../model/wallet'
import { storeWallet } from '../reducers/walletReducer'

class CreateWalletScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ready: false,
			mnemonic: null,
			network: 'mainnet',
			walletName: '',
			loading: false,
		}
	}

	componentWillMount() {

		let walletName = `이더리움`;
		// console.log(Object.values(this.props.wallets).filter(w => (w.coin === 'ETH')).length);
		let seq = Object.values(this.props.wallets).filter(w => (w.coin === 'ETH')).length;
		if( seq ) {
			walletName = `${walletName}_${seq}`;
		}

		// 니모닉 생성
		randomBytes(16, (error, bytes) => {
			const mnemonic = ethers.utils.HDNode.entropyToMnemonic(bytes, ethers.wordlists.en);
			this.setState({ 
				mnemonic: mnemonic,
				walletName: walletName,
				ready: true,
			})
		});


  }
  
  componentWillReceiveProps(nextProps) {
		if(!nextProps.busy) {

			this.setState({ loading: false });

			if(nextProps.error) {
				Alert.alert('에러', nextProps.error.message);
			} else {
				// 지갑 생성이 완료되면 현재 화면을 종료하고 지갑 목록 화면으로 이동한다.
				this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Wallets' })], 0)
			}
		}
  }

	createWallet = () => {

		this.setState({ loading: true });

		// 마스터 키 생성
		const seed = bip39.mnemonicToSeed(this.state.mnemonic);
		const root = bip32.fromSeed(seed);

		// 이더리움 차일드 개인키 생성
    const derivePath = "m/44'/60'/0'/0/0";
    const xPrivKey = root.derivePath(derivePath);
    const privateKey = xPrivKey.privateKey.toString('hex');
    
    // 이더리움 주소 생성
    let address = ethUtil.pubToAddress(xPrivKey.publicKey, true).toString('hex');
    address = ethUtil.toChecksumAddress(address).toString('hex');

    const wallet = new Wallet({
      name: this.state.walletName,
      coin: 'ETH',
      symbol: 'ETH',
      address,
      derivePath,
      privateKey
    });

		setTimeout(() => {
			// 지갑 저장
			this.props.storeWallet(wallet);
		}, 100);
	}

  render() {
    return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent
							onPress={() => this.props.navigation.goBack()}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title>지갑 만들기</Title>
					</Body>
					<Right />
				</Header>
				<View style={{ flex: 1, padding: 10, justifyContent: 'space-between'}}>
					<View>
						<Text note style={{paddingVertical: 10}}>
							아래 12개 니모닉을 복사하여 백업하세요. 지갑을 복구하는데 매우 중요한 데이터입니다.
						</Text>
						<Form>
							<Textarea 
								rowSpan={4} 
								bordered 
								editable={false} 
								style={styles.mnemonic}
								value={this.state.mnemonic} />
							<Button 
								bordered block small 
								style={{marginTop:5, borderColor:'#BBB' }}
								onPress={() => {
									Clipboard.setString(this.state.mnemonic);
									Toast.show({
										text: "니모닉 복사가 완료되었습니다.",
										position: "bottom",
										duration: 1000
									});
								}}><Text>복사하기</Text></Button>
						
							<View style={{marginTop: 20, padding: 10}}>
								<Text note>옵션</Text>
								<Item picker underline={false}>
									<Label>
										{/* <Icon name="wallet" style={{fontSize: 20,}} type="MaterialCommunityIcons" />  */}
										지갑이름</Label>
									<Input 
										onChangeText={(walletName) => this.setState({ walletName })}
										value={this.state.walletName} />
								</Item>
								<Item picker>
									<Label>
										{/* <Icon name="server-network" type="MaterialCommunityIcons" style={{fontSize: 20, }}/>  */}
										네트워크
									</Label>
									<Picker note
										mode="dropdown"
										selectedValue={this.state.network}
										onValueChange={(itemValue, itemIndex) =>
											this.setState({ network: itemValue })
										}>
										<Picker.Item label="이더리움 메인넷" value="mainnet" />
										<Picker.Item label="Ropsten 테스트넷" value="ropsten" />
										<Picker.Item label="Kovan 테스트넷" value="kovan" />
										<Picker.Item label="Rinkeby 테스트넷" value="rinkeby" />
									</Picker>
								</Item>
							</View>
						</Form>
					</View>
				</View>
				<View style={{ marginHorizontal: 10, marginBottom: 30 }}>
					<Button 
						block 
						primary
						disabled={!this.state.ready}
						onPress={() => this.createWallet()}>
						<Text>생성하기</Text>
					</Button>
				</View>
				<LoadingView loading={this.state.loading} />
      </Container>
		);
  }
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		backgroundColor: 'white',
	},
	mnemonic: {
		...Platform.select({ 
			android: { 
				fontFamily:'monospace' 
			}
		}),
	}
});


// props에 전달할 state값 정의
const mapStateToProps = (state) => {
  const { wallet } = state;
	return {
		wallets: wallet.wallets,
    busy: wallet.addWallet.busy,
    error: wallet.addWallet.error,
	}
};

// props에 전달할 액션 함수 정의
const mapDispatchToProps = { 
	storeWallet,
};

// 컴포넌트와 리덕스를 연결
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateWalletScreen);