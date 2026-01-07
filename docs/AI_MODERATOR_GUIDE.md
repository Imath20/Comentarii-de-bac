# 🛡️ Ghid AI Content Moderator

## Prezentare Generală

AI Content Moderator este un sistem inteligent de moderare automată care verifică validitatea și relevanța comentariilor și reacțiilor scriitorilor la postări. Sistemul folosește Gemini AI pentru a analiza conținutul și a detecta probleme cronologice, de autenticitate sau calitate.

## Funcționalități Principale

### 1. 📅 Verificare Cronologică
- Detectează dacă un scriitor decedat a comentat la o postare din viitor
- Analizează datele de naștere și deces
- Compară cu data postării pentru a identifica imposibilități temporale

**Exemplu problematic:**
```
Ion Creangă (1837-1889) reacționează la o postare din 1920
→ INVALID: Scriitorul era decedat în momentul postării
```

### 2. 🎯 Verificare Relevanță
- Verifică dacă comentariul este relevant pentru postare
- Analizează conexiunea între comentariu și conținutul postării
- Identifică comentarii off-topic sau spam

### 3. 🎭 Verificare Autenticitate
- Verifică dacă stilul comentariului se potrivește cu stilul scriitorului
- Analizează contextul istoric și perioada literară
- Detectează anacronisme (ex: referințe la tehnologie modernă în secolele trecute)

### 4. ✍️ Verificare Calitate
- Evaluează dacă comentariul este bine scris
- Verifică gramatica și coerența
- Detectează comentarii lipsite de sens

### 5. 📜 Verificare Context Istoric
- Identifică referințe anacronice
- Verifică concordanța cu evenimentele istorice
- Detectează inconsistențe temporale

## Cum se Folosește

### Pasul 1: Accesare
1. Navigați la pagina unui scriitor
2. Asigurați-vă că sunteți autentificat ca **Admin** sau **Semi-Admin**
3. Căutați butonul cu icon-ul de shield (🛡️) în colțul din dreapta jos (butonul violet)

### Pasul 2: Analiză
1. Click pe butonul de moderare
2. Se deschide panoul AI Content Moderator
3. Click pe **"🔍 Analizează Conținut"**
4. Așteptați procesarea (poate dura câteva secunde)

### Pasul 3: Revizuire Rezultate
După analiză, veți vedea o listă cu problemele găsite:

#### Tipuri de Probleme:
- **Critical (🔴)**: Probleme grave (imposibilități cronologice)
- **Warning (🟡)**: Avertismente (probleme de relevanță sau autenticitate)
- **Info (🔵)**: Informații (sugestii de îmbunătățire)

#### Informații Afișate:
- **Tip**: Comentariu sau Reacție
- **Confidence**: Nivelul de încredere al AI (0-100%)
- **Issues**: Lista problemelor identificate
- **Suggested Correction**: Corecție sugerată (pentru comentarii)
- **Decizie**: Dacă se recomandă ștergerea sau corectarea

### Pasul 4: Aplicare Corectări

#### Mod Manual (Recomandat):
1. Revizuiți fiecare problemă individual
2. Click pe **"🗑️ Șterge"** sau **"✏️ Corectează"**
3. Confirmați acțiunea

#### Mod Automat:
1. Bifați **"Corectare automată"**
2. Click pe **"🔍 Analizează Conținut"**
3. Toate corectările vor fi aplicate automat

## Sistem de Undo/Recovery

### Istoric Moderare
- Toate acțiunile sunt salvate în istoric
- Accesați istoricul cu butonul **"📜 Istoric"**
- Vedeți timestamp-ul și detaliile fiecărei acțiuni

### Undo Ultima Acțiune
1. Click pe **"↶ Undo ultima acțiune"**
2. Confirmați operațiunea
3. Toate modificările din ultima sesiune de moderare vor fi anulate

**⚠️ IMPORTANT**: Undo-ul funcționează doar pentru ultima acțiune din istoric!

## Exemple de Utilizare

### Exemplu 1: Eroare Cronologică
```
📅 Problema: George Bacovia (1881-1957) reacționează la postare din 1965
🔍 Analiză: Confidence 100% - Critical
💡 Sugestie: Șterge reacția (imposibil temporal)
✅ Acțiune: Click "🗑️ Șterge"
```

### Exemplu 2: Comentariu Irelevant
```
💬 Problema: "Îmi place pizza" la o postare despre "Plumb" de Bacovia
🔍 Analiză: Confidence 95% - Warning
💡 Sugestie: Comentariul nu este relevant pentru poezie
✅ Acțiune: Click "🗑️ Șterge" sau modificare manuală
```

