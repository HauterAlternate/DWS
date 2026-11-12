/* =====================================================
   js/script.js — Doce Estrela | Confeitaria Natalina
   UM único arquivo para o site todo. Cada recurso só roda
   na página certa: antes de usar um elemento, conferimos
   se ele existe (if (area) { ... }).

   Depende de js/produtos.js (array "produtos"), que é
   carregado ANTES deste arquivo em todas as páginas.

   ÍNDICE DOS RECURSOS
    0. Utilidades (preço, localStorage, aviso)
    1. Modo claro/escuro ............ recurso 12
    2. Menu responsivo (hambúrguer) . recurso 9
    3. Sons: música e sino .......... recurso 3  (OBRIGATÓRIO)
    4. Efeito de neve ............... recurso 11
    5. Cards dinâmicos .............. recurso 4  (OBRIGATÓRIO)
    6. Filtro, busca e ordenação .... recurso 5  (OBRIGATÓRIO)
    7. Modal de detalhes ............ recurso 10
    8. Carrinho de compras .......... recurso 6
    9. Slideshow .................... recurso 1  (OBRIGATÓRIO)
   10. Parallax ..................... recurso 2  (OBRIGATÓRIO)
   11. Contagem regressiva .......... recurso 7
   12. Lightbox da galeria .......... recurso 10
   13. Validação do formulário ...... recurso 8
   14. Animação ao rolar ............ recurso 13
   15. Botão "voltar ao topo" ....... recurso 14
   ===================================================== */

/* ---------- 0. UTILIDADES ---------- */

// Transforma 59.9 em "R$ 59,90"
function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// localStorage pode falhar (aba anônima, por exemplo), por isso usamos try/catch.
function lerArmazenado(chave, padrao) {
  try {
    const texto = localStorage.getItem(chave);
    return texto === null ? padrao : JSON.parse(texto);
  } catch (erro) {
    return padrao;
  }
}

function gravarArmazenado(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch (erro) {
    /* sem armazenamento: o site continua funcionando, só não "lembra" */
  }
}

// Remove acentos e deixa minúsculo, para a busca achar "pao" ao digitar "pão"
function normalizar(texto) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

// Aviso rápido (toast) na parte de baixo da tela
const aviso = document.getElementById("aviso");
let tempoAviso;
function mostrarAviso(mensagem) {
  if (!aviso) return;
  aviso.textContent = mensagem;
  aviso.classList.add("visivel");
  clearTimeout(tempoAviso);
  tempoAviso = setTimeout(() => aviso.classList.remove("visivel"), 2500);
}

// Ofertas de Natal: ids dos produtos em promoção e o desconto (20%)
const idsOfertas = [2, 12, 18, 27, 33, 42];
const DESCONTO = 0.2;

function emOferta(produto) {
  return idsOfertas.includes(produto.id);
}

// Preço que o cliente realmente paga (com desconto, se estiver em oferta)
function precoFinal(produto) {
  return emOferta(produto) ? produto.preco * (1 - DESCONTO) : produto.preco;
}

/* ---------- 1. MODO CLARO / ESCURO ("Noite de Natal") ---------- */
const botaoTema = document.getElementById("btn-tema");

function aplicarTema(tema) {
  document.documentElement.setAttribute("data-tema", tema);
  if (botaoTema) {
    botaoTema.textContent = tema === "escuro" ? "☀️" : "🌙";
    botaoTema.setAttribute("aria-label", tema === "escuro" ? "Ativar modo claro" : "Ativar modo Noite de Natal");
  }
}

aplicarTema(lerArmazenado("tema", "claro"));

if (botaoTema) {
  botaoTema.addEventListener("click", () => {
    const novoTema = document.documentElement.getAttribute("data-tema") === "escuro" ? "claro" : "escuro";
    aplicarTema(novoTema);
    gravarArmazenado("tema", novoTema); // lembra a escolha nas outras páginas
  });
}

