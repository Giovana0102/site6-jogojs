const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const perguntas = [
  {
    pergunta: "Qual é a capital do Japão?",
    alternativas: ["a) Berlin", "b) Tóquio", "c) Pequim"],
    resposta: "a",
    nivel: 1
  },
  {
    pergunta: "Quem pintou a Mona Lisa?",
    alternativas: ["a) Vincent van Gogh", "b) Leonardo da Vinci", "c) Pablo Picasso"],
    resposta: "b",
    nivel: 1
  },
  {
    pergunta: "Quantos planetas existem no sistema solar?",
    alternativas: ["a) 5", "b) 8", "c) 9"],
    resposta: "b",
    nivel: 1
  },
  {
    pergunta: "Qual o maior osso do corpo humano?",
    alternativas: ["a) Fêmur", "b) Tíbia", "c) Crânio"],
    resposta: "a",
    nivel: 2
  },
  {
    pergunta: "Quem e o fundador da Microsoft?",
    alternativas: ["a) Bill gates", "b) steve jobs", "c) Mark Zuckerberg"],
    resposta: "a",
    nivel: 2
  },
  {
    pergunta: "Qual é o maior país do mundo em área territorial?",
    alternativas: ["a) China", "b) Rússia", "c) Canadá"],
    resposta: "b",
    nivel: 3
  },
  {
    pergunta: "Qual destes elementos químicos é um gás nobre?",
    alternativas: ["a) Oxigênio", "b) Hélio", "c) Nitrogênio"],
    resposta: "b",
    nivel: 3
  },
  {
    pergunta: "Quem foi o fundador da Apple?",
    alternativas: ["a) Dom Pedro II", "b) Bill Gates", "c) Steve jobs"],
    resposta: "c",
    nivel: 4
  },
  {
    pergunta: "Qual destes países não faz parte da União Europeia?",
    alternativas: ["a) Noruega", "b) França", "c) Alemanha"],
    resposta: "a",
    nivel: 4
  },
  {
    pergunta: "Qual é a montanha mais alta do mundo?",
    alternativas: ["a) K2", "b) Monte Everest", "c) Aconcágua"],
    resposta: "b",
    nivel: 5
  },
  {
    pergunta: "Quem é o autor da teoria da relatividade?",
    alternativas: ["a) Isaac Newton", "b) Albert Einstein", "c) Franz Kafka"],
    resposta: "b",
    nivel: 5
  },
  {
    pergunta: "Qual é a velocidade da luz?",
    alternativas: ["a) 300.000 km/s", "b) 150.000 km/s", "c) 450.000 km/s"],
    resposta: "a",
    nivel: 5
  },
  {
    pergunta: "Qual destes não é um oceano?",
    alternativas: ["a) Atlântico", "b) Índico", "c) Mediterrâneo"],
    resposta: "c",
    nivel: 3
  },
  {
    pergunta: "Em que ano começou a Segunda Guerra Mundial?",
    alternativas: ["a) 1939", "b) 1941", "c) 1935"],
    resposta: "a",
    nivel: 4
  },
  {
    pergunta: "Qual o nome do maior oceano do mundo?",
    alternativas: ["a) Oceano Pacífico", "b) Oceano Atlântico", "c) Oceano Ìndico"],
    resposta: "a",
    nivel: 2
  }
];

const premiacao = [
  { nivel: 1, valor: 1000 },
  { nivel: 2, valor: 5000 },
  { nivel: 3, valor: 10000 },
  { nivel: 4, valor: 30000 },
  { nivel: 5, valor: 100000 }
];

let jogador = {
  nome: "",
  rodadaAtual: 1,
  premioAtual: 0,
  parar: false,
  ajudas: {
    cartas: true,
    publico: true,
    telefone: true
  }
};

let ranking = [];

