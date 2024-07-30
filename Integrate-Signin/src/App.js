import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import EnterStudentId from './components/EnterStudentId';
import ReenterStudentDetails from './components/ReenterStudentDetails';
import StudentDetailsPage from './components/StudentDetailsPage';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentIdProvider from './components/StudentIdContext'; 

function App() {
  return (
    <div>
      
      <StudentIdProvider> 
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path='/' element={<EnterStudentId />} />
            <Route path='/studentDetailsPage' element={<StudentDetailsPage />} />
            <Route path='/reenterStudentDetails' element={<ReenterStudentDetails />} />
            <Route path='/homePage' element={<HomePage />} />
            <Route path='/registerPage' element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </StudentIdProvider>
      <Footer />
    </div>
  );
}

export default App;
