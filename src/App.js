import './App.css';
import {Route, Routes} from 'react-router';

import Home from './pages/client/home';
import Login from './pages/client/login';
import Dashboard from './pages/admin/dashboard';
import Product from './pages/admin/product';
import MainUser from './components/user/MainUser';
import MainAdmin from './components/admin/MainAdmin';


function App() {



  return ( 
    <Routes>
      <Route path='/' element={<MainUser/>}>

          <Route index element={<Home/>}/> {/*đây là trang home trang đầu tiên chỉ cần / ,mặt định nhảy vào home*/}
          <Route path='login' element={<Login/>}/> {/* Trang con khong có dấu xẹt , muốn tìm chạy đêns /login */}

      </Route> {/* Trang user */}

      <Route path='/admin' element={<MainAdmin/>}>
          <Route index element={<Dashboard/>}/> {/*đây là trang dashboard mặc định của đường dẫn /admin*/}

          <Route path='product' element={
              <Product/>}/> {/* đây là trang product muốn chạy phải /admin/product Trang con khong có dấu xẹt */}
      </Route>





      {/* <Route path="/" element={<Home />} />
      <Route path="/product" element={<Product />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
}

export default App;
