import json
import re

def clean_text(text):
    """Clean up text with various fixes"""
    
    # Fix common OCR errors and broken words first
    fixes = {
        # New OCR artifacts mentioned by user
        'şpe': 'și pe',
        'Drinaa': 'Drina',
        'mam ': 'm-am ',
        ' mam ': ' m-am ',
        ' mam\n': ' m-am\n',
        'nu știu ceam': 'nu știu ce-am',
        'fiărul': 'părul',
        'uite-J': 'uite-i',
        'dacsLspui': 'dacă spui',
        'JEjă': 'să',
        'mă-i atins': 'm-am atins',
        'm-am. Sării. Din balamale.': 'm-am sărit din balamale.',
        'Qceaţă': 'Ceață',
        'înCgolurimari': 'în goluri mari',
        'ieși seră': 'ieșise',
        # Common OCR errors
        'aicişL': 'aici',
        'Y-aţi': 'V-ați',
        'mJHarn': 'm-am',
        'Jsj': 'și',
        'din. Gura': 'din gură',
        'Iostiin': 'Iosif',
        'Arp; e': 'Are',
        'Njurnam': 'Nimeni',
        'Cy, voL': 'Că, voi',
        'atf-cutoată': 'atins',
        'Ariaj': 'Aria',
        'c*5': 'că',
        'J5iLk': 'Dugu',
        'mă-i)': 'mă-i',
        'Toţi. mă-i)': 'Toți mă-i',
        'Mea. Njurnam': 'Mea. Nimeni',
        'atins de„': 'atins de',
        'Nimeniiniciodată': 'Nimeni niciodată',
        'voL.': 'voi.',
        'câm-pii': 'câmpii',
        'să/răspundă': 'să răspundă',
        'ftmcums-a': 'cum s-a',
        'lahoră': 'la horă',
        'vreasă': 'vreau să',
        'gânditeu': 'gândit eu',
        'să jiu râzi': 'să râzi',
        'nu-"ştiu': 'nu știu',
        'şise': 'și se',
        'şi-lstrângă': 'și-l strângă',
        'parcă frică; A?': 'parcă frică. A?',
        'mâini-„lor „îi': 'mâinilor îi',
        'dm găurile': 'din găurile',
        'sfâr-şea,], ă': 'sfârșeală',
        'stâc. LseuilăJcaiîiid jaj fijratăcit': 'stă. Liniștit',
        'înaLurP': 'înălțuri',
        'omului bătriru': 'omului bătrân',
        '6 fată': 'O fată',
        'Drin': 'Drina',
        'vfrunzelorj': 'frunzelor',
        'âeodatpdin': 'deodată din',
        'cevaTrău': 'ceva rău',
        'Iântr-o': 'Într-o',
        'LseuilăJcaiîiid jaj fijratăcit': 'Liniștit',
        'stâc.': 'stă.',
        'Sării. Din"': 'Sări din',
        'Din" balamale': 'din balamale',
        '1-a': 'l-a',
        'L-am/luat': 'L-am luat',
        'p-astâs': 'p-asta',
        'y înţelegeţi': 'vă înțelegeți',
        'A j Beleagă': 'Beleagă',
        "'. J' '": '',
        'co-pii': 'copii',
        'j mă duc': 'mă duc',
        'amân-! Doi': 'amândoi',
        'Nu-ş\'': 'Nu știu',
        'i pe': 'pe',
        'Res-teu': 'Resteu',
        'Ăsta': 'Asta',
        'Iadului': 'iadului',
        'deacolo': 'de acolo',
        'lijngă': 'lângă',
        'se ne-ajute': 'să ne ajute',
        'vi se': 'vă se',
        '-s-': '-s',
        's-o spui': 's-o spun',
        '1-a adus': 'l-a adus',
        'mă însurai': 'm-am însurat',
        'eu cu ea': 'cu ea',
        'Mă: dine': 'Mă gândeam',
        'cini': 'câini',
        'F\n—': 'Fata.\n—',
        'I\n—': '',
        'vorbească*': 'vorbească',
        'năcit': 'nici',
        'nu mai şti-am': 'nu mai știu',
        'Skit': 'Știu',
        'JJSg"': '',
        'câ&ţK&şteptau': 'câteva așteptau',
        'murisem„': 'murisem',
        'zăpăcisem*': 'zăpăcisem',
        'nSÂSujp': 'nebun',
        'căzutgrămte': 'căzut grămadă',
        'Ş adineauri': 'Și adineauri',
        '< Spuneţi-mi': 'Spuneți-mi',
        '„\'': '',
        'degeurma': 'degeaba',
        'Be-leagă': 'Beleagă',
        '(âeodatpdin': '(deodată din',
        'cevaTrău, \'': 'ceva rău,',
        'rjişucMn': 'ridică',
        'Totdeauna': 'Totdeauna',
        'băiatul': 'băiatul',
        'săredin': 'se ridica',
        'rajuţeaâăşişiyed': 'răspundea',
        'd tbi"': '',
        'jy de': 'de',
        'ŞT"te': 'să te',
        'oătrânul': 'bătrânul',
        'bleandă': 'blândă',
        '\\par': '',
        'vâr-furile': 'vârfurile',
        'stâc.': 'stă.',
        'LseuilăJcaiîiid jaj fijratăcit': 'Liniștit',
        'înaLurP': 'înălțuri',
        'omului bătriru': 'omului bătrân',
        'înaLurP': 'înălțuri',
        'într-o sclipire': 'într-o sclipire',
        'înaLurP': 'înălțuri',
        'măcinare': 'măcinare',
        'înfiorat': 'înfiorat',
        'Nu-ş\'': 'Nu știu',
        'ce-am': 'ce am',
        'O cunoşti?—': 'O cunoști? —',
        'lahoră.—': 'la horă. —',
        'vreasă': 'vreau să',
        'Jsj': 'și',
        'şi-lstrângă': 'și-l strângă',
        'gânditeu': 'gândit eu',
        'nu-"ştiu': 'nu știu',
        'parcă frică; A?': 'parcă frică. A?',
        'vfrunzelorj': 'frunzelor',
        'lgved': '',
        'sL. Sa-inrhpq.au mopeu': '',
        'îni"ăiprânrln-sp': '',
        'ciudăţ': 'ciudat',
    }
    
    for wrong, correct in fixes.items():
        text = text.replace(wrong, correct)
    
    # Remove random numbers/letters mixed in words
    text = re.sub(r'([a-zA-ZăâîșțĂÂÎȘȚ])\d+([a-zA-ZăâîșțĂÂÎȘȚ])', r'\1\2', text)
    text = re.sub(r'([a-zA-ZăâîșțĂÂÎȘȚ])\d+', r'\1', text)
    text = re.sub(r'\d+([a-zA-ZăâîșțĂÂÎȘȚ])', r'\1', text)
    
    # Remove standalone random characters/numbers
    text = re.sub(r'\s+[A-Z]\s+', ' ', text)
    text = re.sub(r'\s+\d+\s+', ' ', text)
    text = re.sub(r'^\d+\s+', '', text, flags=re.MULTILINE)
    
    # Fix spacing around punctuation - remove space before, add space after
    text = re.sub(r'\s+([.,;:!?])', r'\1', text)
    text = re.sub(r'([.,;:!?])([a-zA-ZăâîșțĂÂÎȘȚ])', r'\1 \2', text)
    
    # Fix spacing around quotes and dashes
    text = re.sub(r'\s+([„"])', r'\1', text)
    text = re.sub(r'([„"])\s+', r'\1 ', text)
    text = re.sub(r'\s+([—–-])', r' \1', text)
    text = re.sub(r'([—–-])\s+', r'\1 ', text)
    
    # Fix spacing around parentheses
    text = re.sub(r'\s+\(', r' (', text)
    text = re.sub(r'\)\s+', r') ', text)
    
    # Remove random special characters that don't belong (but keep Romanian characters)
    text = re.sub(r'[^\w\săâîșțĂÂÎȘȚ.,;:!?„"—–\-()\n]', '', text)
    
    # Fix multiple spaces
    text = re.sub(r' +', ' ', text)
    
    # Clean up multiple newlines
    text = re.sub(r'\n{3,}', '\n\n', text)
    
    # Fix spacing at start of lines after punctuation
    text = re.sub(r'\.\n([a-zăâîșț])', r'.\n\1', text)
    
    # Format dialogue - put each replica on a new line
    # Pattern: "Aşa a fost: — Beleagă... — Mai aşteaptă... — Beleagă..."
    # Should become: "Aşa a fost:\n— Beleagă...\n— Mai aşteaptă...\n— Beleagă..."
    
    # First, handle cases where dialogue starts after colon/semicolon
    text = re.sub(r'([:;])\s*—\s+', r'\1\n— ', text)
    
    # Then, split multiple replicas on the same line
    # Pattern: " — text — text" should become "\n— text\n— text"
    # Use a more careful approach - split by " — " but preserve context
    text = re.sub(r'\s+—\s+([^—\n]+?)\s+—\s+', r'\n— \1\n— ', text)
    # Handle remaining cases with multiple dashes
    text = re.sub(r'([^—\n])\s+—\s+([^—\n]+?)\s+—\s+', r'\1\n— \2\n— ', text)
    
    # Clean up multiple newlines again after dialogue formatting
    text = re.sub(r'\n{3,}', '\n\n', text)
    
    return text

# Read the JSON file
with open('src/data/opere/intalnirea-din-pamanturi.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Clean each string in the array
cleaned_data = [clean_text(text) for text in data]

# Write back
with open('src/data/opere/intalnirea-din-pamanturi.json', 'w', encoding='utf-8') as f:
    json.dump(cleaned_data, f, ensure_ascii=False, indent=2)

print("Text cleaned successfully!")

