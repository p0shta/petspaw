import update from '../../images/icons/upd.svg';
import s from './GalleryNavbar.module.scss';

export default function GalleryNavbar({
    breeds,
    breed,
    limit,
    order,
    type,
    handleLimitChange,
    handleTypeChange,
    handleOrderChange,
    handleBreedChange,
    handleSubmit,
}) {
    return (
        <>
            <form className={s.form} onSubmit={handleSubmit}>
                <div className={s.listItem}>
                    <span className={s.listTitle}>ORDER</span>
                    <select
                        id="order"
                        name="order"
                        value={order}
                        className={s.listSelect}
                        onChange={e => handleOrderChange(e.target.value)}
                    >
                        <option value="random">Random</option>
                        <option value="desc">Desc</option>
                        <option value="asc">Asc</option>
                    </select>
                </div>
                <div className={s.listItem}>
                    <span className={s.listTitle}>TYPE</span>
                    <select
                        id="type"
                        name="type"
                        value={type}
                        className={s.listSelect}
                        onChange={e => handleTypeChange(e.target.value)}
                    >
                        <option value="gif,jpg,png">All</option>
                        <option value="jpg,png">Static</option>
                        <option value="gif">Animated</option>
                    </select>
                </div>
                <div className={s.listItem}>
                    <span className={s.listTitle}>BREED</span>
                    <select
                        id="breed"
                        name="breed"
                        value={breed}
                        className={s.listSelect}
                        onChange={e => handleBreedChange(e.target.value)}
                    >
                        <option key="none" value="none">
                            None
                        </option>
                        {breeds &&
                            breeds.map(breed => (
                                <option key={breed.id} value={breed.image.id}>
                                    {breed.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className={s.listItem}>
                    <span className={s.listTitle}>LIMIT</span>
                    <div>
                        <select
                            id="limit"
                            name="limit"
                            value={limit}
                            className={s.listSelect}
                            onChange={e => handleLimitChange(e.target.value)}
                        >
                            <option value="5">5 items per page</option>
                            <option value="10">10 items per page</option>
                            <option value="15">15 items per page</option>
                            <option value="20">20 items per page</option>
                        </select>
                        <button type="submit" className={s.listBtn}>
                            <img src={update} alt="update" />
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
