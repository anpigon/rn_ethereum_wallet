import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Icon, Button } from 'native-base'; 

export default class WalletsScreen extends Component {
  static navigationOptions = {
    // headerLeft: null,
		title: "Ethereum Wallet",
		// headerRight: null
  }

  render() {
    return (
			<Container style={styles.container}>
        <Content padder>
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
		);
  }
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		backgroundColor: 'white'
  },
});