import HeaderClient from "../../components/user/layout/header/index";
import FooterClient from "../../components/user/layout/footer/index";
import { Outlet } from "react-router";


const MainUser = () => {
    return ( // return chỉ chạy 1 thẻ div 
      <div>
          <HeaderClient /> {/* header client dc import */}
  
            <Outlet />

  
          <FooterClient/> {/* footerfooter client dc import */}
      </div>
    );
  };
  export default MainUser;
  