function iniciarJogo() {
  console.log("🎤 Bem-vindo ao Show do Milhão! 🎤");
  console.log("=================================");
  
  rl.question("Qual é o seu nome? ", (nome) => {
    jogador.nome = nome;
    jogador.rodadaAtual = 1;
    jogador.premioAtual = 0;
    jogador.parar = false;
    jogador.ajudas = {
      cartas: true,
      publico: true,
      telefone: true
    };
    
    console.log(`\nOlá, ${jogador.nome}! Vamos começar o jogo!`);
    console.log("Cada pergunta tem 3 alternativas (a, b, c).");
    console.log("Você tem direito a 3 ajudas:");
    console.log("- Cartas: elimina 1 alternativa incorreta");
    console.log("- Público: mostra a opinião do público");
    console.log("- Telefone: um especialista dá sua opinião");
    console.log("Digite 'parar' a qualquer momento para sair com o prêmio.\n");
    
    iniciarRodada();
  });
}

function iniciarRodada() {
  if (jogador.parar || jogador.rodadaAtual > 5) {
    finalizarJogo();
    return;
  }
  
  const perguntasNivel = perguntas.filter(p => p.nivel === jogador.rodadaAtual);
  const perguntaAtual = perguntasNivel[Math.floor(Math.random() * perguntasNivel.length)];
  const premioAtual = premiacao.find(p => p.nivel === jogador.rodadaAtual).valor;
  
  console.log(`\n🎯 Rodada ${jogador.rodadaAtual} - Valendo R$${premioAtual.toLocaleString()},00 🎯`);
  console.log("=================================");
  console.log(perguntaAtual.pergunta);
  perguntaAtual.alternativas.forEach(alt => console.log(alt));
  
  console.log("\nAjudas disponíveis:");
  if (jogador.ajudas.cartas) console.log("- Digite 'cartas' para usar as Cartas");
  if (jogador.ajudas.publico) console.log("- Digite 'publico' para usar o Público");
  if (jogador.ajudas.telefone) console.log("- Digite 'telefone' para usar o Telefone");
  
  rl.question("\nSua resposta (a, b, c) ou 'parar': ", (resposta) => {
    processarResposta(resposta.toLowerCase(), perguntaAtual, premioAtual);
  });
}

function processarResposta(resposta, pergunta, premio) {
  if (resposta === "parar") {
    jogador.parar = true;
    finalizarJogo();
    return;
  }
  
  if (resposta === "cartas" && jogador.ajudas.cartas) {
    usarCartas(pergunta);
    return;
  }
  
  if (resposta === "publico" && jogador.ajudas.publico) {
    usarPublico(pergunta);
    return;
  }
  
  if (resposta === "telefone" && jogador.ajudas.telefone) {
    usarTelefone(pergunta);
    return;
  }
  
  if (resposta === pergunta.resposta) {
    console.log("\n✅ Resposta correta! Parabéns!");
    jogador.premioAtual = premio;
    jogador.rodadaAtual++;
    
    if (jogador.rodadaAtual <= 5) {
      console.log(`Você avançou para a rodada ${jogador.rodadaAtual}!`);
    }
    
    iniciarRodada();
  } else if (["a", "b", "c"].includes(resposta)) {
    console.log("\n❌ Resposta incorreta!");
    console.log(`A resposta correta era: ${pergunta.resposta.toUpperCase()}`);
    finalizarJogo();
  } else {
    console.log("\nOpção inválida. Por favor, responda com a, b, c ou 'parar'.");
    iniciarRodada();
  }
}

function usarCartas(pergunta) {
  jogador.ajudas.cartas = false;
  
  // Encontrar alternativas incorretas
  const alternativas = ["a", "b", "c"];
  const incorretas = alternativas.filter(a => a !== pergunta.resposta);
  const eliminada = incorretas[0]; // Elimina uma incorreta
  
  console.log("\n📊 Cartas: Eliminando uma alternativa incorreta...");
  console.log(`Alternativa eliminada: ${eliminada.toUpperCase()}`);
  
  // Mostrar perguntas novamente com a eliminada marcada
  console.log("\n" + pergunta.pergunta);
  pergunta.alternativas.forEach(alt => {
    if (alt[0] === eliminada) {
      console.log(alt + " (eliminada)");
    } else {
      console.log(alt);
    }
  });
  
  rl.question("\nSua resposta (a, b, c) ou 'parar': ", (resposta) => {
    processarResposta(resposta.toLowerCase(), pergunta, premiacao.find(p => p.nivel === jogador.rodadaAtual).valor);
  });
}

