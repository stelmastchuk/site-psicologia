# Landing Page Giovana Lopes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir uma landing page estática, elegante e totalmente responsiva para a psicóloga Giovana Lopes, replicando fielmente o `SITE.pdf` e usando as imagens reais da pasta `images/`.

**Architecture:** Site 100% estático (sem build): `index.html` + `css/styles.css` + `js/app.js`. A interatividade (menu mobile, FAQ acordeão, scroll reveal, scroll suave) é feita com **Vue 3 via CDN** (global build). Dados compartilhados (links de contato e itens da FAQ) vivem no `data()` do app Vue e são vinculados na marcação para manter DRY. Cada slide do PDF vira uma `<section>` vertical.

**Tech Stack:** HTML5, CSS3, Vue 3 (CDN `vue.global.js`), Google Fonts (Open Sans, Montserrat, Cormorant Garamond).

## Global Constraints

- Sem build step, sem Node/bundler. Tudo abre direto no navegador e roda em host estático.
- Vue 3 carregado via CDN global build: `https://unpkg.com/vue@3/dist/vue.global.js`.
- Fontes (verbatim): títulos **The Seasons** (alternativa atual **Cormorant Garamond**, com `@font-face` comentado preparado para o arquivo real); corpo **Open Sans**; botões e nome "Giovana Lopes Stelmastchuk" em **Montserrat**.
- Paleta (verbatim): fundo creme `#F2EDE7`; marrom escuro `#3D2B1F`; taupe/nude `#A68A6D`; bege claro `#EFE4D6`; texto corpo `#2B2B2B`.
- WhatsApp (verbatim, todos os botões "Agendar"): `https://wa.me/5544999677237?text=Oi%20gostaria%20de%20agendar%20uma%20consulta`.
- Instagram: `https://instagram.com/psi.giovanalopes`. Email: `psi.giovanalopes@gmail.com` (`mailto:`).
- Idioma: pt-BR. Textos reproduzidos verbatim do PDF.
- Responsividade obrigatória: nenhuma rolagem horizontal; layout empilha em 1 coluna no mobile; nav vira hambúrguer.
- Verificação de cada tarefa: rodar `python3 -m http.server 8000` na raiz e abrir `http://localhost:8000` no navegador; conferir os critérios de aceitação e o console (sem erros).

---

## File Structure

```
index.html          # <head> (fonts, Vue CDN, css/js) + <div id="app"> com as 10 seções
css/styles.css       # reset, variáveis de tema, tipografia, layout, responsividade, animações
js/app.js            # createApp: data (contatos, faq), estados (menu, faqAberto), scroll reveal + smooth scroll
images/              # imagens já fornecidas (não modificar)
docs/superpowers/    # spec e este plano
```

---

### Task 1: Scaffold do projeto + base HTML/CSS/JS + app Vue

**Files:**
- Create: `index.html`
- Create: `css/styles.css`
- Create: `js/app.js`
- Create: `.gitignore`

**Interfaces:**
- Produces: app Vue montado em `#app`; objeto `data()` com `menuAberto: false`, `faqAberto: null`, `contatos: { whatsapp, instagram, email }`, `faq: []` (preenchido na Task 10). Variáveis CSS de tema em `:root`.

- [ ] **Step 1: Inicializar git e estrutura**

```bash
cd /home/vitorstelmastchuk/site-psic-giovana
git init
mkdir -p css js
```

- [ ] **Step 2: Criar `.gitignore`**

```
.DS_Store
*.Zone.Identifier
*:Zone.Identifier
node_modules/
.vscode/
```

- [ ] **Step 3: Criar `index.html` (esqueleto)**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Giovana Lopes Stelmastchuk — Psicóloga Clínica | Terapia Cognitivo-Comportamental. Atendimento online e presencial em Maringá-PR.">
  <title>Giovana Lopes Stelmastchuk | Psicóloga Clínica</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Montserrat:wght@400;500;600&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <div id="app">
    <!-- seções entram aqui nas próximas tasks -->
    <p class="teste-vue">{{ mensagemTeste }}</p>
  </div>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
```

- [ ] **Step 4: Criar `css/styles.css` (reset + tokens + fontes)**

```css
/* ===== Reset ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
img { max-width: 100%; display: block; }
a { text-decoration: none; color: inherit; }
ul { list-style: none; }
html { scroll-behavior: smooth; }

/* ===== The Seasons (plugar arquivo real depois) =====
@font-face {
  font-family: 'The Seasons';
  src: url('fonts/the-seasons.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
*/

/* ===== Tokens ===== */
:root {
  --cor-fundo: #F2EDE7;
  --cor-escura: #3D2B1F;
  --cor-nude: #A68A6D;
  --cor-bege: #EFE4D6;
  --cor-texto: #2B2B2B;
  --fonte-titulo: 'The Seasons', 'Cormorant Garamond', Georgia, serif;
  --fonte-corpo: 'Open Sans', system-ui, sans-serif;
  --fonte-ui: 'Montserrat', system-ui, sans-serif;
  --largura-max: 1200px;
  --espaco-secao: clamp(3.5rem, 8vw, 7rem);
}

