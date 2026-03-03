import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setUserName, clearUserName } from "../../store/user/userSlice";

export default function UserName() {
  const dispatch = useDispatch();
  const currentName = useSelector((state) => state.user.name);

  const [name, setName] = useState("");

  const onSave = () => {
    dispatch(setUserName(name.trim()));
    setName("");
  };

  return (
    <div style={{ padding: 12 }}>
      <h2>Имя пользователя</h2>

      <p style={{ marginTop: 8 }}>
        Текущее имя в store: <b>{currentName || "не задано"}</b>
      </p>

      <div style={{ display: "flex", gap: 8, marginTop: 12, alignItems: "center" }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
          style={{ padding: 8, minWidth: 260 }}
        />

        <button onClick={onSave} disabled={!name.trim()}>
          Сохранить
        </button>

        <button onClick={() => dispatch(clearUserName())} type="button">
          Очистить
        </button>
      </div>
    </div>
  );
}