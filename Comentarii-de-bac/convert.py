import pdfplumber
import json

pdf_path = "public/Pdf/George Calinescu - Enigma Otiliei.pdf"
output_json = "src/data/opere/enigma-otiliei.json"

pages = []
with pdfplumber.open(pdf_path) as pdf:
    for page in pdf.pages:
        text = page.extract_text()
        if text:
            pages.append(text.strip())

with open(output_json, "w", encoding="utf-8") as f:
    json.dump(pages, f, ensure_ascii=False, indent=2)

print(f"Salvat {len(pages)} pagini în {output_json}")