### Exemplu 3: Anacronism
```
📜 Problema: "Am văzut pe Facebook" într-un comentariu al lui Eminescu
🔍 Analiză: Confidence 98% - Critical
💡 Sugestie: Referință anacronică (Facebook nu exista în secolul XIX)
✅ Acțiune: Click "✏️ Corectează" → AI sugerează versiune corectată
```

## Best Practices

### ✅ Recomandări
1. **Verificați întotdeauna manual** înainte de a aplica corectări
2. **Folosiți modul automat** doar pentru analize de rutină
3. **Salvați istoricul** pentru audit și transparență
4. **Testați undo** pe date de test înainte de producție
5. **Documentați deciziile** în cazul moderărilor controversate

### ❌ De Evitat
1. **Nu aplicați corectări în masă** fără revizuire
2. **Nu ignorați avertismente** cu confidence ridicat (>80%)
3. **Nu ștergeți** comentarii istorice importante doar pentru neconcordanțe minore
4. **Nu folosiți modul automat** pe scriitori cu multe postări (>50)

## Limitări și Considerații

### Limitări Tehnice
- AI poate greși în cazuri ambigue
- Confidence-ul nu este întotdeauna 100% precis
- Necesită cheie API Groq validă (VITE_GROQ_API_KEY)
- Procesarea durează ~2-5 secunde per comentariu
- Folosește modelul `moonshotai/kimi-k2-instruct-0905` prin Groq API

### Considerații Etice
- **Respectați intenția autorului**: Unele "greșeli" pot fi deliberate (ficțiune)
- **Context literar**: Unele anacronisme pot fi stilistice
- **Păstrați istoria**: Nu ștergeți comentarii istorice valoroase

### Rate Limits
- Groq API: Rate limits depind de planul tău Groq
- Pentru scriitori cu multe comentarii, procesarea va fi în batch-uri
- Modelul `moonshotai/kimi-k2-instruct-0905` este optimizat pentru viteza și eficiență

## Troubleshooting

### Problema: "Eroare la analiză"
**Soluție**: 
- Verificați cheia API Groq (`VITE_GROQ_API_KEY`) în `.env.local`
- Verificați că URL-ul API este corect (`VITE_GROQ_API_URL`)
- Verificați conexiunea la internet
- Verificați rate limit-ul API Groq
- Verificați că modelul `moonshotai/kimi-k2-instruct-0905` este disponibil

### Problema: "Nicio problemă găsită"
**Soluție**:
- Verificați dacă există comentarii/reacții
- Verificați dacă data scriitorilor este corectă în baza de date
- Comentariile pot fi toate valide (lucru bun!)

### Problema: "Undo nu funcționează"
**Soluție**:
- Undo funcționează doar pentru ultima acțiune
- Verificați că nu ați reîmprospătat pagina
- Istoricul este în memorie (se șterge la refresh)

## Configurare Tehnică

### Variabile de Mediu
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_GROQ_API_URL=https://api.groq.com/openai/v1/chat/completions
```

### Dependențe
```json
{
  "react": "^18.2.0"
}
```
**Notă**: Nu sunt necesare dependențe adiționale - folosește fetch API nativ pentru Groq.

### Permisiuni
- **Admin**: Acces complet (șterge, corectează, undo)
- **Semi-Admin**: Acces complet cu restricții pe propriile resurse
- **User**: Fără acces

## FAQ

**Q: Pot recupera comentarii șterse accidental?**  
A: Da, folosiți butonul "↶ Undo ultima acțiune" imediat după ștergere.

**Q: Cât durează o analiză completă?**  
A: ~2-5 secunde per comentariu. Pentru 20 de comentarii: ~1-2 minute.

**Q: AI-ul poate face greșeli?**  
A: Da. De aceea există modul manual și confidence score-uri.

**Q: Se salvează istoricul permanent?**  
A: Nu în prezent. Istoricul este în memorie (se pierde la refresh).

**Q: Pot adăuga reguli custom de moderare?**  
A: Da, editați prompt-ul în `src/components/AIContentModerator.jsx`.

## Contribuție

Pentru îmbunătățiri sau bug-uri:
1. Creați un issue pe GitHub
2. Descrieți problema sau feature-ul
3. Includeți exemple concrete

## Licență

Acest sistem face parte din proiectul Comentarii de BAC.
© 2026 - Toate drepturile rezervate.