function usarPublico(pergunta) {
  jogador.ajudas.publico = false;
  
  // Simular votação do público (a correta tem maior chance)
  const porcentagens = {
    a: pergunta.resposta === "a" ? 70 : Math.floor(Math.random() * 30),
    b: pergunta.resposta === "b" ? 70 : Math.floor(Math.random() * 30),
    c: pergunta.resposta === "c" ? 70 : Math.floor(Math.random() * 30)
  };
  
  // Ajustar para totalizar 100%
  const total = porcentagens.a + porcentagens.b + porcentagens.c;
  for (let key in porcentagens) {
    porcentagens[key] = Math.round((porcentagens[key] / total) * 100);
  }
  
  console.log("\n👥 Público: Esta é a opinião do público:");
  console.log(`A: ${porcentagens.a}% | B: ${porcentagens.b}% | C: ${porcentagens.c}%`);
  
  rl.question("\nSua resposta (a, b, c) ou 'parar': ", (resposta) => {
    processarResposta(resposta.toLowerCase(), pergunta, premiacao.find(p => p.nivel === jogador.rodadaAtual).valor);
  });
}

function usarTelefone(pergunta) {
  jogador.ajudas.telefone = false;
  
  // Simular ajuda de um especialista (70% de chance de sugerir a correta)
  const sugestao = Math.random() < 0.7 ? pergunta.resposta : 
                   ["a", "b", "c"].filter(a => a !== pergunta.resposta)[Math.floor(Math.random() * 2)];
  
  console.log("\n📞 Telefone: Ligando para um especialista...");
  console.log(`O especialista sugere a alternativa ${sugestao.toUpperCase()}, mas não tem certeza absoluta.`);
  
  rl.question("\nSua resposta (a, b, c) ou 'parar': ", (resposta) => {
    processarResposta(resposta.toLowerCase(), pergunta, premiacao.find(p => p.nivel === jogador.rodadaAtual).valor);
  });
}

function finalizarJogo() {
  console.log("\n🎉 Fim do jogo! 🎉");
  console.log("==================");
  console.log(`Jogador: ${jogador.nome}`);
  
  if (jogador.parar) {
    console.log(`Você parou na rodada ${jogador.rodadaAtual} de 5.`);
    console.log(`Faltavam ${5 - jogador.rodadaAtual} rodadas para o prêmio máximo.`);
  } else if (jogador.rodadaAtual > 5) {
    console.log("Parabéns! Você completou todas as rodadas!");
  } else {
    console.log(`Você errou na rodada ${jogador.rodadaAtual} de 5.`);
    console.log(`Faltavam ${5 - jogador.rodadaAtual} rodadas para o prêmio máximo.`);
  }
  
  console.log(`Premiação final: R$${jogador.premioAtual.toLocaleString()},00`);
  
  // Adicionar ao ranking
  ranking.push({
    nome: jogador.nome,
    rodada: jogador.parar ? jogador.rodadaAtual : jogador.rodadaAtual - 1,
    premio: jogador.premioAtual,
    data: new Date().toLocaleDateString()
  });
  
  // Ordenar ranking
  ranking.sort((a, b) => b.premio - a.premio);
  
  // Mostrar ranking
  console.log("\n🏆 Ranking Top 5:");
  if (ranking.length > 0) {
    ranking.slice(0, 5).forEach((jogador, index) => {
      console.log(`${index + 1}. ${jogador.nome} - R$${jogador.premio.toLocaleString()},00 (Rodada ${jogador.rodada})`);
    });
  } else {
    console.log("Ainda não há jogadores no ranking.");
  }
  
  rl.question("\nDeseja jogar novamente? (s/n) ", (resposta) => {
    if (resposta.toLowerCase() === "s") {
      iniciarJogo();
    } else {
      console.log("\nObrigado por jogar o Show do Milhão! Até a próxima! 👋");
      rl.close();
    }
  });
}

iniciarJogo();