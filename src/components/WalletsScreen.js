import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Icon, Button, Left, Right, Thumbnail } from 'native-base'; 

import WalletComponent from './WalletComponent';

import { NavigationEvents } from 'react-navigation';

import { ethers } from 'ethers';

export default class WalletsScreen extends Component {
  static navigationOptions = {
    // headerLeft: null,
		title: "Ethereum Wallet",
		// headerRight: null
	}

	constructor(props) {
		super(props);
		this.state = {
			wallets: []
		}
	}

	componentWillMount() {
		let provider = ethers.getDefaultProvider('ropsten');
		
		const pollingInterval = 20 * 1000;
		this.poller = setInterval(() => {
			const wallets = [...this.state.wallets];
			wallets.forEach(wallet => {
				provider.getBalance(wallet.address).then((balance) => {
					const etherString = ethers.utils.formatEther(balance);
					wallet.balance = etherString;
				});
			});

			console.log(wallets)

			this.setState({ wallets }, () => {
				AsyncStorage.setItem('WALLETS', JSON.stringify(wallets));
			});

		}, pollingInterval);
	}

	componentWillUnmount() {
		if(this.poller) {
			clearInterval(this.poller);
		}
	}

	_onWillFocus = payload => {
		// Storage 에서 지갑 목록 가져오기 // TODO: redux로 변경 필요?
		AsyncStorage.getItem('WALLETS').then(wallets => {
			this.setState({
				wallets: JSON.parse(wallets) || [],
			})
		});
	}

  render() {
    return (
			<>
				<NavigationEvents
					onWillFocus={this._onWillFocus}
				/>
				<Container style={styles.container}>
					<Content padder>
						{
							this.state.wallets.map((wallet) => {
                return (
									<WalletComponent 
										key={wallet.address}
										wallet={wallet} 
										onPress={() => this.props.navigation.navigate('WalletInfo', wallet)} />
								)
              })
						}
						<Card>
							<CardItem>
								<Body>
										<Button transparent iconLeft large block
											onPress={() => this.props.navigation.navigate('CreateWallet')}>
											<Icon name='ios-add-circle-outline' />
											<Text>지갑 생성</Text>
										</Button>
								</Body>
							</CardItem>
						</Card>
					</Content>
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