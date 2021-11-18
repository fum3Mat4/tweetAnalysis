import React from 'react';
import TweetCell from './TweetCell'
import Tropos from './Tropos'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import './TimeLine.css'


class TimeLine extends React.Component{

	
	constructor(props){
		super(props)
		this.state={
			tweets:[],
			tweetsBuffer:[],
			troposList:[],
			troposTarget:"pandora"
		}
	}

	async getTroposList(){
		const response = await fetch(`/getTroposList`);
    	const troposList = await response.json();
    	console.log("troposList",troposList.data)

    	this.setState({troposList:troposList.data});
	
	}
	async getTweetsByTopic(){
	
		const response = await fetch(`/getTweetsByTopic?tropos=${this.state.troposTarget}`);
    	const tweetsByTopic = await response.json();
    	console.log("tweetsByTopic",tweetsByTopic)
    	this.setState({tweets:tweetsByTopic.tweetsList});
    	
	
	}
	
	componentDidMount(){
		this.getTweetsByTopic();
		this.getTroposList();
	}

	render(){
			
		return (
		
		<>
	<div>
  <Form.Label htmlFor="basic-url">Your vanity URL</Form.Label>
  <InputGroup className="mb-3" variant="dark">
    <InputGroup.Text id="basic-addon3">
      tropoi
    </InputGroup.Text>
    <FormControl id="basic-url" aria-describedby="basic-addon3"  value={this.state.troposTarget} onChange={e => this.setState({ troposTarget: e.target.value })} />
     <Button variant="dark" type="submit" onClick={()=>{this.getTweetsByTopic();}}>
    	Submit
  	</Button>
  	<Button variant="dark" type="submit" onClick={()=>{this.setState({tweets:[]});}}>
    	Clear
  	</Button>
  </InputGroup>
  
		</div>	
		<div className="TimeLineCtnr">
								
			<Table className="TimeLineTable" striped bordered hover variant="dark">
				<tbody>
				{this.state.tweets.map(ane=>(<TweetCell tData={ane}/>))}
				</tbody>
			</Table>
		
		</div>
		</>
		)
	}

}



export default TimeLine;