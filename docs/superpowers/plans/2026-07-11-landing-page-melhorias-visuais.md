# Landing Page Giovana — Melhorias Visuais (Rodada 2) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refinar a estética da landing page: fundo transparente nos ícones/decorações, redesenho harmônico da seção "Talvez a terapia faça sentido se você...", e o bloco de formação com texto ao lado de uma decoração botânica.

**Architecture:** Continua site 100% estático (HTML + CSS + Vue 3 via CDN, sem build). Duas frentes: (1) processamento de imagens — gerar PNGs realmente transparentes para as 5 decorações/ícones em fundo branco; (2) ajustes de marcação/estilo em `index.html` e `css/styles.css` para duas seções.

**Tech Stack:** HTML5, CSS3, Vue 3 (CDN), Python 3 + Pillow (só para o processamento de imagens, offline).

## Global Constraints

- Sem build step; site estático servido de arquivos. Não mexer no Vue/CDN nem nas fontes.
- Paleta (verbatim): fundo `#F2EDE7`; marrom escuro `#3D2B1F`; taupe/nude `#A68A6D`; bege `#EFE4D6`; texto `#2B2B2B`.
- Copy em pt-BR reproduzida verbatim do site atual — NENHUM texto de conteúdo pode ser alterado, apenas o layout/marcação em volta.
- Responsividade obrigatória: tudo empilha em 1 coluna no mobile (~860px); sem rolagem horizontal.
- Imagens processadas devem manter as linhas marrons intactas; só o fundo branco vira transparente.
- Ícones de contato do rodapé (`images/icons-contato/IMG_1557/1558/1559.png`) NÃO são processados (têm círculo bege e ficam sobre o rodapé escuro).
- Verificação de cada task: site sem testes automatizados; usar checagens estáticas + servir com `python3 -m http.server 8000` e `curl`. A conferência visual final é do usuário.
- Trabalho na branch `feat/landing-page` (já existe, com o site pronto). Scripts temporários vão em `.superpowers/sdd/` (gitignored), nunca commitados.

---

## File Structure

```
images/icons/IMG_1560.png   # flor+borboleta  -> fundo -> transparente (in place)
images/icons/IMG_1562.png   # sol             -> transparente (in place)
images/icons/IMG_1563.png   # lupa            -> transparente (in place)
images/icons/IMG_1564.png   # livro           -> transparente (in place)
images/icons/IMG_1565.png   # ramo de folhas  -> transparente (in place)
index.html                  # marcação das seções 'sentido' e 'formação'
css/styles.css               # estilos das seções 'sentido' e 'formação'
```

Os ícones das etapas ("como funciona"), o ramo (card "compreender"), o ramo (novo, na formação) e a flor ("sentido") passam a usar os mesmos arquivos — agora transparentes — sem mudança de caminho.

---

### Task 1: Gerar PNGs transparentes para as 5 decorações

**Files:**
- Modify (sobrescreve in place): `images/icons/IMG_1560.png`, `images/icons/IMG_1562.png`, `images/icons/IMG_1563.png`, `images/icons/IMG_1564.png`, `images/icons/IMG_1565.png`
- Script temporário (NÃO commitar): `.superpowers/sdd/make-transparent.py`

**Interfaces:**
- Produces: os 5 arquivos PNG passam a ter canal alfa, com o fundo branco → alfa 0 e as linhas marrons preservadas. Os caminhos NÃO mudam (marcação existente continua válida).

- [ ] **Step 1: Garantir o Pillow instalado**

Run: `pip install Pillow --quiet && python3 -c "import PIL; print('Pillow', PIL.__version__)"`
Expected: imprime a versão do Pillow, sem erro.

- [ ] **Step 2: Criar o script de transparência**

Criar `.superpowers/sdd/make-transparent.py`:

```python
import sys
from PIL import Image

THRESH = 232   # min(r,g,b) >= isto  => considerado fundo branco -> transparente
FEATHER = 30   # banda de suavizacao das bordas (evita serrilhado duro)

def make_transparent(path):
    img = Image.open(path).convert("RGBA")
    out = []
    for r, g, b, a in img.getdata():
        m = min(r, g, b)
        if m >= THRESH:
            out.append((r, g, b, 0))
        elif m >= THRESH - FEATHER:
            alpha = int(round(255 * (THRESH - m) / FEATHER))
            out.append((r, g, b, min(a, alpha)))
        else:
            out.append((r, g, b, a))
    img.putdata(out)
    img.save(path)
    print("processado:", path)

if __name__ == "__main__":
    for p in sys.argv[1:]:
        make_transparent(p)
```

