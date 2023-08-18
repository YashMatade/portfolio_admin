import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './components/Home';
import Projetcs from './components/Projects/Projetcs';
import Navbar from './pages/Navbar';
import AddProject from './components/Projects/AddProject';
import UpdateProject from './components/Projects/UpdateProject';
import Skills from './components/Skills/Skills';
import AddSkill from './components/Skills/AddSkill';
import UpdateSkill from './components/Skills/UpdateSkill';

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/home"} element={<><Navbar /><Home /></>} />
          <Route path={"/projects"} element={<><Navbar /><Projetcs /></>} />
          <Route path={"/project/add"} element={<><Navbar /><AddProject /></>} />
          <Route path={"/project/update/:projectId"} element={<><Navbar /><UpdateProject /></>} />
          <Route path={"/skills"} element={<><Navbar /><Skills /></>} />
          <Route path={"/skill/add"} element={<><Navbar /><AddSkill /></>} />
          <Route path={"/skill/update/:skillId"} element={<><Navbar /><UpdateSkill /></>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;