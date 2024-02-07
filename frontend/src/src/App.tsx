import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import logo from "./assets/logop.png";
import loadingGif from "./assets/Cat.gif";
import bowGif from "./assets/bow.gif";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [inputImage, setInputImage] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [firebaseUrl, setFirebaseUrl] = useState<string[]>([]);
  const [imageData, setImageData] = useState<string | null>(null);
  var pixelationLevel: number = 6;
  var imageUploaded: boolean = false;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("hey i am in bb");
      setInputImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {
    if(!imageUploaded && inputImage){
      uploadToFirebase();
      imageUploaded = true;
    }
  }
  , [inputImage, imageUploaded]);

  const uploadToFirebase = () => {
    if(inputImage == null) return;
    console.log('i was called!');
    const imageRef = ref(storage, `images/${inputImage.name + v4()}`);
    uploadBytes(imageRef, inputImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls([url]);
      });
      console.log('Uploaded your image to the bucket!');
      imageUploaded = true;
    });
    return imageUploaded;
  }

  const addPixelationLevel = (event: React.ChangeEvent<HTMLInputElement>) => {

    pixelationLevel= parseInt(event.target.value);
    console.log(" this is the pixelation level ", pixelationLevel);

  }

  const handlePixifiebutton = async () => {
    try {
      setLoading(true);
      const inputImagePath = imageUrls;
      const pixelSize = pixelationLevel;
  
      const response = await axios.post(
        'https://pixifie.onrender.com/pixelate',
        {
          input_image_path: inputImagePath,
          pixel_size: pixelSize,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('POST request successful for pixelate!');
      const outputURL = response.data.url;
      console.log(' response - data - image', outputURL);
      setFirebaseUrl([outputURL]);
    } catch (error) {
      console.error('POST request failed for pixelate!');
      console.error(error);
    }finally {
      setLoading(false); 
    }
  };

  const handleResetbutton = () => {
    setFirebaseUrl([]);
    setLoading(false);
    setInputImage(null);
    setImageUrls([]);
    setImageData(null);
  }
  
  return (
    <div className="flex flex-col 
    h-screen
    items-center
    font-mono">
    {/* Row 1: Header */}
    <div className="
    flex 
    justify-between flex-col
    items-center p-2  
    font-mono 
     mr-2 ml-2
     md:mb-6
     md:mt-4
    ">
      <div className='
      flex justify-between
      flex-row 
      md:w-1/3 
      md:mb-1
      '>
        {/* pixifie ʕ•͡-•ʔ */}
        <img src={logo} alt='pixifie ʕ•͡-•ʔ' className='md:w-full'/>
        <img src={bowGif} alt="Bow GIF" className='md:h-10 md:mt-1'/>
      </div>

      <div className='
        text-xs font-mono font-semibold text-retro-3'>
        upload your image, select pixelation levels and get your images 🍓 pixelated 🍓
      </div> 
    </div> 

       {/* Row 2: Image Input and Output Boxes */}
       <div className="flex flex-col h-2/3
       justify-center items-center
        sm:h-1/2
         md:flex-row md:p-4 md:w-fit md:h-100">
        {/* Box 1: Image Input */}
        <div className="flex 
        h-full
        mt-3 md:flex-col items-center 
        justify-center 
        rounded-lg font-light
        border-2 border-black
        shadow-lg 
        md:mr-4 md:ml-4 md:h-full md:w-full
        opacity-85
        bg-retro-2 hover:shadow-xl">
          {imageData ? (
            <img src={imageData}  alt="few nanoseconds (˚ ˃̣̣̥⌓˂̣̣̥ )" className="h-full w-full" />
          ) : (
            <label htmlFor="imageInput" className="cursor-pointer">
            <div className="p-4 rounded-md"> 
              <p className="text-retro-4">Upload image</p>
              <p className="text-retro-4">(click me ˙ᵕ˙)</p>
              {inputImage ? (
              <span className="text-black-500"><br />{inputImage.name}</span>
            ) : (
              // empty render
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
        <div className="flex 
        h-full
        mt-3 md:flex-col items-center 
        justify-center 
        rounded-lg font-light
        border-2 border-black
        shadow-lg 
        md:mr-4 md:ml-4 md:h-full md:w-full
        opacity-85
        bg-retro-2 hover:shadow-xl">
          {/* {loading && <img src={loadingGif} alt="Loading" className='h-1/2'/>} */}
          {loading ? (
  /* Render loading indicator here */
  <img src={loadingGif} alt="Loading" className='h-1/2' />
) : (
  /* Render either the pixelated images or the instructions */
  <>
    {firebaseUrl.length > 0 ? (
      firebaseUrl.map((url, index) => (
        <img key={index} src={url} alt="just wait a little, it's coming" className="h-full w-full" />
      ))
    ) : (
      <div className="p-4 rounded-md">
        <p className="text-xs italic text-retro-4">1. (optional) Select pixelation level below</p>
        <p className="text-xs italic text-retro-4">2. Click on the pixelate button below</p>
      </div>
    )}
  </>
)}

        </div>
      </div>

      {/* Row 3: Buttons */}
      <div className="flex p-4
      md:mt-4">

         {/* Button 1: Reseat everything */}
         <button
          className="ml-4 mr-4 bg-retro-3 hover:bg-retro-4 
          font-bold text-white rounded-lg text-sm px-5 py-2.5 text-center shadow-lg"
          onClick={handleResetbutton}
        >
          Reset 🪞
        </button>

        <input
          type="number"
          id="pixelationLevel"
          className="w-16 text-center text-mono border rounded-lg"
          defaultValue={6}
          onChange={addPixelationLevel}
        />

        {/* Button 2: Process Image */}
        <button
          className="ml-4 mr-4 bg-retro-3 hover:bg-retro-4 
          font-bold text-white rounded-lg text-sm px-5 py-2.5 text-center shadow-lg"
          onClick={handlePixifiebutton}
        >
          Pixelate ✨
        </button>

          {/* Button 3: Download Image */}
        <a href={(firebaseUrl[0])} download="my-image.png" className='ml-4 bg-retro-3 hover:bg-retro-4 
        font-bold text-white 
        rounded-lg text-sm px-5 py-2.5 text-center shadow-lg'>Download ⬇️ </a>

      </div>
    </div>
  );
}

export default App;