/* ---------- 2. MENU RESPONSIVO (hambúrguer) ---------- */
const botaoMenu = document.querySelector(".btn-menu");
const menu = document.querySelector(".menu");

if (botaoMenu && menu) {
  botaoMenu.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", aberto);
    botaoMenu.textContent = aberto ? "✕" : "☰";
  });
}

/* ---------- 3. SONS: música de fundo e sino ---------- */
// O navegador bloqueia som automático: a música só começa depois de um clique.
const musica = new Audio("audio/musica-natal.mp3");
musica.loop = true;
musica.volume = 0.3; // volume baixo (vai de 0 a 1)

const botaoMusica = document.getElementById("btn-musica");

function atualizarBotaoMusica() {
  if (!botaoMusica) return;
  const tocando = !musica.paused;
  botaoMusica.querySelector(".texto-botao").textContent = tocando ? "Pausar música" : "Tocar música";
  botaoMusica.setAttribute("aria-pressed", tocando);
  botaoMusica.setAttribute("aria-label", tocando ? "Pausar música de Natal" : "Tocar música de Natal");
}

if (botaoMusica) {
  botaoMusica.addEventListener("click", () => {
    if (musica.paused) {
      musica.play();
      gravarArmazenado("musicaLigada", true);
    } else {
      musica.pause();
      gravarArmazenado("musicaLigada", false);
    }
    atualizarBotaoMusica();
  });

  // Desafio: a música "continua" ao trocar de página (guardamos o estado e o tempo)
  if (lerArmazenado("musicaLigada", false)) {
    musica.currentTime = lerArmazenado("musicaTempo", 0);
    musica.play().then(atualizarBotaoMusica).catch(atualizarBotaoMusica); // se o navegador bloquear, o botão continua "Tocar"
  }

  setInterval(() => {
    if (!musica.paused) gravarArmazenado("musicaTempo", musica.currentTime);
  }, 1000);
}

// Sininho curto, usado ao adicionar produtos ao carrinho
function tocarSino() {
  const som = new Audio("audio/sino.mp3");
  som.volume = 0.5;
  som.play().catch(() => {}); // se o navegador bloquear, ignoramos
}

/* ---------- 4. EFEITO DE NEVE ---------- */
// Criamos flocos (divs) e o CSS (@keyframes cair) faz a animação.
const areaNeve = document.getElementById("neve");

if (areaNeve) {
  const simbolos = ["❄", "❅", "❆", "•"];
  const quantidade = window.innerWidth < 600 ? 18 : 36; // menos flocos no celular = site mais leve

  for (let i = 0; i < quantidade; i++) {
    const floco = document.createElement("span");
    floco.className = "floco";
    floco.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
    floco.style.left = Math.random() * 100 + "%";
    floco.style.fontSize = 10 + Math.random() * 16 + "px";
    floco.style.opacity = 0.4 + Math.random() * 0.6;
    floco.style.animationDuration = 8 + Math.random() * 10 + "s";
    floco.style.animationDelay = -Math.random() * 15 + "s"; // atraso negativo: já começa "no meio" da queda
    areaNeve.appendChild(floco);
  }
}

/* ---------- 5. CARDS DINÂMICOS ---------- */
// criarCard recebe UM produto e devolve o HTML de UM card (template literal).
function criarCard(produto) {
  const oferta = emOferta(produto);
  const precoHtml = oferta
    ? `<span class="preco-antigo">${formatarPreco(produto.preco)}</span>${formatarPreco(precoFinal(produto))}`
    : formatarPreco(produto.preco);

  return `
    <article class="card">
      <button class="card-imagem btn-detalhes-img" data-id="${produto.id}" aria-label="Ver detalhes de ${produto.nome}">
        <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy" width="600" height="600">
        <span class="etiqueta">${produto.categoria}</span>
        ${oferta ? `<span class="etiqueta etiqueta-oferta">-${DESCONTO * 100}%</span>` : ""}
      </button>
      <div class="card-corpo">
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <strong class="preco">${precoHtml}</strong>
        <div class="card-botoes">
          <button class="btn-detalhes" data-id="${produto.id}">Detalhes</button>
          <button class="btn-comprar" data-id="${produto.id}">Adicionar ao carrinho</button>
        </div>
      </div>
    </article>`;
}

