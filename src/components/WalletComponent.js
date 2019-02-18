import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, CardItem, Body, Text, Icon, Button, Left, Right, Thumbnail } from 'native-base'; 

export default function WalletComponent(props) {
	// console.log(props);
  const wallet = props.wallet;
  // console.log(wallet)
	return (
		<TouchableOpacity onPress={props.onPress}>
			<Card>
				<CardItem>
					<Left>
						{/* <Thumbnail small source={{uri: 'https://s2.coinmarketcap.com/static/img/coins/32x32/1027.png'}} /> */}
						<Thumbnail small source={require('../assets/icon/eth_32x32.png')} />
						<Body>
							<Text>ETH</Text>
							<Text note>{wallet.name}</Text>
						</Body>
					</Left>
					<Right>
						<Button transparent small
							onPress={
								(event) => {
									// event.defaultPrevented();
									event.stopPropagation();
								}
							}
							>
							<Icon name='dots-vertical' type='MaterialCommunityIcons' />
						</Button>
					</Right>
				</CardItem>
				<CardItem style={{ height:10, marginVertical: -5 }}>
					<Text note ellipsizeMode="middle" numberOfLines={1}>{wallet.address}</Text>
				</CardItem>
				<CardItem>
					<Body style={{ alignItems:'flex-end' }}>
						<Text>
							{wallet.balance || '0.00'} {wallet.symbol}
						</Text>
						<Text note style={{ marginRight:0 }}>
							≈ ￦ {wallet.convertPrice || '0.00'}
						</Text>
					</Body>
				</CardItem>
			</Card>
		</TouchableOpacity>
	);
}