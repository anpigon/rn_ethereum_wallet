import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, Segment, Text, Icon, Button, Header, Left, Body, Title, Right, Form, Textarea, Input, Item } from 'native-base'; 

export default class ImportWalletScreen extends Component {
  static navigationOptions = {
		header: null
	}
	
	constructor(props) {
		super(props);

		this.state = {
			activeIndex: 0
		}
	}

	segmentClicked = (activeIndex) => {
		this.setState({ activeIndex });
	}

	renderSection = () => {
		switch(this.state.activeIndex) {
			case 0:
				return (
					<View>
						<Text note>지갑 니모닉(12개 영어 단어)을 띄어쓰기로 입력하세요.</Text>
						<Form>
							<Textarea rowSpan={5} bordered />
						</Form>
					</View>
				)
			default:
				return (
					<View>
						<Text note>지갑의 개인 키 주소를 입력하세요.</Text>
						<Item regular>
							<Input />
						</Item>
					</View>
				)
		}
	}

  render() {
    return (
			<Container>
				<Header hasSegment>
					<Left>
						<Button transparent
							onPress={() => this.props.navigation.goBack()}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title>지갑 생성하기</Title>
					</Body>
					<Right />
				</Header>
				<Segment style={{ paddingHorizontal: 10 }}>
					<Button first 
						style={{ flex:1, justifyContent:'center' }}
						active={this.state.activeIndex === 0}
						onPress={() => this.segmentClicked(0)}>
						<Text>니모닉</Text>
					</Button>
					<Button last
						style={{ flex:1, justifyContent:'center' }}
					 	active={this.state.activeIndex === 1}
					 	onPress={() => this.segmentClicked(1)}>
						<Text>개인키</Text>
					</Button>
				</Segment>
				<Content padder>
					{
						this.renderSection()
					}
					<View>
						<Button block primary>
							<Text>가져오기</Text>
						</Button>
					</View>
				</Content>
      </Container>
		);
  }
}

const styles = StyleSheet.create({
  container: {
		// flex: 1,
  },
});