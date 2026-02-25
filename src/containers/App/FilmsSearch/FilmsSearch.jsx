import { useEffect, useMemo, useState } from "react";
import { searchFilms } from "../../../api/actions/films";
import { TextInput } from "../../../components/Inputs/TextInput";
import { SelectInput } from "../../../components/Inputs/SelectInput";

import styles from "./styles.module.css";

const MIN_QUERY_LEN = 2;

export default function FilmsSearch() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("all");

  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle");

  const films = useMemo(() => {
    return (data && data.films) || [];
  }, [data]);

  const genreOptions = useMemo(() => {
    const genresSet = new Set();

    films.forEach((film) => {
      const genres = (film && film.genres) || [];
      genres.forEach((g) => {
        if (g && g.genre) genresSet.add(g.genre);
      });
    });

    const sorted = Array.from(genresSet).sort((a, b) => a.localeCompare(b, "ru"));

    return [{ value: "all", label: "Все жанры" }].concat(
      sorted.map((g) => ({ value: g, label: g }))
    );
  }, [films]);

  const visibleFilms = useMemo(() => {
    if (genre === "all") return films;

    return films.filter((film) => {
      const genres = (film && film.genres) || [];
      return genres.some((g) => g && g.genre === genre);
    });
  }, [films, genre]);

  useEffect(() => {
    const q = query.trim();

    if (q.length < MIN_QUERY_LEN) {
      setData(null);
      setStatus("idle");
      setGenre("all");
      return;
    }

    const timeoutId = setTimeout(() => {
      (async () => {
        setStatus("loading");

        const response = await searchFilms({ keyword: q, page: 1 });

        if (!response) {
          setStatus("error");
          setData(null);
          return;
        }

        setData(response);
        setStatus("success");
        setGenre("all");
      })();
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Задание 3: Поиск и фильтр фильмов</h2>
      <p className={styles.muted}>Источник: Кинопоиск API</p>

      <div className={styles.controls}>
        <TextInput
          label="Поиск фильмов (реальное время)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Например: Гарри Поттер"
        />

        <SelectInput
          label="Фильтр по жанру"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          options={genreOptions}
        />
      </div>

      {status === "idle" && (
        <p className={styles.muted}>
          Введи минимум {MIN_QUERY_LEN} символа, чтобы появился список.
        </p>
      )}

      {status === "loading" && <p className={styles.muted}>Загрузка…</p>}

      {status === "error" && (
        <p className={styles.error}>
          Ошибка запроса к API Кинопоиска. Проверь ключ и попробуй ещё раз.
        </p>
      )}

      {status === "success" && (
        <>
          <p className={styles.muted}>
            Найдено: <b>{films.length}</b>, показываю: <b>{visibleFilms.length}</b>
          </p>

          <div className={styles.grid}>
            {visibleFilms.slice(0, 16).map((film) => {
              const title =
                (film && (film.nameRu || film.nameEn)) || "Без названия";

              const genresText = ((film && film.genres) || [])
                .slice(0, 2)
                .map((g) => (g && g.genre) || "")
                .filter(Boolean)
                .join(", ");

              return (
                <div key={film.filmId} className={styles.card}>
                  <div className={styles.posterWrap}>
                    <img
                      className={styles.poster}
                      src={film.posterUrlPreview || ""}
                      alt={title}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const stub = e.currentTarget.nextElementSibling;
                        if (stub) stub.style.display = "flex";
                      }}
                    />
                    <div className={styles.posterStub}>Нет постера</div>
                  </div>

                  <div className={styles.cardTitle}>{title}</div>
                  <div className={styles.cardMeta}>{genresText}</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}