/* ===== Base ===== */
body {
  font-family: var(--fonte-corpo);
  color: var(--cor-texto);
  background: var(--cor-fundo);
  line-height: 1.7;
  /* textura de papel sutil */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0.42 0 0 0 0 0.33 0 0 0 0 0.24 0 0 0 0.025 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

h1, h2, h3 { font-family: var(--fonte-titulo); font-weight: 500; color: var(--cor-escura); line-height: 1.15; }

.container { width: min(100% - 2.5rem, var(--largura-max)); margin-inline: auto; }
section { padding-block: var(--espaco-secao); }

/* ===== Botão ===== */
.btn {
  font-family: var(--fonte-ui);
  font-weight: 500;
  font-size: clamp(0.95rem, 1.6vw, 1.1rem);
  letter-spacing: 0.03em;
  background: var(--cor-nude);
  color: var(--cor-escura);
  padding: 0.9em 2em;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  display: inline-block;
  transition: transform .2s ease, filter .2s ease;
}
.btn:hover { transform: translateY(-2px); filter: brightness(1.05); }
```

- [ ] **Step 5: Criar `js/app.js` (app Vue mínimo)**

```javascript
const { createApp } = Vue;

createApp({
  data() {
    return {
      mensagemTeste: 'Vue funcionando',
      menuAberto: false,
      faqAberto: null,
      contatos: {
        whatsapp: 'https://wa.me/5544999677237?text=Oi%20gostaria%20de%20agendar%20uma%20consulta',
        instagram: 'https://instagram.com/psi.giovanalopes',
        email: 'mailto:psi.giovanalopes@gmail.com'
      },
      faq: [] // preenchido na Task 10
    };
  }
}).mount('#app');
```

- [ ] **Step 6: Verificar no navegador**

Run: `python3 -m http.server 8000` (na raiz do projeto) e abrir `http://localhost:8000`
Expected: a página mostra o texto "Vue funcionando" (prova que o Vue montou e leu o `data`); as fontes carregam (checar aba Network); nenhum erro no console.

- [ ] **Step 7: Remover o parágrafo de teste**

Apagar a linha `<p class="teste-vue">{{ mensagemTeste }}</p>` do `index.html` e a propriedade `mensagemTeste` do `app.js` (era só prova de montagem).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold estático com Vue via CDN, tokens de tema e fontes"
```

---

### Task 2: Navbar fixa + menu mobile (hambúrguer)

**Files:**
- Modify: `index.html` (adicionar `<header>` como primeiro filho de `#app`)
- Modify: `css/styles.css` (estilos da nav)

**Interfaces:**
- Consumes: `menuAberto` e `contatos.whatsapp` do `data()`.
- Produces: âncoras de navegação apontando para `#sobre`, `#quem-sou-eu`, `#como-funciona`, `#faq` (IDs criados nas seções seguintes).

- [ ] **Step 1: Adicionar `<header>` no início do `#app`**

```html
<header class="nav" :class="{ 'nav--aberto': menuAberto }">
  <div class="container nav__inner">
    <a href="#topo" class="nav__marca">
      Giovana Lopes Stelmastchuk
      <span>Psicóloga Clínica | CRP: 08/41556</span>
    </a>
    <button class="nav__hamburguer" @click="menuAberto = !menuAberto" aria-label="Abrir menu">
      <span></span><span></span><span></span>
    </button>
    <nav class="nav__links" @click="menuAberto = false">
      <a href="#sobre">Sobre</a>
      <a href="#quem-sou-eu">Quem sou eu</a>
      <a href="#como-funciona">Como funciona</a>
      <a href="#faq">FAQ</a>
      <a :href="contatos.whatsapp" target="_blank" rel="noopener" class="btn nav__cta">Agendar sessão</a>
    </nav>
  </div>
</header>
```

- [ ] **Step 2: Adicionar `id="topo"` ao body e estilos da nav no `styles.css`**

```css
.nav {
  position: sticky; top: 0; z-index: 50;
  background: rgba(242,237,231,0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(61,43,31,0.08);
}
.nav__inner { display: flex; align-items: center; justify-content: space-between; padding-block: 0.9rem; gap: 1rem; }
.nav__marca { font-family: var(--fonte-ui); font-weight: 600; font-size: clamp(1rem,2.2vw,1.3rem); color: var(--cor-escura); line-height: 1.2; }
.nav__marca span { display: block; font-weight: 400; font-size: 0.72em; color: var(--cor-nude); }
.nav__links { display: flex; align-items: center; gap: clamp(1rem, 2.5vw, 2rem); font-family: var(--fonte-ui); font-size: 0.95rem; }
.nav__links a:not(.btn):hover { color: var(--cor-nude); }
.nav__cta { padding: 0.6em 1.4em; }
.nav__hamburguer { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 6px; }
.nav__hamburguer span { width: 26px; height: 2px; background: var(--cor-escura); transition: .3s; }

@media (max-width: 860px) {
  .nav__hamburguer { display: flex; }
  .nav__links {
    position: absolute; top: 100%; left: 0; right: 0;
    flex-direction: column; align-items: flex-start;
    background: var(--cor-fundo); padding: 1.2rem 1.25rem;
    gap: 1.1rem; border-bottom: 1px solid rgba(61,43,31,0.08);
    transform: translateY(-120%); opacity: 0; pointer-events: none; transition: .3s;
  }
  .nav--aberto .nav__links { transform: translateY(0); opacity: 1; pointer-events: auto; }
  .nav__cta { align-self: stretch; text-align: center; }
}
```

- [ ] **Step 3: Verificar no navegador**

Recarregar `http://localhost:8000`.
Expected desktop: nome+CRP à esquerda, 4 links + botão "Agendar sessão" à direita; a nav fica fixa ao rolar. Em largura ≤860px (DevTools responsivo): links somem e aparece o hambúrguer; clicar abre/fecha o menu; clicar num link fecha o menu. Botão "Agendar sessão" abre o WhatsApp em nova aba. Sem rolagem horizontal.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: navbar fixa com menu mobile hambúrguer"
```

---

### Task 3: Seção Hero (slide 1)

**Files:**
- Modify: `index.html` (adicionar `<section id="sobre" class="hero">` após o `<header>`)
- Modify: `css/styles.css`

**Interfaces:**
- Consumes: `contatos.whatsapp`.
- Produces: `id="sobre"` (alvo do link da nav).

- [ ] **Step 1: Adicionar a seção Hero**

```html
<section id="sobre" class="hero">
  <div class="container hero__grid">
    <div class="hero__texto">
      <p class="eyebrow">Psicóloga Clínica • Terapia Cognitivo-Comportamental</p>
      <h1>Toda mudança começa quando aquilo que sentimos finalmente encontra um espaço para ser compreendido.</h1>
      <span class="regua"></span>
      <p class="hero__lead">Você pode começar exatamente de onde está.</p>
      <ul class="hero__lista">
        <li>Sem precisar entender tudo o que sente.</li>
        <li>Sem encontrar as palavras certas.</li>
        <li>Sem ter todas as respostas.</li>
      </ul>
      <p>A terapia é um espaço para compreender, com calma, aquilo que parece difícil de carregar sozinha.</p>
      <a :href="contatos.whatsapp" target="_blank" rel="noopener" class="btn">Agendar minha primeira sessão</a>
    </div>
    <div class="hero__foto">
      <img src="images/fotos-perfil/43D67DF7-7DCC-4E4A-90B6-4734C525A94F.png" alt="Giovana Lopes, psicóloga clínica, em seu consultório">
    </div>
  </div>
</section>
```

- [ ] **Step 2: Estilos do Hero + utilitários `eyebrow` e `regua`**

```css
.eyebrow { font-family: var(--fonte-ui); color: var(--cor-nude); font-size: 0.9rem; letter-spacing: .04em; margin-bottom: 1rem; }
.regua { display: block; width: 90px; height: 3px; background: var(--cor-nude); margin: 1.5rem 0; }

.hero__grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: clamp(2rem, 5vw, 4rem); align-items: center; }
.hero__texto h1 { font-size: clamp(2rem, 5vw, 3.4rem); }
.hero__lead { font-weight: 600; color: var(--cor-escura); margin-bottom: .5rem; }
.hero__lista { margin-bottom: 1.2rem; }
.hero__lista li { position: relative; padding-left: 1.4rem; }
.hero__lista li::before { content: "✦"; position: absolute; left: 0; color: var(--cor-nude); }
.hero__texto .btn { margin-top: 1.6rem; }
.hero__foto img { width: 100%; border-radius: 18px; object-fit: cover; aspect-ratio: 3/4; box-shadow: 0 20px 50px rgba(61,43,31,0.15); }

