import React,{ useState, useEffect }   from 'react';
import Tweet from './Tweet'

function TweetCell(props) {

  let state=false;
  
  const [show, setShow] = useState(false);
  

  let handleLeave=()=>{
    setShow(false)
  }
  let handleHover=()=>{
  	if(show)
    	setShow(false)
    else
    	setShow(true)
  }

  return (
    <>
    
    	<tr>
	    	<td>{props.tData.id}</td>
    		<td>{props.tData.author_id}</td>
			<td onClick={handleHover}>{props.tData.text}</td>
			
		</tr>	
			
      	{show?<Tweet tweetIDs={props.tData}/>:""}
      	
    </>
  );
}

export default TweetCell