// mostrarProdutos usa map() para transformar a lista em cards e join("") para juntar tudo.
function mostrarProdutos(lista, area) {
  if (lista.length === 0) {
    // Mensagem natalina quando nada é encontrado
    area.innerHTML = `<p class="vazio"><span>🎄⛄🎁</span>Nenhum produto encontrado.<br>O Papai Noel procurou em toda a oficina! Tente outra palavra.</p>`;
    return;
  }
  area.innerHTML = lista.map(criarCard).join("");

  // Só os destaques da Home "flutuam": cada card começa em um momento diferente (atraso aleatório)
  if (area.id === "lista-destaques") {
    area.querySelectorAll(".card").forEach((card) => {
      card.style.animationDelay = -Math.random() * 6 + "s";
    });
  }
}

// Produtos em destaque na Home (campo "destaque" do array)
const areaDestaques = document.getElementById("lista-destaques");
if (areaDestaques) {
  mostrarProdutos(produtos.filter((p) => p.destaque), areaDestaques);
}

// Ofertas da página Galeria / Ofertas
const areaOfertas = document.getElementById("lista-ofertas");
if (areaOfertas) {
  mostrarProdutos(produtos.filter(emOferta), areaOfertas);
}

/* ---------- 6. FILTRO, BUSCA E ORDENAÇÃO (página de produtos) ---------- */
const areaProdutos = document.getElementById("lista-produtos");

if (areaProdutos) {
  const campoBusca = document.getElementById("busca");
  const seletorCategoria = document.getElementById("categoria");
  const seletorOrdem = document.getElementById("ordem");
  const contador = document.getElementById("contador");

  // As categorias do <select> vêm do próprio array (assim a grafia nunca diverge)
  const categorias = [...new Set(produtos.map((p) => p.categoria))];
  categorias.forEach((cat) => {
    seletorCategoria.insertAdjacentHTML("beforeend", `<option value="${cat}">${cat}</option>`);
  });

  // Se veio da Home com ?categoria=Biscoitos, já aplica o filtro
  const parametros = new URLSearchParams(window.location.search);
  const categoriaUrl = parametros.get("categoria");
  if (categoriaUrl && categorias.includes(categoriaUrl)) {
    seletorCategoria.value = categoriaUrl;
  }

  function filtrar() {
    const texto = normalizar(campoBusca.value.trim());
    const categoria = seletorCategoria.value;

    // filter(): fica só com os produtos que combinam com o nome E com a categoria
    let resultado = produtos.filter((p) => {
      const combinaNome = normalizar(p.nome).includes(texto);
      const combinaCategoria = categoria === "todas" || p.categoria === categoria;
      return combinaNome && combinaCategoria;
    });

    // sort(): ordena (copiamos a lista com [...] para não mexer no array original)
    const ordem = seletorOrdem.value;
    if (ordem === "menor") resultado = [...resultado].sort((a, b) => precoFinal(a) - precoFinal(b));
    if (ordem === "maior") resultado = [...resultado].sort((a, b) => precoFinal(b) - precoFinal(a));
    if (ordem === "nome") resultado = [...resultado].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

    mostrarProdutos(resultado, areaProdutos);
    contador.textContent = `Mostrando ${resultado.length} de ${produtos.length} produtos`;
  }

  campoBusca.addEventListener("input", filtrar);          // a cada letra digitada
  seletorCategoria.addEventListener("change", filtrar);   // ao trocar a categoria
  seletorOrdem.addEventListener("change", filtrar);       // ao trocar a ordem

  filtrar(); // desenha os 50 cards ao abrir a página
}

