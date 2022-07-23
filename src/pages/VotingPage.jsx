import { useEffect, useState } from 'react';
import { getBreedForVoting } from '../services/api-service';
import Section from 'components/Section/Section';
import Loader from 'components/Loader/Loader';

import likeIcon from '../images/icons/likeFaceWhite.svg';
import favIcon from '../images/icons/favHeartWhite.svg';
import dislikeIcon from '../images/icons/dislikeFaceWhite.svg';

import likeIconS from '../images/icons/likeFaceSmall.svg';
import favIconS from '../images/icons/favHeartSmall.svg';
import dislikeIconS from '../images/icons/dislikeFaceSmall.svg';

import s from './VotingPage.module.scss';

export default function VotingPage() {
    const [breed, setBreed] = useState(null);
    const [logActivity, setLogActivity] = useState(
        localStorage.getItem('logActivity')
            ? JSON.parse(localStorage.getItem('logActivity'))
            : []
    );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getBreedForVoting().then(data => {
            setBreed(data);
            setLoading(false);
        });
    }, []);

    const addBreedToStorage = (breed, storageName) => {
        setLoading(true);
        const storage = localStorage.getItem(storageName)
            ? JSON.parse(localStorage.getItem(storageName))
            : [];

        const isInStorage = storage.find(item => item.id === breed.id);
        if (isInStorage) {
            return getBreedForVoting().then(data => {
                setBreed(data);
                setLoading(false);
            });
        }

        localStorage.setItem(storageName, JSON.stringify([breed, ...storage]));
        getBreedForVoting().then(data => {
            setBreed(data);
            setLoading(false);
        });
        createLogActivity(breed.id, 'added', storageName);
    };

    const createLogActivity = (itemId, action, activity) => {
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
            <Section>
                <div className={s.view}>
                    {loading && <Loader />}

                    {!loading &&
                        breed &&
                        breed.map(breed => {
                            const { id, url, name } = breed;
                            return (
                                <div key={id}>
                                    <div className={s.imgWrap}>
                                        <img
                                            src={url}
                                            alt={name}
                                            className={s.img}
                                        />
                                    </div>
                                    <div className={s.votingWrap}>
                                        <div
                                            onClick={() =>
                                                addBreedToStorage(
                                                    breed,
                                                    'likes'
                                                )
                                            }
                                        >
                                            <img
                                                src={likeIcon}
                                                alt="like icon"
                                            />
                                        </div>
                                        <div
                                            onClick={() =>
                                                addBreedToStorage(
                                                    breed,
                                                    'favorites'
                                                )
                                            }
                                        >
                                            <img src={favIcon} alt="fav icon" />
                                        </div>
                                        <div
                                            onClick={() =>
                                                addBreedToStorage(
                                                    breed,
                                                    'dislikes'
                                                )
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
                </div>

                {logActivity && <ActivityList logActivity={logActivity} />}
            </Section>
        </>
    );
}

function ActivityList({ logActivity }) {
    return (
        <>
            <ul className={s.activityList}>
                {logActivity.map(item => {
                    const { itemId, id, action, activity, date } = item;
                    let icon;

                    switch (activity) {
                        case 'likes':
                            icon = likeIconS;
                            break;
                        case 'favorites':
                            icon = favIconS;
                            break;
                        case 'dislikes':
                            icon = dislikeIconS;
                            break;
                        default:
                            break;
                    }

                    return (
                        <li key={id} className={s.activity}>
                            <span className={s.activityTime}>
                                {date.hours}:{date.minutes}
                            </span>{' '}
                            ImageId:{' '}
                            <span className={s.activityText}>{itemId}</span> was{' '}
                            {action} to {activity}
                            <img
                                src={icon}
                                alt={activity}
                                className={s.activityImg}
                            />
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
