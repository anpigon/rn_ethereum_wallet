import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Icon, Button, Left, Right, Thumbnail, Fab, Header, Title, Spinner } from 'native-base'; 
import { connect } from 'react-redux';

import { loadWallets } from '../reducers/walletReducer'

class InrtoScreen extends Component {

	static navigationOptions = {
		header: null
	}

	constructor(props) {
		super(props);

		this.state = {
			busy: !props.loaded
		}
	}

	componentWillMount() {
		this.props.loadWallets();
	}

	componentWillReceiveProps(nextProps) {
		console.log('componentWillReceiveProps', this.props, nextProps);
		const { loaded, walletCount } = nextProps;
		if( loaded === true ) {
			if( walletCount > 0 ) {
				this.props.navigation.replace('Wallets');
			} 
			this.setState({ busy: false });
		}
	}

	// componentWillUpdate() {
	// 	console.log('componentWillUpdate', this.props);
	// 	const { loaded, walletCount } = this.props;
	// 	if( loaded === true ) {
	// 		if( walletCount > 0 ) {
	// 			this.props.navigation.replace('Wallets');
	// 		} else {
	// 			// this.setState({ busy: false });
	// 		}
	// 	}
	// }

	// componentDidMount() {
	// 	console.log('componentDidMount', this.props);
	// }

	render() {
		// console.log('render', this.props)
		const { navigate } = this.props.navigation;
    return (
			<Container style={styles.container}>
				<View style={{flex:1, paddingHorizontal:20, alignItems:'center', justifyContent:'center'}}>
					<Icon name="wallet" type='Entypo' style={{color:'#000', fontSize: 150, fontWeight:'700'}}/>
					<Text style={{fontSize:30, fontWeight:'700', marginBottom: 20}}>암호화폐 지갑</Text>
					<Text style={{fontSize:16, color:'#808080', textAlign: 'center', }}>
						{ '이더리움(ETH), 비트코인(BTC), 이오스(EOS), \n스텔라루멘(XLM), 스팀(STEEM), 등 ... \n다양한 코인을 지원합니다.' }
					</Text>
				</View>
				{
					this.state.busy 
					?
					<View style={{flex:1, paddingBottom:70, justifyContent:'center'}}>
						<Spinner size="large" color="gray" />
					</View>
					:
					<View style={{flex:1,paddingHorizontal:20, justifyContent:'center'}}>
						<StyledButton 
							style={{marginBottom: 20}}
							title="지갑 새로 만들기" 
							subTitle="신규 지갑을 새로 생성합니다." 
							onPress={() => {
								navigate('CreateWallet');
							}} />
						<StyledButton 
							bordered
							title="기존 지갑 가져오기" 
							subTitle="기존에 사용하던 지갑을 가져옵니다." 
							onPress={() => {
								
							}} />
					</View>
				}
			</Container>
		);
	}
}

function StyledButton(props) {
	return (
		<Button 
			large 
			full 
			block
			bordered={props.bordered} 
			style={[styles.button, props.style]}
			onPress={props.onPress}>
			<View style={{alignItems:'center'}}>
				<Text style={styles.buttonTitle}>{props.title}</Text>
				<Text style={styles.buttonSubTitle}>{props.subTitle}</Text>
			</View>
		</Button>
	)
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		backgroundColor: 'white',
		justifyContent: 'space-around'
	},
	button: {
		height: 100, 
		borderRadius:10
	},
	buttonTitle: {
		fontSize: 25, 
		fontWeight:'700', 
		marginBottom: 7
	},
	buttonSubTitle: {
		fontSize: 16
	}
});

// props에 전달할 state값 정의
const mapStateToProps = (state) => {
	const { loaded, walletCount } = state.wallet;
	return {
		loaded,
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
)(InrtoScreen);