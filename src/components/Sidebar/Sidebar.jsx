import { NavLink } from 'react-router-dom';
import SidebarNavItem from '../SidebarNavItem/SidebarNavItem';
import logo from '../../images/logo.svg';
import navVoting from '../../images/navVoting.png';
import navBreeds from '../../images/navBreeds.png';
import navGallery from '../../images/navGallery.png';

import s from './Sidebar.module.scss';

const navItemsData = [
    { title: 'voting', img: navVoting, background: '#B4B7FF' },
    { title: 'breeds', img: navBreeds, background: '#97EAB9' },
    { title: 'gallery', img: navGallery, background: '#FFD280' },
];

export default function Sidebar() {
    return (
        <>
            <NavLink to="/">
                <img src={logo} alt="logo" className={s.logo} />
            </NavLink>
            <h1 className={s.title}>Hi intern!</h1>
            <p className={s.subtitle}>Welcome to MI 2022 Front-end test</p>
            <p className={s.navTitle}>Lets start using The Dog API</p>
            <nav className={s.logo}>
                <ul className={s.list}>
                    {navItemsData.map(item => (
                        <SidebarNavItem
                            key={item.title}
                            title={item.title}
                            img={item.img}
                            background={item.background}
                        />
                    ))}
                </ul>
            </nav>
        </>
    );
}
