import mysql.connector;
import json ;
import requests
from datetime import date

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="pessoa",
  database="enmesson"
)


bearerToken="AAAAAAAAAAAAAAAAAAAAAI6%2FTwEAAAAArnZM0IMzRlGWrLKM7QMMcuuGXSY%3DreOgLdwLW2qdrdoknl9IRYIQ7q34DIi286U0yWvCqSbOIeSAQU";


def insertIntoTable(dataArr):
	mycursor = mydb.cursor()
	sql = "INSERT INTO tweet_recent_payload (tropos, PAYLOAD) VALUES (%s, %s)"
	mycursor.executemany(sql, dataArr)
	print("record(s) inserted:",len(dataArr))
	mydb.commit()
	return 1;
	
def create_headers(bearer_token):
    headers = {"Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAI6%2FTwEAAAAArnZM0IMzRlGWrLKM7QMMcuuGXSY%3DreOgLdwLW2qdrdoknl9IRYIQ7q34DIi286U0yWvCqSbOIeSAQU"}
    return headers
    
    
      
#curl "https://api.twitter.com/2/tweets/1261326399320715264" -H "Authorization: Bearer AAAAAAAAAAAAAAAAAAAAAI6%2FTwEAAAAA%2BzfBjNM1kVH6nU40IiU4vkYBXFo%3DILO8FoMSAVZhDdmkmw9JWSKR1ShSts9nGS6oZB2BH1qb9LlY52"

    
    
def create_url(keyword, start_date, end_date, max_results = 10):
    
    search_url = "https://api.twitter.com/2/tweets/search/recent" #Change to the endpoint you want to collect data from

    #change params based on the endpoint you are using
    query_params = {'query': keyword,
                    'start_time': start_date,                    
                    'max_results': max_results,
                    'expansions': 'author_id,in_reply_to_user_id,geo.place_id',
                    'tweet.fields': 'id,text,author_id,in_reply_to_user_id,geo,conversation_id,created_at,lang,public_metrics,referenced_tweets,reply_settings,source',
                    'user.fields': 'id,name,username,created_at,description,public_metrics,verified',
                    'place.fields': 'full_name,id,country,country_code,geo,name,place_type',
                    'next_token': {}}
    return (search_url, query_params)
    
    
def connect_to_endpoint(url, headers, params, next_token = None):
    params['next_token'] = next_token   #params object received from create_url function
    response = requests.request("GET", url, headers = headers, params = params)
    print("Endpoint Response Code: " + str(response.status_code))
    if response.status_code != 200:
        raise Exception(response.status_code, response.text)
    return response.json() 
    
    
headers = create_headers(bearerToken)
tropos="pandora"
keyword = tropos+" lang:en"
start_time = date.today().strftime("20%y-%m-%d")+"T00:00:00.000Z"
end_time=""
max_results = 10
next_token = None

url=create_url(keyword, start_time, end_time, max_results)
print("url",url)
response=connect_to_endpoint(url[0], headers, url[1], next_token)
print("response")
print(response)
data=response['data']

arr=[]

arr.append((tropos,json.dumps(data)));
	
#print("arr",arr)

insertIntoTable(arr);


