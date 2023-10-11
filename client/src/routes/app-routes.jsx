import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import Glaucoma from '../pages/Glaucoma';
import Cataract from '../pages/Cataract';
import GetStarted from '../pages/GetStarted';
import DiabeticRetinopathy from '../pages/DiabeticRetinopathy';
import Upload from '../pages/UploadImage';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const AppRoutes = () => {
  return (
    <div className="flex-1">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/glaucoma" element={<Glaucoma />} />
          <Route path="/getstarted/cataract" element={<Cataract />} />
          <Route
            exact
            path="/diabeticRetinopathy"
            element={<DiabeticRetinopathy />}
          />
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/getstarted" element={<GetStarted />} />
          <Route path="/uploadImage" element={<Upload />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
