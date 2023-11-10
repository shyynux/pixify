from flask import Flask, request, jsonify
from pixelate import pixelate_image
from flask_cors import CORS  

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})  # Set 'Access-Control-Allow-Origin' to '*'

@app.route('/pixelate', methods=['POST'])
def pixelate():
    input_image_path = request.json['input_image_path']
    output_image_path = request.json['output_image_path']
    pixel_size = request.json['pixel_size']

    #print passed value
    print("Input - ")
    print(input_image_path)
    print("outpu -")
    print(output_image_path)
    print("pixel size")
    print(pixel_size)

    # Call your Python function to pixelate the image
    pixelate_image(input_image_path, output_image_path, pixel_size)

    return jsonify({'success': True})


# # Allow cross-origin requests
# app.config['CORS_ORIGINS'] = ['http://localhost:5173/']

if __name__ == '__main__':
    app.run(debug=True)