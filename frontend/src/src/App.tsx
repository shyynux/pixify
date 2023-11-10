import React, { useState } from 'react';
import './App.css';
import { saveAs } from 'file-saver';

function App() {
  const [inputImage, setInputImage] = useState<string | null>(null);
  const [outputImage, setOutputImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInputImage(reader.result as string);
        setOutputImage(null); // Clear previous output when a new image is selected
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcessButtonClick = async () => {
      const inputImagePath = inputImage;
      const outputImagePath = outputImage;
      const pixelSize = 6;

      console.log('input');
      console.log(inputImagePath);
      console.log('---------')
    
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
    <div className=''>
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
          {inputImage ? (
            <img src={inputImage} alt="Uploaded" className="h-full w-full" />
          ) : (
            <label htmlFor="imageInput" className="cursor-pointer">
              <div className="p-4 rounded-md">
                <span className="text-gray-500">Upload image</span>
              </div>
            </label>
          )}
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
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

        {/* Button 2: Process Image */}
        <button
          className="ml-4 mr-4 bg-ghibli-green-4 hover:bg-dark-pastel-green 
          font-bold text-white rounded-lg text-sm px-5 py-2.5 text-center shadow-lg"
          onClick={handleProcessButtonClick}
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