- [ ] **Step 3: Rodar o script nos 5 arquivos**

Run:
```bash
python3 .superpowers/sdd/make-transparent.py \
  images/icons/IMG_1560.png images/icons/IMG_1562.png images/icons/IMG_1563.png \
  images/icons/IMG_1564.png images/icons/IMG_1565.png
```
Expected: imprime "processado:" para os 5 caminhos, sem erro.

- [ ] **Step 4: Verificar que ficaram transparentes e com as linhas preservadas**

Run:
```bash
python3 - <<'PY'
from PIL import Image
paths = ["images/icons/IMG_1560.png","images/icons/IMG_1562.png","images/icons/IMG_1563.png","images/icons/IMG_1564.png","images/icons/IMG_1565.png"]
for p in paths:
    im = Image.open(p)
    assert im.mode == "RGBA", (p, im.mode)
    # canto superior-esquerdo era fundo branco -> deve estar transparente
    assert im.getpixel((0,0))[3] == 0, (p, "canto nao transparente")
    alphas = [px[3] for px in im.getdata()]
    assert max(alphas) > 200, (p, "sem pixels opacos (linhas sumiram)")
    assert min(alphas) == 0, (p, "sem pixels transparentes")
    print("OK", p, "alpha max", max(alphas))
print("todos verificados")
PY
```
Expected: "OK ..." para os 5 e "todos verificados" ao final (canto transparente, linhas preservadas).

- [ ] **Step 5: Confirmar que só as imagens mudaram (script não vai pro commit)**

Run: `git status --porcelain`
Expected: apenas os 5 `images/icons/IMG_156*.png` como modificados (`M`). O script em `.superpowers/` NÃO aparece (diretório gitignored). SITE.pdf continua ignorado.

- [ ] **Step 6: Commit**

```bash
git add images/icons/IMG_1560.png images/icons/IMG_1562.png images/icons/IMG_1563.png images/icons/IMG_1564.png images/icons/IMG_1565.png
git commit -m "feat: fundo transparente nas 5 decoracoes (flor, sol, lupa, livro, ramo)"
```

---

### Task 2: Redesenho harmônico da seção "Talvez a terapia faça sentido se você..."

**Files:**
- Modify: `index.html` (seção `<section class="sentido">`, atualmente linhas ~156-177)
- Modify: `css/styles.css` (bloco `/* ===== Talvez Faça Sentido ===== */`, atualmente linhas ~186-196)

**Interfaces:**
- Consumes: a imagem `images/icons/IMG_1560.png` (agora transparente, da Task 1).
- Produces: novas classes CSS `.sentido__final` (agora `<p>`, não `<li>`); marcador botânico via `.sentido__lista li::before`.

- [ ] **Step 1: Substituir a marcação da seção `sentido`**

Em `index.html`, substituir todo o bloco `<section class="sentido"> ... </section>` por:

```html
    <section class="sentido">
      <div class="container sentido__grid">
        <div class="sentido__cabecalho">
          <h2>Talvez a terapia faça sentido se você...</h2>
          <span class="regua regua--centro"></span>
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
        </ul>
        <p class="sentido__final">... ou simplesmente sente que chegou a hora de olhar para si com mais cuidado.</p>
        <img class="deco deco--flor" src="images/icons/IMG_1560.png" alt="">
      </div>
    </section>
```

(São os mesmos 12 textos de antes: 11 itens na `<ul>` + o último virou `<p class="sentido__final">`. Nenhum texto alterado.)

- [ ] **Step 2: Substituir o bloco CSS da seção `sentido`**

Em `css/styles.css`, substituir o bloco atual:

```css
/* ===== Talvez Faça Sentido ===== */
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

por:

```css
/* ===== Talvez Faça Sentido ===== */
.sentido__grid { position: relative; }
.sentido__cabecalho { text-align: center; margin-bottom: 2.5rem; }
.sentido__cabecalho h2 { font-size: clamp(1.7rem, 3.6vw, 2.6rem); margin-inline: auto; max-width: 22ch; }
.sentido__cabecalho .regua--centro { margin-top: 1.2rem; }
.sentido__lista { position: relative; z-index: 1; columns: 2; column-gap: clamp(2rem, 5vw, 4rem); max-width: 1000px; margin-inline: auto; }
.sentido__lista li { break-inside: avoid; position: relative; padding-left: 1.9rem; margin-bottom: 1rem; font-size: clamp(1rem, 1.8vw, 1.15rem); }
.sentido__lista li::before {
  content: ""; position: absolute; left: 0; top: .35em; width: 1.1rem; height: 1.1rem;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23A68A6D'%3E%3Cpath d='M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z'/%3E%3C/svg%3E") center/contain no-repeat;
}
.sentido__final { position: relative; z-index: 1; text-align: center; font-weight: 700; color: var(--cor-escura); max-width: 42ch; margin: 2.2rem auto 0; font-size: clamp(1.05rem, 2vw, 1.25rem); }
.deco--flor { position: absolute; right: 0; bottom: 0; width: clamp(150px, 24vw, 330px); opacity: .45; z-index: 0; pointer-events: none; }

