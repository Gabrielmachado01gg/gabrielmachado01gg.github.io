/* Portfólio de Gabriel Wiedenhoft (JavaScript sem build). */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var qs = function (s, r) { return (r || document).querySelector(s); };
  var token = function (n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); };

  function mulberry(seed) {
    return function () {
      seed = (seed + 0x6d2b79f5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }

  var GH = "https://github.com/Gabrielmachado01gg/";
  var PAGES = "https://gabrielmachado01gg.github.io/";
  var PROJECTS = [
    { nome: "Fio", desc: "Landing de IA para documentos, com pixel art gerada em canvas e cartões empilhados no scroll.", tags: ["HTML", "CSS", "JavaScript", "GSAP"], code: GH + "fio", live: PAGES + "fio/" },
    { nome: "Casca", desc: "Garrafa térmica fictícia desenhada em canvas, que se abre em camadas conforme o scroll.", tags: ["Canvas", "CSS", "JavaScript", "GSAP"], code: GH + "casca", live: PAGES + "casca/" },
    { nome: "Comanda", desc: "Agentes de IA para atendimento de delivery: triagem, tool calling, guardrails, avaliação, API, chat de demonstração e fluxo n8n.", tags: ["Python", "LLM", "Agentes", "n8n"], code: GH + "comanda", live: PAGES + "comanda/" },
    { nome: "Cobalto", desc: "Loja de roupas fictícia em azul, com tecido simulado em tempo real (Verlet 3D em canvas, sem bibliotecas).", tags: ["Canvas", "Física", "CSS", "JavaScript"], code: GH + "cobalto", live: PAGES + "cobalto/" },
    { nome: "Yume Sushi", desc: "Site responsivo e acessível de restaurante japonês, sem frameworks e com verificação automática.", tags: ["HTML", "CSS", "JavaScript"], code: GH + "Site_web", live: PAGES + "Site_web/" },
    { nome: "Sistema bancário", desc: "Console em Java com validação de CPF, BigDecimal para dinheiro e testes automatizados.", tags: ["Java 17", "Maven", "JUnit 5"], code: GH + "ProjetoFinal" },
    { nome: "Folha de pagamento", desc: "Modelo de funcionários com herança, classes abstratas e polimorfismo.", tags: ["Java 17", "Maven", "JUnit 5"], code: GH + "Trabalho" },
    { nome: "Janela de login", desc: "Tela de login em Swing com a senha guardada como hash PBKDF2 e sal aleatório.", tags: ["Java Swing", "Segurança", "JUnit 5"], code: GH + "java" },
    { nome: "NOVA DESCENT", desc: "Jogo de nave 2D com 3 fases, chefão, modo cooperativo e ranking. Versão original em Pygame e versão jogável no navegador (canvas), com toque no celular.", tags: ["Python", "Pygame", "Canvas", "JavaScript"], code: GH + "PyGame", live: PAGES + "PyGame/" }
  ];

  /* ---------- Campo de pontos no hero ---------- */
  function field() {
    var canvas = qs("#field"), host = canvas.parentElement;
    var ctx = canvas.getContext("2d");
    var step = 26, w = 0, h = 0, mx = -1e4, my = -1e4, running = true;
    var ink = token("--ink"), accent = token("--accent");

    function size() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      var cols = Math.ceil(w / step) + 1, rows = Math.ceil(h / step) + 1;
      for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
          var x = i * step, y = j * step;
          var dx = x - mx, dy = y - my, d = Math.sqrt(dx * dx + dy * dy);
          var wave = reduce ? 0 : Math.sin(i * 0.35 + j * 0.25 + t / 1400) * 0.5 + 0.5;
          var near = Math.max(0, 1 - d / 190);
          var r = 1.4 + wave * 1.2 + near * 7;
          ctx.fillStyle = near > 0.05 ? accent : ink;
          ctx.globalAlpha = near > 0.05 ? 0.35 + near * 0.65 : 0.1 + wave * 0.12;
          ctx.fillRect(x - r / 2, y - r / 2, r, r);
        }
      }
      ctx.globalAlpha = 1;
    }
    function loop(t) { if (running) draw(t); requestAnimationFrame(loop); }

    host.addEventListener("pointermove", function (e) {
      var b = canvas.getBoundingClientRect();
      mx = e.clientX - b.left; my = e.clientY - b.top;
      if (reduce) draw(0);
    });
    host.addEventListener("pointerleave", function () { mx = my = -1e4; if (reduce) draw(0); });
    window.addEventListener("resize", function () { size(); draw(0); });
    size(); draw(0);
    if (!reduce) {
      requestAnimationFrame(loop);
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (en) { running = en[0].isIntersecting; }).observe(host);
      }
    }
  }

  /* ---------- Miniatura gerada a partir do nome do projeto ---------- */
  function thumb(canvas, nome) {
    var cols = 40, rows = 24, px = 12;
    canvas.width = cols * px; canvas.height = rows * px;
    var ctx = canvas.getContext("2d");
    var rand = mulberry(hash(nome));
    var paper = token("--paper"), accent = token("--accent");
    ctx.fillStyle = token("--ink");
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var peak = 4 + Math.floor(rand() * 6);
    for (var x = 0; x < cols; x++) {
      var hgt = 3 + Math.floor(rand() * peak + Math.sin(x * 0.4 + rand()) * 2 + 3);
      for (var y = 0; y < hgt; y++) {
        var row = rows - 1 - y;
        var spark = rand() > 0.9;
        ctx.fillStyle = spark ? accent : paper;
        ctx.globalAlpha = spark ? 1 : 0.18 + (y / hgt) * 0.5;
        ctx.fillRect(x * px, row * px, px - 1, px - 1);
      }
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = accent;
    var sx = 2 + Math.floor(rand() * 30), sy = 2 + Math.floor(rand() * 5);
    for (var k = 0; k < 5; k++) ctx.fillRect((sx + k) * px, sy * px, px - 1, px - 1);
  }

  function renderProjects() {
    var track = qs("#track");
    PROJECTS.forEach(function (p) {
      var li = document.createElement("li");
      li.className = "card";
      var art = document.createElement("canvas");
      art.className = "card__art";
      art.setAttribute("aria-hidden", "true");
      thumb(art, p.nome);
      var body = document.createElement("div");
      body.className = "card__body";
      var h = document.createElement("h3"); h.textContent = p.nome;
      var d = document.createElement("p"); d.textContent = p.desc;
      var tags = document.createElement("ul"); tags.className = "card__tags";
      p.tags.forEach(function (t) { var i = document.createElement("li"); i.textContent = t; tags.appendChild(i); });
      var links = document.createElement("div"); links.className = "card__links";
      if (p.live) {
        var a1 = document.createElement("a");
        a1.href = p.live; a1.rel = "noopener"; a1.textContent = "Ver online";
        a1.setAttribute("aria-label", "Ver " + p.nome + " online");
        links.appendChild(a1);
      }
      var a2 = document.createElement("a");
      a2.href = p.code; a2.rel = "noopener"; a2.textContent = "Ver código";
      a2.setAttribute("aria-label", "Ver código de " + p.nome + " no GitHub");
      links.appendChild(a2);
      body.appendChild(h); body.appendChild(d); body.appendChild(tags); body.appendChild(links);
      li.appendChild(art); li.appendChild(body);
      track.appendChild(li);
    });
  }

  /* ---------- Rolagem vertical que move a trilha na horizontal ---------- */
  function pan() {
    var section = qs("#projetos"), view = qs(".work__view"), track = qs("#track");
    var wide = window.matchMedia("(min-width: 900px) and (hover: hover)").matches;
    if (reduce || !wide || !window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    var dist = 0;
    function measure() {
      var pad = parseFloat(getComputedStyle(view).paddingLeft) + parseFloat(getComputedStyle(view).paddingRight);
      dist = Math.max(0, track.scrollWidth + pad - view.clientWidth);
      section.style.setProperty("--work-h", Math.round(dist + window.innerHeight) + "px");
    }
    section.classList.add("work--pinned");
    measure();

    ScrollTrigger.create({
      trigger: section,
      start: "top top+=64",
      end: "bottom bottom",
      scrub: true,
      invalidateOnRefresh: true,
      onRefresh: measure,
      onUpdate: function (self) { track.style.transform = "translate3d(" + (-dist * self.progress).toFixed(1) + "px,0,0)"; }
    });
    window.addEventListener("resize", function () { measure(); ScrollTrigger.refresh(); });
  }

  field();
  renderProjects();
  pan();
})();
