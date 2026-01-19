export const saveScore = async ({
  user_id,
  username,
  score,
  incorrect_clicks,
  duration,
  level,
}) => {
  try {
    const res = await fetch("http://localhost:3000/api/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        username,
        score,
        incorrect_clicks,
        duration,
        level,
      }),
    });

    if (!res.ok) {
      throw new Error("Error al guardar el score");
    }

    return await res.json();
  } catch (error) {
    console.error("❌ saveScore:", error);
    throw error;
  }
};
