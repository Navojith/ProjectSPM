import { Link} from 'react-router-dom';

const GetStarted = () => {
   return (
    <div className="container mx-auto mt-10 flex flex-wrap justify-center">
      <div className="max-w-sm bg-white shadow-md rounded-md overflow-hidden m-2">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Diabetic Retinopathy
          </h2>
          <p className="text-gray-600 mt-2">
            Diabetic retinopathy is an eye condition that can cause vision loss
            and blindness in people who have diabetes.
          </p>
          <Link to="/diabeticRetinopathy">
            <button className="align-bottom bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 mt-10 rounded-full">
              Test now
            </button>
            </Link>  
        </div>
      </div>

      <div className=" max-w-sm bg-white shadow-md rounded-md overflow-hidden m-2">
        <div className="p-4 flex flex-col items-stretch">
          <h2 className="text-2xl font-semibold text-gray-800">Cataract</h2>
          <p className="text-gray-600 mt-2">
            Cataract is a clouding of the eye&apos;s natural lens, which lies behind
            the iris and the pupil.
          </p>
          <Link to="/getstarted/cataract">
            <button className="self-end bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 mt-16 rounded-full">
              Test now
            </button>
           </Link> 
        </div>
      </div>

      <div className="max-w-sm bg-white shadow-md rounded-md overflow-hidden m-2">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800">Glaucoma</h2>
          <p className="text-gray-600 mt-2">
            Glaucoma is a group of eye diseases that can cause vision loss and
            blindness by damaging a nerve in the back of your eye called the
            optic nerve
          </p>
          <Link to="/glaucoma">
            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 mt-4 rounded-full">
              Test now
            </button>
          </Link>  
        </div>
      </div>
      <div>    
      </div>
    </div>
  );
};

export default GetStarted;
