import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Icon, Button, Left, Right, Thumbnail, Fab, Header, Title, Spinner } from 'native-base'; 
import { connect } from 'react-redux';

import { loadWallets } from '../reducers/walletReducer'

class InrtoScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			wallets: []
		}
	}

	componentWillMount() {
		this.props.loadWallets();
	}

	render() {
		// console.log('props', this.props);
		// const { loaded, wallets } = this.props;
    return (
			<Container style={styles.container}>
				<View style={{paddingHorizontal:20, alignItems:'center'}}>
					<Icon name="wallet" type='Entypo' style={{color:'#000', fontSize: 150, fontWeight:'700'}}/>
					<Text style={{fontSize:30, fontWeight:'700', marginBottom: 20}}>암호화폐 지갑</Text>
					<Text style={{fontSize:16, color:'#808080', textAlign: 'center', }}>
						{ '이더리움(ETH), 비트코인(BTC), 이오스(EOS), \n스텔라루멘(XLM), 스팀(STEEM), ... \n코인을 지원합니다.' }
					</Text>
				</View>
				<View style={{paddingHorizontal:20}}>
					<Button large full style={{height: 100, marginBottom: 20, borderRadius:10}}>
						<View style={{alignItems:'center'}}>
							<Text style={{fontSize: 25, fontWeight:'700', marginBottom: 7}}>지갑 새로 만들기</Text>
							<Text style={{fontSize: 16}}>신규 지갑을 새로 생성합니다.</Text>
						</View>
					</Button>
					<Button large bordered full style={{height: 100, borderRadius:10}}>
						<View style={{alignItems:'center'}}>
							<Text style={{fontSize: 25, fontWeight:'700', marginBottom: 7}}>기존 지갑 가져오기</Text>
							<Text style={{fontSize: 16}}>기존에 사용하던 지갑을 가져옵니다.</Text>
						</View>
					</Button>
				</View>
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

// props에 전달할 state값 정의
const mapStateToProps = (state) => {
	const { loaded, wallets } = state.wallet;
	return {
		loaded,
		wallets
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
)(InrtoScreen);