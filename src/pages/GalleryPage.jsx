import { useState, useEffect } from 'react';
import { getFilteredGallery, getAllBreeds } from '../services/api-service';

import Loader from 'components/Loader/Loader';
import Section from 'components/Section/Section';
import GalleryNavbar from '../components/GalleryNavbar/GalleryNavbar';
import Grid from 'components/Grid/Grid';

export default function GalleryPage() {
    const [breed, setBreed] = useState('none');
    const [breeds, setBreeds] = useState(null);
    const [filteredItems, setFilteredItems] = useState(null);
    const [limit, setLimit] = useState(5);
    const [order, setOrder] = useState('random');
    const [type, setType] = useState('gif,jpg,png');
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAllBreeds().then(data => {
            setBreeds(data);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        setLoading(true);
        getFilteredGallery(limit, type).then(data => {
            const items = data.sort((a, b) => a.id.localeCompare(b.id));
            setFilteredItems(items);
            setLoading(false);
        });
    }, [limit, type, update]);

    const handleSubmit = e => {
        e.preventDefault();
        setUpdate(prev => !prev);
    };

    return (
        <>
            <Section>
                <GalleryNavbar
                    breeds={breeds}
                    breed={breed}
                    limit={limit}
                    order={order}
                    type={type}
                    handleLimitChange={setLimit}
                    handleTypeChange={setType}
                    handleBreedChange={setBreed}
                    handleOrderChange={setOrder}
                    handleUpdateChange={setUpdate}
                    handleSubmit={handleSubmit}
                />

                {loading && <Loader />}

                <Grid items={filteredItems} />
            </Section>
        </>
    );
}
