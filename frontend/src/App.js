import {BrowserRouter, Routes ,Route} from 'react-router-dom'
import CandidateRegistration from './components/CandidateRegistration';
import SuccessPage from './components/SuccessPage';
import AdminLoginPage from './components/AdminLoginPage';
import AdminDashboard from './components/AdminDashboard';




function App() {
  return (
    <div>

      <BrowserRouter>
      <Routes>
        <Route path='/' element={<CandidateRegistration/>}/>
        <Route path='/success' element={<SuccessPage/>}/>
        <Route path='/admin-login' element={<AdminLoginPage/>}/>
        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