@media (max-width: 860px) {
  .hero__grid { grid-template-columns: 1fr; }
  .hero__foto { order: -1; }
  .hero__foto img { aspect-ratio: 4/3; }
}
```

- [ ] **Step 3: Verificar no navegador**

Expected: duas colunas — texto à esquerda (eyebrow, título serifado grande, régua nude, lead em negrito, lista com marcadores ✦, parágrafo, botão) e foto de suéter preto à direita com cantos arredondados. No mobile: foto acima do texto, tudo em 1 coluna, sem overflow horizontal.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: seção hero com foto e CTA"
```

---

### Task 4: Seção "O peso invisível" (slide 2)

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

- [ ] **Step 1: Adicionar a seção**

```html
<section class="peso">
  <div class="container peso__grid">
    <div class="peso__foto">
      <img src="images/livros/6C91325D-903E-4731-8ED6-D228A6BA6BA0.jpeg" alt="Livros de terapia cognitivo-comportamental, caderno de anotações e uma xícara sobre a mesa">
    </div>
    <div class="peso__texto">
      <span class="regua regua--topo"></span>
      <h2>Talvez você tenha se acostumado a carregar mais do que deveria.</h2>
      <p>Até que, em algum momento, entender por que tudo tem parecido tão pesado se tornou mais difícil do que continuar carregando.</p>
      <span class="regua"></span>
      <p>Às vezes, esse peso aparece de formas diferentes...</p>
      <ul class="peso__lista">
        <li>Talvez nos pensamentos que não dão descanso.</li>
        <li>Na dificuldade de dizer "não".</li>
        <li>Na sensação constante de culpa, mesmo quando você fez o melhor que podia.</li>
        <li>Na autocobrança.</li>
        <li>Nos relacionamentos que parecem repetir os mesmos padrões.</li>
        <li>Ou naquele cansaço que ninguém percebe, porque você continua dando conta de tudo.</li>
      </ul>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Estilos**

```css
.peso__grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: clamp(2rem, 5vw, 4rem); align-items: center; }
.peso__foto img { width: 100%; border-radius: 18px; object-fit: cover; aspect-ratio: 3/4; box-shadow: 0 20px 50px rgba(61,43,31,0.15); }
.peso__texto h2 { font-size: clamp(1.6rem, 3.5vw, 2.6rem); margin-bottom: 1rem; }
.peso__texto p { margin-bottom: 1rem; }
.regua--topo { margin-top: 0; }
.peso__lista li { margin-bottom: .4rem; padding-left: 1.2rem; position: relative; }
.peso__lista li::before { content: "•"; position: absolute; left: 0; color: var(--cor-nude); }

