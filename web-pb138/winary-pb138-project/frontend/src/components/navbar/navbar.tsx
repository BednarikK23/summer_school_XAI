import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import './navbar.css';
import { useAtom } from 'jotai';
import { whoAmIAtom } from '../../state/authAtom.ts';
import useOrderData from '../../hooks/useOrderData.ts';

const Navbar = () => {
    const [loggedUser] = useAtom(whoAmIAtom);
    const [menuOpen, setMenuOpen] = useState(false);
    const data = useOrderData();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className='navbar'>
            <div className='menu-icon' onClick={toggleMenu}>
                <div className={menuOpen ? 'bar1 change' : 'bar1'}></div>
                <div className={menuOpen ? 'bar2 change' : 'bar2'}></div>
                <div className={menuOpen ? 'bar3 change' : 'bar3'}></div>
            </div>
            <div className={menuOpen ? 'links-shown' : 'links'}>
                <NavLink to="/home" className={({ isActive }) => (isActive ? 'nav-active' : '')}>Home</NavLink>
                <NavLink to="/wines" className={({ isActive }) => (isActive ? 'nav-active' : '')}>Products</NavLink>
                <NavLink to="/wineries" className={({ isActive }) => (isActive ? 'nav-active' : '')}>Wineries</NavLink>
                <NavLink to="/tours" className={({ isActive }) => (isActive ? 'nav-active' : '')}>Tours</NavLink>
                {loggedUser?.isAdmin && <NavLink to="/admin" className={({ isActive }) => (isActive ? 'nav-active' : '')}>Admin</NavLink>}
                {!loggedUser && <NavLink to="/auth/login" className={({ isActive }) => (isActive ? 'nav-active' : '')}>Login</NavLink>}
                {loggedUser && (
                    <NavLink to="/user" className={({ isActive }) => (isActive ? 'nav-active' : '')}>
                        {loggedUser.name}
                        {loggedUser.isAdmin ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{ marginLeft: '8px' }}>
                                <path d="M12 0L1.742 2.148v7.468c0 5.883 3.815 11.285 9.414 14.384 5.599-3.099 9.414-8.501 9.414-14.384V2.148L12 0z" fill="#FFF" />
                                <path d="M12 2.151l8.455 1.787v7.092c0 4.942-3.175 9.449-8.455 12.071-5.28-2.622-8.455-7.129-8.455-12.071V3.938L12 2.151M12 0L1.742 2.148v7.468c0 5.883 3.815 11.285 9.414 14.384 5.599-3.099 9.414-8.501 9.414-14.384V2.148L12 0z" fill="#000" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{ marginLeft: '8px' }}>
                                <circle cx="12" cy="7" r="4" fill="#FFF" />
                                <path d="M12 13c-4.418 0-8 2.015-8 4.5V19h16v-1.5c0-2.485-3.582-4.5-8-4.5z" fill="#FFF" />
                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0 16c-4.418 0-8-2.015-8-4.5S7.582 11 12 11s8 2.015 8 4.5S16.418 20 12 20z" fill="#000" />
                            </svg>
                        )}
                    </NavLink>
                )}
                <NavLink to="/basket" className={({ isActive }) => (isActive ? 'nav-active' : '')}>
                    <svg xmlns="http://www.w3.org/1999/xlink"
                        width="27px" height="27px" viewBox="0 0 902.86 902.86">
                        <g>
                            <g>
                                <path d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z
                M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z" fill="white" />
                                <path d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717
                c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744
                c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742
                C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744
                c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z
                M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742
                S619.162,694.432,619.162,716.897z" fill="white" />
                            </g>
                        </g>
                    </svg>

                    <span>

                        {data.orderData.products.length > 0 && data.orderData.products.reduce((total, product) => {
                            return total + product.quantity;
                        }, 0)}
                    </span>
                </NavLink>
            </div>
        </nav >
    );
};

export default Navbar;
