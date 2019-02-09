import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, CardItem, Body, Text, Icon, Button, Left, Right, Thumbnail } from 'native-base'; 

export default function WalletComponent(props) {
	// console.log(props);
	const wallet = props.wallet;
	return (
		<TouchableOpacity onPress={props.onPress}>
			<Card>
				<CardItem>
					<Left>
						<Thumbnail small source={{uri: 'https://s2.coinmarketcap.com/static/img/coins/32x32/1027.png'}} />
						<Body>
							<Text>ETH</Text>
							<Text note>{wallet.name}</Text>
						</Body>
					</Left>
					<Right>
						<Icon name='dots-vertical' type='MaterialCommunityIcons' />
					</Right>
				</CardItem>
				<CardItem>
					<Text note ellipsizeMode="middle" numberOfLines={1} selectable={true}>{wallet.address}</Text>
				</CardItem>
				<CardItem>
					<Body style={{ alignItems:'flex-end' }}>
						<Text>
							{wallet.balance || '0.00'}
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