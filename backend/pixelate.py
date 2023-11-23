import cv2
import numpy as np
import base64
from datetime import datetime
from firebase import storeToFireBase
from PIL import Image

def pixelate_image(input_image, pixel_size):
    
    # Get the height and width of the image
    height, width = input_image.shape[:2]         

    # Resize the image to a smaller size
    dimensions = (width // pixel_size, height // pixel_size)
    small_image = cv2.resize(input_image, dimensions, interpolation=cv2.INTER_LINEAR)

    # Resize the small image back to the original size
    pixelated_image = cv2.resize(small_image, (width, height), interpolation=cv2.INTER_NEAREST)
    
    # convert to RGB colors 
    pixelated_image = cv2.cvtColor(pixelated_image, cv2.COLOR_BGR2RGB)

    # convert to an image file 
    img = Image.fromarray(pixelated_image.astype('uint8'))

    filename = 'pixelated_' + datetime.now().strftime("%Y-%m-%d_%H:%M:%S") + ".png"
    img.save(filename)

    # save the pixelated image to firebase
    firebase_url = storeToFireBase(filename)

    #return the firebase-generated URL
    return firebase_url
    
