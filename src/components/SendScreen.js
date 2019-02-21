import React, { Component } from 'react';
import { StyleSheet, View, Slider, TouchableOpacity, Alert } from 'react-native';
import { Container, Content, Header, Card, CardItem, Body, Text, Icon, Button, Left, Right, Thumbnail, Title, Toast, Form, Item, Input, Label } from 'native-base'; 
import { connect } from 'react-redux';
import { ethers } from 'ethers';

import * as ethUtil from '../utils/ethUtil';

/**
 * 출금 입력 화면
 */
class ReceiveScreen extends Component {

	constructor(props) {
		super(props);

		const { walletId } = this.props.navigation.state.params;
    
    let wallet;
    try {
      wallet = this.props.wallets[walletId];
    } catch(err) {
      // console.log(err);
    }

		this.state = {
			isReady: false,			// 
			toAddress:'',				// 받는 사람 주소
			gasPrice: '2',			// 가스 가격
			gasLimit: '21000',	// 가스 최대 사용량
			value: '',					// 보내는 금액
			wallet,
			gasMinValue: 1.0,
			gasMaxValue: 10.0,
		}
	}

	componentWillMount() {
		fetch('https://www.etherchain.org/api/gasPriceOracle')
		.then(r => r.json())
		.then(r => {
			// console.log(r);
			this.setState({
				isReady: true,
				gasPrice: parseFloat(r.standard).toFixed(1),
				gasMinValue: parseFloat(r.safeLow).toFixed(1),
				gasMaxValue: parseFloat(r.fastest).toFixed(1),
			})
		});
	}

	next = () => {
		let ehter = 0;
		try {
			ehter = ethers.utils.parseEther(String(this.state.value || 0));
			if(ehter.lte(0)) { // 0보다 작으면
				return Alert.alert('', '이체 금액을 확인해주세요.');
			}

			// 가스비(수수료) 계산 
			let estimateFee = ethers.utils.parseUnits(this.state.gasPrice, 'gwei').mul(String(this.state.gasLimit));
			
			// 이체하는데 필요한 총 금액 계산(이체 금액 + 가스비)
			let totalRequiredAmount = ehter.add(estimateFee);

			let balance = ethers.utils.parseEther(this.state.wallet.balance);
			// console.log('balance' + balance);
			if(balance.lt(totalRequiredAmount)) {
				let totalRequiredEther = ethers.utils.formatEther(totalRequiredAmount);
				return Alert.alert('잔액이 부족합니다.', `수수료 포함하여 필요한 금액\n${totalRequiredEther} ETH`);
			}
		} catch(e) {
			return Alert.alert('', '이체 금액을 확인해주세요.');
		}

		try {
			if(!ethUtil.checkAddress(this.state.toAddress)) {
				return Alert.alert('', '받는 주소를 확인해주세요.');
			}
		} catch(e) {
			// console.log(e);
			return Alert.alert('', '받는 주소를 확인해주세요.');
		}
		// Alert.alert('ok');

		let transcation = {
			fromAddress: this.state.fromAddress,
			toAddress: this.state.toAddress,
			gasPrice: this.state.gasPrice,
			gasLimit: this.state.gasLimit,
			value: this.state.value,
			walletId: this.state.wallet.id,
		};

		this.props.navigation.navigate('ConfimTx', transcation);
	}

  render() {
		const wallet = this.state.wallet;

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
						<Title>{ wallet.symbol } 출금</Title>
					</Body>
          <Right />
        </Header>
        <Content padder>
					<View style={styles.item}>
						<View style={{ alignItems:'baseline', flexDirection: 'row', justifyContent:'space-between'}}>
							<Text style={styles.label}>이체 금액</Text>
							<Text note>잔액 {wallet.balance} ETH</Text>
						</View>
						<Item last regular style={styles.input}>
							<Input 
								keyboardType='numeric'
								value={this.state.value}
								onChangeText={value => this.setState({ value: value.replace(/[^0-9|\.]/g, '') })}
								placeholder="보내는 금액을 입력해주세요." placeholderTextColor="#BBB" />
						</Item>
					</View>
					<View style={styles.item}>
						<Text style={styles.label}>받는 주소</Text>
						<Item regular style={styles.input}>
							<Input 
								value={this.state.toAddress}
								onChangeText={toAddress => this.setState({ toAddress })}
								placeholder="이더리움 주소를 입력해주세요." placeholderTextColor="#BBB" />
							<TouchableOpacity>
								<Icon name='qrcode-scan' type='MaterialCommunityIcons'/>
							</TouchableOpacity>
						</Item>
					</View>
					<View style={styles.item}>
						<Text style={styles.label}>수수료<Text note>(가스 가격)</Text></Text>
						<Slider 
							disabled={!this.state.isReady}
							value={parseFloat(this.state.gasPrice) || 0} 
							onValueChange={gasPrice => this.setState({ gasPrice: gasPrice.toFixed(1) })}
							maximumValue={parseFloat(this.state.gasMaxValue)} 
							minimumValue={parseFloat(this.state.gasMinValue)} 
							step={0.1} 
							minimumTrackTintColor="orangered"
							maximumTrackTintColor="royalblue"/>
						<View style={{width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
							<Text note>Slow</Text>
							<Text note>Fastest</Text>
						</View>
					</View>
					<Card style={styles.item}>
						<CardItem header><Text note>Advanced Options</Text></CardItem>
						<CardItem>
							<Body>
								<View style={{width:'100%'}}>
									<Item inlineLabel stackedLabel>
										<Label>가스가격(GWei)</Label>
										<Input 
											value={this.state.gasPrice} 
											onChangeText={gasPrice => this.setState({ gasPrice: gasPrice || '0' })} />
									</Item>
									<Item inlineLabel stackedLabel>
										<Label>가스 한도</Label>
										<Input 
											value={this.state.gasLimit} 
											onChangeText={gasLimit => this.setState({ gasLimit: gasLimit || '0' })} />
									</Item>
								</View>
							</Body>
						</CardItem>
					</Card>
					<View style={styles.item}>
						<Button block 
							disabled={!this.state.isReady}
							onPress={this.next}>
							<Text>확인</Text>
						</Button>
					</View>
        </Content>
      </Container>
		);
  }
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		backgroundColor: 'white'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
	},
	item: {
		marginVertical: 10
	},
	input: {
		backgroundColor:'rgba(245, 245, 245, 1.0)', 
		paddingLeft: 10, 
		borderBottomEndRadius: 5,
		borderBottomStartRadius: 5,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5
	},
	label: {
		marginLeft: 5,
		marginBottom: 10,
		color: '#555'
	}
});

// props에 전달할 state값 정의
const mapStateToProps = (state) => {
  // console.log('state', state)
	return {
    wallets: state.wallet.wallets
	}
};

const mapDispatchToProps = { 
};

// 컴포넌트와 리덕스를 연결
export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ReceiveScreen);