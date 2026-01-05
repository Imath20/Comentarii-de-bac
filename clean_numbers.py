import re
import json

# Read the JSON file
with open('src/data/opere/principii-de-estetica-de-george-calinescu.json', 'r', encoding='utf-8') as f:
    content = f.read()

# Parse JSON
data = json.loads(content)

# Function to clean text - remove numbers and Roman numerals at the end
def clean_text(text):
    if not isinstance(text, str):
        return text
    
    # Split into lines to process each line separately
    lines = text.split('\n')
    cleaned_lines = []
    
    for line in lines:
        # Skip lines that contain only a number (possibly with special characters) - these are page numbers
        if re.match(r'^\s*\d+[a-z&\*#]?\s*$', line, re.IGNORECASE):
            continue
        
        # Remove Roman numerals at the end of line (I, II, III, IV, V, VI, VII, VIII, IX, X, XI, XII, XIII, XIV, XV, XVI, XVII, XVIII, XIX, XX, etc.)
        # Pattern matches Roman numerals at the end, possibly with whitespace before
        line = re.sub(r'\s+[IVXLCDM]+\s*$', '', line)
        
        # Remove Arabic numbers at the end of line (including page numbers like 716, 717, etc.)
        # Pattern matches numbers at the end, possibly with whitespace or dots before (like "...................... 190")
        line = re.sub(r'[\.\s]+\d+\s*$', '', line)
        
        # Also handle cases where there might be a dash before or after the number (like "719-" or "-719")
        line = re.sub(r'\s*-\s*\d+\s*$', '', line)
        line = re.sub(r'\s+\d+\s*-\s*$', '', line)
        
        # Handle cases like "35a" (number with letter suffix)
        line = re.sub(r'[\.\s]+\d+[a-z]\s*$', '', line, flags=re.IGNORECASE)
        
        # Handle cases like "48&" (number with special character)
        line = re.sub(r'[\.\s]+\d+[&\*#]\s*$', '', line)
        
        cleaned_lines.append(line)
    
    # Join lines back together
    return '\n'.join(cleaned_lines)

# Clean all strings in the array
cleaned_data = [clean_text(item) for item in data]

# Write back to file
with open('src/data/opere/titu-maiorescu-de-eugen-lovinescu.json', 'w', encoding='utf-8') as f:
    json.dump(cleaned_data, f, ensure_ascii=False, indent=2)

print("Cleaning completed!")

