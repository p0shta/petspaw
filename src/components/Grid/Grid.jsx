import { Link, useLocation } from 'react-router-dom';
import s from './Grid.module.scss';

import fav from '../../images/icons/favHeartSmall.svg';

export default function Grid({ items }) {
    const { pathname } = useLocation();
    const isBreedPage = pathname.includes('breeds');

    return (
        <ul className={s.parent}>
            {items &&
                items.map(item => {
                    const { id, url, image, name } = item;

                    return (
                        <li key={id} className={s.li}>
                            <img
                                src={url || image.url}
                                alt={name}
                                className={s.image}
                            />
                            {isBreedPage ? (
                                <BreedsOverlay name={name} id={id} />
                            ) : (
                                <FavOverlay item={item} />
                            )}
                        </li>
                    );
                })}
        </ul>
    );
}

function FavOverlay({ item }) {
    const addFavToStorage = item => {
        // const favorites = localStorage.getItem('favorites')
        //     ? JSON.parse(localStorage.getItem('favorites'))
        //     : [];
        console.log(item);
        // localStorage.setItem('favorites', JSON.stringify([item, ...favorites]));
        // onActivityClick(item.id, 'added', 'Favorites');
    };

    return (
        <div className={s.boxWrapFav} onClick={() => addFavToStorage(item)}>
            <div className={s.boxFav}>
                <img src={fav} alt="fav" />
            </div>
        </div>
    );
}

function BreedsOverlay({ name, id }) {
    return (
        <Link to={`${id}`}>
            <div className={s.boxWrapBreed}>
                <div className={s.boxBreed}>
                    <p className={s.boxBreedTitle}>{name}</p>
                </div>
            </div>
        </Link>
    );
}
