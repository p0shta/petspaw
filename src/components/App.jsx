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
    const [logActivity, setLogActivity] = useState(
        localStorage.getItem('logActivity')
            ? JSON.parse(localStorage.getItem('logActivity'))
            : []
    );
    const navigate = useNavigate();

    const handleSubmit = query => {
        setSearch(query);

        navigate('/search', { replace: true });
    };

    const handleActivity = (itemId, action, activity) => {
        const log = {
            id: Date.now(),
            itemId,
            action,
            activity,
            date: {
                hours: new Date().getHours(),
                minutes: new Date().getMinutes(),
            },
        };
        setLogActivity([log, ...logActivity]);

        localStorage.setItem('logActivity', JSON.stringify(logActivity));
    };

    return (
        <>
            <Layout>
                <Sidebar />
                <Searchbar onSubmit={handleSubmit} />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/voting"
                        element={
                            <VotingPage
                                onActivityClick={handleActivity}
                                logActivity={logActivity}
                            />
                        }
                    />
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
