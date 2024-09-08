import { Link } from 'react-router-dom';
import './navLinksAdmin.css';

const NavLinksAdmin = () => {
    return (
        <div className="nav-links">
            <Link to="wines" className="nav-link">Products</Link>
            <Link to="wineries" className="nav-link">Wineries</Link>
            <Link to="tours" className="nav-link">Tours</Link>
            <Link to="orders" className="nav-link">Orders</Link>
            <Link to="users" className="nav-link">Users</Link>
        </div>
    );
};
export default NavLinksAdmin;
