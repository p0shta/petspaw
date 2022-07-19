import s from './Section.module.scss';

export default function Section({ children }) {
    return <section className={s.section}>{children}</section>;
}
