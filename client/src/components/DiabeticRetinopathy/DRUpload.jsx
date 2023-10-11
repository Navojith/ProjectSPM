import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const DRUpload = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFundusDetection = async (image) => {
    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch('/api/detect/fundus', {
      method: 'POST',
      body: formData,
    });

    console.log('submit');

    if (!response.ok) {
      alert('Error detecting fundus');
    } else {
      const data = await response.json();

      // Check if the image is detected as a fundus before sending it for DR prediction
      if (data.is_fundus) {
        Swal.fire({
          title:'Fundus Detected',
          text: 'Uploaded image is a fundus',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        })
        handleDRPrediction(image);
      } else {
        Swal.fire({
          title:'Try Again',
          text: 'Uploaded image is not a fundus',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
      })
      navigate(`/getstarted`);
      }
    }
  };

  const handleDRPrediction = async (image) => {
    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch('/api/predict/dr', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      alert('Error uploading file');
    } else {
      const temp = await response.json();
      console.log('Response from server:', temp);
      setData(temp);
    }
  };

  const handleResponse = () => {
    setData(null);
    setFile(null);
  };

  const handleSubmit = async () => {
    if (file) {
      handleFundusDetection(file);
    } else {
      alert('No file selected.');
    }
  };

  return (
    <div className="justify-self-center w-7/12 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-5">
      <h4 className="mb-12 text-2xl font-semibold text-white flex justify-center">
        Diabetic Retinopathy detection
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
      {data && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                      >
                        <path
                          fill="#c8e6c9"
                          d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                        ></path>
                        <path
                          fill="#4caf50"
                          d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"
                        ></path>
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        className="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Prediction: {data.predictions}
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Confidence: {data.confidence * 100}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={handleResponse}
                  >
                    Re-upload
                  </button>
                  <Link
                    to="/getstarted"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DRUpload;
