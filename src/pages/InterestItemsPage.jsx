import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Section from 'components/Section/Section';
import Grid from 'components/Grid/Grid';

import s from './InterestItemsPage.module.scss';

export default function InterestItemsPage() {
    const { pathname } = useLocation();
    const [items, setItems] = useState(
        localStorage.getItem(`${pathname.slice(1)}`)
            ? JSON.parse(localStorage.getItem(`${pathname.slice(1)}`))
            : []
    );

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
                {items.length === 0 && (
                    <p className={s.subtitle}>No item found</p>
                )}

                {items.length > 0 && <Grid items={items} />}
            </Section>
        </>
    );
}
