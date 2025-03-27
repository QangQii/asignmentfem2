import HeaderClient from "../../components/user/layout/header/index";
import FooterClient from "../../components/user/layout/footer/index";
const Login = () =>{
    return ( // return chỉ chạy 1 thẻ div 
        <div>
            <HeaderClient /> {/*  header client dc import */}
    
          <div className="container">
            <h1>Day la trang Login</h1>
          </div>
    
            <FooterClient/> {/*  footerfooter client dc import */}
        </div>
      );
}
export default Login;