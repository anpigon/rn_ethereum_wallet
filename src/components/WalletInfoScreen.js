import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Container, Content, Header, Card, CardItem, Body, Text, Icon, Button, Left, Right, Thumbnail, Title, List, ListItem } from 'native-base'; 
import { connect } from 'react-redux';

class WalletInfoScreen extends Component {
  // static navigationOptions = {
  //   header: null
	// }

	constructor(props) {
    super(props);

    const { walletId } = this.props.navigation.state.params;
    
    let wallet;
    try {
      wallet = this.props.wallets[walletId];
    } catch(err) {
      console.log(err);
    }

    const network = (!wallet.network || wallet.network==='mainnet')?null:` [${wallet.network.slice(0,1).toUpperCase()}${wallet.network.slice(1)} Testnet]`;
    
		this.state = {
      wallet,
      network
		}
	}

  render() {
    const { wallet, network } = this.state;

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
						<Title>{ wallet.name } <Text note>{network}</Text></Title>
					</Body>
          <Right />
        </Header>
        <Content padder>
          <Card transparent>
            <CardItem>
              <Body style={ styles.center }>
                {/* <Thumbnail source={{uri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'}} />   */}
                <Thumbnail source={require('../assets/icon/eth_64x64.png')} />  
              </Body>
            </CardItem>
            <CardItem>
              <Body style={ styles.center }>
                <Text style={{fontSize: 26, fontWeight:'600', marginTop: 10}}>
                  { wallet.balance || '0.00' } { wallet.symbol }
                </Text>
                {/* <Text style={{fontSize: 18, marginTop: 10, color:'gray'}}>
                  ≈ ￦ {wallet.convertPrice || '0.00'}
                </Text>  */}
              </Body>
            </CardItem>
            <CardItem>
              <View>
                <Text note ellipsizeMode="middle" numberOfLines={1}>
                  {wallet.address}
                </Text>
              </View>
            </CardItem>
            <CardItem>
              <Body style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                <Button 
                  onPress={() => this.props.navigation.navigate('ReceiveScreen', wallet)}
                  bordered info style={{flex:1, justifyContent:'center', marginRight: 10}}><Text>입금</Text></Button>
                <Button 
                  onPress={() => this.props.navigation.navigate('SendScreen', { walletId: wallet.id })}
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
          {/* <Button onPress={()=>this.props.navigation.navigate('CompleteScreen', '0xbe67681d642e8ff131a538a6c2f1a2e3a971a9a5633890cde09a7aaec9aebdb2')}><Text>TEST</Text></Button> */}
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

// props에 전달할 state값 정의
const mapStateToProps = (state) => {
  // console.log('state', state)
	return {
    wallets: state.wallet.wallets
	}
};

const mapDispatchToProps = { 
};

// 컴포넌트와 리덕스를 연결
export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(WalletInfoScreen);