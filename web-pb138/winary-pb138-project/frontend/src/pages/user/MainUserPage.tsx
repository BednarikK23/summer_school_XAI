import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { whoAmIAtom } from '../../state/authAtom';
import { useLogout } from '../../hooks/useAuth';
import ChangeUserDialog from '../../components/forms/user/ChangeUserDialog';
import './mainUserPage.css';
import Button from '../../components/buttons/Button';
import MyWineryComponent from '../../components/winery/MyWineryComponent';
import useOrderData from '../../hooks/useOrderData';

const MainUserPage = () => {
    const [loggedUser, setLoggedUser] = useAtom(whoAmIAtom);
    const navigate = useNavigate();
    const { refetch: logout } = useLogout();
    const { resetData } = useOrderData();

    const handleLogout = async () => {
        resetData();
        await logout();
        setLoggedUser(null);
        navigate('/');
    };

    return (
        <div className="main-user-page">
            <div className='main-user-page-container'>
                <h2 className="main-user-page-container__header">Account details</h2>
                <div className="user-info-wrapper">
                    <div>
                        <div className="user-info-container">
                            <label className="user-info-container__label">Name</label>
                            <span> {loggedUser?.name}</span>
                        </div>
                        <div className="user-info-container">
                            <label className="user-info-container__label">Email</label>
                            <span> {loggedUser?.email}</span>
                        </div>
                    </div>
                    <div className="user-info-buttons">
                        <ChangeUserDialog user={loggedUser! ?? {}} label='Edit User'/>
                        <Button onClick={handleLogout}>Logout</Button>
                    </div>
                </div>
            </div>
            <div className='main-user-page-container'>
                <h2 className="main-user-page-container__header">Winery details</h2>
                <MyWineryComponent />
            </div>
        </div>
    );
};

export default MainUserPage;
