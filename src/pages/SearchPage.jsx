import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllBreeds } from '../services/api-service';

import Section from 'components/Section/Section';
import Loader from 'components/Loader/Loader';
import Grid from 'components/Grid/Grid';

import s from './SearchPage.module.scss';

export default function SearchPage({ search }) {
    const [breed, setBreed] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query');

    useEffect(() => {
        setLoading(true);
        setSearchParams({ query: search.toLowerCase() });

        if (!query) return;

        getAllBreeds().then(breeds => {
            setBreed(
                breeds.filter(breed => {
                    return breed.name
                        .toLowerCase()
                        .includes(search.toLowerCase());
                })
            );
            setLoading(false);
        });
    }, [search, query, setSearchParams]);

    return (
        <>
            <Section>
                <p className={s.subtitle}>
                    Search results for: <span> {search}</span>
                </p>

                {loading && <Loader />}

                {!loading && breed ? <Grid items={breed} /> : null}
            </Section>
        </>
    );
}