@media (max-width: 860px) {
  .peso__grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Verificar no navegador**

Expected: foto dos livros (vertical) à esquerda; à direita régua, título serifado, parágrafos e lista. Todos os textos do slide 2 presentes. No mobile empilha em 1 coluna.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: seção 'o peso invisível' com foto dos livros"
```

---

### Task 5: Seção "De onde vem" (slide 3)

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

**Interfaces:**
- Consumes: `contatos.whatsapp`.

- [ ] **Step 1: Adicionar a seção**

```html
<section class="origem">
  <div class="container origem__grid">
    <div class="origem__col">
      <h2>Nem sempre é fácil entender de onde tudo isso vem.</h2>
      <p>Mas compreender esses padrões pode ser o início de uma mudança construída com mais clareza e menos culpa.</p>
      <p>Na Terapia Cognitivo-Comportamental, buscamos compreender como pensamentos, emoções e comportamentos se influenciam mutuamente.</p>
      <p>Quando esses padrões começam a fazer sentido, pequenas mudanças deixam de parecer impossíveis e passam a ser construídas de forma mais consciente, respeitando a sua história e o seu tempo.</p>
    </div>
    <div class="origem__divisoria"></div>
    <div class="origem__col origem__col--destaque">
      <h2>Nem tudo o que pesa é visível.</h2>
      <p>E nem tudo precisa continuar sendo carregado sozinho.</p>
      <a :href="contatos.whatsapp" target="_blank" rel="noopener" class="btn">Vamos conversar sobre isso?</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Estilos**

```css
.origem__grid { display: grid; grid-template-columns: 1fr auto 1fr; gap: clamp(2rem, 5vw, 4rem); align-items: center; }
.origem__col h2 { font-size: clamp(1.5rem, 3.2vw, 2.4rem); margin-bottom: 1.2rem; }
.origem__col p { margin-bottom: 1rem; }
.origem__divisoria { width: 2px; align-self: stretch; background: var(--cor-nude); }
.origem__col--destaque { text-align: center; }
.origem__col--destaque .btn { margin-top: 1rem; }

@media (max-width: 860px) {
  .origem__grid { grid-template-columns: 1fr; }
  .origem__divisoria { width: 60%; height: 2px; justify-self: center; }
}
```

- [ ] **Step 3: Verificar no navegador**

Expected: duas colunas de texto separadas por uma linha vertical nude; coluna direita centralizada com botão "Vamos conversar sobre isso?" (abre WhatsApp). No mobile a divisória vira horizontal e as colunas empilham.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: seção 'de onde vem' com divisória e CTA"
```

---

### Task 6: Seção "Compreender" (slide 4)

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

- [ ] **Step 1: Adicionar a seção**

```html
<section class="compreender">
  <div class="container compreender__grid">
    <div class="compreender__texto">
      <h2>Existe uma forma de compreender o que hoje parece confuso.</h2>
      <p>Pensamentos, emoções e comportamentos estão constantemente influenciando uns aos outros.</p>
      <p>Muitas vezes, reagimos de formas que parecem automáticas, repetimos padrões sem perceber ou acreditamos que determinados pensamentos são verdades absolutas.</p>
      <p>Compreender como tudo isso se conecta é um dos primeiros passos para construir mudanças mais conscientes e possíveis.</p>
    </div>
    <div class="compreender__card">
      <img class="deco deco--ramo" src="images/icons/IMG_1565.png" alt="">
      <p>Quando aquilo que parece confuso começa a fazer sentido, mudar deixa de parecer impossível.</p>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Estilos**

```css
.compreender__grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 5vw, 4rem); align-items: center; }
.compreender__texto h2 { font-size: clamp(1.6rem, 3.5vw, 2.6rem); margin-bottom: 1.2rem; }
.compreender__texto p { margin-bottom: 1rem; }
.compreender__card { position: relative; border: 1px solid var(--cor-nude); border-radius: 16px; padding: clamp(2rem, 4vw, 3rem); }
.compreender__card p { font-family: var(--fonte-ui); font-weight: 600; color: var(--cor-escura); font-size: clamp(1.1rem, 2vw, 1.4rem); }
.deco--ramo { position: absolute; top: -55px; right: -10px; width: 130px; opacity: .9; }

@media (max-width: 860px) {
  .compreender__grid { grid-template-columns: 1fr; }
  .deco--ramo { width: 90px; top: -40px; }
}
```

- [ ] **Step 3: Verificar no navegador**

Expected: texto à esquerda; card com borda nude à direita contendo a frase em destaque (Montserrat negrito) e o ramo de folhas decorando o canto superior. No mobile empilha.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: seção 'compreender' com card decorado"
```

---

### Task 7: Seção "Quem sou eu" (slides 5 e 6)

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

**Interfaces:**
- Consumes: `contatos.whatsapp`.
- Produces: `id="quem-sou-eu"` (alvo do link da nav).

- [ ] **Step 1: Adicionar a seção (foto + texto + formação + CTA)**

```html
<section id="quem-sou-eu" class="sobre-mim">
  <div class="container sobre-mim__grid">
    <div class="sobre-mim__foto">
      <img src="images/fotos-perfil/6755F724-C0D9-413A-8BC0-31B4B0B8E9F6.png" alt="Retrato de Giovana Lopes, psicóloga clínica">
    </div>
    <div class="sobre-mim__texto">
      <h2>Cada processo terapêutico é único. E acredito que conhecer quem estará ao seu lado também faz parte desse início.</h2>
      <p>Antes de falar sobre a minha formação, quero falar sobre aquilo em que acredito. A forma como conduzo a terapia nasce da maneira como creio o que as pessoas devem ser acolhidas: com <strong>escuta</strong>, <strong>respeito</strong> e <strong>ciência</strong>.</p>
      <p>Não acredito que mudanças consistentes surjam apenas porque alguém recebeu um conselho ou encontrou uma resposta pronta. Acredito que elas começam quando existe espaço para <strong>compreender</strong>, <strong>nomear</strong> e <strong>olhar com sinceridade</strong> para aquilo que antes parecia apenas um peso difícil de explicar.</p>
      <p>Por isso, valorizo a história de cada pessoa, o <strong>contexto</strong> em que ela vive e o tempo necessário para que cada assunto possa ser elaborado com segurança. Mais do que buscar respostas rápidas, meu objetivo é construir, junto com cada paciente, um processo que respeite sua <strong>autonomia</strong>, sua <strong>individualidade</strong> e aquilo que faz sentido para a sua vida.</p>
    </div>
  </div>
  <div class="container sobre-mim__formacao">
    <div>
      <p>Foi essa forma de compreender a Psicologia que me aproximou da Terapia Cognitivo-Comportamental, uma abordagem baseada em evidências científicas que une acolhimento, reflexão e estratégias práticas para promover mudanças possíveis.</p>
      <p>Sou Psicóloga Clínica, CRP 08/41556, desde 2024 e também pós-graduada em Terapia Cognitivo-Comportamental e Neuropsicologia.</p>
      <p>Mais do que apresentar minha formação, espero que este espaço tenha permitido que você conhecesse um pouco da forma como trabalho e do cuidado que procuro oferecer em cada atendimento.</p>
      <p><strong>Se você sentir que esse jeito de conduzir a terapia faz sentido para a sua história, será um prazer caminhar ao seu lado.</strong></p>
    </div>
    <a :href="contatos.whatsapp" target="_blank" rel="noopener" class="btn">Agendar minha sessão</a>
  </div>
</section>
```

- [ ] **Step 2: Estilos**

```css
.sobre-mim__grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: clamp(2rem, 5vw, 4rem); align-items: start; }
.sobre-mim__foto img { width: 100%; border-radius: 18px; object-fit: cover; aspect-ratio: 3/4; box-shadow: 0 20px 50px rgba(61,43,31,0.15); position: sticky; top: 90px; }
.sobre-mim__texto h2 { font-size: clamp(1.5rem, 3.2vw, 2.3rem); margin-bottom: 1.2rem; }
.sobre-mim__texto p { margin-bottom: 1rem; }
.sobre-mim__texto strong, .sobre-mim__formacao strong { color: var(--cor-escura); font-weight: 600; }
.sobre-mim__formacao { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1.5rem; margin-top: var(--espaco-secao); max-width: 800px; }
.sobre-mim__formacao p { margin-bottom: 1rem; }

