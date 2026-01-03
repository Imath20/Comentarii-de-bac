import pdfplumber
import json
import os

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
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    pages.append(text.strip())
        
        # Creăm directorul dacă nu există
        output_dir = os.path.dirname(output_json)
        if output_dir and not os.path.exists(output_dir):
            os.makedirs(output_dir, exist_ok=True)
        
        with open(output_json, "w", encoding="utf-8") as f:
            json.dump(pages, f, ensure_ascii=False, indent=2)
        
        print(f"✅ Salvat {len(pages)} pagini în {output_json}")
    except Exception as e:
        print(f"❌ Eroare la procesarea {pdf_path}: {str(e)}")

print(f"\n🎉 Procesare finalizată pentru {len(opere)} operă/opere!")