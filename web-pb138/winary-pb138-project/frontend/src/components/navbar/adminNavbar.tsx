import NavLinksAdmin from "./NavLinksAdmin";
import './adminNavbar.css';

const AdminNavbar = () => {
    return (
        <nav className="admin-navbar">
            <div className="admin-navbar-container">
                <NavLinksAdmin />
            </div>
        </nav>
    );
};

export default AdminNavbar;
