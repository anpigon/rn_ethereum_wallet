import React from 'react';
import { TouchableOpacity, View, Platform } from 'react-native';
import { Card, CardItem, Body, Text, Icon, Button, List, ListItem, Left, Right, Thumbnail } from 'native-base'; 

export default function WalletComponent(props) {
	// console.log(props);
	const wallet = props.wallet;
	const network = (!wallet.network || wallet.network==='mainnet')?null:` [${wallet.network.slice(0,1).toUpperCase()}${wallet.network.slice(1)} Testnet]`;
  // console.log(wallet)
	return (
		<Card>
			<List onPress={props.onPress}>
				<ListItem thumbnail noBorder onPress={props.onPress}>
					<Left>
						<View style={{ marginTop: -15, width:50, height:50, borderRadius:25, alignItems:'center', justifyContent:'center', backgroundColor:'#ecf0f1'}}>
							<Thumbnail small circular source={props.icon} />
						</View>
					</Left>
					<Body style={{justifyContent:'center', marginRight: -15}}>
						{/* <Text>
							{wallet.symbol}
							{
								(!wallet.network || wallet.network==='mainnet')?null:` [${wallet.network.slice(0,1).toUpperCase()}${wallet.network.slice(1)} Testnet]`
							}
						</Text> */}
						<Text style={{marginBottom:5}}>
							{wallet.name} 
							<Text note>{network}</Text>
						</Text>
						<Text note 
							style={{
								fontSize:12,
								...Platform.select({ 
									android: { 
										fontFamily: 'monospace' 
									},
									ios: {
										fontFamily: 'Courier'
									},
								}),
							}}
							ellipsizeMode="middle" 
							numberOfLines={1}>{wallet.address}</Text>

							<Text style={{ alignSelf:'flex-end', marginTop: 5 }}>
								{wallet.balance || '0.00'} {wallet.symbol}
							</Text>
					</Body>
					<Right style={{justifyContent:'flex-start', alignItems:'flex-end', marginRight: -20}}>
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
				</ListItem>
			</List>
		</Card>
	);
}