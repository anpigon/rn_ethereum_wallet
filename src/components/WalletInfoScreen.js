import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Container, Content, Header, Card, CardItem, Body, Text, Icon, Button, Left, Right, Thumbnail, Title, List, ListItem } from 'native-base'; 

export default class WalletInfoScreen extends Component {
  static navigationOptions = {
    header: null
	}

	constructor(props) {
		super(props);
		this.state = {
			wallet: []
		}
	}

  render() {
    const wallet = this.props.navigation.state.params;
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
						<Title>{ wallet.name }</Title>
					</Body>
          <Right />
        </Header>
        <Content padder>
          <Card transparent>
            <CardItem>
              <Body style={ styles.center }>
                <Thumbnail source={{uri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'}} />  
              </Body>
            </CardItem>
            <CardItem>
              <Body style={ styles.center }>
                <Text style={{fontSize: 26, fontWeight:'600', marginTop: 10}}>
                  { wallet.balance || '0.00' } { wallet.symbol }
                </Text>
                <Text style={{fontSize: 18, marginTop: 10, color:'gray'}}>
                  ≈ ￦ {wallet.convertPrice || '0.00'}
                </Text> 
              </Body>
            </CardItem>
            <CardItem>
              <Body style={ styles.center }>
                <Text note ellipsizeMode="middle" numberOfLines={1}>
                  {wallet.address}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                <Button 
                  onPress={() => this.props.navigation.navigate('ReceiveScreen', wallet)}
                  bordered info style={{flex:1, justifyContent:'center', marginRight: 10}}><Text>입금</Text></Button>
                <Button 
                  onPress={() => this.props.navigation.navigate('SendScreen', wallet)}
                  bordered warning style={{flex:1, justifyContent:'center', marginLeft: 10}}><Text>출금</Text></Button>
              </Body>
            </CardItem>
          </Card>
          {/* <List>
            <ListItem itemDivider>
              <Text>히스토리</Text>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button warning rounded>
                  <Icon active name="call-made" type='MaterialCommunityIcons' />
                </Button>
              </Left>
              <Body>
                <Text>Simon Mignolet</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button info rounded>
                  <Icon active name="call-received" type='MaterialCommunityIcons' />
                </Button>
              </Left>
              <Body>
                <Text ellipsizeMode="middle" numberOfLines={1}>0x4e2e45414bc6872d6cE8B6bc477E369FcFD1A0f5</Text>
                <Text note>2018-09-15 12:53</Text>
              </Body>
              <Right>
                <View>
                  <Text>0 ETH</Text>
                  <Text note>완료</Text>
                </View>
              </Right>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List> */}
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
  }
});