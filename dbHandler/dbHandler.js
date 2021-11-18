var self = module.exports = {

	dbObjectCreate: function(mysql)
	{
		return mysql.createConnection({
  			host: 'localhost',
  			user: process.env.DB_USERID,
  			password: process.env.DB_PASSWORD,
  			database: process.env.DB_NAME
  		});
  	},

	dbConnect: function(mysql){
		let con= self.dbObjectCreate(mysql);
		con.connect(function(err) {
  			if (err){
   				throw err;
   			}
  			console.log("Connected!");
		});
		
		return con;
	},

	dbExecQuery: function(mysql,query){
		return new Promise(resolve=>{
			console.log("execQuery:", query);
		 let con=self.dbConnect(mysql);	
		 con.query(query,
			function(err, results, fields) {
        	if (err){
   				throw err;
   			}
        		resolve(results);
    		}
   			);
   		});
   		
   		
	},
	
	
	insertData: function(mysql, dataObjectArray, tableTarget){
		return new Promise(resolve=>{
		
			for(i=0;i<dataObjectArray.length;i++){
				let qryStingPayload="";
				
				let dataLoad=Object.keys(dataObjectArray[i]).map(o=>{					
					return `${JSON.stringify(dataObjectArray[i][o])}`
				}).join("','");
				
				let insertQuery=`insert into ${tableTarget} (${Object.keys(dataObjectArray[0]).join(',')}) values ('${dataLoad}')`;
				console.log(insertQuery)
				let results=self.dbExecQuery(mysql,insertQuery)	
				resolve(results);
			
			}
   		});
		
	}
	

}