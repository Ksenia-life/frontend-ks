import { useEffect, useState } from "react";

import "../../styles/styles.css";

import { AppLayout } from "../../components/AppLayout";
import { Header } from "../../components/Header";
import { UserCard } from "../../components/UserCard";

import Description from "./Description";

import Posts from "../Posts/Posts";
import Persons from "./Persons/Persons";
import FilmsSearch from "./FilmsSearch/FilmsSearch";

export default function App() {
  const user = { name: "Ксения", role: "Junior Frontend" };

  const [counter, setCounter] = useState(0);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(true);

  const onClickCounter = () => {
    setCounter((prev) => prev + 1);
  };

  useEffect(() => {
    console.log("App: mount (смонтировался)");
  }, []);

  useEffect(() => {
    console.log("App: counter changed (обновление), counter =", counter);
  }, [counter]);

  useEffect(() => {
    const onResize = () => console.log("resize");

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      console.log("App: unmount (размонтирование)");
    };
  }, []);

  return (
    <AppLayout title="React Learning Project">
      <div style={{ color: "black", padding: "12px", fontSize: "20px" }}>
        ТЕСТ: приложение работает
      </div>
      <Header subtitle="Стили, события, состояние, эффекты, список и картинки" />

      <UserCard name={user.name} role={user.role} />

      <hr />

      <p>Counter: {counter}</p>
      <button onClick={onClickCounter}>+1 (onClick)</button>
      <button onClick={() => setCounter(0)}>Сброс</button>

      <hr />

      <button onClick={() => setIsDescriptionVisible((prev) => !prev)}>
        {isDescriptionVisible ? "Скрыть Description" : "Показать Description"}
      </button>

      {isDescriptionVisible ? <Description /> : <p>Description скрыт</p>}

      

      <hr />
      <Posts />

      <hr />
      <Persons />

      <hr />
      <FilmsSearch />
    </AppLayout>
  );
}
