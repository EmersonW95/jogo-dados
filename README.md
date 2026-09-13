# Jogo de Dados

Jogo de dados para **2 jogadores** em **5 rodadas**, feito com **Next.js** (App Router).

## Regras

- A cada rodada, cada jogador joga dois dados (soma de 1 a 12 por jogador).
- Vence a rodada quem tirar a **maior soma**. Se empatar, a rodada é **empatada**.
- Apenas um botão **Jogar** fica habilitado por vez (primeiro o do Jogador 1, depois o do Jogador 2).
- Ao final das 5 rodadas, o placar acumulado define o vencedor da partida, ou **Empate geral** se ambos venceram o mesmo número de rodadas.
- O botão **Jogar novamente** só aparece no final e reinicia o jogo do zero.

## Estrutura

```
jogo-dados/
├─ app/
│  ├─ layout.js       # layout raiz da aplicação
│  ├─ page.js         # página inicial, renderiza o jogo
│  └─ globals.css     # estilos globais
├─ components/
│  ├─ Dado.js         # componente de um dado (recebe a prop "valor")
│  └─ JogoDados.js     # componente principal com a lógica do jogo
└─ public/dice/        # imagens SVG das faces dos dados (1 a 6, e a face "vazia")
```

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Publicado na Web

Acesse [vercel.com](https://vercel.com) e confira o jogo!
