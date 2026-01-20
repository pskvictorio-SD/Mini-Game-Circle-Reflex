🎯 Circle Reflex Game

Un minijuego de reflejos desarrollado con React y JavaScript puro, donde el jugador debe hacer click en círculos buenos evitando los peligrosos antes de que se acabe el tiempo.

El juego aumenta progresivamente su dificultad mediante niveles, movimiento dinámico, gestión del tiempo y diferentes tipos de círculos.

🚀 Demo

👉 (Agregar link cuando lo deployes — Vercel / Netlify / GitHub Pages)

🕹️ Gameplay

🎯 Click en círculos buenos para sumar puntos

💣 Evitá los círculos malos (pierden vidas)

⏱️ Algunos círculos agregan tiempo extra

☠️ Los círculos instant kill terminan la partida

📈 Al eliminar todos los círculos buenos → subís de nivel

🌀 Los círculos se mueven constantemente dentro del área de juego

🧠 Mecánicas principales

Sistema de niveles progresivos

Timer global de la partida

Vidas limitadas

Movimiento continuo de los círculos sin provocar re-renders

Dificultad escalable según el nivel

Gestión de estado desacoplada de la interfaz

🧩 Tipos de círculos
Tipo	Efecto
🟢 Good	+10 puntos
🔴 Bad	-1 vida
⏱️ Time	+5 segundos
☠️ Kill	Game Over instantáneo
🏗️ Arquitectura del proyecto
src/
├── hooks/
│   └── useGameEngine.js   # Lógica completa del juego
├── components/
│   └── Game.jsx           # Renderizado y UI
├── styles/
│   └── game.css
└── App.jsx

🔹 useGameEngine

Maneja toda la lógica del juego

Estados:

level

score

lives

timeLeft

circles

Controla:

Generación de círculos

Subida de nivel

Game Over

Timer

Reglas del juego

🔹 Game.jsx

Se encarga solo del render

Muestra HUD (tiempo, vidas, score)

Renderiza círculos

Aplica animaciones

Interactúa con el engine mediante funciones

⚙️ Tecnologías utilizadas

⚛️ React

🟨 JavaScript (ES6+)

🎨 CSS

🧠 Custom Hooks

🔁 useState, useEffect, useRef

🎮 Manipulación directa del DOM para animaciones

🧪 Decisiones técnicas destacadas

❌ No se usan estados para animaciones → mejor rendimiento

✅ Movimiento gestionado con useRef + setInterval

✅ Separación clara entre lógica y UI

✅ Uso de crypto.randomUUID() para IDs únicos

✅ Escalado de dificultad sin hardcodear valores fijos

📈 Posibles mejoras futuras

🏆 Guardar scores en backend (API REST)

🌍 Ranking global

🔊 Sonidos y efectos

📱 Versión mobile

🎚️ Modo endless / hard

🧠 IA básica para círculos evasivos

👤 Autor

Victorio Paskevicius
📍 Argentina
🎓 Estudiante de programación
💻 Frontend / Fullstack en formación

📄 Licencia

Este proyecto se distribuye bajo licencia MIT.
Uso libre para aprendizaje y demostración.
