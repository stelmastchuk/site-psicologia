# Landing Page — Giovana Lopes Stelmastchuk (Psicóloga Clínica)

**Data:** 2026-07-11
**Status:** Aprovado — pronto para plano de implementação

## Objetivo

Construir uma landing page (single page) moderna, elegante e totalmente
responsiva que replica fielmente o conteúdo e a identidade visual do arquivo
`SITE.pdf` (11 slides no formato 16:9), convertendo os slides horizontais em
seções verticais de rolagem. Os placeholders do PDF são substituídos pelas
imagens reais fornecidas na pasta `images/`.

## Stack técnica

- **HTML5 + CSS3 puro** — estrutura e estilo, sem build step.
- **Vue 3 via CDN** (global build: `vue.global.js`) — reatividade para FAQ,
  menu mobile e animações. Sem Node, sem bundler, sem compilação.
- **Google Fonts via CDN** — Open Sans (corpo) + Montserrat (botões e nome da
  Giovana). Títulos usam a fonte premium "The Seasons"; como ela não está em CDN
  gratuita, usamos **Cormorant Garamond** (Google Fonts) como alternativa
  próxima, deixando um bloco `@font-face` preparado para plugar o arquivo real
  da The Seasons depois, sem retrabalho.
- Site 100% estático: abre direto no navegador e hospeda em qualquer host
  estático (Netlify, GitHub Pages, Vercel).

> Observação: como depende de CDNs externas, o preview interno de Artifact não
> roda. A verificação é feita rodando localmente (servidor estático simples).

## Identidade visual

- **Paleta** (extraída do PDF):
  - Fundo creme/off-white: `#F2EDE7`
  - Marrom escuro (texto/títulos): `#3D2B1F`
  - Taupe/nude (botões, destaques): `#A68A6D`
  - Bege claro (cards, ícones de contato): `#EFE4D6`
  - Preto suave para corpo de texto: `#2B2B2B`
- **Fundo** com leve textura de papel, como no PDF.
- **Tipografia:**
  - Títulos: **The Seasons** (fonte de referência) — alternativa atual
    **Cormorant Garamond** (serif elegante), com `@font-face` preparado para
    trocar pelo arquivo real depois.
  - Corpo de texto: **Open Sans**.
  - Botões (CTAs) e nome "Giovana Lopes Stelmastchuk": **Montserrat**.
- **Elementos decorativos:** ramo de folhas (`icons/IMG_1565`) e flor+borboleta
  (`icons/IMG_1560`) posicionados como no PDF.

## Mapeamento de imagens (pasta `images/`)

| Uso | Arquivo |
|---|---|
| Hero (foto principal) | `fotos-perfil/43D67DF7-7DCC-4E4A-90B6-4734C525A94F.png` (suéter preto) |
| Seção "Quem sou eu" | `fotos-perfil/6755F724-C0D9-413A-8BC0-31B4B0B8E9F6.png` (camisa branca) |
| Seção "O peso invisível" | `livros/6C91325D-...jpeg` (vertical) + `livros/CA8FC3B1-...png` (horizontal, alt. responsiva) |
| Etapa "Compreender" | `icons/IMG_1564.png` (livro aberto) |
| Etapa "Questionar" | `icons/IMG_1563.png` (lupa) |
| Etapa "Transformar" | `icons/IMG_1562.png` (sol) |
| Decoração flor+borboleta | `icons/IMG_1560.png` |
| Decoração ramo de folhas | `icons/IMG_1565.png` |
| Contato — email | `icons-contato/IMG_1559.png` |
| Contato — telefone | `icons-contato/IMG_1558.png` |
| Contato — instagram | `icons-contato/IMG_1557.png` |

Todos os placeholders do PDF (nuvem/paisagem, ícones, fotos) têm imagem real
correspondente. Não há placeholders pendentes.

## Estrutura — 10 seções (rolagem vertical)

Cada seção corresponde a um ou mais slides do PDF. Textos reproduzidos
integralmente do PDF.

1. **Hero** (slide 1)
   - Nav fixa no topo: nome + CRP à esquerda; links (Sobre, Quem sou eu, Como
     funciona, FAQ) + botão "Agendar sessão" à direita.
   - Coluna esquerda: eyebrow "Psicóloga Clínica • Terapia Cognitivo-Comportamental",
     título serif "Toda mudança começa quando aquilo que sentimos finalmente
     encontra um espaço para ser compreendido.", subtexto e lista com marcadores,
     CTA "Agendar minha primeira sessão".
   - Coluna direita: foto (suéter preto) com cantos arredondados.

2. **O peso invisível** (slide 2)
   - Layout 2 colunas: foto dos livros (vertical) à esquerda; à direita título
     "Talvez você tenha se acostumado a carregar mais do que deveria." +
     parágrafos + lista de formas em que o peso aparece.

3. **De onde vem** (slide 3)
   - Duas colunas separadas por divisória vertical: à esquerda "Nem sempre é
     fácil entender de onde tudo isso vem." + parágrafos sobre TCC; à direita
     "Nem tudo o que pesa é visível." + subtexto + CTA "Vamos conversar sobre isso?".