@media (max-width: 860px) {
  .sobre-mim__grid { grid-template-columns: 1fr; }
  .sobre-mim__foto img { position: static; aspect-ratio: 4/3; }
}
```

- [ ] **Step 3: Verificar no navegador**

Expected: foto (camisa branca) à esquerda; texto com trechos em negrito à direita. Abaixo, bloco de formação centralizado com CRP e o botão "Agendar minha sessão" (abre WhatsApp). O link "Quem sou eu" da nav rola até aqui. No mobile empilha.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: seção 'quem sou eu' com foto, crença e formação"
```

---

### Task 8: Seção "Como funciona" — 3 etapas (slide 7)

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

**Interfaces:**
- Produces: `id="como-funciona"` (alvo do link da nav).

- [ ] **Step 1: Adicionar a seção**

```html
<section id="como-funciona" class="etapas">
  <div class="container">
    <p class="etapas__titulo">Na terapia, compreender é apenas o começo.</p>
    <div class="etapas__faixa">
      Cada processo acontece de maneira única, respeitando a história, o contexto e o tempo de cada pessoa. Ainda assim, alguns passos costumam estar presentes ao longo desse caminho.
    </div>
    <div class="etapas__grid">
      <article class="etapa">
        <img src="images/icons/IMG_1564.png" alt="" class="etapa__icone">
        <h3>Compreender</h3>
        <span class="regua regua--centro"></span>
        <p>Antes de buscar soluções, é importante entender o que mantém o sofrimento acontecendo.</p>
      </article>
      <article class="etapa">
        <img src="images/icons/IMG_1563.png" alt="" class="etapa__icone">
        <h3>Questionar</h3>
        <span class="regua regua--centro"></span>
        <p>Nem todo pensamento corresponde à realidade. Na terapia, aprendemos a olhar para eles com mais curiosidade e menos julgamento.</p>
      </article>
      <article class="etapa">
        <img src="images/icons/IMG_1562.png" alt="" class="etapa__icone">
        <h3>Transformar</h3>
        <span class="regua regua--centro"></span>
        <p>Mudanças consistentes acontecem aos poucos, respeitando sua história, seus objetivos e o seu tempo.</p>
      </article>
    </div>
    <p class="etapas__rodape">Cada processo é único. Ainda assim, algumas pessoas chegam ao consultório por motivos que acabam se parecendo mais do que imaginam.</p>
  </div>
</section>
```

- [ ] **Step 2: Estilos**

