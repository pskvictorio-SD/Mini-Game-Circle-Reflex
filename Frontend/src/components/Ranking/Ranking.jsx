import { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import "../../styles/ranking.css";

const API_URL = import.meta.env.VITE_API_URL;

export const Ranking = () => {
  const { request, data, loading, error } = useFetch();

  useEffect(() => {
    request(`${API_URL}/api/scores`, "GET");
  }, []);

  if (loading) return <p className="ranking_loading">Cargando ranking...</p>;
  if (error) return <p className="ranking_error">Error al cargar ranking</p>;

  const scores = data?.data || []

  return (
    <div className="ranking_card">
      <h2 className="ranking_title">🏆 Ranking</h2>

      <ul className="ranking_list">
        {scores.map((item, index) => (
          <li
            key={`${item.username}-${index}`}
            className={`ranking_item ${
              index === 0
                ? "gold"
                : index === 1
                ? "silver"
                : index === 2
                ? "bronze"
                : ""
            }`}
          >
            <span className="ranking_pos">#{index + 1}</span>

            <div className="ranking_user">
              <strong>{item.username}</strong>
              <small>Nivel {item.level}</small>
            </div>

            <div className="ranking_stats">
              <span>⭐ {item.score}</span>
              <span>⏱ {item.duration}s</span>
              <span>❌ {item.incorrect_clicks}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
