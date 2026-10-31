# Portfólio de Gabriel Wiedenhoft

![Verificar site](https://github.com/Gabrielmachado01gg/gabrielmachado01gg.github.io/actions/workflows/verificar.yml/badge.svg)
![Licença MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-green)

Site pessoal com meus projetos em Java, Python e web.

**Ver online:** https://gabrielmachado01gg.github.io/

## O que tem de interessante

- **Campo de pontos no hero:** grade de pontos em canvas que cresce e muda de cor perto do mouse.
- **Projetos em rolagem horizontal:** o scroll vertical move a trilha de cartões (GSAP ScrollTrigger com `position: sticky`). Em telas pequenas ou com `prefers-reduced-motion`, vira uma faixa com rolagem nativa e `scroll-snap`.
- **Miniaturas geradas por código:** cada projeto ganha uma imagem em pixels derivada do próprio nome.
- **Acessível:** link para pular ao conteúdo, foco visível e cartões com `aria-label` descritivos.

## Como rodar

Abra `index.html` no navegador ou sirva a pasta com `python -m http.server 8000`.

Verificação de links e textos alternativos: `python scripts/verificar_site.py`.

## Tecnologias

HTML, CSS e JavaScript puros, canvas 2D, GSAP 3.12.5 (ScrollTrigger) por CDN.

Licença [MIT](LICENSE).
