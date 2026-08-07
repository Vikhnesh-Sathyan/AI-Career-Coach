import AdminLayout from "../components/admin/AdminLayout";

function AdminDashboard() {
    return (
        <AdminLayout>
            <h1
                style={{
                    color: "white",
                    fontSize: "40px"
                }}
            >
                Admin Dashboard
            </h1>
        </AdminLayout>
    );
}

export default AdminDashboard;