import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, Clipboard, Platform } from 'react-native';
import { Container, Content, Text, Button, Form, Textarea, Toast } from 'native-base'; 

import bip39 from 'react-native-bip39';
import bip32 from 'bip32';
import ethUtil from 'ethereumjs-util';
import { ethers } from 'ethers';
import { randomBytes } from 'react-native-randombytes'

import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import Loader from './Loader';

export default class CreateWalletScreen extends Component {
  static navigationOptions = {
		title: '지갑 생성하기'
	}
	
	constructor(props) {
		super(props);

		this.state = {
			mnemonic: null,
			loading: false,
		}
	}

	componentWillMount = () => {
		// 니모닉 생성
		// bip39.generateMnemonic().then(mnemonic => {
		// 	this.setState({ mnemonic })
		// }); 
		randomBytes(16, (error, bytes) => {
			const mnemonic = ethers.utils.HDNode.entropyToMnemonic(bytes, ethers.wordlists.en);
			this.setState({ mnemonic })
		})
		// ethers.wordlists.en
	}

	_storeData = async (wallet, privateKey) => {
		// TODO: secureStorage에 니모닉을 저장하자.
		// TODO: walletStorage에는 derivePath를 저장하자.
		// TODO: WALLETS을 Object로 저장하자

		try {
			const wallets = JSON.parse(await AsyncStorage.getItem('WALLETS')) || [];
			wallets.push(wallet);
			await AsyncStorage.setItem('WALLETS', JSON.stringify(wallets));
			await RNSecureKeyStore.set(wallet.address, privateKey, {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY});

			// console.log(await AsyncStorage.getItem('WALLETS'));
			// console.log(await RNSecureKeyStore.get(wallet.address));
		} catch (error) {
			// Error saving data
			console.log(error);
		}
	};

	createWallet = async () => {

		this.setState({
      loading: true
		});

		// let masterNode = HDNode.fromMnemonic(mnemonic);
		// let standardEthereum = masterNode.derivePath("m/44'/60'/0'/0/0");
		// let xpriv = node.extendedKey; // Get the extended private key
		// let xpub = node.neuter().extnededKey; // Get the extended public key

		
		// 마스터 키 생성
		const seed = bip39.mnemonicToSeed(this.state.mnemonic);
		const root = bip32.fromSeed(seed);
		// let root = ethers.utils.HDNode.fromMnemonic(this.state.mnemonic);

		// 이더리움 차일드 개인키 생성
		const xPrivKey = root.derivePath("m/44'/60'/0'/0/0");
		const privKey = xPrivKey.privateKey.toString('hex');

		// 이더리움 주소 생성
		let address = ethUtil.pubToAddress(xPrivKey.publicKey, true).toString('hex');
		address = ethUtil.toChecksumAddress(address).toString('hex');

		// alert(address);
    const wallet = {
      name: '이더리움',
      coinType: 'ETH',
      symbol: 'ETH',
      address
    }

		// 저장
		await this._storeData(wallet, privKey);

		// this.setState({
    //   loading: false
		// });
		
		this.setState({
      loading: false
		});

		// this.props.navigation.goBack();
		this.props.navigation.popToTop();;
		
		// const k = root.derivePath("m/44'/60'/0'");
		// console.log('k',k.toBase58());
		// console.log('k',k.toWIF());
		// console.log('k',bip32.fromBase58(k.toBase58()));
		// console.log(k.derive(0).derive(0).privateKey.toString('hex'));
	}

  render() {
    return (
			<Container style={styles.container}>
				<View style={{ flex: 1, padding: 10, justifyContent: 'space-between'}}>
					<View>
						<Text note style={{paddingVertical: 10}}>
							아래 12개 니모닉을 복사하여 백업하세요. 지갑을 복구하는데 매우 중요한 데이터입니다.
						</Text>
						<Form>
							<Textarea rowSpan={5} bordered disabled 
								style={styles.mnemonic}
								value={this.state.mnemonic} />
						</Form>
					</View>
				</View>
				<View style={{ marginHorizontal: 10, marginBottom: 30 }}>
					<Button block primary
						disabled={this.state.loading}
						onPress={() => this.createWallet()}>
						<Text>생성하기</Text>
					</Button>
				</View>
				<Loader loading={this.state.loading} />
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