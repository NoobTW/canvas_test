from flask import Flask,request
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/data' , methods=['POST'])
@cross_origin()
def post_data():
	# request_data = request.get_json()
	print('-------')
	# print(request.data)
	# print(request.form.get('data'))
	print(request.get_json())
	print('-------')
	return 'OK'

app.run(port=5000, debug=False)