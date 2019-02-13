import React, { Component } from 'react';
import { StyleSheet, View, Slider, TouchableOpacity, Alert } from 'react-native';
import { Container, Content, Header, Card, CardItem, Body, Text, Icon, Button, Left, Right, Thumbnail, Title, Toast, Form, Item, Input, Label } from 'native-base'; 
import { ethers } from 'ethers';

export default class ConfimTxScreen extends Component {
  static navigationOptions = {
    title: "출금",
	}

	constructor(props) {
		super(props);
	}

	sign = () => {
		// #1. 이더리움 서명
		// #2. 이더리움 TX 배포
		// #3. TxId 화면으로 이동
	}

  render() {
    return (
      <Container style={styles.container}>
				<View>
					<View style={{ padding: 20, backgroundColor: '#F9FAFA', alignItems:'center', borderBottomColor: '#D2D8DD', borderBottomWidth: 1 }}>
						<Text note>출금 금액</Text>
						<Text style={{ fontSize: 30, fontWeight: '600', marginBottom: 20}}>1 ETH</Text>
						<Text note>받는 주소</Text>
						<Text ellipsizeMode="middle" numberOfLines={1}>0xdae1baf249964bc4b6ac98c3122f0e3e785fd279</Text>
					</View>
					<View style={{ marginHorizontal: 25, marginVertical: 20 }}>
						<View style={{ flexDirection:'row', justifyContent:'space-between', paddingVertical: 20, borderBottomColor: '#D2D8DD', borderBottomWidth: 1 }}>
							<Text note>수수료(가스비)</Text>
							<Text style={{ color: '#4d4d4d', fontSize: 17.5 }}>0.1 ETH</Text>
						</View>
						<View style={{ flexDirection:'row', justifyContent:'space-between', paddingVertical: 20 }}>
							<Text note>총 비용(출금 금액 + 수수료)</Text>
							<Text style={{ color: '#4d4d4d', fontSize: 17.5 }}>1.1 ETH</Text>
						</View>
					</View>
					<View style={styles.hintBox}>
						<Text style={styles.hintText}>‧ 위 거래내용을 확인하시기 바랍니다.</Text>
						<Text style={styles.hintText}>‧ 아래 승인버튼을 선택하시면 계속해서 거래를 진행합니다.</Text>
					</View>
				</View>
				<View style={{ marginHorizontal: 10, marginBottom: 30 }}>
					<Button block
						onPress={this.sign}>
						<Text>승인</Text>
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