require('dotenv').config();

var bodyParser= require('body-parser');
const express=require('express');
const ProgressBar = require('progress')
const app= express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname));

var mysql = require('mysql'); 
var dbHandler = require('./dbHandler/dbHandler.js');


var dreamHandler=require('./dreamHandler/dreamHndlr.js')



app.use(function (req,res,next){
	res.setHeader('Access-Control-Allow-Origin', 'http:localhost:3001/index.html');
	next();
})


app.get('/dataProvider',(req,res)=>{
	res.send({test:1, val:2, entity:4});
})

app.get("/getTweetsByTopic", async (req,res)=>{

	let getQuery=require('url').parse(req.url,true).query;
	let tropos=getQuery.tropos;
	
	
	let results=await dbHandler.dbExecQuery(mysql,`select * from tweet_non_parsed where PAYLOAD like '%${tropos}%'`);
	let tweetsAssociated2Topic=[];

	for(i=0;i<results.length;i++){
	
		let jsonR=JSON.parse(results[i].PAYLOAD);
		console.log("jsonR",jsonR, jsonR.id)
		tweetsAssociated2Topic.push({id:jsonR.id, author_id:jsonR.author_id, text:jsonR.text});
	}
	
	console.log("tweetsAssociated2Topic",tweetsAssociated2Topic)
	res.send({tweetsList:tweetsAssociated2Topic, tropoi:tropos});
})


	
app.get("/getTroposList", async (req,res)=>{
	let results=await dbHandler.dbExecQuery(mysql,`select distinct tropos from tweet_recent_payload`);
	let parsedData=results.map(o=>{return o.tropos;});
	res.send({data:parsedData});		
});


app.get("/getTweetContentByID", async (req,res)=>{
	let getQuery=require('url').parse(req.url,true).query;
	let TID=getQuery.TID;
	
	console.log("getTweetContentByID",TID)
	
	let results=await dbHandler.dbExecQuery(mysql,`select * from tweet_non_parsed where ID=${TID}`);	
	let payload=JSON.parse(results[0].PAYLOAD);
	console.log("payload",payload)
	let tweetObject={};	
	tweetObject.fieldsDescription=Object.keys(payload);	
	tweetObject.payload=payload;
	
	res.send(tweetObject);
})

app.get('/tableDataProvider',(req,res)=>{
	res.send({header:['k1','k2','k3'], body:[[1,2,3],[4,5,6]]});
})

//MobX,  mgreca@a.ki
app.get('/pullAndInsertTweetsFromID', async (req,res)=>{

	let getQuery=require('url').parse(req.url,true).query;
	let TIDInitval=getQuery.TID*1;
	
	let results=await dbHandler.dbExecQuery(mysql,"select count(*) from tweet_non_parsed");
	console.log("results",results);
	
	let tweetObject={};
	let tArray=[];
	for(TID=TIDInitval;TID<(TIDInitval*1+5);TID++){
		tweetObject.tweetContentData={};
	
		tweetObject.tweetContentData.fieldsDescription=["TID","expectations","messon","analysis"];

		tweetObject.tweetContentData.payload=[];
	
		tweetObject.tweetContentData.payload.push({TID:TID, expectations:"unknown content", messon:"vive la liberté", analysis:"always done"});
		tweetObject.tweetContentData.payload.push({TID:TID, expectations:"algorithms", messon:"appassionate", analysis:"however done"});
		tweetObject.tweetContentData.payload.push({TID:TID, expectations:"plain text", messon:"break outwards", analysis:"yet done"});
		tweetObject.tweetContentData.payload.push({TID:TID, expectations:"money", messon:"amazed", analysis:"yes done"});
		
		tArray.push({ID:TID, payload: tweetObject});
		tweetObject={};
	}
	
	let inserResults=await dbHandler.insertData(mysql,tArray,"tweet_non_parsed");
	res.send(inserResults);
});

const server = app.listen(3001, ()=>{
	console.log(`server running ${process.env.USER_ID}`);
})

const bar = new ProgressBar(':bar', { total: 10 })
const timer = setInterval(() => {
  bar.tick()
  if (bar.complete) {
    clearInterval(timer)
  }
}, 100)