```css
.etapas__titulo { font-family: var(--fonte-ui); text-align: center; letter-spacing: .06em; color: var(--cor-nude); font-size: clamp(1rem, 2.4vw, 1.4rem); text-transform: uppercase; margin-bottom: 2rem; }
.etapas__faixa { background: var(--cor-nude); color: var(--cor-escura); border-radius: 22px; padding: clamp(1.4rem, 3vw, 2rem) clamp(1.5rem, 4vw, 3rem); text-align: center; max-width: 900px; margin: 0 auto 3.5rem; }
.etapas__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(1.5rem, 4vw, 3rem); text-align: center; }
.etapa__icone { width: 80px; height: 80px; object-fit: contain; margin: 0 auto 1rem; }
.etapa h3 { font-size: clamp(1.4rem, 2.6vw, 1.9rem); }
.regua--centro { margin-inline: auto; width: 60px; }
.etapas__rodape { text-align: center; color: var(--cor-nude); font-size: 1.05rem; max-width: 720px; margin: 3rem auto 0; }

@media (max-width: 780px) {
  .etapas__grid { grid-template-columns: 1fr; max-width: 420px; margin-inline: auto; }
}
```

- [ ] **Step 3: Verificar no navegador**

Expected: título em maiúsculas nude, faixa nude arredondada com o texto de introdução, 3 cards centralizados (ícones livro/lupa/sol, títulos serifados, régua central, texto) e o parágrafo de rodapé. O link "Como funciona" rola até aqui. No mobile os 3 cards empilham.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: seção 'como funciona' com as 3 etapas"
```

---

### Task 9: Seção "A terapia faz sentido se você..." (slide 8)

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

- [ ] **Step 1: Adicionar a seção**

```html
<section class="sentido">
  <div class="container sentido__grid">
    <div class="sentido__cabecalho">
      <h2>Talvez a terapia faça sentido se você...</h2>
    </div>
    <ul class="sentido__lista">
      <li>... sente que pensa demais e tem dificuldade para desacelerar;</li>
      <li>... percebe que está sempre se colocando em segundo plano;</li>
      <li>... enfrenta dificuldades nos relacionamentos;</li>
      <li>... convive com ansiedade, culpa ou autocobrança constante;</li>
      <li>... gostaria de compreender melhor suas emoções;</li>
      <li>... sente que está vivendo no automático;</li>
      <li>... sente que está sempre tentando dar conta de tudo, mas quase nunca encontra tempo para cuidar de si;</li>
      <li>... percebe que se cobra mais do que cobraria qualquer outra pessoa;</li>
      <li>... tem dificuldade em colocar limites e, muitas vezes, acaba dizendo "sim" quando gostaria de dizer "não";</li>
      <li>... vive repetindo situações que prometeu que não viveria novamente;</li>
      <li>... quer compreender melhor suas emoções, seus relacionamentos e a forma como tem enfrentado a vida;</li>
      <li class="sentido__final">... ou simplesmente sente que chegou a hora de olhar para si com mais cuidado.</li>
    </ul>
    <img class="deco deco--flor" src="images/icons/IMG_1560.png" alt="">
  </div>
</section>
```

- [ ] **Step 2: Estilos**

```css
.sentido__grid { position: relative; }
.sentido__cabecalho h2 { font-size: clamp(1.7rem, 3.6vw, 2.6rem); margin-bottom: 2rem; max-width: 18ch; }
.sentido__lista { max-width: 900px; }
.sentido__lista li { margin-bottom: .9rem; font-size: clamp(1rem, 1.8vw, 1.15rem); }
.sentido__final { font-weight: 700; color: var(--cor-escura); }
.deco--flor { position: absolute; right: 0; top: 20%; width: clamp(90px, 14vw, 170px); opacity: .9; pointer-events: none; }

@media (max-width: 860px) {
  .deco--flor { position: static; width: 110px; margin: 2rem auto 0; }
}
```

- [ ] **Step 3: Verificar no navegador**

Expected: título serifado; lista completa dos itens de identificação com o último em negrito; flor+borboleta decorando o lado direito. No mobile a decoração vai para baixo, centralizada, sem overflow.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: seção 'a terapia faz sentido se você'"
```

---

### Task 10: FAQ em acordeão animado (slides 9 e 10) — componente principal

**Files:**
- Modify: `js/app.js` (preencher `faq` e adicionar método `toggleFaq`)
- Modify: `index.html` (seção FAQ com `v-for`)
- Modify: `css/styles.css` (pílulas + transição de altura)

**Interfaces:**
- Consumes: `faqAberto` (do `data()`).
- Produces: `id="faq"` (alvo do link da nav); método `toggleFaq(i)`; array `faq` de objetos `{ pergunta, resposta }`.

- [ ] **Step 1: Preencher `faq` e adicionar `methods` em `js/app.js`**

Dentro do `data()`, substituir `faq: []` por:

