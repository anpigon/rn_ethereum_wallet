import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Icon, Button, Left, Right, Header, Title, Spinner } from 'native-base'; 

export default class SettingScreen extends Component {

	render() {
		// console.log('render', this.props)
		const { navigate } = this.props.navigation;
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
						<Title>설정</Title>
					</Body>
					<Right />
				</Header>
        <Content padder>
          <Button
            full
            danger
            onPress={() => {
              AsyncStorage.removeItem('WALLETS');
              this.props.navigation.goBack()
            }}>
            <Text>데이터 삭제</Text>
          </Button>
        </Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-around'
  },
});