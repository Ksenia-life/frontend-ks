import { useEffect, useState } from "react";
import { getPosts } from "../../api/actions/posts";
import styles from "./styles.module.css";

const LIMIT = 10;

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    (async () => {
      setStatus("loading");

      const data = await getPosts(LIMIT);

      if (!Array.isArray(data)) {
        setStatus("error");
        return;
      }

      setPosts(data);
      setStatus("success");
    })();
  }, []);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Задание 1: Посты</h2>
      <p className={styles.muted}>Источник: JSONPlaceholder</p>

      {status === "loading" && <p className={styles.muted}>Загрузка…</p>}

      {status === "error" && (
        <p className={styles.error}>
          Не удалось получить посты. Причина может быть не в интернете: проверь Console/Network в DevTools.
        </p>
      )}

      {status === "success" && (
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.id} className={styles.item}>
              <div className={styles.itemTitle}>{post.title}</div>
              <div className={styles.itemBody}>{post.body}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}