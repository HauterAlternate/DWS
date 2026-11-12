// js/produtos.js — catálogo com 50 produtos (array de objetos)
// Campos: id, nome, categoria, preco (número), imagem, descricao, destaque
const produtos = [
  {
    id: 1,
    nome: "Panetone Trufado",
    categoria: "Panetones e Chocotones",
    preco: 59.90,
    imagem: "img/produtos/panetone-trufado.svg",
    descricao: "Panetone recheado com creme trufado de chocolate meio amargo.",
    destaque: true
  },
  {
    id: 2,
    nome: "Panetone de Frutas Cristalizadas",
    categoria: "Panetones e Chocotones",
    preco: 44.90,
    imagem: "img/produtos/panetone-de-frutas-cristalizadas.svg",
    descricao: "Receita tradicional com cerejas, laranja e abacaxi cristalizados.",
    destaque: false
  },
  {
    id: 3,
    nome: "Chocotone Clássico",
    categoria: "Panetones e Chocotones",
    preco: 52.90,
    imagem: "img/produtos/chocotone-classico.svg",
    descricao: "Massa de chocolate com gotas belgas e cobertura crocante.",
    destaque: true
  },
  {
    id: 4,
    nome: "Chocotone de Brigadeiro",
    categoria: "Panetones e Chocotones",
    preco: 57.90,
    imagem: "img/produtos/chocotone-de-brigadeiro.svg",
    descricao: "Recheio cremoso de brigadeiro e granulado artesanal.",
    destaque: false
  },
  {
    id: 5,
    nome: "Panetone de Doce de Leite",
    categoria: "Panetones e Chocotones",
    preco: 54.90,
    imagem: "img/produtos/panetone-de-doce-de-leite.svg",
    descricao: "Massa fofinha com ribbons de doce de leite argentino.",
    destaque: false
  },
  {
    id: 6,
    nome: "Panetone de Pistache",
    categoria: "Panetones e Chocotones",
    preco: 69.90,
    imagem: "img/produtos/panetone-de-pistache.svg",
    descricao: "Edição especial com creme de pistache e lascas de amêndoa.",
    destaque: false
  },
  {
    id: 7,
    nome: "Mini Panetones (kit com 6)",
    categoria: "Panetones e Chocotones",
    preco: 38.90,
    imagem: "img/produtos/mini-panetones-kit-com-6.svg",
    descricao: "Seis mini panetones individuais, perfeitos para presentear.",
    destaque: false
  },
  {
    id: 8,
    nome: "Panetone de Laranja com Gotas",
    categoria: "Panetones e Chocotones",
    preco: 49.90,
    imagem: "img/produtos/panetone-de-laranja-com-gotas.svg",
    descricao: "Casca de laranja confeitada e gotas de chocolate ao leite.",
    destaque: false
  },
  {
    id: 9,
    nome: "Chocotone Branco com Framboesa",
    categoria: "Panetones e Chocotones",
    preco: 64.90,
    imagem: "img/produtos/chocotone-branco-com-framboesa.svg",
    descricao: "Chocolate branco, recheio de framboesa e toque de baunilha.",
    destaque: false
  },
  {
    id: 10,
    nome: "Panetone Gran Gourmet com Nozes",
    categoria: "Panetones e Chocotones",
    preco: 74.90,
    imagem: "img/produtos/panetone-gran-gourmet-com-nozes.svg",
    descricao: "Nozes pecã caramelizadas e passas ao rum (sem álcool).",
    destaque: false
  },
  {
    id: 11,
    nome: "Biscoito de Gengibre",
    categoria: "Biscoitos",
    preco: 12.50,
    imagem: "img/produtos/biscoito-de-gengibre.svg",
    descricao: "Pacote com 6 biscoitos decorados à mão com glacê real.",
    destaque: false
  },
  {
    id: 12,
    nome: "Estrelas de Canela",
    categoria: "Biscoitos",
    preco: 14.90,
    imagem: "img/produtos/estrelas-de-canela.svg",
    descricao: "Estrelinhas crocantes com canela e açúcar cristal.",
    destaque: false
  },
  {
    id: 13,
    nome: "Árvores Glaceadas",
    categoria: "Biscoitos",
    preco: 16.90,
    imagem: "img/produtos/arvores-glaceadas.svg",
    descricao: "Pinheirinhos de baunilha com glacê verde e bolinhas douradas.",
    destaque: false
  },
  {
    id: 14,
    nome: "Coroas Amanteigadas",
    categoria: "Biscoitos",
    preco: 15.90,
    imagem: "img/produtos/coroas-amanteigadas.svg",
    descricao: "Coroas de Natal amanteigadas com confeitos vermelhos.",
    destaque: false
  },
  {
    id: 15,
    nome: "Sininhos de Baunilha",
    categoria: "Biscoitos",
    preco: 13.90,
    imagem: "img/produtos/sininhos-de-baunilha.svg",
    descricao: "Sininhos delicados com glacê dourado e laçarote.",
    destaque: false
  },
  {
    id: 16,
    nome: "Papais Noéis de Biscoito",
    categoria: "Biscoitos",
    preco: 17.90,
    imagem: "img/produtos/papais-noeis-de-biscoito.svg",
    descricao: "Biscoitos em formato de Papai Noel, glacê vermelho e branco.",
    destaque: true
  },
  {
    id: 17,
    nome: "Amanteigados de Limão",
    categoria: "Biscoitos",
    preco: 14.50,
    imagem: "img/produtos/amanteigados-de-limao.svg",
    descricao: "Estrelas amanteigadas com raspas de limão siciliano.",
    destaque: false
  },
  {
    id: 18,
    nome: "Cookies de Aveia e Passas",
    categoria: "Biscoitos",
    preco: 18.90,
    imagem: "img/produtos/cookies-de-aveia-e-passas.svg",
    descricao: "Cookies macios de aveia, passas e canela.",
    destaque: false
  },
  {
    id: 19,
    nome: "Cookies Cranberry e Chocolate Branco",
    categoria: "Biscoitos",
    preco: 19.90,
    imagem: "img/produtos/cookies-cranberry-e-chocolate-branco.svg",
    descricao: "Cookies com cranberries e pedaços de chocolate branco.",
    destaque: false
  },
  {
    id: 20,
    nome: "Lata de Biscoitos Sortidos",
    categoria: "Biscoitos",
    preco: 39.90,
    imagem: "img/produtos/lata-de-biscoitos-sortidos.svg",
    descricao: "Lata decorada com 30 biscoitos natalinos variados.",
    destaque: false
  },
  {
    id: 21,
    nome: "Bolo Floresta Branca",
    categoria: "Bolos e Tortas",
    preco: 89.90,
    imagem: "img/produtos/bolo-floresta-branca.svg",
    descricao: "Camadas de massa branca, creme de leite e cerejas.",
    destaque: false
  },
  {
    id: 22,
    nome: "Tronco de Natal",
    categoria: "Bolos e Tortas",
    preco: 79.90,
    imagem: "img/produtos/tronco-de-natal.svg",
    descricao: "Rocambole de chocolate imitando um tronco de lenha, com azevinho.",
    destaque: true
  },
  {
    id: 23,
    nome: "Bolo de Cenoura Natalino",
    categoria: "Bolos e Tortas",
    preco: 49.90,
    imagem: "img/produtos/bolo-de-cenoura-natalino.svg",
    descricao: "Bolo de cenoura com cobertura de chocolate e estrela dourada.",
    destaque: false
  },
  {
    id: 24,
    nome: "Torta de Maçã com Canela",
    categoria: "Bolos e Tortas",
    preco: 54.90,
    imagem: "img/produtos/torta-de-maca-com-canela.svg",
    descricao: "Torta crocante com maçãs caramelizadas e canela.",
    destaque: false
  },
  {
    id: 25,
    nome: "Torta de Nozes",
    categoria: "Bolos e Tortas",
    preco: 59.90,
    imagem: "img/produtos/torta-de-nozes.svg",
    descricao: "Massa amanteigada e recheio de nozes com mel.",
    destaque: false
  },
  {
    id: 26,
    nome: "Bolo Red Velvet Estrela",
    categoria: "Bolos e Tortas",
    preco: 94.90,
    imagem: "img/produtos/bolo-red-velvet-estrela.svg",
    descricao: "Red velvet com cobertura de cream cheese e estrela.",
    destaque: true
  },
  {
    id: 27,
    nome: "Cupcakes de Rena (4 un.)",
    categoria: "Bolos e Tortas",
    preco: 32.90,
    imagem: "img/produtos/cupcakes-de-rena-4-un.svg",
    descricao: "Quatro cupcakes decorados como renas do Papai Noel.",
    destaque: false
  },
  {
    id: 28,
    nome: "Cupcakes Neve (4 un.)",
    categoria: "Bolos e Tortas",
    preco: 29.90,
    imagem: "img/produtos/cupcakes-neve-4-un.svg",
    descricao: "Cupcakes de baunilha com glacê branco e cereja.",
    destaque: false
  },
  {
    id: 29,
    nome: "Bolo de Mel e Especiarias",
    categoria: "Bolos e Tortas",
    preco: 46.90,
    imagem: "img/produtos/bolo-de-mel-e-especiarias.svg",
    descricao: "Bolo úmido com mel, gengibre, cravo e canela.",
    destaque: false
  },
  {
    id: 30,
    nome: "Torta Holandesa Natalina",
    categoria: "Bolos e Tortas",
    preco: 64.90,
    imagem: "img/produtos/torta-holandesa-natalina.svg",
    descricao: "Camadas de biscoito, creme e cobertura de chocolate.",
    destaque: false
  },
  {
    id: 31,
    nome: "Cesta Noite Feliz",
    categoria: "Cestas e Kits",
    preco: 189.90,
    imagem: "img/produtos/cesta-noite-feliz.svg",
    descricao: "Cesta com panetone, geleia, vinho de uva e biscoitos.",
    destaque: true
  },
  {
    id: 32,
    nome: "Cesta Mesa Farta",
    categoria: "Cestas e Kits",
    preco: 229.90,
    imagem: "img/produtos/cesta-mesa-farta.svg",
    descricao: "Cesta completa para a ceia, com doces e salgados.",
    destaque: false
  },
  {
    id: 33,
    nome: "Cesta Café da Manhã de Natal",
    categoria: "Cestas e Kits",
    preco: 149.90,
    imagem: "img/produtos/cesta-cafe-da-manha-de-natal.svg",
    descricao: "Pães, geleias, bolo e suco para um café especial.",
    destaque: false
  },
  {
    id: 34,
    nome: "Kit Presente Estrela",
    categoria: "Cestas e Kits",
    preco: 99.90,
    imagem: "img/produtos/kit-presente-estrela.svg",
    descricao: "Caixa de presente com chocolates, biscoitos e vela.",
    destaque: false
  },
  {
    id: 35,
    nome: "Kit Chocolate Quente",
    categoria: "Cestas e Kits",
    preco: 69.90,
    imagem: "img/produtos/kit-chocolate-quente.svg",
    descricao: "Caneca, chocolate em pó, marshmallows e colher decorada.",
    destaque: false
  },
  {
    id: 36,
    nome: "Caixa Surpresa de Biscoitos",
    categoria: "Cestas e Kits",
    preco: 59.90,
    imagem: "img/produtos/caixa-surpresa-de-biscoitos.svg",
    descricao: "Caixa de biscoitos sortidos com cartão personalizado.",
    destaque: false
  },
  {
    id: 37,
    nome: "Kit Ceia em Família",
    categoria: "Cestas e Kits",
    preco: 259.90,
    imagem: "img/produtos/kit-ceia-em-familia.svg",
    descricao: "Panetone, chocotone, espumante sem álcool e bombons.",
    destaque: false
  },
  {
    id: 38,
    nome: "Cesta Doce Inverno",
    categoria: "Cestas e Kits",
    preco: 119.90,
    imagem: "img/produtos/cesta-doce-inverno.svg",
    descricao: "Cesta com geleias, biscoitos e chocolate quente.",
    destaque: false
  },
  {
    id: 39,
    nome: "Kit Mini Delícias",
    categoria: "Cestas e Kits",
    preco: 49.90,
    imagem: "img/produtos/kit-mini-delicias.svg",
    descricao: "Minis de panetone, brownie e bombons em caixa dourada.",
    destaque: false
  },
  {
    id: 40,
    nome: "Cesta Premium Papai Noel",
    categoria: "Cestas e Kits",
    preco: 329.90,
    imagem: "img/produtos/cesta-premium-papai-noel.svg",
    descricao: "Nossa cesta mais completa, com itens selecionados.",
    destaque: false
  },
  {
    id: 41,
    nome: "Chocolate Quente Cremoso",
    categoria: "Bebidas e Chocolates",
    preco: 24.90,
    imagem: "img/produtos/chocolate-quente-cremoso.svg",
    descricao: "Caneca de chocolate quente cremoso com marshmallows.",
    destaque: true
  },
  {
    id: 42,
    nome: "Chocolate Quente de Menta",
    categoria: "Bebidas e Chocolates",
    preco: 26.90,
    imagem: "img/produtos/chocolate-quente-de-menta.svg",
    descricao: "Chocolate quente com toque de hortelã e chantilly.",
    destaque: false
  },
  {
    id: 43,
    nome: "Espumante sem Álcool",
    categoria: "Bebidas e Chocolates",
    preco: 38.90,
    imagem: "img/produtos/espumante-sem-alcool.svg",
    descricao: "Bebida borbulhante de uvas, ideal para o brinde de Natal.",
    destaque: false
  },
  {
    id: 44,
    nome: "Suco de Uva Natalino",
    categoria: "Bebidas e Chocolates",
    preco: 22.90,
    imagem: "img/produtos/suco-de-uva-natalino.svg",
    descricao: "Suco integral de uva com especiarias natalinas.",
    destaque: false
  },
  {
    id: 45,
    nome: "Barra de Chocolate ao Leite com Avelã",
    categoria: "Bebidas e Chocolates",
    preco: 21.90,
    imagem: "img/produtos/barra-de-chocolate-ao-leite-com-avela.svg",
    descricao: "Barra de chocolate ao leite com pedacinhos de avelã.",
    destaque: false
  },
  {
    id: 46,
    nome: "Barra de Chocolate 70% Cacau",
    categoria: "Bebidas e Chocolates",
    preco: 23.90,
    imagem: "img/produtos/barra-de-chocolate-70-cacau.svg",
    descricao: "Chocolate meio amargo intenso com notas de laranja.",
    destaque: false
  },
  {
    id: 47,
    nome: "Caixa de Bombons Neve",
    categoria: "Bebidas e Chocolates",
    preco: 44.90,
    imagem: "img/produtos/caixa-de-bombons-neve.svg",
    descricao: "Seis bombons de chocolate branco, ao leite e meio amargo.",
    destaque: true
  },
  {
    id: 48,
    nome: "Trufas de Café",
    categoria: "Bebidas e Chocolates",
    preco: 34.90,
    imagem: "img/produtos/trufas-de-cafe.svg",
    descricao: "Trufas macias de café com cacau em pó.",
    destaque: false
  },
  {
    id: 49,
    nome: "Geleia de Frutas Vermelhas",
    categoria: "Bebidas e Chocolates",
    preco: 27.90,
    imagem: "img/produtos/geleia-de-frutas-vermelhas.svg",
    descricao: "Geleia artesanal de morango, framboesa e amora.",
    destaque: false
  },
  {
    id: 50,
    nome: "Doce de Leite com Canela",
    categoria: "Bebidas e Chocolates",
    preco: 25.90,
    imagem: "img/produtos/doce-de-leite-com-canela.svg",
    descricao: "Doce de leite cremoso com um toque de canela.",
    destaque: false
  }
];