@media (max-width: 860px) {
  .sentido__lista { columns: 1; }
  .deco--flor { width: 150px; opacity: .35; }
}
```

- [ ] **Step 3: Verificar (estático + servido)**

Run:
```bash
grep -q 'class="sentido__final"' index.html && echo "OK final <p>"
grep -q 'columns: 2' css/styles.css && echo "OK 2 colunas"
grep -c '<li>' index.html   # deve ter 11 itens na lista sentido (mais os de outras seções, se houver)
python3 -m http.server 8000 >/dev/null 2>&1 & SRV=$!; sleep 1
curl -s http://localhost:8000 | grep -c 'sentido__lista\|sentido__final\|deco--flor'
kill $SRV
```
Expected: "OK final <p>" e "OK 2 colunas"; o `curl` encontra `sentido__lista`, `sentido__final` e `deco--flor`. Todos os 12 textos presentes (11 na lista + 1 no `<p>`). Conferência visual (2 colunas equilibradas, marcador de folha, flor grande no canto, empilhamento no mobile) fica com o usuário.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: seção 'faz sentido' em 2 colunas com marcador botânico e flor no canto"
```

---

### Task 3: Bloco de formação com texto ao lado de decoração botânica

**Files:**
- Modify: `index.html` (bloco `<div class="container sobre-mim__formacao">`, atualmente linhas ~117-125)
- Modify: `css/styles.css` (regras `.sobre-mim__formacao*`, atualmente linhas ~165-166, e a media query em ~168-171)

**Interfaces:**
- Consumes: `images/icons/IMG_1565.png` (ramo, agora transparente, da Task 1); `contatos.whatsapp` (já no data() do Vue).
- Produces: novas classes `.sobre-mim__formacao-texto` e `.sobre-mim__formacao-deco`.

- [ ] **Step 1: Substituir a marcação do bloco de formação**

Em `index.html`, substituir o bloco atual:

```html
      <div class="container sobre-mim__formacao">
        <div>
          <p>Foi essa forma de compreender a Psicologia que me aproximou da Terapia Cognitivo-Comportamental, uma abordagem baseada em evidências científicas que une acolhimento, reflexão e estratégias práticas para promover mudanças possíveis.</p>
          <p>Sou Psicóloga Clínica, CRP 08/41556, desde 2024 e também pós-graduada em Terapia Cognitivo-Comportamental e Neuropsicologia.</p>
          <p>Mais do que apresentar minha formação, espero que este espaço tenha permitido que você conhecesse um pouco da forma como trabalho e do cuidado que procuro oferecer em cada atendimento.</p>
          <p><strong>Se você sentir que esse jeito de conduzir a terapia faz sentido para a sua história, será um prazer caminhar ao seu lado.</strong></p>
        </div>
        <a href="https://wa.me/5544999677237?text=Oi%20gostaria%20de%20agendar%20uma%20consulta" :href="contatos.whatsapp" target="_blank" rel="noopener" class="btn">Agendar minha sessão</a>
      </div>
```

por:

```html
      <div class="container sobre-mim__formacao">
        <div class="sobre-mim__formacao-texto">
          <p>Foi essa forma de compreender a Psicologia que me aproximou da Terapia Cognitivo-Comportamental, uma abordagem baseada em evidências científicas que une acolhimento, reflexão e estratégias práticas para promover mudanças possíveis.</p>
          <p>Sou Psicóloga Clínica, CRP 08/41556, desde 2024 e também pós-graduada em Terapia Cognitivo-Comportamental e Neuropsicologia.</p>
          <p>Mais do que apresentar minha formação, espero que este espaço tenha permitido que você conhecesse um pouco da forma como trabalho e do cuidado que procuro oferecer em cada atendimento.</p>
          <p><strong>Se você sentir que esse jeito de conduzir a terapia faz sentido para a sua história, será um prazer caminhar ao seu lado.</strong></p>
          <a href="https://wa.me/5544999677237?text=Oi%20gostaria%20de%20agendar%20uma%20consulta" :href="contatos.whatsapp" target="_blank" rel="noopener" class="btn">Agendar minha sessão</a>
        </div>
        <div class="sobre-mim__formacao-deco">
          <img src="images/icons/IMG_1565.png" alt="">
        </div>
      </div>
```

