# Plan Redesign AI Assistant — „Bomba”

> Un redesign care să surprindă, să nu pară generat de AI și să se integreze în contextul literar BAC.

---

## Surse de inspirație (transparență)

| Sursă | Ce am preluat |
|-------|----------------|
| **DaVinci's Notebook** (Ylang Labs) | Parchment, foi de caiet, stil de inventar/notițe |
| **Ministry of Echoes** (Fuzzy Cows) | Estetică de mașină de scris, text „tipărit” |
| **Literatuurmuseum** | Poveste interactivă, elemente multi-senzoriale |
| **Center for Fiction** | Culori puternice, linii sofisticate, cald |
| **Tendințe 2025** (CopyElement, 7K) | Maximalist typography, culori bold, layout experimental |
| **Neubrutalism** (SmarterKits) | Umbre puternice, borduri groase, personalitate puternică |
| **Notion AI** | „Asistent în caietul tău” — integrare contextuală |

---

## Concept principal: „Caietul de BAC”

**Idee:** Chatbotul nu e o fereastră generică, ci un **caiet de notițe** în care elevul vorbește cu un „profesor” imaginar. Fiecare conversație = o pagină nouă din caiet.

### De ce surprinde
- Nu mai arată ca un chat clasic (bule, sidebar standard)
- Contextul literar (BAC, opere, comentarii) se reflectă vizual
- Senzația de lucru real, nu de „AI generic”

---

## Direcții de design (alege 1–2)

### Opțiunea A: **Caiet cu linii**
- Fundal: hârtie crem cu linii discrete (ca un caiet)
- Mesaje user: scris de mână (font script) sau blocuri ca „notițe evidențiate”
- Mesaje AI: text tipărit pe „foaie”, eventual cu marginile unui caiet
- Sidebar: „Cuprins” ca la începutul unei cărți
- Accente: marker galben/portocaliu pentru evidențieri

### Opțiunea B: **Mașină de scris**
- Mesaje ca text „dactilografiat” — font monospace, efect de tastare
- Fundal: hârtie veche, texture ușoară
- Cursor care clipește
- Sunet discret la trimitere (opțional)
- Inspirație: Ministry of Echoes

### Opțiunea C: **Neubrutalism literar**
- Borduri groase (3–4px), negru/maro
- Umbre offset (nu blur)
- Culori puternice: crem + maro închis + accent portocaliu/auriu
- Typography bold, chunky
- Butoane cu colțuri foarte ascuțite sau foarte rotunjite
- **Contrast puternic** — nu „soft & friendly”, ci „confident & bold”

### Opțiunea D: **Tablou negru (blackboard)**
- Fundal negru/gri închis
- Text „cretă” alb/crem
- Font care imită scrisul cu cretă
- Butoane ca „butoane de cretă” pe marginea tablei
- Foarte potrivit pentru „lecție” / context educațional

### Opțiunea E: **Carte deschisă**
- Layout split: două „pagini” (stânga = istoric/scurt, dreapta = conversație)
- Efect de pagină cu umbră la cotor
- Numerotare pagini
- Font serif pentru „carte”

---

## Elemente care evită „AI slop”

1. **Fonturi distinctive** — nu Inter/Roboto. Ex: *Playfair Display* (serif literar), *Caveat* (script), *JetBrains Mono* (typewriter), *Fraunces* (chunky)
2. **Texturi subtile** — paper grain, noise, linii de caiet
3. **Micro-animații** — nu fade generic, ci: text care apare ca la dactilografiere, pagini care „se întorc”
4. **Forme neașteptate** — nu doar dreptunghiuri rotunjite; colțuri ascuțite sau forme organice
5. **Personality** — iconița/avatarul Asistentului BAC: nu robot, ci cap de diplomă, carte deschisă, stilou

---

## Recomandare finală

**Combinare A + C:** „Caiet de BAC” cu accente Neubrutalism.

- Fundal: hârtie crem cu linii foarte discrete
- Mesaje: blocuri cu borduri groase, umbre offset
- Typography: *Fraunces* sau *Playfair* pentru titluri, font clar pentru conținut
- Culori: păstrăm paleta site-ului (#fbeec1, #4e2e1e, #7c4f2b, #ffb347) dar le folosim **mai bold**
- Sidebar: „Cuprins” — lista de chat-uri ca capitole
- FAB: nu cerc simplu — formă de **carte mică** sau **cap de diplomă** care se deschide

### Surpriza principală
Modalul nu mai e „fereastră de chat”. E un **caiet care se deschide** din colțul ecranului, cu colțul unei pagini îndoit, ca și cum ai deschide un caiet real.

---

## Pași de implementare

1. **Faza 1 — Structură**
   - Redesign layout: „caiet” cu două coloane
   - Sidebar = cuprins (stilizare nouă)
   - Header = „Caietul meu — Asistentul BAC”

2. **Faza 2 — Vizual**
   - Background texture (paper/linii)
   - Fonturi noi
   - Borduri groase, umbre offset (Neubrutalism)

3. **Faza 3 — Mesaje**
   - Bule → blocuri cu borduri groase
   - Avatar/icon nou (carte, diplomă, stilou)
   - Efect de „scriere” la răspunsurile AI (opțional)

4. **Faza 4 — FAB & animații**
   - FAB = carte/caiet
   - Animație deschidere: caiet care se deschide
   - Tranziții scurte, clare

---

## Checklist „nu pare AI”

- [ ] Font care nu e Inter/Roboto/Open Sans
- [ ] Cel puțin un element neașteptat (formă, animație, metaforă vizuală)
- [ ] Textură sau pattern (nu fundal plat)
- [ ] Personalitate vizuală clară (caiet, carte, tablou)
- [ ] Culori folosite cu încredere, nu „safe”
- [ ] Referință la context (BAC, literatură, educație)

---

*Plan creat pe baza cercetării web. Inspirații citate explicit.*
