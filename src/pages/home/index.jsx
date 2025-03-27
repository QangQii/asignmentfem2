import HeaderClient from "../../components/user/layout/header/index";
import FooterClient from "../../components/user/layout/footer/index";
import { Link } from 'react-router'; // đường dẫn click bằng thẻ link
const Home = () => {
  return ( // return chỉ chạy 1 thẻ div 
    <div>


      <div className="container">
        <h1>Day la trang Home</h1>
        <Link className="btn btn-primary" to={"/login"}>Login</Link>
      </div>

      
    </div>
  );
};
export default Home;
