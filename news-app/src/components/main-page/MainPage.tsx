import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Newspaper } from '@mui/icons-material';
import AllNews from '../news/AllNews';

const MainPage = () => {
    const [value, setValue] = React.useState('recents');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleClickMainPage = () => {
        
    }

    return (
        <>
            <div style={{ backgroundColor: '#8d7966', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <BottomNavigation style={{ backgroundColor: '#8d7966' }} sx={{ width: 500 }} value={value} onChange={handleChange}>
                    <BottomNavigationAction
                        label="Home"
                        value="Home"
                        icon={<HomeIcon />}
                    />
                    <BottomNavigationAction
                        label="Favorites"
                        value="favorites"
                        icon={<FavoriteIcon />}
                    />
                    <BottomNavigationAction
                        label="Nearby"
                        value="nearby"
                        icon={<LocationOnIcon />}
                    />
                    <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
                </BottomNavigation>
            </div>
            <AllNews />
        </>
    );
}

export default MainPage;
