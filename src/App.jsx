// import React, { useState } from "react"
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Navbar from './component/layout/NavBar';

//question
import AddQuestion from "./component/question/AddQuestion";
import UpdateQuestion from './component/question/UpdateQuestion';

// import  { isAdmin }from "./utils/UserService";
// quiz
import Admin from './component/Admin';
import Home from './component/Home';
import GetAllQuiz from './component/quiz/GetAllQuiz';
import QuizStepper from './component/quiz/QuizStepper';
import Quiz from './component/quiz/Quiz';
import QuizResult from './component/quiz/QuizResult';

// user

import RegistrationPage from './component/auth/RegistrationPage';
import LoginPage from './component/auth/LoginPage';
import Profile from './component/user/Profile';
import UpdateUser from './component/user/UpdateUser';
import Teacher from './component/user/Teacher';
// YouTube Search
import YouTubeSearch from './component/youtubevideo/YouTubeSearch'; // Nhập YouTubeSearch
import AddVideo from './component/youtubevideo/AddVideo';
import VideoList from './component/youtubevideo/VideoList';
import './App.css'
import VideoDetailPage from './component/youtubevideo/VideoDetailPage';


const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/admin' element={<Admin/>} />


          <Route  path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} /> 

          <Route path='/quiz-stepper' element={<QuizStepper/>} />
          <Route path='/take-quiz' element={<Quiz/>} />
           <Route path='/create-quiz' element={<AddQuestion/>} />
           <Route path='/update-quiz/:id' element={<UpdateQuestion/>} />
           <Route path='/all-quizzes' element={<GetAllQuiz/>} />
           <Route path='/quiz-result' element={<QuizResult/>} />
           <Route path='/admin' element={<Admin/>} />
            {/* {isAdmin() && ( */}
              <>
                <Route path="/register" element={<RegistrationPage />} /> 
                <Route path="/admin/user-management" element={<Teacher/>} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
              </>
               
            {/* YouTube Routes */}
            <Route path="/youtube-search" element={<YouTubeSearch />} />
            <Route path="/addVideo" element={<AddVideo />} />
            <Route path="/videos" element={<VideoList />} />
            <Route path="/videos/:id" element={<VideoDetailPage />} />
                

           
            {/* )} */}
            {/* <Route path="*" element={<Navigate to="/login" />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
  // return (
  //    <Router >
  //     <Navbar/>
  //     <Routes>
  //       <Route path='/' element={<LoginPage/>} />
  //       <Route path='/loign' element={<LoginPage/>} />
  //       <Route path='/profile' element={<Profile/>} />

        
        // <Route path='/quiz-stepper' element={<QuizStepper/>} />
        // <Route path='/take-quiz' element={<Quiz/>} />
        // <Route path='/admin' element={<Admin/>} />
        // <Route path='/create-quiz' element={<AddQuestion/>} />
        // <Route path='/update-quiz/:id' element={<UpdateQuestion/>} />
        // <Route path='/all-quizzes' element={<GetAllQuiz/>} />
        // <Route path='/quiz-result' element={<QuizResult/>} />

  //       <>
  //       {adminOnly() && (
  //       <> 
  //         <Route path="/register" element={<RegistrationPage />} />
  //         <Route path="/admin/user-management" element={<Teacher />} />
  //         <Route path="/update-user/:userId" element={<UpdateUser />} />
  //        </> 
  //      )} 

  //   <Route path="*" element={<Navbar to="/login" />} />
  //   </>
       
  //     </Routes>
  //    </Router>

  // );
// };

export default App