```javascript
      faq: [
        { pergunta: 'Como funciona a primeira sessão?', resposta: 'A primeira sessão é um momento para que possamos nos conhecer. Vamos conversar sobre o que fez você procurar terapia, entender suas necessidades e pensar juntas nos próximos passos do processo. Você não precisa chegar sabendo explicar tudo o que sente ou contar toda a sua história logo no primeiro encontro. Esse espaço será construído no seu tempo.' },
        { pergunta: 'A terapia é on-line ou presencial?', resposta: 'Os atendimentos acontecem de forma online ou presencial em Maringá-PR. Caso tenha dúvidas sobre como funciona essa modalidade, ficarei feliz em explicar e ajudar você a encontrar a melhor forma de iniciar o acompanhamento.' },
        { pergunta: 'Qual é a frequência das sessões?', resposta: 'Em geral, as sessões acontecem uma vez por semana, pois essa frequência favorece a continuidade do processo terapêutico. No entanto, cada caso é avaliado de forma individual e podemos conversar sobre o que faz mais sentido para o seu momento.' },
        { pergunta: 'Quanto tempo dura cada sessão?', resposta: 'As sessões têm duração média de 50 minutos, oferecendo um tempo reservado para que possamos conversar com tranquilidade e desenvolver o processo terapêutico.' },
        { pergunta: 'E se eu nunca fiz terapia?', resposta: 'Não tem problema. É natural sentir dúvidas ou até um pouco de insegurança no início. Meu objetivo é construir um espaço em que você possa se sentir à vontade para falar no seu ritmo, sem a expectativa de "acertar" ou saber exatamente como uma sessão funciona.' },
        { pergunta: 'Como eu começo?', resposta: 'Basta entrar em contato pelo WhatsApp. Ficarei feliz em conversar com você, tirar suas dúvidas e encontrar juntas o melhor horário para iniciar o seu acompanhamento.' }
      ]
```

Adicionar, após o `data() { ... }` (irmão de `data`, dentro do objeto do `createApp`):

```javascript
  methods: {
    toggleFaq(i) {
      this.faqAberto = this.faqAberto === i ? null : i;
    }
  },
```

- [ ] **Step 2: Adicionar a seção FAQ no `index.html`**

```html
<section id="faq" class="faq">
  <div class="container faq__grid">
    <div class="faq__cabecalho">
      <h2>Talvez você ainda tenha algumas dúvidas...</h2>
    </div>
    <div class="faq__lista">
      <div
        class="faq__item"
        :class="{ 'faq__item--aberto': faqAberto === i }"
        v-for="(item, i) in faq"
        :key="i"
      >
        <button class="faq__pergunta" @click="toggleFaq(i)" :aria-expanded="faqAberto === i">
          <span>{{ item.pergunta }}</span>
          <span class="faq__seta">▸</span>
        </button>
        <div class="faq__resposta-wrap">
          <p class="faq__resposta">{{ item.resposta }}</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Estilos da FAQ (pílulas com cores alternadas + transição)**

```css
.faq__grid { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: clamp(2rem, 5vw, 4rem); align-items: start; }
.faq__cabecalho h2 { font-size: clamp(1.7rem, 3.6vw, 2.6rem); max-width: 12ch; }
.faq__lista { display: flex; flex-direction: column; gap: 1rem; }
.faq__item { border-radius: 999px; overflow: hidden; transition: border-radius .3s; }
.faq__item--aberto { border-radius: 22px; }

/* pílula (pergunta) */
.faq__pergunta {
  width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 1rem;
  font-family: var(--fonte-ui); font-weight: 500; font-size: clamp(.95rem, 1.8vw, 1.1rem);
  text-align: left; cursor: pointer; border: none; padding: 1.1em 1.6em; color: #fff;
}
.faq__seta { transition: transform .3s; font-size: .9em; }
.faq__item--aberto .faq__seta { transform: rotate(90deg); }

