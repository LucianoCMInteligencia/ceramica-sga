import React, { useState, useMemo } from "react";
import { preguntas } from "../data/preguntas";

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Quiz() {
  const [respuestas, setRespuestas] = useState({});
  const [mostrarResultado, setMostrarResultado] = useState(false);

  // Barajar solo una vez al montar el componente
  const preguntasAleatorias = useMemo(() => shuffle(preguntas).slice(0, 5), []);

  const manejarRespuesta = (index, opcion) => {
    setRespuestas({ ...respuestas, [index]: opcion });
  };

  const calcularPuntuacion = () => {
    let score = 0;
    preguntasAleatorias.forEach((p, i) => {
      if (respuestas[i] === p.respuesta) score++;
    });
    return score;
  };

  return (
    <div>
      <h1>Examen Dinámico</h1>
      {!mostrarResultado ? (
        <>
          {preguntasAleatorias.map((p, i) => (
            <div key={i}>
              <h3>{p.enunciado}</h3>
              {p.opciones.map((op, j) => (
                <label key={j} style={{ display: "block" }}>
                  <input
                    type="radio"
                    name={`pregunta-${i}`}
                    value={j}
                    checked={respuestas[i] === j}
                    onChange={() => manejarRespuesta(i, j)}
                  />
                  {op}
                </label>
              ))}
            </div>
          ))}
          <button onClick={() => setMostrarResultado(true)}>Enviar</button>
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
