// Galeria de Memórias Escolares - Eduarda Pellanda
const GALLERY_DATA = [
  {
    "id": 1,
    "title": "Alegria na Piscina de Bolinhas",
    "school": "Escola Três Cantos",
    "phase": "fund1",
    "phaseLabel": "Fundamental I",
    "image": "assets/img/infancia-piscina-bolinhas.jpg",
    "caption": "Tarde inesquecível de brincadeiras com a turma e as tradicionais camisetas amarelas da Escola Três Cantos."
  },
  {
    "id": 2,
    "title": "Formatura 2019 — Fundamental I",
    "school": "Escola Três Cantos",
    "phase": "fund1",
    "phaseLabel": "Fundamental I",
    "image": "assets/img/formatura-fund1-2019.jpg",
    "caption": "Solenidade de formatura do Ensino Fundamental I com becas pretas, golas brancas, professores queridos e toda a turma reunida no palco."
  },
  {
    "id": 3,
    "title": "Apresentação: A Estrada de Tijolos Amarelos",
    "school": "Escola Três Cantos",
    "phase": "fund1",
    "phaseLabel": "Fundamental I",
    "image": "assets/img/apresentacao-teatral-leitura.jpg",
    "caption": "Superando a timidez passo a passo: momento de leitura e apresentação em um projeto especial sobre O Mágico de Oz."
  },
  {
    "id": 4,
    "title": "Festa de Halloween no Parquinho",
    "school": "Escola Três Cantos",
    "phase": "eventos",
    "phaseLabel": "Eventos & Festas",
    "image": "assets/img/festa-halloween-tres-cantos.jpg",
    "caption": "Fantasias criativas, doces e gargalhadas no parquinho da escola. As comemorações temáticas faziam a infância ainda mais mágica."
  },
  {
    "id": 5,
    "title": "Adaptação e Novos Amigos",
    "school": "Colégio Estadual Pe. Cláudio Morelli",
    "phase": "fund2",
    "phaseLabel": "Fundamental II & Médio",
    "image": "assets/img/colegio-claudio-morelli-amigos.jpg",
    "caption": "Depois dos desafios da pandemia, a chegada ao Colégio Estadual Padre Cláudio Morelli trouxe amizades queridas e acolhimento com o uniforme oficial."
  },
  {
    "id": 6,
    "title": "Festa Junina Tradicional",
    "school": "Colégio Estadual Pe. Cláudio Morelli",
    "phase": "eventos",
    "phaseLabel": "Eventos & Festas",
    "image": "assets/img/festa-junina-dupla.jpg",
    "caption": "Dia de Festa Junina no colégio: camisas xadrez, laços no cabelo, pipoca e companheirismo."
  },
  {
    "id": 7,
    "title": "Gargalhadas ao Ar Livre",
    "school": "Colégio Estadual Pe. Cláudio Morelli",
    "phase": "eventos",
    "phaseLabel": "Eventos & Festas",
    "image": "assets/img/festa-junina-amigas-sorrisos.jpg",
    "caption": "Amigas inseparáveis rindo juntas no gramado durante as festividades juninas escolares."
  },
  {
    "id": 8,
    "title": "Trio Inseparável no Colégio",
    "school": "Colégio Estadual Pe. Cláudio Morelli",
    "phase": "medio",
    "phaseLabel": "Ensino Médio",
    "image": "assets/img/amizades-colegio-trio.jpg",
    "caption": "A força da amizade feminina no Ensino Médio: apoio mútuo nos estudos, nas conversas de corredor e nos planos pro futuro."
  },
  {
    "id": 9,
    "title": "Sorrisos no Intervalo",
    "school": "Colégio Estadual Pe. Cláudio Morelli",
    "phase": "medio",
    "phaseLabel": "Ensino Médio",
    "image": "assets/img/ensino-medio-sala-aula.jpg",
    "caption": "Pausa entre as aulas para um registro cheio de energia positiva com os parceiros de classe."
  },
  {
    "id": 10,
    "title": "Descontração Entre Amigos",
    "school": "Colégio Estadual Pe. Cláudio Morelli",
    "phase": "medio",
    "phaseLabel": "Ensino Médio",
    "image": "assets/img/ensino-medio-espelho-amigos.jpg",
    "caption": "Selfies espontâneas e vídeos rápidos que guardam a leveza dos anos de Ensino Médio."
  },
  {
    "id": 11,
    "title": "O Orgulho do Terceirão 3F",
    "school": "Colégio Estadual Pe. Cláudio Morelli",
    "phase": "terceirao",
    "phaseLabel": "Terceirão 3F",
    "image": "assets/img/terceirao-bandeira-3f.jpg",
    "caption": "Nossa bandeira com a pantera negra estilizada em tons de azul e a turma do 3F vestindo as camisas personalizadas."
  },
  {
    "id": 12,
    "title": "Espírito de Equipe no Gramado",
    "school": "Colégio Estadual Pe. Cláudio Morelli",
    "phase": "terceirao",
    "phaseLabel": "Terceirão 3F",
    "image": "assets/img/terceirao-turma-bandeira.jpg",
    "caption": "A turma do 3F em momento de celebração e união sob o sol, marcando a contagem regressiva para a formatura."
  },
  {
    "id": 13,
    "title": "Rotina na Sala do 3º Ano",
    "school": "Colégio Estadual Pe. Cláudio Morelli",
    "phase": "terceirao",
    "phaseLabel": "Terceirão 3F",
    "image": "assets/img/terceirao-sala-amigos.jpg",
    "caption": "Cadernos abertos, estojos, fofocas e debates antes do sinal tocar: a rotina do 3º ano que já deixa saudades."
  },
  {
    "id": 14,
    "title": "Lembrança do Quadro Verde",
    "school": "Colégio Estadual Pe. Cláudio Morelli",
    "phase": "terceirao",
    "phaseLabel": "Terceirão 3F",
    "image": "assets/img/turma-quadro-verde.jpg",
    "caption": "Amigos reunidos na sala de aula em frente ao clássico quadro verde: laços que levamos para a vida inteira."
  },
  {
    "id": 15,
    "title": "A Turma Inteira com o Professor",
    "school": "Colégio Estadual Pe. Cláudio Morelli",
    "phase": "terceirao",
    "phaseLabel": "Terceirão 3F",
    "image": "assets/img/turma-completa-professor-dinamica.jpg",
    "caption": "Dia temático com trotes, brinquedos, panela de pressão e muita bagunça saudável celebrando a reta final do 3º ano!"
  }
];
