import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Icon, Button, Left, Right, Thumbnail, Fab, Header, Title } from 'native-base'; 
import { connect } from 'react-redux';

import WalletComponent from './WalletComponent';

import { NavigationEvents } from 'react-navigation';

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
    return (
			<>
				<NavigationEvents
					onWillFocus={this._onWillFocus}
					onWillBlur={() => this.setState({ active: false })}
				/>
				<Container style={styles.container}>
					<Header noLeft>
						<Body>
							<Title>이더리움 지갑</Title>
						</Body>
					</Header>
					<Content padder>
						{
							// this.state.wallets.map((wallet) => {
							this.props.wallets.map((wallet) => {
                return (
									<WalletComponent 
										key={wallet.address}
										wallet={wallet} 
										onPress={() => this.props.navigation.navigate('WalletInfo', wallet)} />
								)
              })
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
	const { wallets } = state.wallet;
	return {
		wallets
	}
};

// props에 전달할 액션 함수 정의
const mapDispatchToProps = { 
	// getWallets 
};

// 컴포넌트와 리덕스를 연결
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WalletsScreen);