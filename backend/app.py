from flask import Flask, request, jsonify
from pixelate import pixelate_image
from flask_cors import CORS
import imutils

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/pixelate', methods=['POST'])
def pixelates():
    data = request.json
    image_urls =  data.get('input_image_path')

    # convert firebase-image-url to a numPy array type image
    for image_url in image_urls:
        input_image = imutils.url_to_image(image_url)

    pixel_size = data.get('pixel_size')
    print("type of pixel_size", pixel_size)

    # Call Python function to pixelate the image
    firebase_pixelated_url = pixelate_image(input_image, pixel_size)

    #return firebase URL
    return jsonify({'url': firebase_pixelated_url})

if __name__ == '__main__':
    app.run(debug=True)