/* ---------- 7. MODAL DE DETALHES DO PRODUTO ---------- */
const modal = document.getElementById("modal");

function abrirModal(id) {
  const produto = produtos.find((p) => p.id === id);
  if (!produto || !modal) return;

  document.getElementById("modal-imagem").src = produto.imagem;
  document.getElementById("modal-imagem").alt = produto.nome;
  document.getElementById("modal-categoria").textContent = produto.categoria;
  document.getElementById("modal-titulo").textContent = produto.nome;
  document.getElementById("modal-descricao").textContent = produto.descricao;
  document.getElementById("modal-preco").innerHTML = emOferta(produto)
    ? `<span class="preco-antigo">${formatarPreco(produto.preco)}</span>${formatarPreco(precoFinal(produto))}`
    : formatarPreco(produto.preco);
  document.getElementById("modal-comprar").dataset.id = produto.id;

  modal.classList.add("aberto");
  document.getElementById("modal-fechar").focus();
}

function fecharModal() {
  if (modal) modal.classList.remove("aberto");
}

if (modal) {
  document.getElementById("modal-fechar").addEventListener("click", fecharModal);
  modal.addEventListener("click", (evento) => {
    if (evento.target === modal) fecharModal(); // clicou fora da caixa
  });
}

/* ---------- 8. CARRINHO DE COMPRAS ---------- */
// O carrinho é uma lista de { id, qtd } guardada no localStorage.
let carrinho = lerArmazenado("carrinho", []);
if (!Array.isArray(carrinho)) carrinho = [];

const painelCarrinho = document.getElementById("painel-carrinho");
const fundoEscuro = document.getElementById("fundo");
const listaCarrinho = document.getElementById("itens-carrinho");

function salvarCarrinho() {
  gravarArmazenado("carrinho", carrinho);
  atualizarCarrinho();
}

function adicionarAoCarrinho(id) {
  const item = carrinho.find((i) => i.id === id);
  if (item) item.qtd++;
  else carrinho.push({ id: id, qtd: 1 });
  salvarCarrinho();

  const produto = produtos.find((p) => p.id === id);
  mostrarAviso(`🎁 ${produto.nome} foi para o carrinho!`);
  tocarSino();

  // animação "pulo" no ícone do carrinho
  const botao = document.getElementById("btn-carrinho");
  botao.classList.remove("btn-pulo");
  void botao.offsetWidth; // truque para reiniciar a animação
  botao.classList.add("btn-pulo");
}

function alterarQuantidade(id, mudanca) {
  const item = carrinho.find((i) => i.id === id);
  if (!item) return;
  item.qtd += mudanca;
  if (item.qtd <= 0) carrinho = carrinho.filter((i) => i.id !== id);
  salvarCarrinho();
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter((i) => i.id !== id);
  salvarCarrinho();
}

function atualizarCarrinho() {
  // reduce(): soma quantidades e valores
  const quantidade = carrinho.reduce((soma, i) => soma + i.qtd, 0);
  const total = carrinho.reduce((soma, i) => {
    const produto = produtos.find((p) => p.id === i.id);
    return soma + (produto ? precoFinal(produto) * i.qtd : 0);
  }, 0);

  document.getElementById("qtd-carrinho").textContent = quantidade;
  document.getElementById("total-carrinho").textContent = formatarPreco(total);
  document.getElementById("carrinho-vazio").hidden = quantidade > 0;

  listaCarrinho.innerHTML = carrinho
    .map((i) => {
      const p = produtos.find((produto) => produto.id === i.id);
      if (!p) return "";
      return `
        <li>
          <img src="${p.imagem}" alt="${p.nome}" width="56" height="56">
          <div><strong>${p.nome}</strong><small>${formatarPreco(precoFinal(p))} cada</small></div>
          <div class="quantidade">
            <button data-acao="menos" data-id="${p.id}" aria-label="Diminuir quantidade">−</button>
            <span>${i.qtd}</span>
            <button data-acao="mais" data-id="${p.id}" aria-label="Aumentar quantidade">+</button>
            <button class="remover" data-acao="remover" data-id="${p.id}" aria-label="Remover ${p.nome}">🗑</button>
          </div>
        </li>`;
    })
    .join("");
}

