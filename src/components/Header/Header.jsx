import { NavLink } from "react-router";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";

const getLinkClass = ({ isActive, isPending, isTransitioning }) => {
  return [
    styles.link,

    isActive ? styles.linkActive : "",
    isPending ? styles.linkPending : "",
    isTransitioning ? styles.linkTransitioning : "",

    isActive ? "active" : "",
    isPending ? "pending" : "",
    isTransitioning ? "transitioning" : "",
  ]
    .filter(Boolean)
    .join(" ");
};

export default function Header() {
  const userName = useSelector((state) => state.user.name);
  const favorites = useSelector((state) => state.favorites);

  return (
    <header className={styles.wrapper}>
      <div className={styles.row}>
        <nav className={styles.nav}>
          <NavLink to="/" end className={getLinkClass} viewTransition>
            Домашняя
          </NavLink>

          <NavLink to="/posts" className={getLinkClass} viewTransition>
            Посты
          </NavLink>

          <NavLink to="/persons" className={getLinkClass} viewTransition>
            Персоны
          </NavLink>

          <NavLink to="/search" className={getLinkClass} viewTransition>
            Поиск фильмов
          </NavLink>

          <NavLink to="/user" className={getLinkClass} viewTransition>
            Имя
          </NavLink>

          <NavLink to="/favorites" className={getLinkClass} viewTransition>
            Избранное - {favorites.length}
          </NavLink>
        </nav>

        <div className={styles.user}>
          {userName ? (
            <>
              Привет, <b>{userName}</b>
            </>
          ) : (
            <span>Имя не задано</span>
          )}
        </div>
      </div>
    </header>
  );
}