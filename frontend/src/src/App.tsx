import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { saveAs } from 'file-saver';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

function App() {
  const [inputImage, setInputImage] = useState<File | null>(null);
  const [outputImage, setOutputImage] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [pixifiedImageUrls, setPixifiedImageUrls] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setInputImage(file);
      setOutputImage(null); 
    }
  }

  const handleUploadbutton = async () => {
    if(inputImage == null) return;
    const imageRef = ref(storage, `images/${inputImage.name + v4()}`);
    uploadBytes(imageRef, inputImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
      console.log('Uploaded your image to the bucket!');
    });
  }

  const handlePixifiebutton = async () => {
    /* - api call to the flask backend
      - save the image in firebase storage
      - display pixified image in the browser  */

      axios.post('http://127.0.0.1:5000/funtoon', {
        wow: 'Julianne',
      })
      .then(function (response) {
        console.log('POST request successful for funtoon!');
        console.log(response.data); // Access the response data
      })
      .catch(function (error) {
        console.error('POST request failed for funtoon!');
        console.error(error);
      });

      const inputImagePath = imageUrls;
      const outputImagePath = outputImage;
      const pixelSize = 6;

      axios.post('http://127.0.0.1:5000/pixelate', {
        "input_image_path": inputImagePath,
        "output_image_path": outputImagePath,
        "pixel_size": pixelSize
      }).then(function (response) {
        console.log('POST request successful for pixelate!');
        console.log(response.data); // Access the response data
      })
      .catch(function (error) {
        console.error('POST request failed for pixelate!');
        console.error(error);
      });

      const postData = {
        "input_image_path": inputImagePath,
        "output_image_path": outputImagePath,
        "pixel_size": pixelSize
    };

      // Call flask API
      // const response = await fetch('http://127.0.0.1:5000/pixelate', {
      //   method: 'POST',
      //   mode: 'cors',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     input_image_path: inputImagePath,
      //     output_image_path: outputImagePath,
      //     pixel_size: pixelSize,
      //   }),
      // });

      // axios.post('http://127.0.0.1:5000/pixelate', postData)
      // .then(response => {
      //   console.log('Response:', response.data);
    
      //   const outputImagePath = response.data;
    
      //   if (outputImagePath) {
      //     // The image was pixelated successfully
      //     console.log('Image was pixelated.');
      //     setOutputImage(outputImagePath);
      //   } else {
      //     // Handle unsuccessful response
      //     console.error('Image pixelation failed.');
      //   }
      // })
      // .catch(error => {
      //   console.error('Error:', error);
      // });
  }

  /* ai code below */

  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (inputImage == null) return;
  
    const imageRef = ref(storage, `images/${inputImage.name + v4()}`);
  
    uploadBytes(imageRef, inputImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setInputImage((prev) => [...prev, url]);
      });
    });
  };


  const handleSubmit = async () => {
    const downloadURL = 'http://127.0.0.1:5000/';
 
    const postData = {
        "input_image_path": inputImage,
        "output_image_path": "/Users/jayshree/Documents/open-source/pixify/backend/images/zoop.png",
        "pixel_size": 6
    };
  
    try {
      console.log("this is the downloadURL - ", downloadURL);
      const response = await axios.post('http://127.0.0.1:5000//pixelate', postData);
      const responseData = response.data;

      // Now you can use the responseData as needed
      console.log('Response Data:', responseData);
      console.log('Image processed successfully.');
    } catch (error) {
      console.error('Failed to process image:', error);
    }
  };
  
  // axios.post('https://example.com/api/endpoint', postData)
  //   .then(response => {
  //     console.log('Response:', response.data);
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //   });
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInputImage(reader.result as string);
        console.log("reader result"+ reader.result);
        setOutputImage(null); // Clear previous output when a new image is selected
      };
      reader.readAsDataURL(file);
      formData.append('image', file);
      console.log('h3y hun '+file.name);
    }

    useEffect(() => {
      console.log("input image is " + inputImage);
    }, [inputImage]);
  };

  const handleProcessButtonClick = async () => {
      const inputImagePath = inputImage;
      const outputImagePath = "/Users/jayshree/Documents/open-source/pixify/backend/images/temp1.png";
      const pixelSize = 6;
    
      const response = await fetch('http://127.0.0.1:5000/pixelate', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_image_path: inputImagePath,
          output_image_path: outputImagePath,
          pixel_size: pixelSize,
        }),
      });

      console.log('i am in fecth');
    
      if (response.ok) {
        // The image was pixelated successfully
        console.log('Process button clicked and all OK');
        setOutputImage(outputImagePath);
      } else {
        // An error occurred while pixelating the image
        console.log('dude wtf');
        console.error(response.statusText);
      }
  };

  const handleDownloadButtonClick = () => {
     // Implement your image processing logic here
     console.log('Download button clicked');
    if (outputImage) {
      saveAs(outputImage, 'coolfunkypixels.png');
    }
  };


  return (
    <div className='bg-ghibli-green-1'>
    <div className="flex flex-col h-screen items-center font-mono p-4 bg-ghibli-green-1">
     
      {/* Row 1: Header */}
      <div className="text-4xl mb-4">
        <header className='flex items-center justify-between'>
        <h2 className='w-2/3 text-4xl font-mono font-light mb-6 mt-4 text-ghibli-green-4'>
        pixifie
      </h2>
        </header>
      </div>

       {/* Row 2: Image Input and Output Boxes */}
       <div className="flex p-4 h-2/3 w-2/3">
        {/* Box 1: Image Input */}
        <div className="flex flex-col items-center justify-center border border-gray-300 
        rounded-lg shadow-lg p-4 mr-4 ml-4 h-9/10 w-4/5 bg-ghibli-green-2">
         {imageUrls.length > 0 ? (
            imageUrls.map((url) => (
              <img src={url} alt="Uploaded" className="h-full w-full" />
            ))
          ) : (
            <label htmlFor="imageInput" className="cursor-pointer">
              <div className="p-4 rounded-md">
                <span className="text-gray-500">Upload image</span>
                {inputImage ? (
                <span className="text-gray-500"><br />{inputImage.name}</span>
              ) : (
                // Your fallback content or empty fragment if there's nothing to render when inputImage is falsy
                <></>
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
        rounded-lg shadow-lg p-4 mr-4 h-9/10 w-4/5 bg-ghibli-green-2">
          {outputImage && (
            <img src={outputImage} alt="Processed" className="h-full w-full" />
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


        {/* Button 2: Process Image */}
        <button
          className="ml-4 mr-4 bg-ghibli-green-4 hover:bg-dark-pastel-green 
          font-bold text-white rounded-lg text-sm px-5 py-2.5 text-center shadow-lg"
          onClick={handlePixifiebutton}
        >
          Pixifie ✨
        </button>

          {/* Button 3: Download Image */}
          <button
          className="ml-4 bg-ghibli-green-4 hover:bg-dark-pastel-green font-bold text-white 
          rounded-lg text-sm px-5 py-2.5 text-center shadow-lg"
          onClick={handleDownloadButtonClick}
        >
          Download ⬇️
        </button>
      </div>
    </div>
    </div>
  );
}

export default App;
