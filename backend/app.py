from flask import Flask, request, jsonify
from pixelate import pixelate_image
from flask_cors import CORS  

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/pixelate', methods=['POST'])
def pixelate():
    data = request.json
    input_image_path = data.get('input_image_path')
    output_image_path = data.get('output_image_path')
    pixel_size = data.get('pixel_size')

    # Call Python function to pixelate the image
    pixelate_image(input_image_path, output_image_path, pixel_size)

    result = "Pixelated your image."

    return jsonify({'Success': result})

if __name__ == '__main__':
    app.run(debug=True)