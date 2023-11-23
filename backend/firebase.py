import firebase_admin
from firebase_admin import credentials, initialize_app, storage
import numpy as np
import cv2

cred = credentials.Certificate("./key.json")
initialize_app(cred, {'storageBucket': 'pixifie-2f67b.appspot.com'})

def storeToFireBase(input_image):
    
    fileName = input_image
    bucket = storage.bucket()
    blob = bucket.blob(fileName)
    blob.upload_from_filename(fileName)

    # Opt : if you want to make public access from the URL
    blob.make_public()

    return blob.public_url
