import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import  "./mainLayout.css";
import Footer from "../components/footer/footer";
import { useWhoAmI } from "../hooks/useAuth";
import { useAtom } from "jotai";
import { whoAmIAtom } from "../state/authAtom";
import { useEffect } from "react";

const MainLayout = () => {
    const { data: whoAmI } = useWhoAmI();

    const [, setLoggedUser] = useAtom(whoAmIAtom);

    useEffect(() => {
        if (whoAmI) {
            setLoggedUser(whoAmI.item);
        }
    }, [whoAmI, setLoggedUser])

    return (
        <div className="main-layout">
            <Navbar />
            <div className="content">
                <Outlet />
            </div>
            <Footer/>
        </div>
    );
}

export default MainLayout;