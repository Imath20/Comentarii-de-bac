import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/index';
import Scriitori from './pages/scriitori';
import Subiecte from './pages/subiecte';
import GhidSubiect1 from './pages/GhidSubiect1';
import GhidSubiect1A from './pages/GhidSubiect1A';
import GhidSubiect1B from './pages/GhidSubiect1B';
import GhidSubiect2 from './pages/GhidSubiect2';
import GhidSubiect2Naratorul from './pages/GhidSubiect2Naratorul';
import GhidSubiect2Notatiile from './pages/GhidSubiect2Notatiile';
import GhidSubiect2Semnificatia from './pages/GhidSubiect2Semnificatia';
import GhidSubiect3 from './pages/GhidSubiect3';
import GhidSubiect3Structura from './pages/GhidSubiect3Structura';
import GhidSubiect3Planuri from './pages/GhidSubiect3Planuri';
import GhidSubiect3Cerinte from './pages/GhidSubiect3Cerinte';
import Ghiduri from './pages/Ghiduri';
import Opre from './pages/opere';
import Comentarii from './pages/comentarii';
import Biblioteca from './pages/biblioteca';
import Scriitoripage from './pages/Scriitor';
import BookReader from './pages/BookReader';
import Videoclipuri from './pages/videoclipuri';
import AI from './pages/ai';
import Proiecte from './pages/proiecte';
import Opera from './pages/Opera';
import Login from './pages/login';
import Profile from './pages/profile';
import EditProfile from './pages/editProfile';
import ProfileComentarii from './pages/profileComentarii';
import SharedCommentView from './pages/SharedCommentView';
import './styles/style.scss';
import Curente from './pages/curente';
import Curent from './pages/Curent';
import Admin from './pages/admin';
// import MigrateScriitori from './pages/migrateScriitori';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profil" element={<Profile />} />
      <Route path="/profil/edit" element={<EditProfile />} />
      <Route path="/profil/comentarii" element={<ProfileComentarii />} />
      <Route path="/scriitori" element={<Scriitori />} />
      <Route path="/subiecte" element={<Subiecte />} />
      <Route path="/ghiduri" element={<Ghiduri />} />
      <Route path="/subiecte/ghid-subiect-1" element={<GhidSubiect1 />} />
      <Route path="/subiecte/ghid-subiect-1/a" element={<GhidSubiect1A />} />
      <Route path="/subiecte/ghid-subiect-1/b" element={<GhidSubiect1B />} />
      <Route path="/subiecte/ghid-subiect-2" element={<GhidSubiect2 />} />
      <Route path="/subiecte/ghid-subiect-2/naratorul" element={<GhidSubiect2Naratorul />} />
      <Route path="/subiecte/ghid-subiect-2/notatiile-autorului" element={<GhidSubiect2Notatiile />} />
      <Route path="/subiecte/ghid-subiect-2/semnificatia-lirica" element={<GhidSubiect2Semnificatia />} />
      <Route path="/subiecte/ghid-subiect-3" element={<GhidSubiect3 />} />
      <Route path="/subiecte/ghid-subiect-3/structura" element={<GhidSubiect3Structura />} />
      <Route path="/subiecte/ghid-subiect-3/planuri" element={<GhidSubiect3Planuri />} />
      <Route path="/subiecte/ghid-subiect-3/cerinte" element={<GhidSubiect3Cerinte />} />
      <Route path="/comentarii" element={<Comentarii />} />
      <Route path="/comentarii/share/:shareId" element={<SharedCommentView />} />
      <Route path="/opere" element={<Opre />} />
      <Route path="/opera/:slug" element={<Opera />} />
      <Route path="/biblioteca" element={<Biblioteca />} />
      <Route path="/scriitor" element={<Scriitoripage />} />
      <Route path="/videoclipuri" element={<Videoclipuri />} />
      <Route path="/proiecte" element={<Proiecte />} />
      <Route path="/ai" element={<AI />} />
      <Route path="/carte/*" element={<BookReader />} />
      <Route path="/curente" element={<Curente />} />
      <Route path="/curent/:id" element={<Curent />} />
      <Route path="/admin" element={<Admin />} />
      {/* <Route path="/migrate-scriitori" element={<MigrateScriitori />} /> */}
    </Routes>
  );
}
