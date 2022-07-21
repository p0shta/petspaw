import { useLocation, Link, useParams } from 'react-router-dom';
import back from '../../images/icons/back.svg';

import s from './Section.module.scss';

export default function Section({ children }) {
    const { pathname } = useLocation();
    const { id } = useParams();

    const isBreedsNavbar = children[0]?.type?.name === 'BreedsNavbar';
    const isBreedDetailPage = pathname.includes('breeds/');
    const currentPageTitle = isBreedDetailPage
        ? pathname.slice(1, pathname.slice(1).indexOf('/') + 1).toUpperCase()
        : pathname.slice(1).toUpperCase();

    return (
        <section className={s.section}>
            <nav className={s.nav}>
                <Link to=".." className={s.btnBack}>
                    <img src={back} alt="back" />
                </Link>
                <div className={s.sectionTitle}>{currentPageTitle}</div>
                {isBreedsNavbar ? children[0] : null}
                {isBreedDetailPage && <div className={s.id}>{id}</div>}

                {isBreedDetailPage ? children[0] : null}
            </nav>
            {isBreedsNavbar ? children[1] : children}
        </section>
    );
}