function abrirCarrinho() {
  painelCarrinho.classList.add("aberto");
  painelCarrinho.setAttribute("aria-hidden", "false");
  fundoEscuro.hidden = false;
}

function fecharCarrinho() {
  painelCarrinho.classList.remove("aberto");
  painelCarrinho.setAttribute("aria-hidden", "true");
  fundoEscuro.hidden = true;
}

if (painelCarrinho) {
  document.getElementById("btn-carrinho").addEventListener("click", abrirCarrinho);
  document.getElementById("fechar-carrinho").addEventListener("click", fecharCarrinho);
  fundoEscuro.addEventListener("click", fecharCarrinho);

  document.getElementById("limpar-carrinho").addEventListener("click", () => {
    carrinho = [];
    salvarCarrinho();
  });

  document.getElementById("finalizar-compra").addEventListener("click", () => {
    if (carrinho.length === 0) {
      mostrarAviso("Seu carrinho está vazio. Que tal um panetone? 🎄");
      return;
    }
    carrinho = [];
    salvarCarrinho();
    fecharCarrinho();
    mostrarAviso("🎅 Pedido enviado (simulação)! Obrigado e Feliz Natal!");
  });

  // Delegação de evento: os botões dos itens são criados pelo JS depois,
  // então escutamos o clique na lista e perguntamos "qual botão foi clicado?"
  listaCarrinho.addEventListener("click", (evento) => {
    const botao = evento.target.closest("button[data-acao]");
    if (!botao) return;
    const id = Number(botao.dataset.id);
    if (botao.dataset.acao === "mais") alterarQuantidade(id, 1);
    if (botao.dataset.acao === "menos") alterarQuantidade(id, -1);
    if (botao.dataset.acao === "remover") removerDoCarrinho(id);
  });

  atualizarCarrinho();
}

// Delegação no documento inteiro: vale para cards da Home, Produtos, Ofertas e Modal
document.addEventListener("click", (evento) => {
  const comprar = evento.target.closest(".btn-comprar, #modal-comprar");
  if (comprar) {
    adicionarAoCarrinho(Number(comprar.dataset.id));
    return;
  }
  const detalhes = evento.target.closest(".btn-detalhes, .btn-detalhes-img");
  if (detalhes) abrirModal(Number(detalhes.dataset.id));
});

/* ---------- 9. SLIDESHOW ---------- */
// Todos os slides existem no HTML, mas só UM tem a classe "ativo".
const slides = document.querySelectorAll(".slide");

if (slides.length > 0) {
  const areaIndicadores = document.getElementById("indicadores");
  let atual = 0;
  let relogio;

  // Um botão (bolinha) para cada slide, criado com um laço
  slides.forEach((slide, i) => {
    const bolinha = document.createElement("button");
    bolinha.setAttribute("aria-label", `Ir para o slide ${i + 1}`);
    bolinha.addEventListener("click", () => {
      mostrarSlide(i);
      reiniciarRelogio();
    });
    areaIndicadores.appendChild(bolinha);
  });
  const bolinhas = areaIndicadores.querySelectorAll("button");

  function mostrarSlide(indice) {
    slides.forEach((s) => s.classList.remove("ativo"));
    bolinhas.forEach((b) => b.classList.remove("ativo"));
    atual = (indice + slides.length) % slides.length; // volta ao início/fim
    slides[atual].classList.add("ativo");
    bolinhas[atual].classList.add("ativo");
  }

  function reiniciarRelogio() {
    clearInterval(relogio);
    relogio = setInterval(() => mostrarSlide(atual + 1), 5000); // troca a cada 5 segundos
  }

  document.getElementById("proximo").addEventListener("click", () => {
    mostrarSlide(atual + 1);
    reiniciarRelogio();
  });
  document.getElementById("anterior").addEventListener("click", () => {
    mostrarSlide(atual - 1);
    reiniciarRelogio();
  });

  mostrarSlide(0);
  reiniciarRelogio();
}

