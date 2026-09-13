"use client";

import { useState } from "react";
import Dado from "./Dado";

const TOTAL_RODADAS = 5;

function rolarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

function estadoInicial() {
  return {
    rodada: 1,
    turno: 1,
    dadosP1: [null, null],
    dadosP2: [null, null],
    mensagem: "",
    placar: { p1: 0, p2: 0, empates: 0 },
    fimDeJogo: false,
    mensagemFinal: "",
  };
}

export default function JogoDados() {
  const [estado, setEstado] = useState(estadoInicial);

  const {
    rodada,
    turno,
    dadosP1,
    dadosP2,
    mensagem,
    placar,
    fimDeJogo,
    mensagemFinal,
  } = estado;

  function jogarJogador1() {
    const novosDados = [rolarDado(), rolarDado()];
    setEstado((atual) => ({
      ...atual,
      dadosP1: novosDados,
      turno: 2,
    }));
  }

  function jogarJogador2() {
    const novosDadosP2 = [rolarDado(), rolarDado()];
    const somaP1 = dadosP1[0] + dadosP1[1];
    const somaP2 = novosDadosP2[0] + novosDadosP2[1];

    let resultadoRodada;
    const novoPlacar = { ...placar };

    if (somaP1 > somaP2) {
      resultadoRodada = "Jogador 1 venceu";
      novoPlacar.p1 += 1;
    } else if (somaP2 > somaP1) {
      resultadoRodada = "Jogador 2 venceu";
      novoPlacar.p2 += 1;
    } else {
      resultadoRodada = "Empate";
      novoPlacar.empates += 1;
    }

    const ehUltimaRodada = rodada === TOTAL_RODADAS;

    if (ehUltimaRodada) {
      let mensagemFinalCalculada;
      if (novoPlacar.p1 > novoPlacar.p2) {
        mensagemFinalCalculada = "Jogador 1 venceu o jogo";
      } else if (novoPlacar.p2 > novoPlacar.p1) {
        mensagemFinalCalculada = "Jogador 2 venceu o jogo";
      } else {
        mensagemFinalCalculada = "Empate geral";
      }

      setEstado((atual) => ({
        ...atual,
        dadosP2: novosDadosP2,
        placar: novoPlacar,
        mensagem: resultadoRodada,
        fimDeJogo: true,
        mensagemFinal: mensagemFinalCalculada,
      }));
    } else {
      setEstado((atual) => ({
        ...atual,
        dadosP2: novosDadosP2,
        placar: novoPlacar,
        mensagem: resultadoRodada,
      }));

      // Pequena pausa para o jogador ler o resultado da rodada
      // antes de liberar a próxima jogada do Jogador 1.
      setTimeout(() => {
        setEstado((atual) => ({
          ...atual,
          rodada: atual.rodada + 1,
          turno: 1,
          dadosP1: [null, null],
          dadosP2: [null, null],
        }));
      }, 1200);
    }
  }

  function jogarNovamente() {
    setEstado(estadoInicial());
  }

  return (
    <div className="jogo-dados">
      <h1 className="titulo">Jogo de Dados</h1>
      <p className="rodada">
        Rodada {rodada}/{TOTAL_RODADAS}
      </p>

      <div className="jogadores">
        <div className="jogador">
          <h2>Jogador 1</h2>
          <div className="dados">
            <Dado valor={dadosP1[0]} />
            <Dado valor={dadosP1[1]} />
          </div>
          <button
            className="botao-jogar"
            onClick={jogarJogador1}
            disabled={turno !== 1 || fimDeJogo}
          >
            Jogar
          </button>
        </div>

        <div className="jogador">
          <h2>Jogador 2</h2>
          <div className="dados">
            <Dado valor={dadosP2[0]} />
            <Dado valor={dadosP2[1]} />
          </div>
          <button
            className="botao-jogar"
            onClick={jogarJogador2}
            disabled={turno !== 2 || fimDeJogo}
          >
            Jogar
          </button>
        </div>
      </div>

      <div className="mensagem" role="status">
        {mensagem}
      </div>

      {fimDeJogo && (
        <>
          <div className="mensagem-final">{mensagemFinal}</div>
          <button className="botao-novamente" onClick={jogarNovamente}>
            Jogar novamente
          </button>
        </>
      )}
    </div>
  );
}
