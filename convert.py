import pdfplumber
import json

pdf_path = "public/Pdf/toaz.info-amintiri-de-la-junimea-pr_b4227656b70e69927f9c4d43c287d550.pdf"
output_json = "src/data/opere/amintiri-de-la-junimea-din-iasi.json"

pages = []
with pdfplumber.open(pdf_path) as pdf:
    for page in pdf.pages:
        text = page.extract_text()
        if text:
            pages.append(text.strip())

with open(output_json, "w", encoding="utf-8") as f:
    json.dump(pages, f, ensure_ascii=False, indent=2)

print(f"Salvat {len(pages)} pagini în {output_json}")