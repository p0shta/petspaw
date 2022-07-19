import { useLocation } from 'react-router-dom';

import s from './Layout.module.scss';

export default function Layout({ children }) {
    const { pathname } = useLocation();

    return (
        <main className={s.container}>
            <aside className={s.leftSide}>{children[0]}</aside>
            <div className={s.rightSide}>
                {pathname === '/' ? null : children[1]}
                {children[2]}
            </div>
        </main>
    );
}