/* cores alternadas como no PDF */
.faq__item:nth-child(3n+1) .faq__pergunta { background: var(--cor-escura); }
.faq__item:nth-child(3n+2) .faq__pergunta { background: #5A4433; }
.faq__item:nth-child(3n+3) .faq__pergunta { background: var(--cor-nude); color: var(--cor-escura); }

/* resposta com transição de altura via grid */
.faq__resposta-wrap { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .35s ease; background: var(--cor-bege); }
.faq__item--aberto .faq__resposta-wrap { grid-template-rows: 1fr; }
.faq__resposta { overflow: hidden; padding: 0 1.6em; margin: 0; }
.faq__item--aberto .faq__resposta { padding: 1.2em 1.6em; }

@media (max-width: 860px) {
  .faq__grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 4: Verificar no navegador**

Expected: título à esquerda; 6 pílulas à direita com cores alternadas (marrom escuro / marrom médio / nude). Clicar numa pílula: a resposta desliza suavemente para baixo (fundo bege), a seta gira 90° e os cantos da pílula quadram; abrir outra fecha a anterior (só uma aberta por vez); clicar na aberta fecha. Verificar que o texto das 6 respostas confere. O link "FAQ" da nav rola até aqui. No mobile empilha em 1 coluna, sem overflow.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: FAQ em acordeão animado com Vue"
```

---

### Task 11: Footer — CTA final + contatos (slide 11)

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

**Interfaces:**
- Consumes: `contatos.whatsapp`, `contatos.email`, `contatos.instagram`.

- [ ] **Step 1: Adicionar a seção de fechamento e o rodapé**

```html
<section class="fechamento">
  <div class="container fechamento__inner">
    <h2>Quando você estiver pronta...</h2>
    <p>Dar o primeiro passo nem sempre é simples. E tudo bem. Se este espaço fez sentido para você, talvez seja porque alguma parte da sua história encontrou lugar nestas palavras.</p>
    <p>Quando você sentir que é o momento, será um prazer construir esse processo ao seu lado, com respeito ao seu tempo, à sua história e àquilo que faz sentido para a sua vida.</p>
    <a :href="contatos.whatsapp" target="_blank" rel="noopener" class="btn">Agendar minha primeira sessão</a>
  </div>
</section>

<footer class="rodape">
  <div class="container rodape__inner">
    <a href="#topo" class="rodape__marca">
      Giovana Lopes Stelmastchuk
      <span>Psicóloga Clínica | CRP: 08/41556</span>
    </a>
    <div class="rodape__contatos">
      <a :href="contatos.email" aria-label="Enviar email"><img src="images/icons-contato/IMG_1559.png" alt="Email"></a>
      <a :href="contatos.whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp"><img src="images/icons-contato/IMG_1558.png" alt="Telefone"></a>
      <a :href="contatos.instagram" target="_blank" rel="noopener" aria-label="Instagram"><img src="images/icons-contato/IMG_1557.png" alt="Instagram"></a>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Estilos**

```css
.fechamento__inner { text-align: center; max-width: 760px; margin-inline: auto; }
.fechamento__inner h2 { font-size: clamp(1.8rem, 4vw, 2.8rem); margin-bottom: 1.5rem; }
.fechamento__inner p { margin-bottom: 1rem; }
.fechamento__inner .btn { margin-top: 1.5rem; }

.rodape { background: var(--cor-escura); color: var(--cor-fundo); padding-block: clamp(2rem, 5vw, 3rem); }
.rodape__inner { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; }
.rodape__marca { font-family: var(--fonte-ui); font-weight: 600; font-size: clamp(1.1rem, 2.4vw, 1.5rem); }
.rodape__marca span { display: block; font-weight: 400; font-size: .7em; color: var(--cor-nude); }
.rodape__contatos { display: flex; gap: 1rem; }
.rodape__contatos img { width: 52px; height: 52px; border-radius: 50%; }

@media (max-width: 560px) {
  .rodape__inner { flex-direction: column; text-align: center; }
}
```

- [ ] **Step 3: Verificar no navegador**

Expected: bloco de fechamento centralizado com CTA (abre WhatsApp); rodapé marrom escuro com nome+CRP à esquerda e 3 ícones de contato circulares à direita. Email abre `mailto:`, telefone abre WhatsApp, instagram abre o perfil. No mobile empilha centralizado.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: fechamento com CTA final e rodapé com contatos"
```

---

### Task 12: Animações de scroll reveal + realce do link ativo

**Files:**
- Modify: `js/app.js` (directive/mounted com IntersectionObserver)
- Modify: `css/styles.css` (estado inicial/animado)

**Interfaces:**
- Consumes: as `<section>` já existentes.

- [ ] **Step 1: Adicionar classe base de reveal e o observer no `mounted`**

No `createApp({ ... })`, adicionar a propriedade `mounted` (irmã de `methods`):

```javascript
  mounted() {
    const alvos = document.querySelectorAll('section');
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('revelado');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    alvos.forEach((s) => { s.classList.add('reveal'); obs.observe(s); });
  },
```

- [ ] **Step 2: Estilos de reveal**

```css
.reveal { opacity: 0; transform: translateY(28px); transition: opacity .7s ease, transform .7s ease; }
.reveal.revelado { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

- [ ] **Step 3: Verificar no navegador**

Expected: ao rolar a página, cada seção surge com fade-in + leve subida uma única vez. A rolagem pelos links da nav é suave (já garantida por `scroll-behavior: smooth`). Com "reduzir movimento" ativado no SO, as seções aparecem sem animação. Nenhum erro no console.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: scroll reveal suave das seções com IntersectionObserver"
```

---

### Task 13: Passe final de responsividade e fidelidade visual

**Files:**
- Modify: `css/styles.css` (ajustes finos)

- [ ] **Step 1: Auditar larguras**

Abrir `http://localhost:8000` e testar nas larguras 375px, 768px, 1024px, 1440px (DevTools). Para cada uma, confirmar:
- Nenhuma rolagem horizontal (rodar no console: `document.documentElement.scrollWidth <= window.innerWidth` deve ser `true`).
- Todas as 10 seções legíveis e sem sobreposição de texto/decoração.
- Nav: hambúrguer funciona ≤860px; links funcionam >860px.
- FAQ abre/fecha corretamente em todas as larguras.
- Imagens carregam (sem ícone quebrado) — conferir caminhos da pasta `images/`.

- [ ] **Step 2: Aplicar ajustes finos identificados**

Adicionar ao final do `styles.css` correções pontuais que a auditoria revelar. Exemplo de salvaguarda contra overflow de decorações e imagens grandes:

```css
/* salvaguardas finais */
body { overflow-x: hidden; }
.deco { max-width: 40vw; }
h1, h2 { overflow-wrap: break-word; }
```

- [ ] **Step 3: Comparar com o PDF**

Rolar a página inteira comparando cada seção com o slide correspondente do `SITE.pdf` (ordem, textos, cores, posição das fotos e decorações). Corrigir qualquer divergência de conteúdo/ordem.

- [ ] **Step 4: Verificação final completa**

Expected: página fiel ao PDF nas 10 seções; responsiva de 375px a 1440px sem overflow; FAQ, menu mobile e reveal funcionando; todos os CTAs abrindo WhatsApp/email/instagram corretos; console limpo.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "polish: passe final de responsividade e fidelidade ao PDF"
```

---

## Notas de execução

- **The Seasons:** quando o arquivo da fonte chegar, colocá-lo em `fonts/`, descomentar o bloco `@font-face` no topo do `styles.css` e ajustar a URL. A cascata `var(--fonte-titulo)` já prioriza a The Seasons automaticamente.
- **Foto dos livros:** a versão horizontal `images/livros/CA8FC3B1-...png` está disponível como alternativa caso se prefira outro enquadramento na Task 4.
- **Hospedagem:** por ser estático, basta subir a pasta inteira em Netlify/GitHub Pages/Vercel. Nenhum passo de build.
