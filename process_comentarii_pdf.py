import os
import sys
import json
import re
from pathlib import Path
import requests
from PIL import Image
import base64
from io import BytesIO

# Încercăm să importăm biblioteci pentru conversia PDF
try:
    from pdf2image import convert_from_path
    PDF2IMAGE_AVAILABLE = True
except ImportError:
    PDF2IMAGE_AVAILABLE = False

try:
    import fitz  # PyMuPDF
    PYMUPDF_AVAILABLE = True
except ImportError:
    PYMUPDF_AVAILABLE = False

# Configurare Groq API
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_API_KEY = os.getenv("GROQ_API_KEY") or os.getenv("VITE_GROQ_API_KEY")

if not GROQ_API_KEY:
    print("❌ Eroare: GROQ_API_KEY nu este setată!")
    print("   Setează variabila de mediu: export GROQ_API_KEY='your-key-here'")
    sys.exit(1)

def normalize_filename(text):
    """Normalizează textul pentru a fi folosit ca nume de fișier"""
    # Convertim la lowercase
    text = text.lower()
    # Înlocuim spațiile și caracterele speciale cu cratime
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    # Eliminăm cratimele de la început și sfârșit
    text = text.strip('-')
    return text

def extract_text_from_pdf_first_pages(pdf_path, max_pages=3):
    """Extrage textul din primele pagini ale PDF-ului pentru analiză"""
    try:
        import pdfplumber
        pages_text = []
        with pdfplumber.open(pdf_path) as pdf:
            for i, page in enumerate(pdf.pages[:max_pages]):
                text = page.extract_text()
                if text:
                    pages_text.append(text.strip())
        return "\n\n".join(pages_text)
    except Exception as e:
        print(f"  ⚠️  Eroare la extragerea textului: {e}")
        return ""

def analyze_pdf_with_groq(pdf_path, first_pages_text):
    """Folosește Groq AI pentru a analiza PDF-ul și a extrage informații"""
    prompt = f"""Analizează acest PDF cu comentarii literare și extrage următoarele informații:
1. Numele operei (ex: "Ion", "Baltagul", "Enigma Otiliei")
2. Tipul comentariului (ex: "Tema si Viziunea", "Personaje", "Stil si Compozitie")

Text din primele pagini:
{first_pages_text[:2000]}

Răspunde DOAR în format JSON, fără text suplimentar:
{{
  "opera": "numele operei",
  "tip_comentariu": "tipul comentariului"
}}

Dacă nu poți determina informațiile, folosește numele fișierului PDF ca referință."""

    try:
        response = requests.post(
            GROQ_API_URL,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {GROQ_API_KEY}"
            },
            json={
                "model": "llama-3.1-8b-instant",  # Model activ și disponibil
                "messages": [
                    {"role": "system", "content": "Ești un expert în literatura română. Analizezi PDF-uri cu comentarii literare și extragi informații structurate."},
                    {"role": "user", "content": prompt}
                ],
                "temperature": 0.3,
                "max_tokens": 200,
                "response_format": {"type": "json_object"}
            },
            timeout=30
        )

        if response.status_code == 200:
            data = response.json()
            content = data.get("choices", [{}])[0].get("message", {}).get("content", "")
            if content:
                try:
                    result = json.loads(content)
                    return result.get("opera", ""), result.get("tip_comentariu", "")
                except json.JSONDecodeError:
                    # Încercăm să extragem JSON-ul din text
                    match = re.search(r'\{[^}]+\}', content)
                    if match:
                        result = json.loads(match.group())
                        return result.get("opera", ""), result.get("tip_comentariu", "")
        else:
            print(f"  ⚠️  Eroare API Groq: {response.status_code}")
            print(f"  Răspuns: {response.text[:200]}")
    except Exception as e:
        print(f"  ⚠️  Eroare la apelul Groq: {e}")

    # Fallback: folosim numele fișierului
    pdf_name = Path(pdf_path).stem
    return pdf_name, "comentariu"

