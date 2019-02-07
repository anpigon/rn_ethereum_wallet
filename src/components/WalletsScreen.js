import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Icon, Button, Left, Right, Thumbnail } from 'native-base'; 

import WalletComponent from './WalletComponent';

import { NavigationEvents } from 'react-navigation';

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
		// AsyncStorage.removeItem('WALLETS');
	}

	_onWillFocus = payload => {
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