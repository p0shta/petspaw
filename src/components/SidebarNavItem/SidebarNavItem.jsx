import { NavLink, useLocation } from 'react-router-dom';

import s from './SidebarNavItem.module.scss';

export default function SidebarNavItem({ title, img, background }) {
    const { pathname } = useLocation();
    const isActiveLink = pathname.includes(title);

    return (
        <li className={s.card}>
            <NavLink to={`${title}`}>
                <div
                    className={isActiveLink ? s.imgWrap__active : s.imgWrap}
                    style={{ background }}
                >
                    <img src={img} alt={title} className={s.img} />
                </div>
                <div className={isActiveLink ? s.btn__active : s.btn}>
                    {title.toUpperCase()}
                </div>
            </NavLink>
        </li>
    );
}
