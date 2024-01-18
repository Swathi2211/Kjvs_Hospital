import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Main from './comps/main/Main';
import SignIn from './comps/signIn';
import Appoint from './comps/appointment/Appoint';
import Appp from './comps/appointment/Appp';

import "../src/App.css";
import Dmain from './comps/dashboard/Dmain';
import Emain from './comps/employee/Emain';
import OpMain from './comps/op/opMain';
import Dentry from './comps/doctor/dEntry';
import Leave from './comps/edit/leave';
import EditMain from './comps/edit/editMain';
import PhotoUpload from './comps/employee/PassportPhotoUploader';
import Notify from './comps/notify/Notify';
import Chat from './chat/Chat';
import Service from './comps/main/Service';
import About from './comps/about/about';
import Services from './comps/service/service';
import Contact from './comps/contact/contact';
import { useEffect } from 'react';
import Navi from './comps/navi/navi';
import SkeletMain from './comps/skeleton/skeletMain';
import SkeletApp from './comps/skeleton/skeletApp';
import SkeletAbout from './comps/skeleton/skeletAbout';
import SkeletService from './comps/skeleton/skeletService';
import SkeletCont from './comps/skeleton/skeletCont';
import LoadingSkeleton from './comps/skeleton/skeletLogin';
import KjvsLoader from './comps/skeleton/skeletKJVS';
import Not1 from './comps/notify/not1';

function ScrollToTopOnNavigation() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null; // Render nothing, this is just a side effect
}


function App() {


  return (
    <>



      <HashRouter>

        

        <ScrollToTopOnNavigation />

        <Routes>


          <Route path="/abcd" element={<KjvsLoader />}></Route>
          <Route path="/" element={<Main />} ></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/appointment" element={<Appoint />}></Route>
          <Route path="/dashboard" element={<Dmain />}></Route>
          <Route path="/dashboard/add$Employee" element={<Emain />}></Route>
          <Route path="/dashboard/profile" element={<EditMain />}></Route>
          <Route path='/dashboard/appointment' element={<OpMain />}></Route>
          <Route path='/dashboard/prescription' element={<Dentry />}></Route>
          <Route path='/dashboard/notification' element={<Not1 />}></Route>
          <Route path="/service" element={<Services />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>

          <Route path="/dashboard/leave" element={<Leave />}></Route>



        </Routes>

      </HashRouter>


    </>
  );
}

export default App;