/* ---------- 10. PARALLAX ---------- */
// A cada rolagem, cada camada anda uma fração dos pixels rolados.
// Camadas com velocidades diferentes criam sensação de profundidade.
const camadas = document.querySelectorAll("[data-velocidade]");

if (camadas.length > 0) {
  window.addEventListener(
    "scroll",
    () => {
      const rolagem = window.scrollY;
      if (rolagem > window.innerHeight * 1.2) return; // banner já saiu da tela: não gastamos processamento
      camadas.forEach((camada) => {
        const velocidade = camada.dataset.velocidade;
        camada.style.transform = `translateY(${rolagem * velocidade}px)`;
      });
    },
    { passive: true }
  );
}

/* ---------- 11. CONTAGEM REGRESSIVA ATÉ O NATAL ---------- */
const camposContagem = document.querySelectorAll("[data-contagem]");

function atualizarContagem() {
  const agora = new Date();
  let natal = new Date(agora.getFullYear(), 11, 25); // mês 11 = dezembro!
  if (agora > natal) natal = new Date(agora.getFullYear() + 1, 11, 25);

  const falta = natal - agora; // diferença em milissegundos
  const dias = Math.floor(falta / (1000 * 60 * 60 * 24));
  const horas = Math.floor(falta / (1000 * 60 * 60)) % 24;
  const minutos = Math.floor(falta / (1000 * 60)) % 60;
  const segundos = Math.floor(falta / 1000) % 60;

  const valores = { dias: dias, horas: horas, minutos: minutos, segundos: segundos };

  camposContagem.forEach((campo) => {
    const tipo = campo.dataset.contagem;
    if (tipo === "texto") {
      campo.textContent = `Faltam ${dias} dias para o Natal!`;
    } else {
      campo.textContent = String(valores[tipo]).padStart(2, "0");
    }
  });
}

if (camposContagem.length > 0) {
  setInterval(atualizarContagem, 1000); // atualiza a cada segundo
  atualizarContagem();
}

/* ---------- 12. LIGHTBOX DA GALERIA ---------- */
const itensGaleria = document.querySelectorAll(".galeria-item");
const lightbox = document.getElementById("lightbox");

if (lightbox && itensGaleria.length > 0) {
  const imagemLightbox = document.getElementById("lb-imagem");
  const legendaLightbox = document.getElementById("lb-legenda");
  let indiceLb = 0;

  function mostrarNoLightbox(indice) {
    indiceLb = (indice + itensGaleria.length) % itensGaleria.length;
    const img = itensGaleria[indiceLb].querySelector("img");
    imagemLightbox.src = img.src;
    imagemLightbox.alt = img.alt;
    legendaLightbox.textContent = `${img.alt} (${indiceLb + 1} de ${itensGaleria.length})`;
  }

  function fecharLightbox() {
    lightbox.classList.remove("aberto");
  }

  itensGaleria.forEach((item, i) => {
    item.addEventListener("click", () => {
      mostrarNoLightbox(i);
      lightbox.classList.add("aberto");
      document.getElementById("lb-fechar").focus();
    });
  });

  document.getElementById("lb-fechar").addEventListener("click", fecharLightbox);
  document.getElementById("lb-anterior").addEventListener("click", () => mostrarNoLightbox(indiceLb - 1));
  document.getElementById("lb-proximo").addEventListener("click", () => mostrarNoLightbox(indiceLb + 1));
  lightbox.addEventListener("click", (evento) => {
    if (evento.target === lightbox) fecharLightbox();
  });

  // Teclado: setas navegam
  document.addEventListener("keydown", (evento) => {
    if (!lightbox.classList.contains("aberto")) return;
    if (evento.key === "ArrowRight") mostrarNoLightbox(indiceLb + 1);
    if (evento.key === "ArrowLeft") mostrarNoLightbox(indiceLb - 1);
  });
}

