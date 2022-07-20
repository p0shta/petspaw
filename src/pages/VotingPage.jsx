import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBreedForVoting } from '../services/api-service';
import Section from 'components/Section/Section';
import Loader from 'components/Loader/Loader';
import back from '../images/icons/back.svg';

import likeIcon from '../images/icons/likeFaceWhite.svg';
import favIcon from '../images/icons/favHeartWhite.svg';
import dislikeIcon from '../images/icons/dislikeFaceWhite.svg';

import likeIconS from '../images/icons/likeFaceSmall.svg';
import favIconS from '../images/icons/favHeartSmall.svg';
import dislikeIconS from '../images/icons/dislikeFaceSmall.svg';

import s from './VotingPage.module.scss';

export default function VotingPage({ onActivityClick, logActivity }) {
    const [breed, setBreed] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        getBreedForVoting().then(setBreed).finally(setLoading(false));
    }, []);

    const addLikedToStorage = item => {
        const likes = localStorage.getItem('likes')
            ? JSON.parse(localStorage.getItem('likes'))
            : [];

        localStorage.setItem('likes', JSON.stringify([item, ...likes]));
        getBreedForVoting().then(setBreed).finally(setLoading(false));
        onActivityClick(item.id, 'added', 'Likes');
    };

    const addFavToStorage = item => {
        const favorites = localStorage.getItem('favorites')
            ? JSON.parse(localStorage.getItem('favorites'))
            : [];

        localStorage.setItem('favorites', JSON.stringify([item, ...favorites]));
        getBreedForVoting().then(setBreed).finally(setLoading(false));
        onActivityClick(item.id, 'added', 'Favorites');
    };

    const addDislikedToStorage = item => {
        const dislikes = localStorage.getItem('dislikes')
            ? JSON.parse(localStorage.getItem('dislikes'))
            : [];

        localStorage.setItem('dislikes', JSON.stringify([item, ...dislikes]));
        getBreedForVoting().then(setBreed).finally(setLoading(false));
        onActivityClick(item.id, 'added', 'Dislikes');
    };

    return (
        <>
            <Section>
                <nav className={s.nav}>
                    <Link to=".." className={s.btnBack}>
                        <img src={back} alt="back" />
                    </Link>
                    <div className={s.breeds}>Voting</div>
                </nav>
                {loading && <Loader />}

                {breed &&
                    breed.map(breed => {
                        const { id, url, name } = breed;
                        return (
                            <div key={id} className={s.view}>
                                <div className={s.imgWrap}>
                                    <img
                                        src={url}
                                        alt={name}
                                        className={s.img}
                                    />
                                </div>
                                <div className={s.votingWrap}>
                                    <div
                                        onClick={() => addLikedToStorage(breed)}
                                    >
                                        <img src={likeIcon} alt="like icon" />
                                    </div>
                                    <div onClick={() => addFavToStorage(breed)}>
                                        <img src={favIcon} alt="fav icon" />
                                    </div>
                                    <div
                                        onClick={() =>
                                            addDislikedToStorage(breed)
                                        }
                                    >
                                        <img
                                            src={dislikeIcon}
                                            alt="dislike icon"
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                <ul className={s.activityList}>
                    {logActivity &&
                        logActivity.map(item => {
                            const { itemId, action, activity, date } = item;
                            let icon;

                            switch (activity) {
                                case 'Likes':
                                    icon = likeIconS;
                                    break;
                                case 'Favorites':
                                    icon = favIconS;
                                    break;
                                case 'Dislikes':
                                    icon = dislikeIconS;
                                    break;
                                default:
                                    break;
                            }

                            return (
                                <li key={itemId} className={s.activity}>
                                    <span className={s.activityTime}>
                                        {date.hours}:{date.minutes}
                                    </span>{' '}
                                    ImageId:{' '}
                                    <span className={s.activityText}>
                                        {itemId}
                                    </span>{' '}
                                    was {action} to {activity}
                                    <img
                                        src={icon}
                                        alt={activity}
                                        className={s.activityImg}
                                    />
                                </li>
                            );
                        })}
                </ul>
            </Section>
        </>
    );
}
