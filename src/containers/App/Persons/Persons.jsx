import { useEffect, useMemo, useState } from "react";
import { searchPersons } from "../../../api/actions/persons";
import { TextInput } from "../../../components/Inputs/TextInput";
import styles from "./styles.module.css";

const hasApiKey = Boolean((import.meta.env.VITE_API_KEY || "").trim());
const MIN_QUERY_LEN = 2;

export default function Persons() {
  const [name, setName] = useState("Джеймс");
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle"); 

  const items = useMemo(() => data?.items ?? [], [data]);

  useEffect(() => {
    const q = name.trim();

    if (q.length < MIN_QUERY_LEN) {
      setData(null);
      setStatus("idle");
      return;
    }

    const timeoutId = setTimeout(() => {
      (async () => {
        setStatus("loading");

        const response = await searchPersons({ name: q, page: 1 });

        if (!response) {
          setStatus("error");
          setData(null);
          return;
        }

        setData(response);
        setStatus("success");
      })();
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [name]);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Задание 2: Поиск персон</h2>
      <p className={styles.muted}>Источник: Кинопоиск API</p>

      {!hasApiKey && (
        <p className={styles.muted}>
          Нужен ключ API. Создай файл <b>.env</b> в корне проекта и добавь строку <b>VITE_API_KEY=...</b>
        </p>
      )}

      <div className={styles.controls}>
        <TextInput
          label="Поиск персон по имени"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Например: Джеймс Кэмерон"
        />
      </div>

      {status === "idle" && (
        <p className={styles.muted}>Введи минимум {MIN_QUERY_LEN} символа, чтобы начать поиск.</p>
      )}

      {status === "loading" && <p className={styles.muted}>Загрузка…</p>}

      {status === "error" && (
        <p className={styles.error}>
          Не получилось сходить в API Кинопоиска. Частые причины: нет ключа, неверный ключ,
          закончился лимит запросов или заблокирован CORS.
        </p>
      )}

      {status === "success" && (
        <div className={styles.grid}>
          {items.slice(0, 12).map((p) => (
            <div key={p.kinopoiskId ?? `${p.nameRu}-${p.sex}`} className={styles.card}>
              {p.posterUrl ? (
                <img className={styles.poster} src={p.posterUrl} alt={p.nameRu ?? ""} />
              ) : (
                <div className={styles.posterStub}>Нет фото</div>
              )}
              <div className={styles.cardTitle}>{p.nameRu || p.nameEn || "Без имени"}</div>
              <div className={styles.cardMeta}>{p.profession || ""}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}