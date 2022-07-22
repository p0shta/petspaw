import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getAllBreeds } from '../services/api-service';

import Loader from 'components/Loader/Loader';
import Section from 'components/Section/Section';
import BreedsNavbar from 'components/BreedsNavbar/BreedsNavbar';
import Grid from 'components/Grid/Grid';

export default function BreedsPage() {
    const [breeds, setBreeds] = useState(null);
    const [breed, setBreed] = useState(null);
    const [limit, setLimit] = useState(5);
    const [filteredBreeds, setFilteredBreeds] = useState(null);
    const [order, setOrder] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAllBreeds().then(data => {
            setBreeds(data);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (!breeds) {
            return;
        }

        if (order) {
            const filter = breeds
                .slice(0, limit)
                .sort((a, b) => a.name.localeCompare(b.name));
            setFilteredBreeds(filter);
        } else {
            const filter = breeds
                .slice(0, limit)
                .sort((a, b) => b.name.localeCompare(a.name));
            setFilteredBreeds(filter);
        }
    }, [limit, breeds, order]);

    if (breed) {
        return <Navigate to={`/breeds/${breed}`} replace />;
    }

    return (
        <>
            <Section>
                <BreedsNavbar
                    key="breeds"
                    breeds={breeds}
                    handleBreedChange={setBreed}
                    limit={limit}
                    order={order}
                    handleLimitChange={setLimit}
                    handleOrderChange={setOrder}
                />
                {loading ? <Loader /> : <Grid items={filteredBreeds} />}
            </Section>
        </>
    );
}
