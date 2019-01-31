import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, Segment, Text, Icon, Button, Header, Left, Body, Title, Right, Form, Textarea, Input, Item } from 'native-base'; 

import bip39 from 'bip39';
import bip32 from 'bip32';
import { randomBytes } from 'react-native-randombytes';

export default class CreateWalletScreen extends Component {
  static navigationOptions = {
		title: '지갑 생성하기'
	}
	
	constructor(props) {
		super(props);

		this.state = {
			mnemonic: null
		}
	}

	componentWillMount = () => {
		// 시드 생성
		randomBytes(32, (error, seed) => {
			if(error) {
				console.log(error);
				return;
			}
			// console.log('seed', seed);			
			// 니모닉 생성
			const mnemonic = bip39.entropyToMnemonic(seed, bip39.wordlists.EN);
			// console.log('mnemonic', mnemonic);
			this.setState({ mnemonic });
		});
	}

	_createWallets = async () => {
		const seed = bip39.mnemonicToSeed(this.state.mnemonic);
		// 마스터 키 생성
		const root = bip32.fromSeed(seed);
		// 이더리움 차일드 개인키 생성
		const xPrivateKey = root.derivePath("m/44'/60'/0'/0/0");
		const privateKe = xPrivateKey.privateKey.toString('hex');
		const publicKey = xPrivateKey.publicKey.toString('hex');
	}

  render() {
    return (
			<Container style={styles.container}>
				<View style={{ flex: 1, padding: 10 }}>
					<View style={{ flex: 1 }}>
						<Text note>아래 12개 니모닉을 복사하여 백업하세요. 지갑을 복구하는데 매우 중요한 데이터입니다.</Text>
						<Form>
							<Textarea rowSpan={5} bordered disabled />
						</Form>
					</View>
					<View style={{ flex: 1 }}>
						<Button block primary>
							<Text>생성하기</Text>
						</Button>
					</View>
				</View>
      </Container>
		);
  }
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
  },
});