def process_pdf_to_images(pdf_path, output_base_dir="public/Pdf- comentarii/Imagini"):
    """Procesează un PDF și convertește paginile în imagini"""
    pdf_path = Path(pdf_path)
    
    if not pdf_path.exists():
        print(f"⚠️  Fișierul PDF nu există: {pdf_path}")
        return
    
    print(f"\n📖 Procesez: {pdf_path.name}")
    
    # Analizăm PDF-ul cu Groq AI
    print("  🤖 Analizez PDF-ul cu Groq AI...")
    first_pages_text = extract_text_from_pdf_first_pages(str(pdf_path))
    opera, tip_comentariu = analyze_pdf_with_groq(str(pdf_path), first_pages_text)
    
    # Normalizăm numele
    opera_norm = normalize_filename(opera) if opera else normalize_filename(pdf_path.stem)
    tip_norm = normalize_filename(tip_comentariu) if tip_comentariu else "comentariu"
    
    print(f"  📝 Operă detectată: {opera}")
    print(f"  📝 Tip comentariu: {tip_comentariu}")
    
    # Creează structura de foldere
    folder_name = f"{opera_norm}-comentariu-{tip_norm}"
    output_dir = Path(output_base_dir) / folder_name
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"  💾 Salvez în: {output_dir}")
    
    # Convertește PDF-ul în imagini
    try:
        print("  🖼️  Convertez paginile în imagini...")
        images = []
        
        # Metoda 1: PyMuPDF (nu necesită Poppler)
        if PYMUPDF_AVAILABLE:
            try:
                doc = fitz.open(str(pdf_path))
                for page_num in range(len(doc)):
                    page = doc[page_num]
                    # Render la 300 DPI
                    mat = fitz.Matrix(300/72, 300/72)  # 300 DPI = 300/72 scale
                    pix = page.get_pixmap(matrix=mat)
                    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
                    images.append(img)
                    print(f"    ✅ Pagina {page_num + 1}/{len(doc)}", end='\r')
                doc.close()
            except Exception as e:
                print(f"\n  ⚠️  Eroare cu PyMuPDF: {e}, încerc pdf2image...")
                images = []
        
        # Metoda 2: pdf2image (necesită Poppler)
        if not images and PDF2IMAGE_AVAILABLE:
            try:
                images = convert_from_path(
                    str(pdf_path),
                    dpi=300,
                    fmt='png'
                )
            except Exception as e:
                print(f"\n  ⚠️  Eroare cu pdf2image: {e}")
                raise
        
        if not images:
            raise Exception("Nu s-a putut converti PDF-ul. Instalează PyMuPDF: pip install PyMuPDF")
        
        # Salvează fiecare pagină
        for i, image in enumerate(images, 1):
            filename = f"{opera_norm}-comentariu-{tip_norm}-poza-{i}.png"
            filepath = output_dir / filename
            image.save(filepath, 'PNG', quality=95)
            print(f"    💾 Salvez pagina {i}/{len(images)}: {filename}", end='\r')
        
        print(f"\n  ✅ Salvat {len(images)} imagini în {output_dir}")
        
    except Exception as e:
        print(f"\n  ❌ Eroare la conversia PDF: {e}")
        print(f"\n  💡 Soluții:")
        print(f"     1. Instalează PyMuPDF (recomandat, nu necesită Poppler):")
        print(f"        pip install PyMuPDF")
        print(f"     2. SAU instalează pdf2image + Poppler:")
        print(f"        pip install pdf2image")
        print(f"        Windows: https://github.com/oschwartz10612/poppler-windows/releases")

def main():
    """Funcția principală"""
    if len(sys.argv) < 2:
        print("📚 Procesor PDF Comentarii cu Groq AI")
        print("\nUtilizare:")
        print("  python process_comentarii_pdf.py <pdf_path>")
        print("  python process_comentarii_pdf.py <pdf_path1> <pdf_path2> ...")
        print("  python process_comentarii_pdf.py --folder <folder_path>")
        print("\nExemple:")
        print("  python process_comentarii_pdf.py 'public/Pdf- comentarii/Eseuri.pdf'")
        print("  python process_comentarii_pdf.py --folder 'public/Pdf- comentarii/Pdf/premium'")
        sys.exit(1)
    
    # Verifică dacă procesăm un folder
    if sys.argv[1] == "--folder" and len(sys.argv) > 2:
        folder_path = Path(sys.argv[2])
        if not folder_path.exists():
            print(f"❌ Folderul nu există: {folder_path}")
            sys.exit(1)
        
        pdf_files = list(folder_path.glob("*.pdf"))
        if not pdf_files:
            print(f"⚠️  Nu s-au găsit fișiere PDF în: {folder_path}")
            sys.exit(1)
        
        print(f"📁 Procesez {len(pdf_files)} fișiere PDF din folder...")
        for pdf_file in pdf_files:
            process_pdf_to_images(pdf_file)
    else:
        # Procesează fișierele individuale
        for pdf_path in sys.argv[1:]:
            process_pdf_to_images(pdf_path)
    
    print("\n🎉 Procesare finalizată!")

if __name__ == "__main__":
    main()

