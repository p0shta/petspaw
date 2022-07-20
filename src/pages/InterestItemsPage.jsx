import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Section from 'components/Section/Section';
import back from '../images/icons/back.svg';
import Loader from 'components/Loader/Loader';

import s from './InterestItemsPage.module.scss';

export default function InterestItemsPage() {
    const { pathname } = useLocation();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setItems(
            localStorage.getItem(`${pathname.slice(1)}`)
                ? JSON.parse(localStorage.getItem(`${pathname.slice(1)}`))
                : []
        );
    }, [pathname]);

    return (
        <>
            <Section>
                <nav className={s.nav}>
                    <Link to=".." className={s.btnBack}>
                        <img src={back} alt="back" />
                    </Link>
                    <div className={s.breeds}>
                        {pathname.toUpperCase().slice(1)}
                    </div>
                </nav>

                {loading && <Loader />}

                {items.length === 0 ? (
                    <p className={s.subtitle}>No item found</p>
                ) : null}

                {!loading && items ? (
                    <ul className={s.parent}>
                        {items &&
                            items.map(item => {
                                const { id, url } = item;
                                return (
                                    <li className={s.li} key={id}>
                                        <Link to={`/`}>
                                            <img
                                                src={url}
                                                alt={item.breeds[0]?.name}
                                                className={s.image}
                                            />
                                        </Link>
                                    </li>
                                );
                            })}
                    </ul>
                ) : null}
            </Section>
        </>
    );
}
