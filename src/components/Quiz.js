import React, { useState, useMemo } from "react";
import { preguntas } from "../data/preguntas";

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Quiz() {
  const [respuestas, setRespuestas] = useState({});
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Barajar solo una vez
  const preguntasAleatorias = useMemo(() => shuffle(preguntas).slice(0, 5), []);

  const manejarRespuesta = (opcionIndex) => {
    setRespuestas({ ...respuestas, [currentQuestion]: opcionIndex });
  };

  const calcularPuntuacion = () => {
    let score = 0;
    preguntasAleatorias.forEach((p, i) => {
      const seleccion = respuestas[i] != null ? p.opciones[respuestas[i]] : null;
      if (seleccion === p.respuesta) score++;
    });
    return score;
  };

  const handleNext = () => {
    if (currentQuestion < preguntasAleatorias.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setMostrarResultado(true);
    }
  };

  return (
    <div>
      <h1>Examen Dinámico</h1>
      {!mostrarResultado ? (
        <>
          <div>
            <h3>
              Pregunta {currentQuestion + 1} de {preguntasAleatorias.length}
            </h3>
            <p>{preguntasAleatorias[currentQuestion].enunciado}</p>
            {preguntasAleatorias[currentQuestion].opciones.map((op, j) => (
              <label key={j} style={{ display: "block" }}>
                <input
                  type="radio"
                  name={`pregunta-${currentQuestion}`}
                  value={j}
                  checked={respuestas[currentQuestion] === j}
                  onChange={() => manejarRespuesta(j)}
                />
                {op}
              </label>
            ))}
          </div>
          <button onClick={handleNext}>
            {currentQuestion < preguntasAleatorias.length - 1
              ? "Siguiente"
              : "Enviar"}
          </button>
        </>
      ) : (
        <div>
          <h2>Resultado</h2>
          <p>
            Has acertado {calcularPuntuacion()} de {preguntasAleatorias.length}
          </p>
          <button onClick={() => window.location.reload()}>Nuevo examen</button>
        </div>
      )}
    </div>
  );
}