// ESC fecha qualquer janela aberta (modal, lightbox, carrinho)
document.addEventListener("keydown", (evento) => {
  if (evento.key !== "Escape") return;
  fecharModal();
  if (lightbox) lightbox.classList.remove("aberto");
  if (painelCarrinho) fecharCarrinho();
});

/* ---------- 13. VALIDAÇÃO DO FORMULÁRIO DE CONTATO ---------- */
const formulario = document.getElementById("form-contato");

if (formulario) {
  const mensagemForm = document.getElementById("mensagem-form");

  // Mostra ou limpa o erro de UM campo
  function marcarErro(idCampo, texto) {
    const campo = document.getElementById(idCampo);
    const caixa = campo.closest(".campo");
    caixa.querySelector(".erro").textContent = texto;
    caixa.classList.toggle("invalido", texto !== "");
    campo.setAttribute("aria-invalid", texto !== "");
    return texto === ""; // true quando o campo está correto
  }

  function validarCampos() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const assunto = document.getElementById("assunto").value;
    const texto = document.getElementById("mensagem").value.trim();
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Validamos TODOS os campos antes de combinar o resultado, para mostrar todos os erros de uma vez
    const okNome = marcarErro("nome", nome.length < 3 ? "Por favor, digite seu nome (mínimo 3 letras)." : "");
    const okEmail = marcarErro("email", !emailValido ? "Digite um e-mail válido, como nome@exemplo.com." : "");
    const okAssunto = marcarErro("assunto", assunto === "" ? "Escolha um assunto." : "");
    const okTexto = marcarErro("mensagem", texto.length < 10 ? "Escreva uma mensagem com pelo menos 10 caracteres." : "");

    return okNome && okEmail && okAssunto && okTexto;
  }

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault(); // impede a página de recarregar
    mensagemForm.className = "";

    if (validarCampos()) {
      const nome = document.getElementById("nome").value.trim();
      mensagemForm.textContent = `🎅 Obrigado, ${nome}! Sua mensagem foi enviada. Responderemos em breve.`;
      mensagemForm.classList.add("sucesso");
      formulario.reset();
      tocarSino();
    } else {
      mensagemForm.textContent = "Ops! Confira os campos destacados em vermelho.";
      mensagemForm.classList.add("falha");
    }
  });

  // Quando o usuário volta a digitar, o erro daquele campo some
  formulario.querySelectorAll("input, select, textarea").forEach((campo) => {
    campo.addEventListener("input", () => marcarErro(campo.id, ""));
  });
}

/* ---------- 14. ANIMAÇÃO AO ROLAR ---------- */
// Elementos com a classe .revelar aparecem suavemente ao entrar na tela.
const elementosRevelar = document.querySelectorAll(".revelar");

if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target); // anima só uma vez
        }
      });
    },
    { threshold: 0.12 }
  );
  elementosRevelar.forEach((el) => observador.observe(el));
} else {
  // Navegador antigo: mostra tudo de uma vez
  elementosRevelar.forEach((el) => el.classList.add("visivel"));
}

/* ---------- 15. BOTÃO "VOLTAR AO TOPO" ---------- */
const botaoTopo = document.getElementById("topo");

if (botaoTopo) {
  window.addEventListener(
    "scroll",
    () => {
      botaoTopo.style.display = window.scrollY > 400 ? "block" : "none"; // só aparece depois de rolar 400px
    },
    { passive: true }
  );
  botaoTopo.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}
