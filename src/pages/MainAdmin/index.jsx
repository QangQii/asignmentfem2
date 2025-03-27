import HeaderAdmin from "../../components/admin/layout/header";
import FooterAdmin from "../../components/admin/layout/footer";
import { Outlet } from "react-router";


const MainAdmin = () => {
    return ( // return chỉ chạy 1 thẻ div 
      <div>
          <HeaderAdmin /> {/* header client dc import */}
  
            <Outlet />
  
          <FooterAdmin/> {/* footerfooter client dc import */}
      </div>
    );
  };
  export default MainAdmin;
  