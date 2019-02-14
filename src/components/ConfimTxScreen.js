import React, { Component } from 'react';
import { StyleSheet, View, Slider, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { Container, Spinner, Content, Header, Card, CardItem, Body, Text, Icon, Button, Left, Right, Thumbnail, Title, Toast, Form, Item, Input, Label } from 'native-base'; 
import { ethers } from 'ethers';

import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";

export default class ConfimTxScreen extends Component {
  static navigationOptions = {
    title: "출금",
	}

	constructor(props) {
		super(props);

		const {
			fromAddress,
			toAddress,
			gasPrice,
			gasLimit,
			value
		} = props.navigation.state.params;
		console.log('params', props.navigation.state.params);

		// 수수료 계산
		let estimateFee = ethers.utils.bigNumberify(gasPrice).mul(gasLimit);
		let fee = ethers.utils.formatUnits(estimateFee, 'gwei').toString();
		// console.log(estimateFee);
		
		// 필요한 총 금액 계산
		let totalAmount = ethers.utils.parseEther(value).add(ethers.utils.parseEther(fee));
		totalAmount = ethers.utils.formatEther(totalAmount).toString();

		this.state = {
			fromAddress,
			toAddress,
			gasPrice,
			gasLimit,
			value,
			fee,
			totalAmount,
		}
	}

	sign = async () => {

		let { 
			fromAddress, 
			toAddress,
			gasPrice,
			gasLimit,
			value
		} = this.state;

		// #1. provider 생성
		let provider = ethers.getDefaultProvider('ropsten');

		// #2. nonce 값 조회
		let nonce = await provider.getTransactionCount(fromAddress);
		console.log({ nonce });

		// #3 .TX 생성
		let transaction = {
			to: toAddress,
			value: ethers.utils.parseEther(value), 		// gwei // erhers.utils.parseEther(value);
			gasPrice: ethers.utils.parseUnits(gasPrice, 'gwei'), // gwei
			gasLimit: ethers.utils.bigNumberify(gasLimit), 
			nonce: nonce,
			data: ''
		};
		console.log({ transaction });

		// #4. 키 조회
		let privateKey = await RNSecureKeyStore.get(wallet.address); // .toString('hex')
		console.log({ privateKey });

		// #5. 지갑 생성
		let wallet = new ethers.Wallet(privateKey);
		console.log(wallet.address)
		
		// #6. 이더리움 서명
		let sign = await wallet.sign(transaction);
		console.log('sign: ' + sign);

		// #7. 이더리움 TX 배포
		try {
			// getTransactionCount
			const tx = await provider.sendTransaction(sign);
			console.log('sendTransaction', tx.hash);

			// #8. TxId 화면으로 이동
			this.props.navigation.navigate('CompleteScreen', tx.hash);

		} catch(error) {
			console.log(error);
			Alert.alert('ERROR', `${error.code}\n${error.message}`);
		}
	}

  render() {
		let state = this.state;

    return (
      <Container style={styles.container}>
				<View>
					<View style={{ padding: 20, backgroundColor: '#F9FAFA', alignItems:'center', borderBottomColor: '#D2D8DD', borderBottomWidth: 1 }}>
						<Text note>출금 금액</Text>
						<Text style={{ fontSize: 30, fontWeight: '600', marginBottom: 20}}>{state.value} ETH</Text>
						<Text note>받는 주소</Text>
						<Text ellipsizeMode="middle" numberOfLines={1}>{state.toAddress}</Text>
					</View>
					<View style={{ marginHorizontal: 25, marginVertical: 20 }}>
						<View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingVertical: 20, borderBottomColor: '#D2D8DD', borderBottomWidth: 1 }}>
							<Text note>수수료(가스비)</Text>
							<View style={{ alignItems:'flex-end'}}>
								<Text style={{ color: '#4d4d4d', fontSize: 17.5 }}>{state.fee} ETH</Text>
								<Text note>가스 가격 { state.gasPrice } Gwei</Text>
							</View>
						</View>
						<View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingVertical: 20 }}>
							<Text note>총 비용(출금 금액 + 수수료)</Text>
							<Text style={{ color: '#4d4d4d', fontSize: 17.5 }}>{ state.totalAmount } ETH</Text>
						</View>
					</View>
					<View style={styles.hintBox}>
						<Text style={styles.hintText}>‧ 위 거래내용을 확인하시기 바랍니다.</Text>
						<Text style={styles.hintText}>‧ 아래 승인버튼을 선택하시면 계속해서 거래를 진행합니다.</Text>
					</View>
				</View>
				<View style={{ marginHorizontal: 10, marginBottom: 30 }}>
					<Button block
						disabled={false}
						onPress={ this.sign }>
						<Text>승인</Text>
						{/* <Spinner size='small'/> */}
					</Button>
				</View>
      </Container>
		);
  }
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		backgroundColor: 'white',
		justifyContent: 'space-between'
	},
	hintBox: {
		borderWidth:1, 
		borderColor: 'rgb(220,220,220)', 
		padding: 10, 
		marginHorizontal: 20
	},
	hintText: {
		fontSize: 13,
		color: '#4d4d4d'
	}
});