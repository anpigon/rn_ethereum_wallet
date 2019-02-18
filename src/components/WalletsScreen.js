import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Icon, Button, Left, Right, Thumbnail, Fab, Header, Title, Spinner } from 'native-base'; 
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

import WalletComponent from './WalletComponent';
import { loadWallets } from '../reducers/walletReducer'

import { ethers } from 'ethers';

class WalletsScreen extends Component {

	constructor(props) {
		super(props);

		this.state = {
			active: false,
			wallets: []
		}
	}

	componentWillMount() {

		this.props.loadWallets();

		// let provider = ethers.getDefaultProvider('ropsten');
		
		// const pollingInterval = 20 * 1000;
		// this.poller = setInterval(() => {
		// 	const wallets = [...this.state.wallets];
		// 	wallets.forEach(wallet => {
		// 		provider.getBalance(wallet.address).then((balance) => {
		// 			const etherString = ethers.utils.formatEther(balance);
		// 			wallet.balance = etherString;
		// 		});
		// 	});

		// 	// console.log(wallets)

		// 	this.setState({ wallets }, () => {
		// 		AsyncStorage.setItem('WALLETS', JSON.stringify(wallets));
		// 	});

		// }, pollingInterval);
	}

	componentWillUnmount() {
		// if(this.poller) {
		// 	clearInterval(this.poller);
		// }
  }

  render() {
		console.log('props', this.props);
		const { loaded, wallets, walletCount } = this.props;
    	return (
			<>
				<NavigationEvents
					onWillBlur={() => this.setState({ active: false })}
				/>
				<Container style={styles.container}>
					<Header noLeft>
						<Body>
							<Title>내 지갑</Title>
						</Body>
						<Right>
							<Button 
								transparent 
								icon small 
								onPress={() => {
									this.props.navigation.navigate('Setting');
								}}>
								<Icon name='settings' type='MaterialCommunityIcons'/>
							</Button>
						</Right>
					</Header>
          {
            !loaded
            ? 
            <LoadingView 
              message="지갑 정보 불러오는 중..." /> 
            :
            <Content padder>
              {
                !walletCount
                ? 
                <IntroView 
                  message="생성된 지갑 없음. 인트로 메세지 화면" 
                  navigation={this.props.navigation} />
                : 
                <WalletListView 
                  message="지갑 목록 뷰" 
                  wallets={wallets} 
                  navigation={this.props.navigation} /> 
              }
              <View style={{ height:75 }}/>
            </Content>
          }
					<Fab 
						direction="up" 
						position="bottomRight" 
						containerStyle={{ }}
						style={{ backgroundColor: '#5067FF' }}
						active={this.state.active}
						onPress={() => this.setState({ active: !this.state.active })}>
							<Icon name='plus' type='MaterialCommunityIcons' />
							<Button style={{ backgroundColor: '#DD5144' }}
								onPress={() => {
									this.props.navigation.navigate('ImportWallet')
								}}>
								<Icon name='import' type='MaterialCommunityIcons' ></Icon>
							</Button>
							<Button style={{ backgroundColor: '#34A34F' }}
								onPress={() => {
									this.props.navigation.navigate('CreateWallet')
								}}>
								<Icon name='wallet' type='MaterialCommunityIcons' />
							</Button>
					</Fab>
				</Container>
			</>
		);
  }
}

function IntroView(props) {
  return <View 
    style={{ marginTop:50, height:330, justifyContent:'space-around', alignItems:'center' }}>
    <Icon name="wallet" type='Entypo' style={{ fontSize: 100 }}/>
    <Text style={{ color:'#575757', fontSize:20, marginTop:10, marginBottom: 30 }}>여러분의 지갑을 만들어보세요.</Text>
    <StyledButton 
      label='새 지갑 만들기' 
      onPress={() => props.navigation.navigate('CreateWallet')}/>
    <StyledButton 
      label='기존 지갑 가져오기' 
      onPress={() => props.navigation.navigate('ImportWallet')}/>
  </View>
}

function WalletListView(props) {
	// console.log(props.wallets)
  return Object.values(props.wallets).map(wallet => {
		// console.log(wallet)
    return (
      <WalletComponent 
        key={wallet.id}
        wallet={wallet} 
        onPress={() => props.navigation.navigate('WalletInfo', wallet)} />
    )
  })
}

function LoadingView(props) {
  return <View style={{ flex:1, justifyContent:'center', alignItems:'center', paddingBottom: 70 }}>
    <Spinner color="grey"/>
    <Text note>데이터 불러오는 중 ...</Text>
  </View>
}

function StyledButton(props) {
  return <Button block bordered	
    style={{ width:220, alignSelf:'center' }}
    onPress={props.onPress}>
    <Text>{props.label}</Text>
  </Button>
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		backgroundColor: 'white'
  },
});

// props에 전달할 state값 정의
const mapStateToProps = (state) => {
	const { loaded, wallets, walletCount } = state.wallet;
	return {
		loaded,
    wallets,
    walletCount
	}
};

// props에 전달할 액션 함수 정의
const mapDispatchToProps = { 
	loadWallets,
};

// 컴포넌트와 리덕스를 연결
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WalletsScreen);