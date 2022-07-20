import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllBreeds } from '../services/api-service';
import Section from 'components/Section/Section';
import back from '../images/icons/back.svg';
import Loader from 'components/Loader/Loader';

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
                <nav className={s.nav}>
                    <Link to=".." className={s.btnBack}>
                        <img src={back} alt="back" />
                    </Link>
                    <div className={s.breeds}>Search</div>
                </nav>
                <p className={s.subtitle}>Search results for: {search}</p>
                {loading && <Loader />}
                {!loading && breed ? (
                    <ul className={s.parent}>
                        {breed &&
                            breed.map(breed => {
                                const { id, name, image } = breed;
                                return (
                                    <li className={s.li} key={id}>
                                        <Link to={`/breeds/${id}`}>
                                            <img
                                                src={image.url}
                                                alt={name}
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
