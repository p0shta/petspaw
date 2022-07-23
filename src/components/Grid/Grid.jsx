import { Link, useLocation } from 'react-router-dom';

import s from './Grid.module.scss';
import fav from '../../images/icons/favHeartSmall.svg';
import favored from '../../images/icons/favHeartSmallFilled.svg';

export default function Grid({ items }) {
    const { pathname } = useLocation();
    const isBreedPage = pathname.includes('breeds');
    const isSearchPage = pathname.includes('search');

    const favorites = localStorage.getItem(`favorites`)
        ? JSON.parse(localStorage.getItem(`favorites`))
        : [];

    return (
        <ul className={s.parent}>
            {items &&
                items.map(item => {
                    const { id, image, url, name } = item;

                    return (
                        <li key={id} className={s.li}>
                            <img
                                src={url || image.url}
                                alt={name}
                                className={s.image}
                            />
                            {isBreedPage || isSearchPage ? (
                                <BreedsOverlay
                                    name={name}
                                    id={id}
                                    isBreedPage={isBreedPage}
                                    isSearchPage={isSearchPage}
                                />
                            ) : (
                                <FavOverlay favorites={favorites} id={id} />
                            )}
                        </li>
                    );
                })}
        </ul>
    );
}

function FavOverlay({ favorites, id }) {
    const isFavored = favorites.find(item => item.id === id);

    return (
        <div className={s.boxWrapFav}>
            <div className={s.boxFav}>
                <img src={isFavored ? favored : fav} alt="fav" />
            </div>
        </div>
    );
}

function BreedsOverlay({ name, id, isBreedPage, isSearchPage }) {
    return (
        <>
            {isBreedPage && (
                <Link to={`${id}`}>
                    <div className={s.boxWrapBreed}>
                        <div className={s.boxBreed}>
                            <p className={s.boxBreedTitle}>{name}</p>
                        </div>
                    </div>
                </Link>
            )}

            {isSearchPage && (
                <Link to={`/breeds/${id}`}>
                    <div className={s.boxWrapBreed}>
                        <div className={s.boxBreed}>
                            <p className={s.boxBreedTitle}>{name}</p>
                        </div>
                    </div>
                </Link>
            )}
        </>
    );
}
