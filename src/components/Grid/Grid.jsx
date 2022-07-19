import { Link } from 'react-router-dom';
import s from './Grid.module.scss';

export default function Grid({ breeds }) {
    return (
        <ul className={s.parent}>
            {breeds &&
                breeds.map(breed => {
                    return (
                        <li key={breed.id} className={s.li}>
                            <Link to={`${breed.id}`}>
                                <img
                                    src={breed.image.url}
                                    alt={breed.name}
                                    className={s.image}
                                />
                            </Link>
                        </li>
                    );
                })}
        </ul>
    );
}
