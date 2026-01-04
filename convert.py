import pdfplumber
import json
import os
import sys
import warnings
import re

# Suprimăm avertismentele despre culori invalide din PDF
warnings.filterwarnings('ignore')

# Redirecționăm stderr pentru a suprima doar mesajele despre culori invalide
class FilterStderr:
    def __init__(self):
        self.original_stderr = sys.stderr
        # Pattern pentru a detecta erorile despre culori
        self.color_error_pattern = re.compile(
            r'Cannot set gray non-stroke color.*invalid float value',
            re.IGNORECASE
        )
    
    def write(self, text):
        # Filtrează doar mesajele despre culori, păstrează restul
        if not self.color_error_pattern.search(text):
            self.original_stderr.write(text)
        # Altfel, ignorăm mesajul (nu îl scriem)
    
    def flush(self):
        self.original_stderr.flush()
    
    def __enter__(self):
        sys.stderr = self
        return self
    
    def __exit__(self, *args):
        sys.stderr = self.original_stderr
        return False

# Citim configurația din fișier
with open("opere_config.json", "r", encoding="utf-8") as f:
    opere = json.load(f)

# Procesăm fiecare operă din array
for opera in opere:
    pdf_path = opera["pdf_path"]
    output_json = opera["output"]
    
    # Verificăm dacă fișierul PDF există
    if not os.path.exists(pdf_path):
        print(f"⚠️  Fișierul PDF nu există: {pdf_path}")
        continue
    
    print(f"📖 Procesez: {pdf_path}")
    
    pages = []
    try:
        # Suprimăm doar erorile despre culori invalide în timpul procesării
        with FilterStderr():
            with pdfplumber.open(pdf_path) as pdf:
                for page_num, page in enumerate(pdf.pages, 1):
                    try:
                        text = page.extract_text()
                        if text:
                            pages.append(text.strip())
                        if page_num % 50 == 0:
                            print(f"  Procesat pagina {page_num}...", end='\r')
                    except Exception as page_error:
                        print(f"\n  ⚠️  Eroare la pagina {page_num}: {str(page_error)}")
                        continue
        
        # Creăm directorul dacă nu există
        output_dir = os.path.dirname(output_json)
        if output_dir and not os.path.exists(output_dir):
            os.makedirs(output_dir, exist_ok=True)
        
        with open(output_json, "w", encoding="utf-8") as f:
            json.dump(pages, f, ensure_ascii=False, indent=2)
        
        print(f"\n✅ Salvat {len(pages)} pagini în {output_json}")
    except Exception as e:
        print(f"❌ Eroare la procesarea {pdf_path}: {str(e)}")

print(f"\n🎉 Procesare finalizată pentru {len(opere)} operă/opere!")