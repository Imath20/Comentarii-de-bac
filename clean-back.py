import json
import re
import sys

def clean_page_numbers(json_file_path):
    """Curăță numerotarea de la sfârșitul fiecărei pagini din fișierul JSON"""
    
    try:
        # Citește fișierul JSON
        with open(json_file_path, 'r', encoding='utf-8') as f:
            pages = json.load(f)
        
        # Curăță numerotarea de la sfârșitul fiecărei pagini
        cleaned_pages = []
        for page in pages:
            # Elimină numărul de la sfârșit (1-99)
            cleaned_page = re.sub(r'\n\d+$', '', page)
            cleaned_pages.append(cleaned_page)
        
        # Salvează fișierul curățat
        with open(json_file_path, 'w', encoding='utf-8') as f:
            json.dump(cleaned_pages, f, ensure_ascii=False, indent=2)
        
        print(f"✅ Numerotarea a fost ștearsă din {json_file_path}!")
        print(f"📄 Numărul de pagini procesate: {len(cleaned_pages)}")
        
        return True
        
    except FileNotFoundError:
        print(f"❌ Eroare: Fișierul {json_file_path} nu a fost găsit!")
        return False
    except json.JSONDecodeError:
        print(f"❌ Eroare: Fișierul {json_file_path} nu este un JSON valid!")
        return False
    except Exception as e:
        print(f"❌ Eroare neașteptată: {e}")
        return False

def main():
    """Funcția principală"""
    if len(sys.argv) > 1:
        # Dacă s-a dat un argument, folosește-l ca cale
        file_path = sys.argv[1]
        clean_page_numbers(file_path)
    else:
        # Dacă nu s-a dat argument, afișează instrucțiuni
        print("🧹 Script pentru curățarea numerotării din fișiere JSON")
        print("📝 Utilizare:")
        print("   python clean.py <cale_catre_fisier.json>")
        print("   python clean.py src/data/opere/popa-tanda.json")
        print()
        print("💡 Exemplu pentru popa-tanda.json:")
        clean_page_numbers("src/data/opere/unde-fugim-de-acasa.json")

if __name__ == "__main__":
    main()
