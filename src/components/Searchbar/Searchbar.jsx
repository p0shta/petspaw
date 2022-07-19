import { useState } from 'react';

import searchIcon from '../../images/icons/search.svg';
import likeIcon from '../../images/icons/likeFace.svg';
import favIcon from '../../images/icons/favHeart.svg';
import dislikeIcon from '../../images/icons/dislikeFace.svg';

import s from './Searchbar.module.scss';

export default function Searchbar({ onSubmit }) {
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
                    <a href="https://reactrouter.com/" className={s.link}>
                        <img src={likeIcon} alt="likeIcon" />
                    </a>
                </li>
                <li className={s.item}>
                    <a href="https://reactrouter.com/" className={s.link}>
                        <img src={favIcon} alt="favIcon" />
                    </a>
                </li>
                <li className={s.item}>
                    <a href="https://reactrouter.com/" className={s.link}>
                        <img src={dislikeIcon} alt="dislikeIcon" />
                    </a>
                </li>
            </ul>
        </div>
    );
}