4. **Compreender** (slide 4)
   - Título "Existe uma forma de compreender o que hoje parece confuso." +
     parágrafos à esquerda; à direita card com "Quando aquilo que parece confuso
     começa a fazer sentido, mudar deixa de parecer impossível." decorado com o
     ramo de folhas.

5. **Quem sou eu — parte 1** (slide 5)
   - Foto (camisa branca) à esquerda; à direita título "Cada processo terapêutico
     é único..." + parágrafos sobre a abordagem, com trechos em negrito (escuta,
     respeito, ciência, etc.).

6. **Quem sou eu — parte 2** (slide 6)
   - Parágrafos sobre formação (CRP 08/41556, pós em TCC e Neuropsicologia) +
     CTA "Agendar minha sessão".

7. **Como funciona** (slide 7)
   - Título "Na terapia, compreender é apenas o começo." + faixa de destaque
     "Cada processo acontece de maneira única...".
   - 3 cards em linha (Compreender / Questionar / Transformar), cada um com
     ícone (livro/lupa/sol), título serif e texto.
   - Nota final: "Cada processo é único. Ainda assim, algumas pessoas chegam ao
     consultório por motivos que acabam se parecendo mais do que imaginam."

8. **A terapia faz sentido se você...** (slide 8)
   - Título "Talvez a terapia faça sentido se você..." + lista de itens de
     identificação (todos os itens do PDF), com o último em negrito. Decoração
     flor+borboleta no canto.

9. **FAQ** (slides 9 e 10) — **componente interativo principal**
   - Título "Talvez você ainda tenha algumas dúvidas..." à esquerda.
   - Acordeão à direita: 6 perguntas em pílulas com cores alternadas
     (marrom escuro / taupe / bege), como no PDF.
   - Comportamento: clicar em uma pílula expande a resposta com transição de
     slide suave (altura animada); seta gira (▸ → ▾); apenas uma resposta aberta
     por vez (as demais fecham).
   - Perguntas e respostas (texto do slide 10):
     1. Como funciona a primeira sessão?
     2. A terapia é on-line ou presencial?
     3. Qual é a frequência das sessões?
     4. Quanto tempo dura cada sessão?
     5. E se eu nunca fiz terapia?
     6. Como faço para agendar?

10. **Footer** (slide 11)
    - CTA final: título "Quando você estiver pronta..." + parágrafos + botão
      "Agendar minha primeira sessão".
    - Rodapé em marrom escuro: nome + CRP à esquerda; ícones de contato
      (email, telefone, instagram) à direita.

## Interatividade e animações (Vue 3)

- **FAQ acordeão:** estado reativo controla qual índice está aberto; transição
  CSS de altura/opacidade para o slide suave.
- **Menu mobile:** botão hambúrguer alterna um estado que abre/fecha o menu de
  navegação em telas pequenas.
- **Scroll reveal:** seções surgem com fade-in + leve translação ao entrarem na
  viewport (IntersectionObserver). Sutil, sem exagero.
- **Scroll suave:** clicar nos links da nav rola suavemente até a seção
  correspondente.

## Contatos e CTAs

- **WhatsApp** (todos os botões "Agendar"):
  `https://wa.me/5544999677237?text=Oi%20gostaria%20de%20agendar%20uma%20consulta`
- **Instagram:** `https://instagram.com/psi.giovanalopes` (@psi.giovanalopes)
- **Email:** `psi.giovanalopes@gmail.com` (link `mailto:`)
- Localização mencionada no FAQ: atendimento online ou presencial em Maringá-PR.

## Responsividade (requisito obrigatório)

- Layout fluido com CSS Grid/Flexbox.
- Breakpoints: desktop (2 colunas) → tablet → mobile (1 coluna empilhada).
- Nav vira menu hambúrguer no mobile.
- Tipografia e espaçamentos com unidades relativas (`clamp()`, `rem`, `%`).
- Imagens `max-width: 100%`; nenhuma rolagem horizontal indesejada.
- Faixas/cards reorganizam de linha para coluna no mobile.

## Estrutura de arquivos proposta

```
index.html          # marcação das 10 seções + montagem do app Vue
css/styles.css       # variáveis de tema, layout, responsividade, animações
js/app.js            # app Vue: dados da FAQ, estados (menu, acordeão), scroll reveal
images/              # imagens já fornecidas (inalteradas)
```

## Fora de escopo (YAGNI)

- Backend, formulário de contato com envio de email, CMS.
- Múltiplas páginas / blog / rotas.
- Analytics, cookies, SEO avançado (além de meta tags básicas).
- Internacionalização (site somente em pt-BR).

## Critérios de sucesso

- Todas as 10 seções presentes, com os textos do PDF reproduzidos fielmente.
- Identidade visual (cores, fontes, decorações) fiel ao PDF.
- Todas as imagens reais da pasta `images/` no lugar dos placeholders.
- FAQ em acordeão funcionando com animação suave (uma aberta por vez).
- Layout íntegro e legível em desktop, tablet e mobile, sem rolagem horizontal.
- Botões de agendamento abrem o WhatsApp com a mensagem pré-preenchida.
- Site abre e funciona como arquivos estáticos, sem passo de build.
