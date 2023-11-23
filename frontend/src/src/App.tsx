import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

const App = () => {
  const [inputImage, setInputImage] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [firebaseUrl, setFirebaseUrl] = useState<string[]>([]);
  var pixelationLevel: number = 6;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setInputImage(file);
    }
  }

  const handleUploadbutton = () => {
    if(inputImage == null) return;
    const imageRef = ref(storage, `images/${inputImage.name + v4()}`);
    uploadBytes(imageRef, inputImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls([url]);
      });
      console.log('Uploaded your image to the bucket!');
    });
  }

  const handlePixifiebutton = () => {
    /* - api call to the flask backend */
  
    const inputImagePath = imageUrls;
    const pixelSize = pixelationLevel;

    axios
      .post('http://127.0.0.1:5000/pixelate', {
        "input_image_path": inputImagePath,
        "pixel_size": pixelSize,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(function (response) {
        console.log('POST request successful for pixelate!');
        const outputURL = response.data.url;
        console.log(" response - data - image", outputURL);
        setFirebaseUrl([outputURL]);
      })
      .catch(function (error) {
        console.error('POST request failed for pixelate!');
        console.error(error);
      });
  };
  return (
    <div className=''>
    <div className="flex flex-col h-screen items-center font-mono p-4 ">
     
      {/* Row 1: Header */}
      <div className="text-4xl mb-4">
        <header className='flex items-center justify-between'>
        <h2 className=' text-4xl font-mono font-light mt-4 text-ghibli-green-4'>
         pixifie ʕ•͡-•ʔ
      </h2>
        </header>
        <p className='text-xs font-mono font-light text-ghibli-green-4'>
        ʚɞ Pixel charm for your images ʚɞ
      </p>
      </div>

       {/* Row 2: Image Input and Output Boxes */}
       <div className="flex p-4 h-2/3 w-2/3">
        {/* Box 1: Image Input */}
        <div className="flex flex-col items-center justify-center border border-gray-300 
        rounded-lg shadow-lg p-4 mr-4 ml-4 h-9/10 w-4/5 bg-ghibli-green-1">
         {imageUrls.length > 0 ? (
            imageUrls.map((url) => (
              <img src={url} alt="few nanoseconds (˚ ˃̣̣̥⌓˂̣̣̥ )" className="h-full w-full" />
            ))
          ) : (
            <label htmlFor="imageInput" className="cursor-pointer">
              <div className="p-4 rounded-md">
                <span className="text-gray-500">Upload image (click me ˙ᵕ˙)</span>
                <p className="text-xs text-gray-500">select an image, then click on the upload button below</p>
                {inputImage ? (
                <span className="text-gray-500"><br />{inputImage.name}</span>
              ) : (
                // Your fallback content or empty fragment if there's nothing to render when inputImage is falsy
                <span className="text-gray-500"></span>
              )}
              </div>
            </label>
          )}
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        {/* Box 2: Output Image */}
        <div className="flex flex-col items-center justify-center border border-gray-300 
        rounded-lg shadow-lg p-4 mr-4 h-9/10 w-4/5 bg-ghibli-green-1">
          {firebaseUrl.length > 0 ? (
            firebaseUrl.map((url) => (
              <img src={url} alt="just wait a little, it's coming" className="h-full w-full" />
            ))
          ) : (
              <div className="p-4 rounded-md">
              </div>
          )}
        </div>
      </div>

      {/* Row 3: Buttons */}
      <div className="flex p-4">
       {/* Button 1: Upload Image */}
        <button
          className="ml-4 mr-4 bg-ghibli-green-4 hover:bg-dark-pastel-green 
          font-bold text-white rounded-lg text-sm px-5 py-2.5 text-center shadow-lg"
          onClick={handleUploadbutton}
        >
          Upload ⬆️
        </button>

        {/* Add custom pixelation levels */}
       

        {/* Button 2: Process Image */}
        <button
          className="ml-4 mr-4 bg-ghibli-green-4 hover:bg-dark-pastel-green 
          font-bold text-white rounded-lg text-sm px-5 py-2.5 text-center shadow-lg"
          onClick={handlePixifiebutton}
        >
          Pixelate ✨
        </button>

          {/* Button 3: Download Image */}
          {/* <button
          className="ml-4 bg-ghibli-green-4 hover:bg-dark-pastel-green font-bold text-white 
          rounded-lg text-sm px-5 py-2.5 text-center shadow-lg"
          onClick={handleDownloadButtonClick} 
        >
          Download ⬇️
        </button> */}

        <a href={(firebaseUrl[0])} download="my-image.png" className='ml-4 bg-ghibli-green-4 
        hover:bg-dark-pastel-green font-bold text-white 
        rounded-lg text-sm px-5 py-2.5 text-center shadow-lg'>Download ⬇️ </a>

      </div>
    </div>
    </div>
  );
}

export default App;
