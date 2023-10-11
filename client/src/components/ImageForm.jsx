import { useState } from 'react';
import Swal from 'sweetalert2'

const ImageForm = ({ result }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };


  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/detect/fundus', {
      method: 'POST',
      body: formData,
    });

    console.log('submit');

    if (!response.ok) {
      alert('Error uploading file');
    } else {
      const data = await response.json();
      console.log(data)
      
      if(data.is_fundus == true){
      Swal.fire({
        title: 'Fundus',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    })
  }
    else{
      Swal.fire({
        title: 'Not a fundus.Try Again!',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    })
    }

    }
  };

  return (
    <div className="justify-self-center w-7/12 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-5">
      <h4 className="mb-12 text-2xl font-semibold text-white flex justify-center">
        Upload fundus Image
      </h4>
      <div className="flex items-center justify-center min-w-min">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <div className="flex justify-center">
        {file && (
          <div className=" bg-white border border-gray-200 rounded-lg shadow m-9 p-3">
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="Uploaded"
                className="rounded-lg w-80"
              />
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center">
        {file && (
          <button
            type="submit"
            className="w-80 rounded-full bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};
export default ImageForm;
