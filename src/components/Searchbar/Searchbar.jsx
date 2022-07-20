import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import searchIcon from '../../images/icons/search.svg';
import likeIcon from '../../images/icons/likeFace.svg';
import favIcon from '../../images/icons/favHeart.svg';
import dislikeIcon from '../../images/icons/dislikeFace.svg';

import likeIconWhite from '../../images/icons/likeFaceBigWhite.svg';
import favIconWhite from '../../images/icons/favHeartBigWhite.svg';
import dislikeIconWhite from '../../images/icons/dislikeFaceBigWhite.svg';

import s from './Searchbar.module.scss';

export default function Searchbar({ onSubmit }) {
    const { pathname } = useLocation();
    const currentPage = pathname.slice(1);
    const [search, setSearch] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (!search) {
            return;
        }
        onSubmit(search.trim());
        setSearch('');
    };

    return (
        <div className={s.searchbar}>
            <form className={s.form} onSubmit={handleSubmit}>
                <input
                    className={s.input}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    type="text"
                    autoComplete="off"
                    placeholder="Search for breeds by name"
                />

                <button type="submit" className={s.button}>
                    <img src={searchIcon} alt="search" />
                </button>
            </form>
            <ul className={s.list}>
                <li className={s.item}>
                    <Link
                        to="likes"
                        className={
                            currentPage !== 'likes' ? s.link : s.linkActive
                        }
                    >
                        <img
                            src={
                                currentPage === 'likes'
                                    ? likeIconWhite
                                    : likeIcon
                            }
                            alt="likeIcon"
                        />
                    </Link>
                </li>
                <li className={s.item}>
                    <Link
                        to="favorites"
                        className={
                            currentPage !== 'favorites' ? s.link : s.linkActive
                        }
                    >
                        <img
                            src={
                                currentPage === 'favorites'
                                    ? favIconWhite
                                    : favIcon
                            }
                            alt="favIcon"
                        />
                    </Link>
                </li>
                <li className={s.item}>
                    <Link
                        to="dislikes"
                        className={
                            currentPage !== 'dislikes' ? s.link : s.linkActive
                        }
                    >
                        <img
                            src={
                                currentPage === 'dislikes'
                                    ? dislikeIconWhite
                                    : dislikeIcon
                            }
                            alt="dislikeIcon"
                        />
                    </Link>
                </li>
            </ul>
        </div>
    );
}
