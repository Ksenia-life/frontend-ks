import { useEffect, useState } from "react";

import { UserCard } from "../../components/UserCard";
import Description from "../App/Description";

export default function Home() {
  const user = { name: "Ксения", role: "Junior Frontend" };

  const [counter, setCounter] = useState(0);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(true);

  useEffect(() => {
    console.log("Home: mount (смонтировался)");
  }, []);

  useEffect(() => {
    console.log("Home: counter changed (обновление), counter =", counter);
  }, [counter]);

  useEffect(() => {
    const onResize = () => console.log("resize");
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      console.log("Home: unmount (размонтирование)");
    };
  }, []);

  return (
    <>
      <div style={{ color: "black", padding: "12px", fontSize: "20px" }}>
        ТЕСТ: приложение работает
      </div>

      <UserCard name={user.name} role={user.role} />

      <hr />

      <p>Counter: {counter}</p>
      <button onClick={() => setCounter((prev) => prev + 1)}>+1 (onClick)</button>
      <button onClick={() => setCounter(0)}>Сброс</button>

      <hr />

      <button onClick={() => setIsDescriptionVisible((prev) => !prev)}>
        {isDescriptionVisible ? "Скрыть Description" : "Показать Description"}
      </button>

      {isDescriptionVisible ? <Description /> : <p>Description скрыт</p>}
    </>
  );
}