import React, { useState, useEffect }  from 'react';
import TweetCell from './TweetCell'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class SyntheticTweet extends React.Component{

	constructor(props){
		super(props);
		
		this.state={
		
			tweetID: this.props.tData.TID,
			userID: this.props.tData.userID
		}
		
		console.log("userID",this.state);
	}

	render(){
		return(
		<>
		<tr>
		TweetCell
			<TweetCell/>
		</tr>		
		</>
		)
	}

}

export default SyntheticTweet;
