from flask import Flask, request
from flask import jsonify
from flask.ext.cors import CORS, cross_origin
app = Flask(__name__, static_url_path='')
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/getData', methods=['GET'])
def getData():
	queryArgs = request.args.to_dict()
	print(queryArgs['var1'])
	response_dict={}
	for key in queryArgs:
		response_dict[key]=queryArgs[key][len(queryArgs[key])::-1]
	response = response_dict
	#jsonify({'message': 'data', 'person':'yourself'})
	return response

# run the application
if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0', port=8080)