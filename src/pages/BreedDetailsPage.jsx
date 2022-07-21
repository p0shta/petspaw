import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllBreeds } from '../services/api-service';
import Section from 'components/Section/Section';
import Loader from 'components/Loader/Loader';

import s from './BreedDetailsPage.module.scss';

export default function BreedDetailsPage() {
    const [breed, setBreed] = useState(null);
    const [loading, setLoading] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        setLoading(true);

        getAllBreeds().then(data => {
            setBreed(data.filter(item => item.id.toString() === id));
            setLoading(false);
        });
    }, [id]);

    return (
        <>
            <Section>
                {loading && <Loader />}

                {breed &&
                    breed.map(item => {
                        const {
                            id,
                            image,
                            name,
                            bred_for,
                            origin,
                            life_span,
                            temperament,
                            weight,
                        } = item;
                        return (
                            <div key={id} className={s.view}>
                                <div className={s.imgWrap}>
                                    <img
                                        src={image.url}
                                        alt={name}
                                        className={s.img}
                                    />
                                </div>
                                <div className={s.info}>
                                    <div className={s.titleWrap}>
                                        <h2 className={s.title}>{name}</h2>
                                    </div>
                                    <div>
                                        <p className={s.subtitle}>{bred_for}</p>
                                        <div className={s.featuresWrap}>
                                            <div>
                                                <p className={s.mainText}>
                                                    Temperament:
                                                </p>
                                                <p>{temperament}</p>
                                            </div>
                                            <div>
                                                <p>
                                                    <span
                                                        className={s.mainText}
                                                    >
                                                        Origin:{' '}
                                                    </span>
                                                    {origin}
                                                </p>
                                                <p>
                                                    <span
                                                        className={s.mainText}
                                                    >
                                                        Weight:{' '}
                                                    </span>
                                                    {weight.metric} kgs
                                                </p>
                                                <p>
                                                    <span
                                                        className={s.mainText}
                                                    >
                                                        Life span:{' '}
                                                    </span>
                                                    {life_span}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </Section>
        </>
    );
}
