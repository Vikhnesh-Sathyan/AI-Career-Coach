import "../../styles/adminlayout.css";

import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

function AdminLayout({ children }) {

    return (

        <div className="admin-layout">

            <AdminSidebar />

            <div className="admin-main">

                <AdminTopbar />

                <div className="admin-content">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default AdminLayout;