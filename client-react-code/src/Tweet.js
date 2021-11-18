import React from 'react';
import Table from 'react-bootstrap/Table'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './tweet.css';

class Tweet extends React.Component{

	

	constructor(props){
		super(props);
		
		this.state={
			tweetID:this.props.tweetIDs.TID,
			tweetUserID:this.props.tweetIDs.userID,
			tweetContentData:{}
		}

	}
	
	async getTweetByID(){
		let tweetDataResponse= await fetch(`getTweetContentByID?TID=${this.state.tweetID}`);
		console.log("url",'getTweetContentByID?TID=',this.state.tweetID)
		let tweetData = await tweetDataResponse.json();
		console.log("tweetData",tweetData)
		this.setState({tweetContentData: tweetData});
	
	}
	
	componentDidMount(){
		this.getTweetByID();
	}
	
	
	expandText(anObj,target){
		console.log("expandText",anObj,typeof(anObj))
		if(typeof(anObj)=="object"){
			 
			 Object.keys(anObj).map(o=>{
				if(typeof(anObj[o])=="object"){
					this.expandText(anObj[o],target);
				}
				else{
					target[o]=anObj[o];
				}
			})
		}		
	}
	
	render(){
		let tweetData=this.state.tweetContentData;
		
		
		if (tweetData.fieldsDescription===undefined)
			return(null);
			
		let target={};	
		let expandedText=this.expandText(tweetData.payload,target);
		
		console.log("target",target)
		return (
			<div className="tweetContainer">
			<Table striped bordered hover variant="dark" >			
				<thead>
					<tr>
						<td>Key</td><td>Value</td>
					</tr>
				</thead>
				
				<tbody>
					
					

					
					
						{
						
						Object.keys(target).map(dt=>(
							<tr>
							<td>{dt}</td>
							<td>{target[dt]}</td>
							</tr>
						))
							
						}
					

					
				
					
				</tbody>
				
				</Table>
			</div>	
		)
	}
	
	
	

}



export default Tweet