(Mesmos 4 parágrafos e o mesmo botão — só reorganizados: texto+botão numa coluna, ramo na outra.)

- [ ] **Step 2: Substituir as regras CSS da formação**

Em `css/styles.css`, substituir a linha:

```css
.sobre-mim__formacao { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1.5rem; margin-top: var(--espaco-secao); max-width: 800px; }
```

por:

```css
.sobre-mim__formacao { display: grid; grid-template-columns: 1.4fr 0.6fr; align-items: center; gap: clamp(2rem, 5vw, 4rem); margin-top: var(--espaco-secao); }
.sobre-mim__formacao-texto .btn { margin-top: 1rem; }
.sobre-mim__formacao-deco { display: flex; justify-content: center; }
.sobre-mim__formacao-deco img { width: clamp(140px, 20vw, 240px); opacity: .9; transform: scaleX(-1); }
```

(A regra `.sobre-mim__formacao p { margin-bottom: 1rem; }` na linha seguinte permanece e continua valendo para os parágrafos.)

- [ ] **Step 3: Ajustar a media query de "quem sou eu" para empilhar a formação**

Em `css/styles.css`, substituir a media query atual:

```css
@media (max-width: 860px) {
  .sobre-mim__grid { grid-template-columns: 1fr; }
  .sobre-mim__foto img { position: static; aspect-ratio: 4/3; }
}
```

por:

```css
@media (max-width: 860px) {
  .sobre-mim__grid { grid-template-columns: 1fr; }
  .sobre-mim__foto img { position: static; aspect-ratio: 4/3; }
  .sobre-mim__formacao { grid-template-columns: 1fr; text-align: center; }
  .sobre-mim__formacao-deco { order: -1; }
  .sobre-mim__formacao-deco img { width: 130px; }
}
```

- [ ] **Step 4: Verificar (estático + servido)**

Run:
```bash
grep -q 'sobre-mim__formacao-texto' index.html && echo "OK coluna texto"
grep -q 'sobre-mim__formacao-deco' index.html && echo "OK coluna deco"
grep -q 'images/icons/IMG_1565.png' index.html && echo "OK ramo referenciado"
python3 -m http.server 8000 >/dev/null 2>&1 & SRV=$!; sleep 1
curl -s http://localhost:8000 | grep -c 'sobre-mim__formacao-texto\|sobre-mim__formacao-deco'
kill $SRV
```
Expected: os três "OK ..."; o `curl` encontra as duas novas classes. O botão continua com `href` estático + `:href="contatos.whatsapp"`. Conferência visual (texto de um lado, ramo do outro; empilhado no mobile com o ramo acima) fica com o usuário.

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: bloco de formação com texto ao lado de decoração botânica"
```

---

## Self-Review

- **Cobertura dos pedidos:** (1) fundo branco removido → Task 1 (PNGs transparentes); (2) flor maior acompanhando o canto → Task 2 (`.deco--flor` maior, ancorada em `right:0; bottom:0`); (3) texto ao lado + imagem após a 2ª foto de perfil → Task 3 (formação em 2 colunas com o ramo); (4) alinhamento mais harmônico da seção "faz sentido" → Task 2 (2 colunas + marcador botânico + cabeçalho centralizado). Todos cobertos.
- **Sem placeholders:** todo passo traz código/comando real.
- **Consistência:** classes novas (`.sentido__final` como `<p>`, `.sobre-mim__formacao-texto/-deco`, `.sentido__lista li::before`) definidas e usadas de forma casada; caminhos de imagem inalterados (Task 1 sobrescreve in place, então Tasks 2 e 3 continuam válidas).

## Notas

- As Tasks 2 e 3 dependem visualmente da Task 1 (transparência), mas funcionam mesmo sem ela — a ordem recomendada é 1 → 2 → 3.
- Os ícones das etapas ("como funciona") e o ramo do card "compreender" também passam a ficar transparentes automaticamente (mesmos arquivos), sem mudança de marcação.
