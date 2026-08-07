import { useState } from "react";
import { ChevronDown, ChevronUp, Bell, Search, User } from "lucide-react";
import "../../styles/admintopbar.css";
import AdminQuickStats from "./AdminQuickStats";


function AdminTopbar() {

    const [open, setOpen] = useState(false);


    return (

        <div className={`admin-top-wrapper ${open ? "open" : ""}`}>


            {/* Topbar */}
            <div className="admin-topbar">

                <div className="top-left">
                    <h2>
                        Admin Dashboard
                    </h2>
                </div>


                <div className="top-actions">

                    <div className="icon-box">
                        <Search size={20}/>
                    </div>

                    <div className="icon-box">
                        <Bell size={20}/>
                    </div>


                    <div className="profile">

                        <User size={20}/>

                        <span>
                            Admin
                        </span>

                    </div>

                </div>


            </div>
{

    open && (

        <div className="admin-expand">

            <AdminQuickStats />

        </div>

    )

}


            {/* Floating Center Button */}

            <button
                className="toggle-btn"
                onClick={()=>setOpen(!open)}
            >

                {
                    open 
                    ?
                    <ChevronUp size={25}/>
                    :
                    <ChevronDown size={25}/>
                }


            </button>



        </div>

    );
}


export default AdminTopbar;