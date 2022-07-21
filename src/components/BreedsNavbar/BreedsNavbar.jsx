import sortUp from '../../images/icons/sort-up.svg';
import sortDown from '../../images/icons/sort-down.svg';
import sortUpChecked from '../../images/icons/sort-up-checked.svg';
import sortDownChecked from '../../images/icons/sort-down-checked.svg';

import s from './BreedsNavbar.module.scss';

export default function BreedsNavbar({
    breeds,
    handleLimitChange,
    handleBreedChange,
    limit,
    handleOrderChange,
    order,
}) {
    return (
        <div className={s.navBreeds}>
            <select
                id="breeds"
                name="breeds"
                className={s.list}
                onChange={e => handleBreedChange(e.target.value)}
            >
                <option key="all" value="all">
                    All Breeds
                </option>
                {breeds &&
                    breeds.map(breed => (
                        <option key={breed.id} value={breed.id}>
                            {breed.name}
                        </option>
                    ))}
            </select>

            <select
                id="limit"
                name="limit"
                className={s.listLimit}
                value={limit}
                onChange={e => handleLimitChange(Number(e.target.value))}
            >
                <option value="5">Limit: 5</option>
                <option value="10">Limit: 10</option>
                <option value="15">Limit: 15</option>
                <option value="20">Limit: 20</option>
            </select>

            <button
                type="button"
                className={s.btnSort}
                onClick={() => handleOrderChange(true)}
            >
                <img src={order ? sortUpChecked : sortUp} alt="sortUp" />
            </button>

            <button
                type="button"
                className={s.btnSort}
                onClick={() => handleOrderChange(false)}
            >
                <img src={order ? sortDown : sortDownChecked} alt="sortUp" />
            </button>
        </div>
    );
}
