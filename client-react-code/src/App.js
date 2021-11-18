import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Table from 'react-bootstrap/Table';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


class Thehell extends React.Component{
	
	async someFcntn(){
 		let dataTableResponse = await fetch('/tableDataProvider');
 		let dataTableParsed = await dataTableResponse.json();
 		if (dataTableResponse.status !== 200) {
      	  throw Error(dataTableResponse.message) 
    	}
    	
    	console.log("tableDataProvider", dataTableParsed);
    	this.setState({header:dataTableParsed.header, body:dataTableParsed.body});
    	
    }
    
    constructor(props){
		super(props);
		this.state={
		
			header:[],
			body:[]
		}
		
	}
	
	
	componentDidMount(){
		this.someFcntn();
	}
    	
    render(){    	
    	return (    		
    			<Table striped bordered hover variant="dark">
    			<thead>
    				<tr>{this.state.header.map(hi=>(<th>{hi}</th>))}</tr>
    			</thead>				
				<tbody>
						{this.state.body.map(atr=>(<tr>{atr.map(atd=>(<td key={"th"+atd}>{atd}</td>))}</tr>))}
				</tbody>				
				</Table>);
    }
 		
	
}


class Elhado extends React.Component{
	constructor(props){
		super(props);
		
	}
	
	render(){
		return (
		<ul>
			{this.props.items.map( item =>(
						<li key={"eh"+item} style={{fontSize:(item/10)+"em", color:(item%2===1?"red":"blue")}}>{item}</li>
					))
					}
		</ul>)
	}
}

class Church extends React.Component{

	constructor(props){
		super(props);
		this.state={
			name: this.props.churchName,
			items:[0,1],
			curSec:0,
			dataFS:{key0:0},
			classFlag:true
		};
	}
	
	
	reduceTime(){
 		this.setState(state=>({curSec: state.curSec+1}));
 		this.appendItem();
 	}
 	
 	
 	componentDidMount(){
 		this.interval=setInterval(()=> this.reduceTime(),10000);
 	}
 	
 	componentWillUnmount(){
 	
 		clearInterval(this.interval);
 	}
 	
 	
 	async appendItem(){
 	
 		const response = await fetch('/dataProvider');
    	const body = await response.json();

	    if (response.status !== 200) {
      	  throw Error(body.message) 
    	}
    	console.log("body",body);
    	this.setState({dataFS:body});
 		const newItems=this.state.items;
		newItems.push(
		this.state.items[this.state.items.length-1]+
		this.state.items[this.state.items.length-2]);
		this.setState({items:newItems})
 	}
	
	render(){
	
		let appC=this.state.classFlag?"cblue":"cred";
		appC="church "+appC;
		return(
		
			
			<div>
			
				<button className={appC} id={this.props.churchName+"ID"} onClick={()=>{
					clearInterval(this.interval);
					this.setState({classFlag:!this.state.classFlag})
				}}>{this.state.name}"___"{this.state.curSec}"___"{this.state.items[this.state.items.length-1]+"__"+
				
				this.state.dataFS[Object.keys(this.state.dataFS)[this.state.curSec%Object.keys(this.state.dataFS).length]]
			
				}</button>
				<Elhado items={this.state.items}/>
				<Thehell/>
				
				
			</div>

		
		)
	}

}




ReactDOM.render(
    <Church churchName="acapulco"/>,
  document.getElementById('root')
);


export default Church;
