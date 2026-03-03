import { useSelector } from "react-redux";

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites);

  return (
    <div style={{ padding: 12 }}>
      <h2>Избранное</h2>

      {favorites.length === 0 ? (
        <p>В избранном нет фильмов</p>
      ) : (
        favorites.map((item) => (
          <div key={item.id} style={{ marginBottom: 12 }}>
            <b>{item.name}</b>
            <div style={{ opacity: 0.8 }}>{item.id}</div>
            {item.poster ? (
              <div>
                <img
                  src={item.poster}
                  alt={item.name}
                  style={{ width: 140, borderRadius: 12, marginTop: 8 }}
                />
              </div>
            ) : null}
            <hr style={{ marginTop: 12 }} />
          </div>
        ))
      )}
    </div>
  );
}