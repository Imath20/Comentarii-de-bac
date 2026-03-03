# Comentarii de Bac

**Documentație proiect**

---

## Informații despre lucrare

| Câmp | Valoare |
|------|---------|
| **Titlul lucrării** | Comentarii de Bac |
| **Tipul lucrării** | Soft educațional |
| **Elevi realizatori** | Băjean Mateo <br> Drosu Ștefan-Marian |
| **Clasa** | XII B |
| **Școala de proveniență** | Colegiul Național „Mircea cel Bătrân”, Rm. Vâlcea |
| **Profesor îndrumător** | Dumitrescu Ovidiu-Mihail |

---

## Descrierea lucrării

**Comentarii de Bac** este o platformă web educațională pentru pregătirea la bacalaureat la limba română. Aplicația oferă elevilor resurse structurate, comentarii literare, ghiduri pentru subiecte și un asistent AI pentru exersare și feedback.

### Structura aplicației

- **Opere** – Pagini dedicate fiecărei opere din programa de bacalaureat, cu detalii despre teme, personaje și context
- **Bibliotecă** – Cititor de carte integrat pentru lectură directă în platformă
- **Comentarii** – Comentarii literare cu filtre pe categorie, partajare și export PDF
- **Scriitori** – Biografii, opere și chat interactiv pentru întrebări despre autori
- **Subiecte și Ghiduri BAC** – Ghiduri detaliate pentru Subiectul I, II și III
- **Curente** – Vizualizare interactivă a curentelor literare (roată)
- **Videoclipuri** – Filme ale operelor pentru recapitulare
- **Proiecte** – Integrare a proiectelor colegilor (site-uri și prezentări)
- **AI** – Asistent pentru rezolvare subiecte și generare comentarii, cu feedback și punctaj

### Funcționalități tehnice

- Autentificare utilizatori (cont pentru comentarii personale)
- Tema light/dark
- Export comentarii în PDF
- Partajare comentarii prin link
- Interfață adaptată pentru mobil

---

## Tehnologii utilizate

### Limbaj de programare

- **JavaScript** (React 19)

### Aplicații și biblioteci

| Tehnologie | Utilizare |
|------------|-----------|
| **React** | Framework pentru interfața utilizator |
| **Vite** | Tool de build și development |
| **React Router** | Navigare între pagini |
| **Firebase** | Autentificare, baze de date, stocare |
| **Cloudinary** | Gestionare imagini |
| **SASS** | Stilizare (CSS preprocesor) |
| **html2pdf.js** | Export PDF pentru comentarii |
| **react-select** | Componente dropdown pentru filtre |
| **lucide-react** | Iconițe |

---

## Instalare și rulare

### Cerințe

- Node.js (v18 sau mai nou)
- npm sau pnpm

### Pași

```bash
# Instalare dependențe
npm install

# Rulare în mod development
npm run dev

# Build pentru producție
npm run build

# Preview build local
npm run preview
```

Aplicația rulează implicit la `http://localhost:5173`.

---

## Licență

Lucrarea este originală și a fost realizată cu ajutorul unor aplicații licențiate sau open-source. Conținutul are caracter educațional și este elaborat în conformitate cu cerințele programei școlare.
