import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Menu from './components/Menu';
import AddTask from './components/AddTask';
import AllTasks from './components/AllTasks';
import UpdateDelete from './components/UpdateDelete';
import ViewAllTasks from './components/ViewAllTasks';

const access_token = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

function App() {
  return (
   <BrowserRouter>
  <Menu/>

   <Routes>
    <Route path='/Login' element={<Login/>} />
    <Route path='/signup' element={<Register/>} />
    <Route path='/Home' element={<Home/>} />
    <Route path='/AddTask' element={<AddTask/>} />
    <Route path='/AllTasks' element={<AllTasks/>} />
    <Route path='/UpdateDelete' element={<UpdateDelete/>} />
    <Route path='/ViewAllTasks' element={<ViewAllTasks/>} />
   </Routes>
   </BrowserRouter>

  );

}

export default App;
