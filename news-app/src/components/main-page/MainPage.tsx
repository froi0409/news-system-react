import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import HomeIcon from '@mui/icons-material/Home';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Newspaper } from '@mui/icons-material';
import AllNews from '../news/AllNews';
import CategoryIcon from '@mui/icons-material/Category';
import NewsByCategory from '../news/NewsByCategory';
import UserSettings from '../user/UserSettings';
import CreateNew from '../news/CreateNew';
import LogoutIcon from '@mui/icons-material/Logout';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

const MainPage = () => {
    const [value, setValue] = React.useState('Inicio');

    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
    const navigate = useNavigate();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const renderComponent = () => {
        switch (value) {
            case 'Inicio':
                return <AllNews />;
            case 'Crear':
                return <CreateNew />
            default:
                return null;
        }
    }

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();

        removeCookie('jwt');
        navigate('/');
    }

    const focusColor='#a8a39d';

    return (
        <>
            <div style={{ backgroundColor: '#8d7966', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <BottomNavigation style={{ backgroundColor: '#8d7966' }} sx={{ width: 500 }} value={value} onChange={handleChange}>
                    <BottomNavigationAction
                        label="Inicio"
                        value="Inicio"
                        icon={<HomeIcon sx={{ color: value === 'Home' ? focusColor : 'inherit' }} />}
                        sx={{ color: value === 'Inicio' ? focusColor : 'inherit', '&.Mui-selected': { color: focusColor } }}
                    />
                    <BottomNavigationAction
                        label="Crear"
                        value="Crear"
                        icon={<BorderColorIcon sx={{ color: value === 'Home' ? focusColor : 'inherit' }} />}
                        sx={{ color: value === 'Crear' ? focusColor : 'inherit', '&.Mui-selected': { color: focusColor } }}
                    />
                    <BottomNavigationAction
                        label="Logout"
                        value="Logout"
                        onClick={handleLogout}
                        icon={<LogoutIcon />}
                    />
                </BottomNavigation>
            </div>
            {renderComponent()}
        </>
    );
}

export default MainPage;
