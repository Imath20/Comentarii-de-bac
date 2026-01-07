import React, { useState, useEffect } from 'react';
import '../styles/aiContentModerator.scss';

const AIContentModerator = ({ 
  scriitor, 
  allScriitori,
  onModerate,
  onClose 
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [moderationHistory, setModerationHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [autoCorrectMode, setAutoCorrectMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [isGeneratingReplacements, setIsGeneratingReplacements] = useState(false);

  // Helper pentru a converti bio-ul în string
  const getBioText = (data) => {
    if (!data) return '';
    if (typeof data === 'string') return data;
    if (typeof data === 'object') {
      // Dacă e obiect, încearcă să extragă textul
      if (data.bibliografie) return typeof data.bibliografie === 'string' ? data.bibliografie : '';
      if (Array.isArray(data)) return data.join(' ');
      // Pentru obiecte complexe, încearcă să extragă textul din proprietăți comune
      if (data.text) return typeof data.text === 'string' ? data.text : '';
      if (data.content) return typeof data.content === 'string' ? data.content : '';
      return JSON.stringify(data);
    }
    return String(data);
  };

  // Verifică dacă scriitorul mai trăiește
  const isWriterAlive = (scriitorData) => {
    if (!scriitorData || !scriitorData.date) return null;
    
    const dateStr = scriitorData.date.toLowerCase().trim();
    const currentYear = new Date().getFullYear();
    
    // Pattern 1: "an naștere - an deces" (ex: "1837 - 1889")
    const deathMatch1 = dateStr.match(/(\d{4})\s*[-–—]\s*(\d{4})/);
    if (deathMatch1) {
      const birthYear = parseInt(deathMatch1[1]);
      const deathYear = parseInt(deathMatch1[2]);
      return {
        alive: false,
        deathYear,
        birthYear
      };
    }
    
    // Pattern 2: "an naștere - " sau "an naștere -" (ex: "1950 - " sau "1950-")
    const aliveMatch = dateStr.match(/(\d{4})\s*[-–—]\s*$/);
    if (aliveMatch) {
      const birthYear = parseInt(aliveMatch[1]);
      return {
        alive: true,
        birthYear,
        deathYear: null
      };
    }
    
    // Pattern 3: "n. an naștere, d. an deces" (ex: "n. 1881, d. 1957")
    const nDmatch = dateStr.match(/n\.?\s*(\d{4}).*?d\.?\s*(\d{4})/);
    if (nDmatch) {
      const birthYear = parseInt(nDmatch[1]);
      const deathYear = parseInt(nDmatch[2]);
      return {
        alive: false,
        deathYear,
        birthYear
      };
    }
    
    // Pattern 4: "n. an naștere" fără deces (ex: "n. 1950")
    const nOnlyMatch = dateStr.match(/n\.?\s*(\d{4})(?!.*d\.)/);
    if (nOnlyMatch) {
      const birthYear = parseInt(nOnlyMatch[1]);
      // Dacă anul nașterii este recent (< 150 de ani în urmă), probabil e în viață
      if (currentYear - birthYear < 150) {
        return {
          alive: true,
          birthYear,
          deathYear: null
        };
      }
    }
    
    // Pattern 5: Doar două numere cu 4 cifre separate de spațiu sau alt separator
    const twoYearMatch = dateStr.match(/(\d{4}).*?(\d{4})/);
    if (twoYearMatch) {
      const year1 = parseInt(twoYearMatch[1]);
      const year2 = parseInt(twoYearMatch[2]);
      // Prima dată e nașterea, a doua e decesul
      if (year2 > year1 && year2 <= currentYear) {
        return {
          alive: false,
          birthYear: year1,
          deathYear: year2
        };
      }
    }
    
    // Pattern 6: Un singur an cu 4 cifre (probabil naștere, verificăm dacă e recent)
    const singleYearMatch = dateStr.match(/\b(\d{4})\b/);
    if (singleYearMatch) {
      const year = parseInt(singleYearMatch[1]);
      if (year >= 1900 && year <= currentYear) {
        // Dacă e foarte recent, probabil e în viață
        if (currentYear - year < 120) {
          return {
            alive: true, // Probabil în viață
            birthYear: year,
            deathYear: null
          };
        }
      }
    }
    
    return null;
  };
  
  // Verifică dacă un an (postYear) este în intervalul de viață al scriitorului
  const isYearInWriterLifetime = (writerData, postYear) => {
    const lifeStatus = isWriterAlive(writerData);
    if (!lifeStatus || !postYear) return null;
    
    if (lifeStatus.alive) {
      // Dacă e în viață, verifică doar dacă anul postării nu e în viitor
      const currentYear = new Date().getFullYear();
      if (postYear > currentYear) {
        return { valid: false, reason: 'Postarea este în viitor' };
      }
      // Verifică dacă anul postării e după naștere
      if (lifeStatus.birthYear && postYear < lifeStatus.birthYear) {
        return { valid: false, reason: `Postarea este înainte de nașterea scriitorului (${lifeStatus.birthYear})` };
      }
      return { valid: true };
    } else {
      // Dacă e decedat, verifică intervalul de viață
      if (postYear < lifeStatus.birthYear) {
        return { valid: false, reason: `Postarea este înainte de nașterea scriitorului (${lifeStatus.birthYear})` };
      }
      if (postYear > lifeStatus.deathYear) {
        return { valid: false, reason: `Postarea este după decesul scriitorului (${lifeStatus.deathYear})` };
      }
      return { valid: true };
    }
  };

  // Analizează un comentariu cu AI
  const analyzeComment = async (comment, post, commenterData) => {
    try {
      const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
      const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';

      if (!groqApiKey) {
        return {
          valid: true,
          confidence: 0,
          issues: [{
            type: 'quality',
            severity: 'warning',
            message: 'Cheie API Groq lipsă - verificare manuală necesară',
            suggestion: 'Verificare manuală necesară'
          }],
          error: true
        };
      }

      const lifeStatus = isWriterAlive(commenterData);
      const scriitorLifeStatus = isWriterAlive(scriitor);
      
      // Extrage anul postării (ultimul an cu 4 cifre din data postării)
      const postYearMatch = post.date ? post.date.match(/(\d{4})(?!.*\d{4})/) : null;
      const postYear = postYearMatch ? parseInt(postYearMatch[1]) : null;
      
      // Verifică cronologia comentatorului vs postare
      let chronologyIssue = null;
      if (lifeStatus && !lifeStatus.alive && lifeStatus.deathYear && postYear) {
        if (lifeStatus.deathYear < postYear) {
          chronologyIssue = {
            type: 'chronology',
            severity: 'critical',
            message: `${commenterData.nume} a decedat în ${lifeStatus.deathYear}, dar postarea este din ${postYear}. Nu poate comenta la o postare din viitor.`,
            suggestion: 'Șterge comentariul (imposibil temporal)'
          };
        } else if (lifeStatus.birthYear && postYear < lifeStatus.birthYear) {
          chronologyIssue = {
            type: 'chronology',
            severity: 'critical',
            message: `${commenterData.nume} s-a născut în ${lifeStatus.birthYear}, dar postarea este din ${postYear}. Nu poate comenta înainte de naștere.`,
            suggestion: 'Șterge comentariul (imposibil temporal)'
          };
        }
      }

      // Obține informații despre stilul scriitorului pentru analiză
      const scriitorBioRaw = scriitor.info || scriitor.prezentare?.bibliografie || scriitor.biografie || '';
      const commenterBioRaw = commenterData?.info || commenterData?.prezentare?.bibliografie || commenterData?.biografie || '';
      const scriitorBio = getBioText(scriitorBioRaw);
      const commenterBio = getBioText(commenterBioRaw);
      
      const systemPrompt = `Ești un moderator AI strict care identifică DOAR comentariile FOARTE PROASTE (awful/lacking). Ignori problemele minore și te concentrezi pe probleme GRAVE care necesită corectare urgentă.`;
      
      const userPrompt = `Analizează acest comentariu și identifică DOAR dacă este FOARTE PROAST (awful/lacking). Ignoră problemele minore.

CONTEXT POSTARE:
- Autor: ${scriitor.nume}
- Status viață: ${scriitorLifeStatus?.alive ? 'În viață' : scriitorLifeStatus?.deathYear ? `Decedat în ${scriitorLifeStatus.deathYear}` : 'Necunoscut'}
- Data: ${post.date}${postYear ? ` (${postYear})` : ''}
- Conținut: ${(post.text || post.descriere || post.poemTitle || post.storyTitle || '').substring(0, 500)}
${scriitorBio ? `- Biografie autor: ${scriitorBio.substring(0, 300)}` : ''}

COMENTATOR:
- Nume: ${commenterData?.nume || comment.author}
- Status viață: ${lifeStatus?.alive ? 'În viață' : lifeStatus?.deathYear ? `Decedat în ${lifeStatus.deathYear}` : 'Necunoscut'}
${lifeStatus?.birthYear ? `- Naștere: ${lifeStatus.birthYear}` : ''}
${lifeStatus?.deathYear ? `- Deces: ${lifeStatus.deathYear}` : ''}
${commenterBio ? `- Biografie: ${commenterBio.substring(0, 300)}` : ''}

COMENTARIU:
"${comment.text}"

CRITERII PENTRU "FOARTE PROAST" (awful/lacking):
✅ Marchează ca "awful" DOAR dacă:
- Comentariul este COMPLET irelevant (nu se referă deloc la postare)
- Comentariul este FOARTE scurt și lipsit de sens (< 10 cuvinte relevante)
- Comentariul conține erori cronologice CRITICE (imposibilități temporale)
- Comentariul este complet neautentic (nu se potrivește deloc cu stilul/personalitatea scriitorului)
- Comentariul conține anacronisme GRAVE (tehnologie modernă, evenimente imposibile)
- Comentariul este complet necoerent sau fără sens

❌ NU marca ca "awful" dacă:
- Comentariul are doar probleme minore de stil
- Comentariul este relevant dar poate fi îmbunătățit
- Comentariul este scurt dar are sens
- Există doar mici neconcordanțe stilistice

${chronologyIssue ? `⚠️ PROBLEMĂ CRONOLOGICĂ CRITICĂ: ${chronologyIssue.message}` : ''}

RĂSPUNDE ÎN FORMAT JSON (doar JSON):
{
  "isAwful": true/false,
  "confidence": 0-100,
  "issues": [
    {
      "type": "chronology" | "relevance" | "authenticity" | "quality" | "historical",
      "severity": "critical",
      "message": "Descriere problemă GRAVĂ",
      "suggestion": "Cum se poate corecta"
    }
  ],
  "shouldRegenerate": true/false,
  "reason": "Motiv pentru decizie"
}

IMPORTANT: Returnează "isAwful": true DOAR pentru comentarii FOARTE PROASTE. Pentru probleme minore, returnează "isAwful": false.`;

      const requestBody = {
        model: 'moonshotai/kimi-k2-instruct-0905',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      };

      const response = await fetch(groqApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqApiKey}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`);
      }

      const data = await response.json();
      const responseText = data.choices?.[0]?.message?.content?.trim();
      
      if (!responseText) {
        throw new Error('Răspuns gol de la Groq API');
      }
      
      // Extrage JSON din răspuns (elimină markdown code blocks dacă există)
      let jsonText = responseText.trim();
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/```\n?/g, '');
      }
      
      // Încearcă să extragă JSON dacă este în text
      const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonText = jsonMatch[0];
      }
      
      const analysis = JSON.parse(jsonText);
      
      // Convertim "isAwful" în "valid" pentru compatibilitate
      analysis.valid = !analysis.isAwful;
      
      // Dacă există o problemă cronologică critică, adaugă-o la issues
      if (chronologyIssue) {
        analysis.issues = analysis.issues || [];
        analysis.issues.unshift(chronologyIssue);
        analysis.isAwful = true;
        analysis.valid = false;
        analysis.shouldDelete = true;
        analysis.shouldRegenerate = true;
        analysis.confidence = 100;
        if (!analysis.reason) {
          analysis.reason = chronologyIssue.message;
        }
      }
      
      // Verifică și dacă autorul postării era în viață când a postat
      if (scriitorLifeStatus && !scriitorLifeStatus.alive && scriitorLifeStatus.deathYear && postYear) {
        if (scriitorLifeStatus.deathYear < postYear) {
          analysis.issues = analysis.issues || [];
          analysis.issues.unshift({
            type: 'chronology',
            severity: 'critical',
            message: `Autorul postării (${scriitor.nume}) a decedat în ${scriitorLifeStatus.deathYear}, dar postarea este din ${postYear}. Postarea este imposibilă temporal.`,
            suggestion: 'Verifică data postării sau șterge comentariul dacă este legat de o postare invalidă'
          });
          analysis.isAwful = true;
          analysis.valid = false;
          analysis.confidence = Math.max(analysis.confidence || 0, 95);
        }
      }
      
      // Dacă nu e "awful", nu returnăm nimic (nu se afișează)
      if (!analysis.isAwful && !chronologyIssue) {
        return null;
      }
      
      return {
        ...analysis,
        originalComment: comment,
        commenterData,
        postData: post
      };
    } catch (error) {
      console.error('Eroare la analiza comentariului:', error);
      return {
        valid: true, // în caz de eroare, considerăm valid pentru a nu șterge accidental
        confidence: 0,
        issues: [{
          type: 'quality',
          severity: 'warning',
          message: `Eroare la analiză: ${error.message}`,
          suggestion: 'Verificare manuală necesară'
        }],
        error: true
      };
    }
  };

  // Regenerează un comentariu folosind AI
  const regenerateComment = async (comment, post, commenterData) => {
    try {
      const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
      const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';

      if (!groqApiKey) {
        throw new Error('Cheie API Groq lipsă');
      }

      const scriitorBioRaw = scriitor.info || scriitor.prezentare?.bibliografie || scriitor.biografie || '';
      const commenterBioRaw = commenterData?.info || commenterData?.prezentare?.bibliografie || commenterData?.biografie || '';
      const scriitorBio = getBioText(scriitorBioRaw);
      const commenterBio = getBioText(commenterBioRaw);
      const postContent = post.text || post.descriere || post.poemTitle || post.storyText || '';

      const systemPrompt = `Ești un scriitor literar care scrie comentarii autentice și relevante la postări literare, în stilul și personalitatea scriitorului specificat.`;

      const userPrompt = `Scrie un comentariu nou (30-70 cuvinte) în locul celui vechi care era proast.

AUTOR POSTARE: ${scriitor.nume}
${scriitorBio ? `Biografie autor: ${scriitorBio.substring(0, 300)}` : ''}

POSTARE:
${postContent.substring(0, 500)}

COMENTATOR (TU):
- Nume: ${commenterData?.nume || comment.author}
${commenterBio ? `- Biografie: ${commenterBio.substring(0, 300)}` : ''}

COMENTARIU VECHI (PROAST):
"${comment.text}"

CERINȚE:
- Comentariul TREBUIE să se refere explicit la postarea de mai sus
- Trebuie să reflecte personalitatea și stilul tău literar
- Trebuie să fie autentic și relevant
- 30-70 cuvinte
- Stil literar, nu conversațional

Returnează DOAR textul comentariului nou, fără explicații.`;

      const requestBody = {
        model: 'moonshotai/kimi-k2-instruct-0905',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 200
      };

      const response = await fetch(groqApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqApiKey}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`);
      }

      const data = await response.json();
      const regeneratedText = data.choices?.[0]?.message?.content?.trim();
      
      if (!regeneratedText) {
        throw new Error('Răspuns gol de la Groq API');
      }

      return regeneratedText;
    } catch (error) {
      console.error('Eroare la regenerarea comentariului:', error);
      throw error;
    }
  };

  // Găsește un scriitor potrivit pentru a genera comentariu/reacție (dacă originalul e mort)
  const findSuitableWriter = (originalWriter, postYear) => {
    const originalLifeStatus = isWriterAlive(originalWriter);
    
    // Dacă scriitorul original era în viață când a postat, îl folosim pe el
    if (originalLifeStatus && originalLifeStatus.alive) {
      return originalWriter;
    }
    
    // Dacă scriitorul original era mort, caută altul care era în viață
    if (originalLifeStatus && !originalLifeStatus.alive && originalLifeStatus.deathYear && postYear) {
      // Caută scriitori care erau în viață în perioada postării
      const suitableWriters = Object.values(allScriitori).filter(writer => {
        const lifeStatus = isWriterAlive(writer);
        if (!lifeStatus) return false;
        
        if (lifeStatus.alive) {
          // Dacă e în viață, verifică dacă era în viață la data postării
          return lifeStatus.birthYear && postYear >= lifeStatus.birthYear;
        } else {
          // Dacă e mort, verifică dacă era în viață la data postării
          return lifeStatus.birthYear && lifeStatus.deathYear && 
                 postYear >= lifeStatus.birthYear && postYear <= lifeStatus.deathYear;
        }
      });
      
      // Returnează primul potrivit (sau originalul dacă nu găsește)
      return suitableWriters.length > 0 ? suitableWriters[0] : originalWriter;
    }
    
    return originalWriter;
  };

  // Generează comentariu nou de la un scriitor potrivit
  const generateNewComment = async (post, suitableWriter) => {
    try {
      const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
      const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';

      if (!groqApiKey) {
        throw new Error('Cheie API Groq lipsă');
      }

      const writerBioRaw = suitableWriter?.info || suitableWriter?.prezentare?.bibliografie || suitableWriter?.biografie || '';
      const writerBio = getBioText(writerBioRaw);
      const postContent = post.text || post.descriere || post.poemTitle || post.storyText || '';

      const systemPrompt = `Ești un scriitor literar care scrie comentarii autentice și relevante la postări literare, în stilul și personalitatea ta specifică.`;

      const userPrompt = `Scrie un comentariu nou (30-70 cuvinte) la această postare literară.

AUTOR POSTARE: ${scriitor.nume}
POSTARE:
${postContent.substring(0, 500)}

TU (COMENTATOR):
- Nume: ${suitableWriter.nume}
${writerBio ? `- Biografie: ${writerBio.substring(0, 300)}` : ''}

CERINȚE:
- Comentariul TREBUIE să se refere explicit la postarea de mai sus
- Trebuie să reflecte personalitatea și stilul tău literar
- Trebuie să fie autentic și relevant
- 30-70 cuvinte
- Stil literar, nu conversațional

Returnează DOAR textul comentariului nou, fără explicații.`;

      const requestBody = {
        model: 'moonshotai/kimi-k2-instruct-0905',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 200
      };

      const response = await fetch(groqApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqApiKey}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`);
      }

      const data = await response.json();
      const newCommentText = data.choices?.[0]?.message?.content?.trim();
      
      if (!newCommentText) {
        throw new Error('Răspuns gol de la Groq API');
      }

      return {
        key: suitableWriter.key || suitableWriter.id,
        author: suitableWriter.nume,
        text: newCommentText
      };
    } catch (error) {
      console.error('Eroare la generarea comentariului nou:', error);
      throw error;
    }
  };

  // Generează reacție nouă de la un scriitor potrivit
  const generateNewReaction = async (post, suitableWriter) => {
    try {
      const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
      const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';

      if (!groqApiKey) {
        throw new Error('Cheie API Groq lipsă');
      }

      const writerBioRaw = suitableWriter?.info || suitableWriter?.prezentare?.bibliografie || suitableWriter?.biografie || '';
      const writerBio = getBioText(writerBioRaw);
      const postContent = post.text || post.descriere || post.poemTitle || post.storyText || '';

      const systemPrompt = `Ești un scriitor literar care reacționează la postări literare în stilul și personalitatea ta specifică.`;

      const userPrompt = `Alege o reacție emoțională adecvată pentru această postare literară.

AUTOR POSTARE: ${scriitor.nume}
POSTARE:
${postContent.substring(0, 400)}

TU (REACȚIONATOR):
- Nume: ${suitableWriter.nume}
${writerBio ? `- Biografie: ${writerBio.substring(0, 300)}` : ''}

Reacții disponibile: like, love, ador, wow, haha, sad, cry, angry, strengh, multumire, fire, cool, clap, Romania

Returnează DOAR tipul reacției (unul dintre cele de mai sus), fără explicații.`;

      const requestBody = {
        model: 'moonshotai/kimi-k2-instruct-0905',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 50
      };

      const response = await fetch(groqApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqApiKey}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`);
      }

      const data = await response.json();
      const reactionType = data.choices?.[0]?.message?.content?.trim().toLowerCase();
      
      // Validează reacția
      const validReactions = ['like', 'love', 'ador', 'wow', 'haha', 'sad', 'cry', 'angry', 'strengh', 'multumire', 'fire', 'cool', 'clap', 'romania'];
      const finalReaction = validReactions.find(r => reactionType.includes(r)) || 'like';

      return {
        friendKey: suitableWriter.key || suitableWriter.id,
        reaction: finalReaction
      };
    } catch (error) {
      console.error('Eroare la generarea reacției noi:', error);
      throw error;
    }
  };

  // Analizează o reacție cu AI (verifică dacă se potrivește cu stilul scriitorului)
  const analyzeReaction = async (reaction, post, reactorData) => {
    const lifeStatus = isWriterAlive(reactorData);
    const postYearMatch = post.date ? post.date.match(/(\d{4})(?!.*\d{4})/) : null;
    const postYear = postYearMatch ? parseInt(postYearMatch[1]) : null;

    // Verificare cronologică
    if (lifeStatus && !lifeStatus.alive && lifeStatus.deathYear && postYear) {
      if (lifeStatus.deathYear < postYear) {
        return {
          isAwful: true,
          valid: false,
          confidence: 100,
          issues: [{
            type: 'chronology',
            severity: 'critical',
            message: `${reactorData.nume} a decedat în ${lifeStatus.deathYear}, dar postarea este din ${postYear}`,
            suggestion: 'Șterge reacția (imposibil temporal)'
          }],
          shouldDelete: true,
          reason: 'Imposibilitate cronologică',
          originalReaction: reaction,
          reactorData,
          postData: post
        };
      }
    }

    // Verificare cu AI dacă reacția se potrivește cu stilul scriitorului
    try {
      const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
      const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';

      if (!groqApiKey) {
        // Dacă nu avem API key, considerăm validă (nu putem verifica)
        return null;
      }

      const reactorBioRaw = reactorData?.info || reactorData?.prezentare?.bibliografie || reactorData?.biografie || '';
      const reactorBio = getBioText(reactorBioRaw);
      const postContent = post.text || post.descriere || post.poemTitle || post.storyText || '';
      const reactionEmoji = {
        'like': '👍',
        'love': '❤️',
        'ador': '😍',
        'wow': '😮',
        'haha': '😂',
        'sad': '😢',
        'cry': '😭',
        'angry': '😡',
        'strengh': '💪',
        'multumire': '🙏',
        'fire': '🔥',
        'cool': '😎',
        'clap': '👏',
        'Romania': '🇷🇴'
      }[reaction.reaction] || reaction.reaction;

      const systemPrompt = `Ești un moderator AI care verifică dacă reacțiile scriitorilor la postări sunt autentice și se potrivesc cu stilul și personalitatea lor.`;

      const userPrompt = `Verifică dacă această reacție este autentică și se potrivește cu stilul scriitorului:

AUTOR POSTARE: ${scriitor.nume}
POSTARE: ${postContent.substring(0, 400)}

REACȚIONATOR:
- Nume: ${reactorData.nume}
${reactorBio ? `- Biografie: ${reactorBio.substring(0, 300)}` : ''}
- Reacție: ${reactionEmoji} (${reaction.reaction})

Verifică:
1. Este această reacție plauzibilă pentru acest scriitor în contextul postării?
2. Se potrivește cu personalitatea și stilul scriitorului?
3. Este relevantă pentru tipul de postare?

Răspunde DOAR cu JSON:
{
  "isAwful": true/false,
  "confidence": 0-100,
  "reason": "Motiv scurt"
}

Marchează "isAwful": true DOAR dacă reacția este COMPLET nepotrivită sau neautentică.`;

      const requestBody = {
        model: 'moonshotai/kimi-k2-instruct-0905',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 200
      };

      const response = await fetch(groqApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqApiKey}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        return null; // Dacă API-ul eșuează, considerăm validă
      }

      const data = await response.json();
      const responseText = data.choices?.[0]?.message?.content?.trim();
      
      if (!responseText) {
        return null;
      }

      // Extrage JSON
      let jsonText = responseText.trim();
      const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonText = jsonMatch[0];
      }

      const analysis = JSON.parse(jsonText);
      
      if (!analysis.isAwful) {
        return null; // Nu e problemă, nu o afișăm
      }

      return {
        ...analysis,
        valid: false,
        issues: [{
          type: 'authenticity',
          severity: 'critical',
          message: analysis.reason || 'Reacția nu se potrivește cu stilul scriitorului',
          suggestion: 'Șterge reacția sau alege una mai potrivită'
        }],
        shouldDelete: true,
        originalReaction: reaction,
        reactorData,
        postData: post
      };
    } catch (error) {
      console.error('Eroare la analiza reacției:', error);
      return null; // Dacă eșuează, considerăm validă
    }
  };

  // Verifică o postare pentru a vedea dacă scriitorul era în viață când a postat
  const analyzePost = (post) => {
    const scriitorLifeStatus = isWriterAlive(scriitor);
    if (!scriitorLifeStatus || !post.date) return null;
    
    const postYearMatch = post.date.match(/(\d{4})(?!.*\d{4})/);
    const postYear = postYearMatch ? parseInt(postYearMatch[1]) : null;
    
    if (!postYear) return null;
    
    // Verifică dacă scriitorul era în viață când a postat
    if (!scriitorLifeStatus.alive && scriitorLifeStatus.deathYear) {
      if (scriitorLifeStatus.deathYear < postYear) {
        return {
          valid: false,
          confidence: 100,
          issues: [{
            type: 'chronology',
            severity: 'critical',
            message: `${scriitor.nume} a decedat în ${scriitorLifeStatus.deathYear}, dar postarea este datată ${postYear}. Postarea este imposibilă temporal.`,
            suggestion: 'Corectează data postării sau șterge postarea'
          }],
          shouldDelete: false, // Nu șterge automat, doar avertizează
          reason: 'Imposibilitate cronologică - scriitorul era decedat când a postat',
          originalPost: post
        };
      }
    }
    
    // Verifică dacă postarea este înainte de naștere
    if (scriitorLifeStatus.birthYear && postYear < scriitorLifeStatus.birthYear) {
      return {
        valid: false,
        confidence: 100,
        issues: [{
          type: 'chronology',
          severity: 'critical',
          message: `${scriitor.nume} s-a născut în ${scriitorLifeStatus.birthYear}, dar postarea este datată ${postYear}. Postarea este imposibilă temporal.`,
          suggestion: 'Corectează data postării'
        }],
        shouldDelete: false,
        reason: 'Imposibilitate cronologică - postarea este înainte de nașterea scriitorului',
        originalPost: post
      };
    }
    
    return null;
  };

  // Analizează toate comentariile și reacțiile
  const analyzeAllContent = async () => {
    setIsAnalyzing(true);
    setAnalysisResults([]);

    try {
      const results = [];
      const posts = scriitor.posts || [];

      // Mai întâi verifică postările scriitorului
      for (const post of posts) {
        const postAnalysis = analyzePost(post);
        if (postAnalysis) {
          results.push({
            type: 'post',
            postId: post.id,
            analysis: postAnalysis
          });
        }
      }

      // Apoi verifică comentariile și reacțiile
      for (const post of posts) {
        // Analizează comentarii
        if (post.comments && post.comments.length > 0) {
          for (let i = 0; i < post.comments.length; i++) {
            const comment = post.comments[i];
            const commenterData = allScriitori[comment.key];
            
            if (commenterData) {
              const analysis = await analyzeComment(comment, post, commenterData);
              // Adaugă doar dacă e "awful" (analysis nu e null)
              if (analysis && analysis.isAwful) {
                results.push({
                  type: 'comment',
                  postId: post.id,
                  commentIndex: i,
                  analysis
                });
              }
            }
          }
        }

        // Analizează reacții cu AI
        if (post.reactions && post.reactions.length > 0) {
          for (let i = 0; i < post.reactions.length; i++) {
            const reaction = post.reactions[i];
            const reactorData = allScriitori[reaction.friendKey];
            
            if (reactorData) {
              const analysis = await analyzeReaction(reaction, post, reactorData);
              
              // Adaugă doar dacă e "awful" (analysis nu e null)
              if (analysis && (analysis.isAwful || !analysis.valid)) {
                results.push({
                  type: 'reaction',
                  postId: post.id,
                  reactionIndex: i,
                  analysis
                });
              }
            }
          }
        }
      }

      setAnalysisResults(results);

      // Dacă suntem în modul auto-correct, aplică automat corectările
      if (autoCorrectMode && results.length > 0) {
        await applyAutoCorrections(results);
      }

    } catch (error) {
      console.error('Eroare la analiză:', error);
      alert('A apărut o eroare la analiza conținutului.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Aplică corectările automat
  const applyAutoCorrections = async (results) => {
    const corrections = [];

    for (const result of results) {
      // Sărim peste postări - acestea trebuie corectate manual
      if (result.type === 'post') continue;
      
      if (result.analysis.shouldDelete) {
        corrections.push({
          action: 'delete',
          type: result.type,
          postId: result.postId,
          index: result.type === 'comment' ? result.commentIndex : result.reactionIndex,
          reason: result.analysis.reason,
          original: result.analysis.originalComment || result.analysis.originalReaction
        });
      } else if (result.type === 'comment' && result.analysis.shouldRegenerate) {
        // Regenerează comentariul automat
        try {
          const regeneratedText = await regenerateComment(
            result.analysis.originalComment,
            result.analysis.postData,
            result.analysis.commenterData
          );
          
          corrections.push({
            action: 'correct',
            type: 'comment',
            postId: result.postId,
            index: result.commentIndex,
            original: result.analysis.originalComment,
            corrected: regeneratedText,
            reason: result.analysis.reason || 'Comentariu regenerat automat de AI',
            regenerated: true
          });
        } catch (error) {
          console.error('Eroare la regenerarea automată a comentariului:', error);
          // Continuă cu următoarea corecție
        }
      } else if (result.analysis.suggestedCorrection && result.type === 'comment') {
        corrections.push({
          action: 'correct',
          type: result.type,
          postId: result.postId,
          index: result.commentIndex,
          original: result.analysis.originalComment,
          corrected: result.analysis.suggestedCorrection,
          reason: result.analysis.issues.map(i => i.message).join('; ')
        });
      }
    }

    if (corrections.length > 0) {
      // Salvează în istoric pentru undo
      setModerationHistory(prev => [...prev, {
        timestamp: new Date().toISOString(),
        corrections,
        scriitorKey: scriitor.key
      }]);

      // Aplică modificările
      await onModerate(corrections);
    }
  };

  // Aplică o singură corecție (cu regenerare automată dacă e șters)
  const applyCorrection = async (result, regenerateAfterDelete = true) => {
    // Postările nu pot fi corectate automat - trebuie corectate manual data
    if (result.type === 'post') {
      alert('ℹ️ Pentru postări, trebuie să corectezi manual data în panoul de administrare.');
      return;
    }
    
    const corrections = [];
    
    // Dacă trebuie șters, șterge și regenerează automat
    if (result.analysis.shouldDelete && regenerateAfterDelete) {
      try {
        setIsGeneratingReplacements(true);
        
        const postYearMatch = result.analysis.postData.date ? result.analysis.postData.date.match(/(\d{4})(?!.*\d{4})/) : null;
        const postYear = postYearMatch ? parseInt(postYearMatch[1]) : null;
        
        // Găsește un scriitor potrivit
        const originalWriter = result.type === 'comment' 
          ? result.analysis.commenterData 
          : result.analysis.reactorData;
        const suitableWriter = findSuitableWriter(originalWriter, postYear);
        
        // Adaugă ștergerea
        corrections.push({
          action: 'delete',
          type: result.type,
          postId: result.postId,
          index: result.type === 'comment' ? result.commentIndex : result.reactionIndex,
          reason: result.analysis.reason || 'Șters și regenerat automat',
          original: result.analysis.originalComment || result.analysis.originalReaction
        });
        
        // Generează înlocuitor
        if (result.type === 'comment') {
          const newComment = await generateNewComment(result.analysis.postData, suitableWriter);
          corrections.push({
            action: 'add',
            type: 'comment',
            postId: result.postId,
            commentData: newComment,
            reason: `Comentariu nou generat de la ${suitableWriter.nume} (înlocuiește comentariul șters)`
          });
        } else if (result.type === 'reaction') {
          const newReaction = await generateNewReaction(result.analysis.postData, suitableWriter);
          corrections.push({
            action: 'add',
            type: 'reaction',
            postId: result.postId,
            reactionData: newReaction,
            reason: `Reacție nouă generată de la ${suitableWriter.nume} (înlocuiește reacția ștearsă)`
          });
        }
      } catch (error) {
        console.error('Eroare la regenerarea automată:', error);
        // Dacă regenerarea eșuează, doar șterge
        corrections.push({
          action: 'delete',
          type: result.type,
          postId: result.postId,
          index: result.type === 'comment' ? result.commentIndex : result.reactionIndex,
          reason: result.analysis.reason || 'Șters (regenerare eșuată)',
          original: result.analysis.originalComment || result.analysis.originalReaction
        });
      } finally {
        setIsGeneratingReplacements(false);
      }
    }
    // Dacă trebuie regenerat comentariul (fără ștergere)
    else if (result.type === 'comment' && result.analysis.shouldRegenerate && !result.analysis.shouldDelete) {
      try {
        const regeneratedText = await regenerateComment(
          result.analysis.originalComment,
          result.analysis.postData,
          result.analysis.commenterData
        );
        
        corrections.push({
          action: 'correct',
          type: 'comment',
          postId: result.postId,
          index: result.commentIndex,
          original: result.analysis.originalComment,
          corrected: regeneratedText,
          reason: result.analysis.reason || 'Comentariu regenerat automat de AI',
          regenerated: true
        });
      } catch (error) {
        console.error('Eroare la regenerarea comentariului:', error);
        alert('❌ Eroare la regenerarea comentariului. Încearcă din nou.');
        return;
      }
    }
    // Altfel, aplică corecția normală
    else {
      const correction = {
        action: result.analysis.shouldDelete ? 'delete' : 'correct',
        type: result.type,
        postId: result.postId,
        index: result.type === 'comment' ? result.commentIndex : result.reactionIndex,
        reason: result.analysis.reason || result.analysis.issues.map(i => i.message).join('; '),
        original: result.analysis.originalComment || result.analysis.originalReaction
      };

      if (result.analysis.suggestedCorrection && result.type === 'comment') {
        correction.corrected = result.analysis.suggestedCorrection;
      }
      
      corrections.push(correction);
    }

    if (corrections.length > 0) {
      // Salvează în istoric
      setModerationHistory(prev => [...prev, {
        timestamp: new Date().toISOString(),
        corrections,
        scriitorKey: scriitor.key
      }]);

      // Aplică modificările
      await onModerate(corrections);

      // Elimină din rezultate
      setAnalysisResults(prev => prev.filter(r => r !== result));
      
      // Elimină din selecție
      setSelectedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(result);
        return newSet;
      });
    }
  };

  // Șterge elementele selectate în masă
  const deleteSelected = async () => {
    if (selectedItems.size === 0) {
      alert('Nu ai selectat niciun element.');
      return;
    }

    if (!window.confirm(`Ești sigur că vrei să ștergi ${selectedItems.size} element(e) și să le regenerezi automat?`)) {
      return;
    }

    setIsGeneratingReplacements(true);
    const corrections = [];
    const resultsToDelete = Array.from(selectedItems);

    try {
      for (const result of resultsToDelete) {
        if (result.type === 'post') continue; // Sărim peste postări

        const postYearMatch = result.analysis.postData?.date ? result.analysis.postData.date.match(/(\d{4})(?!.*\d{4})/) : null;
        const postYear = postYearMatch ? parseInt(postYearMatch[1]) : null;
        
        // Găsește un scriitor potrivit
        const originalWriter = result.type === 'comment' 
          ? result.analysis.commenterData 
          : result.analysis.reactorData;
        const suitableWriter = findSuitableWriter(originalWriter, postYear);
        
        // Adaugă ștergerea
        corrections.push({
          action: 'delete',
          type: result.type,
          postId: result.postId,
          index: result.type === 'comment' ? result.commentIndex : result.reactionIndex,
          reason: 'Șters în masă și regenerat automat',
          original: result.analysis.originalComment || result.analysis.originalReaction
        });
        
        // Generează înlocuitor
        if (result.type === 'comment') {
          const newComment = await generateNewComment(result.analysis.postData, suitableWriter);
          corrections.push({
            action: 'add',
            type: 'comment',
            postId: result.postId,
            commentData: newComment,
            reason: `Comentariu nou generat de la ${suitableWriter.nume}`
          });
        } else if (result.type === 'reaction') {
          const newReaction = await generateNewReaction(result.analysis.postData, suitableWriter);
          corrections.push({
            action: 'add',
            type: 'reaction',
            postId: result.postId,
            reactionData: newReaction,
            reason: `Reacție nouă generată de la ${suitableWriter.nume}`
          });
        }
      }

      if (corrections.length > 0) {
        // Salvează în istoric
        setModerationHistory(prev => [...prev, {
          timestamp: new Date().toISOString(),
          corrections,
          scriitorKey: scriitor.key
        }]);

        // Aplică modificările
        await onModerate(corrections);

        // Elimină din rezultate
        setAnalysisResults(prev => prev.filter(r => !selectedItems.has(r)));
        
        // Șterge selecția
        setSelectedItems(new Set());
        
        alert(`✅ ${corrections.length / 2} element(e) șters(e) și regenerat(e) cu succes!`);
      }
    } catch (error) {
      console.error('Eroare la ștergerea în masă:', error);
      alert('❌ Eroare la ștergerea în masă. Verifică consola pentru detalii.');
    } finally {
      setIsGeneratingReplacements(false);
    }
  };

  // Toggle selecție pentru un element
  const toggleSelection = (result) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(result)) {
        newSet.delete(result);
      } else {
        newSet.add(result);
      }
      return newSet;
    });
  };

  // Selectează/deselectează toate
  const toggleSelectAll = () => {
    if (selectedItems.size === analysisResults.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(analysisResults));
    }
  };

  // Undo ultima acțiune
  const undoLastAction = async () => {
    if (moderationHistory.length === 0) return;

    const lastAction = moderationHistory[moderationHistory.length - 1];
    
    if (window.confirm(`Sigur vrei să anulezi ultimele ${lastAction.corrections.length} acțiuni de moderare?`)) {
      // Trimite comenzi de undo
      await onModerate(lastAction.corrections.map(c => ({
        ...c,
        action: 'undo'
      })));

      // Elimină din istoric
      setModerationHistory(prev => prev.slice(0, -1));
    }
  };

  return (
    <div className="ai-moderator-overlay" onClick={onClose}>
      <div className="ai-moderator-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ai-moderator-header">
          <h2>🛡️ Moderator AI - {scriitor.nume}</h2>
          <p style={{ fontSize: '13px', color: '#666', margin: '4px 0 0 0' }}>
            Detectează doar comentarii/reacții FOARTE PROASTE (awful/lacking)
          </p>
          <button className="ai-moderator-close" onClick={onClose}>×</button>
        </div>

        <div className="ai-moderator-controls">
          <button 
            className="ai-moderator-btn primary"
            onClick={analyzeAllContent}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <span className="spinner">⏳</span> Analizează...
              </>
            ) : (
              <>🔍 Analizează Conținut</>
            )}
          </button>

          <label className="ai-moderator-checkbox">
            <input 
              type="checkbox" 
              checked={autoCorrectMode}
              onChange={(e) => setAutoCorrectMode(e.target.checked)}
            />
            <span>Corectare automată</span>
          </label>

          <button 
            className="ai-moderator-btn secondary"
            onClick={() => setShowHistory(!showHistory)}
          >
            📜 Istoric ({moderationHistory.length})
          </button>

          {moderationHistory.length > 0 && (
            <button 
              className="ai-moderator-btn undo"
              onClick={undoLastAction}
            >
              ↶ Undo ultima acțiune
            </button>
          )}
        </div>

        {showHistory && moderationHistory.length > 0 && (
          <div className="ai-moderator-history">
            <h3>Istoric Moderare</h3>
            {moderationHistory.map((action, idx) => (
              <div key={idx} className="ai-moderator-history-item">
                <div className="ai-moderator-history-time">
                  {new Date(action.timestamp).toLocaleString('ro-RO')}
                </div>
                <div className="ai-moderator-history-details">
                  {action.corrections.length} acțiuni: {
                    action.corrections.map(c => `${c.action} ${c.type}`).join(', ')
                  }
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="ai-moderator-results">
          {isAnalyzing && (
            <div className="ai-moderator-loading">
              <div className="spinner-large">⏳</div>
              <p>Analizez postările, comentariile și reacțiile...</p>
            </div>
          )}

          {!isAnalyzing && analysisResults.length === 0 && (
            <div className="ai-moderator-empty">
              <p>✅ Nu au fost găsite comentarii/reacții FOARTE PROASTE (awful/lacking).</p>
              <p style={{ fontSize: '13px', color: '#666', marginTop: '8px' }}>
                Sistemul afișează doar problemele GRAVE care necesită corectare urgentă.
              </p>
            </div>
          )}

          {!isAnalyzing && analysisResults.length > 0 && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h3>⚠️ Comentarii/Reacții FOARTE PROASTE găsite: {analysisResults.length}</h3>
                  <p style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                    Acestea sunt probleme GRAVE care necesită corectare urgentă.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button
                    className="ai-moderator-btn secondary"
                    onClick={toggleSelectAll}
                    style={{ fontSize: '13px', padding: '8px 12px' }}
                  >
                    {selectedItems.size === analysisResults.length ? '☐ Deselectează toate' : '☑ Selectează toate'}
                  </button>
                  {selectedItems.size > 0 && (
                    <button
                      className="ai-moderator-btn danger"
                      onClick={deleteSelected}
                      disabled={isGeneratingReplacements}
                      style={{ fontSize: '13px', padding: '8px 12px' }}
                    >
                      {isGeneratingReplacements ? '⏳ Generează...' : `🗑️ Șterge ${selectedItems.size} selectat(e)`}
                    </button>
                  )}
                </div>
              </div>
              {analysisResults.map((result, idx) => (
                <div 
                  key={idx} 
                  className={`ai-moderator-result-item ${result.analysis.valid ? 'warning' : 'error'} ${selectedItems.has(result) ? 'selected' : ''}`}
                >
                  <div className="ai-moderator-result-header">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={selectedItems.has(result)}
                        onChange={() => toggleSelection(result)}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                      <span className="ai-moderator-result-type">
                        {result.type === 'comment' ? '💬' : result.type === 'reaction' ? '👍' : '📝'} 
                        {' '}
                        {result.type === 'comment' ? 'Comentariu' : result.type === 'reaction' ? 'Reacție' : 'Postare'}
                      </span>
                    </label>
                    <span className={`ai-moderator-result-confidence confidence-${Math.floor(result.analysis.confidence / 20)}`}>
                      Confidence: {result.analysis.confidence}%
                    </span>
                  </div>

                  <div className="ai-moderator-result-content">
                    {result.type === 'comment' && (
                      <>
                        <div className="ai-moderator-result-author">
                          <strong>{result.analysis.originalComment?.author}</strong>
                        </div>
                        <div className="ai-moderator-result-text">
                          "{result.analysis.originalComment?.text}"
                        </div>
                      </>
                    )}
                    {result.type === 'reaction' && (
                      <div className="ai-moderator-result-text">
                        <strong>{result.analysis.reactorData?.nume}</strong> - {result.analysis.originalReaction?.reaction}
                      </div>
                    )}
                    {result.type === 'post' && (
                      <>
                        <div className="ai-moderator-result-author">
                          <strong>Postare de {scriitor.nume}</strong>
                        </div>
                        <div className="ai-moderator-result-text">
                          <strong>Data:</strong> {result.analysis.originalPost?.date}<br/>
                          <strong>Conținut:</strong> {result.analysis.originalPost?.text || result.analysis.originalPost?.descriere || result.analysis.originalPost?.poemTitle || result.analysis.originalPost?.storyTitle || 'Fără conținut'}
                        </div>
                      </>
                    )}
                  </div>

                  {result.analysis.issues && result.analysis.issues.length > 0 && (
                    <div className="ai-moderator-result-issues">
                      {result.analysis.issues.map((issue, issueIdx) => (
                        <div key={issueIdx} className={`ai-moderator-issue severity-${issue.severity}`}>
                          <div className="ai-moderator-issue-type">
                            {issue.type === 'chronology' && '📅'}
                            {issue.type === 'relevance' && '🎯'}
                            {issue.type === 'authenticity' && '🎭'}
                            {issue.type === 'quality' && '✍️'}
                            {issue.type === 'historical' && '📜'}
                            {' '}
                            <strong>{issue.type}</strong>
                          </div>
                          <div className="ai-moderator-issue-message">{issue.message}</div>
                          {issue.suggestion && (
                            <div className="ai-moderator-issue-suggestion">
                              💡 {issue.suggestion}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {result.analysis.suggestedCorrection && (
                    <div className="ai-moderator-result-correction">
                      <strong>Corecție sugerată:</strong>
                      <div className="ai-moderator-correction-text">
                        "{result.analysis.suggestedCorrection}"
                      </div>
                    </div>
                  )}

                  <div className="ai-moderator-result-reason">
                    <strong>Decizie:</strong> {result.analysis.reason}
                  </div>

                  <div className="ai-moderator-result-actions">
                    {result.type === 'post' ? (
                      <>
                        <div className="ai-moderator-result-note">
                          ℹ️ Pentru postări, trebuie să corectezi manual data în panoul de administrare.
                        </div>
                        <button 
                          className="ai-moderator-btn ignore"
                          onClick={() => setAnalysisResults(prev => prev.filter(r => r !== result))}
                        >
                          ✓ Am înțeles
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          className="ai-moderator-btn apply"
                          onClick={() => applyCorrection(result)}
                        >
                          {result.analysis.shouldDelete 
                            ? '🗑️ Șterge' 
                            : result.analysis.shouldRegenerate && result.type === 'comment'
                            ? '🔄 Regenerează'
                            : '✏️ Corectează'}
                        </button>
                        <button 
                          className="ai-moderator-btn ignore"
                          onClick={() => setAnalysisResults(prev => prev.filter(r => r !== result))}
                        >
                          ⏭️ Ignoră
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default AIContentModerator;

