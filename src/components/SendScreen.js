import React, { Component } from 'react';
import { StyleSheet, View, Slider, TouchableOpacity } from 'react-native';
import { Container, Content, Header, Card, CardItem, Body, Text, Icon, Button, Left, Right, Thumbnail, Title, Toast, Form, Item, Input, Label } from 'native-base'; 
import QRCode from 'react-native-qrcode';

export default class ReceiveScreen extends Component {
  static navigationOptions = {
    header: null
	}

  render() {
		// const wallet = this.props.navigation.state.params;
		wallet = {symbol:'ETH'}
    console.log('wallet', wallet);
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
						<Text style={styles.label}>이체 금액</Text>
						<Item last regular style={styles.input}>
							<Input placeholder="보내는 금액을 입력해주세요." placeholderTextColor="#BBB" />
						</Item>
					</View>
					<View style={styles.item}>
						<Text style={styles.label}>받는 주소</Text>
						<Item regular style={styles.input}>
							<Input placeholder="이더리움 주소를 입력해주세요." placeholderTextColor="#BBB" />
							<TouchableOpacity>
								<Icon name='qrcode-scan' type='MaterialCommunityIcons'/>
							</TouchableOpacity>
						</Item>
					</View>
					<View style={styles.item}>
						<Text style={styles.label}>가스 수수료</Text>
						<Slider 
							onValueChange={() => {}}
							maximumValue={100} minimumValue={1} step={0.1} value={50} 
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
										<Input value="5" />
									</Item>
									<Item inlineLabel stackedLabel>
										<Label>가스 한도</Label>
										<Input value="21000" />
									</Item>
								</View>
							</Body>
						</CardItem>
					</Card>
					<View style={styles.item}>
						<Button block disabled
							onPress={() => {
							}}><Text>확인</Text></Button>
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