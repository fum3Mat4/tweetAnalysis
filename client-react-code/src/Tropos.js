import React from 'react';


class Tropos extends React.Component{


	constructor(props){
	
	
		super(props);
		
		this.state={
		
			tropos:this.props.tropos,
		}
	}
	

	
	
	render(){
	
		return (
		<tr>
		{
			<td>{this.state.tropos}</td>
		}
		</tr>)
	
	}


}


export default Tropos;
