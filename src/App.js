import './App.css';
import {
  Routes, // có nhiều đường dẫn, chứa nhiều rou
  Route // chỉ chứa 1 đường dẫn
} from 'react-router';

import Home from './pages/home';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Product from './pages/product';
import MainUser from './pages/MainUser';
import MainAdmin from './pages/MainAdmin';



function App() {



  return ( 
    <Routes>
      <Route path='/' element={<MainUser/>}>

      <Route index element={<Home/>}/>
      <Route path='login' element={<Login/>}/> {/* Trang con khong có dấu xẹt */}

      </Route> {/* Trang user */}

      <Route path='/admin' element={<MainAdmin/>}>
        <Route index element={<Dashboard/>}/>
        <Route path='product' element={<Product/>}/> {/* Trang con khong có dấu xẹt */}
      </Route>





      {/* <Route path="/" element={<Home />} />
      <Route path="/product" element={<Product />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
}

export default App;
