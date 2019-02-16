import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Icon, Button, Left, Right, Thumbnail, Fab, Header, Title, Spinner } from 'native-base'; 
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

import WalletComponent from './WalletComponent';
import { loadWallets } from '../reducers/walletReducer'

import { ethers } from 'ethers';

class WalletsScreen extends Component {
  static navigationOptions = {
    // headerLeft: null,
		// title: "Ethereum Wallet",
		// headerRight: null
		header: null
	}

	constructor(props) {
		super(props);
		this.state = {
			active: false,
			wallets: []
		}
	}

	componentWillMount() {
		// AsyncStorage.removeItem('WALLETS');
		this.props.loadWallets();
		// let provider = ethers.getDefaultProvider('ropsten');
		
		// const pollingInterval = 20 * 1000;
		// this.poller = setInterval(() => {
		// 	const wallets = [...this.state.wallets];
		// 	wallets.forEach(wallet => {
		// 		provider.getBalance(wallet.address).then((balance) => {
		// 			const etherString = ethers.utils.formatEther(balance);
		// 			wallet.balance = etherString;
		// 		});
		// 	});

		// 	// console.log(wallets)

		// 	this.setState({ wallets }, () => {
		// 		AsyncStorage.setItem('WALLETS', JSON.stringify(wallets));
		// 	});

		// }, pollingInterval);
	}

	componentWillUnmount() {
		// if(this.poller) {
		// 	clearInterval(this.poller);
		// }
	}

	// _onWillFocus = payload => {
	// 	// Storage 에서 지갑 목록 가져오기 // TODO: redux로 변경 필요?
	// 	AsyncStorage.getItem('WALLETS').then(wallets => {
	// 		this.setState({
	// 			wallets: JSON.parse(wallets) || [],
	// 		})
	// 	});
	// }

  render() {
		console.log('props', this.props);
		const { loaded, wallets } = this.props;
    return (
			<>
				<NavigationEvents
					onWillFocus={this._onWillFocus}
					onWillBlur={() => this.setState({ active: false })}
				/>
				<Container style={styles.container}>
					<Header noLeft>
						<Body>
							<Title>내 지갑</Title>
						</Body>
					</Header>
					<Content padder>
						{
							loaded
							?
							(
								Object.keys(wallets).length
								?
								/* 지갑이 있음 */
								Object.values(wallets).map(wallet => {
									return (
										<WalletComponent 
											key={wallet.address}
											wallet={wallet} 
											onPress={() => this.props.navigation.navigate('WalletInfo', wallet)} />
									)
								})
								:
								<View 
									style={{marginTop:50, height:300, justifyContent:'space-around', alignItems:'center'}}>
									<Icon name='google-wallet' type="FontAwesome" style={{ color:'#333', fontSize: 50 }}/>
									<Text style={{color:'#575757', fontSize:20, marginTop:20, marginBottom: 30}}>여러분의 지갑을 만들어보세요.</Text>
									<Button
										first 
										block
										bordered
										style={{width:220, alignSelf:'center'}}
										onPress={() => {
											this.props.navigation.navigate('CreateWallet')
										}}
									><Text>새 지갑 만들기</Text></Button>
									<Button
										last
										block
										bordered	
										style={{width:220, alignSelf:'center'}}
										onPress={() => {
											this.props.navigation.navigate('ImportWallet')
										}}
									><Text>기존 지갑 가져오기</Text></Button>
								</View>
							)
							:
							/* 지갑 정보 불러오는 중... */
							<Spinner color="grey"/>
						}
						<View style={{height:75}}/>
					</Content>
					<Fab 
						direction="up" 
						position="bottomRight" 
						containerStyle={{ }}
						style={{ backgroundColor: '#5067FF' }}
						active={this.state.active}
						onPress={() => this.setState({ active: !this.state.active })}>
							<Icon name='plus' type='MaterialCommunityIcons' />
							<Button style={{ backgroundColor: '#DD5144' }}
								onPress={() => {
									this.props.navigation.navigate('ImportWallet')
								}}>
								<Icon name='import' type='MaterialCommunityIcons' ></Icon>
							</Button>
							<Button style={{ backgroundColor: '#34A34F' }}
								onPress={() => {
									this.props.navigation.navigate('CreateWallet')
								}}>
								<Icon name='wallet' type='MaterialCommunityIcons' />
							</Button>
					</Fab>
				</Container>
			</>
		);
  }
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		backgroundColor: 'white'
  },
});

// props에 전달할 state값 정의
const mapStateToProps = (state) => {
	const { loaded, wallets } = state.wallet;
	return {
		loaded,
		wallets
	}
};

// props에 전달할 액션 함수 정의
const mapDispatchToProps = { 
	loadWallets,
};

// 컴포넌트와 리덕스를 연결
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WalletsScreen);