import img from '../images/homePageBackground.svg';
import s from './HomePage.module.scss';

export default function HomePage() {
    return (
        <div className={s.main}>
            <img src={img} alt="homePageBackground" className={s.img} />
        </div>
    );
}
