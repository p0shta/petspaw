import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Layout from './Layout/Layout';
import Sidebar from './Sidebar/Sidebar';
import HomePage from 'pages/HomePage';
import VotingPage from 'pages/VotingPage';
import BreedsPage from 'pages/BreedsPage';
import GalleryPage from 'pages/GalleryPage';
import BreedDetails from '../pages/BreedDetailsPage';
import SearchPage from 'pages/SearchPage';
import Searchbar from './Searchbar/Searchbar';
import InterestItemsPage from 'pages/InterestItemsPage';

export const App = () => {
    const [search, setSearch] = useState('');

    const navigate = useNavigate();

    const handleSubmit = query => {
        setSearch(query);

        navigate('/search', { replace: true });
    };

    return (
        <>
            <Layout>
                <Sidebar />
                <Searchbar onSubmit={handleSubmit} />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/voting" element={<VotingPage />} />
                    <Route path="/breeds" element={<BreedsPage />} />
                    <Route path="/breeds/:id" element={<BreedDetails />} />
                    <Route
                        path="search"
                        element={<SearchPage search={search} />}
                    />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/favorites" element={<InterestItemsPage />} />
                    <Route path="/likes" element={<InterestItemsPage />} />
                    <Route path="/dislikes" element={<InterestItemsPage />} />
                </Routes>
            </Layout>
        </>
    );
};
