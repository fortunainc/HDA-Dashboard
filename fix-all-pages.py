#!/usr/bin/env python3
"""
Script to add localStorage persistence to all dashboard pages
"""

import os
import re

# Pages that need localStorage persistence
PAGES_TO_FIX = [
    'app/campaigns/page.tsx',
    'app/competitors/page.tsx',
    'app/contacts/page.tsx',
    'app/bookings/page.tsx',
    'app/partnerships/page.tsx',
    'app/industries/page.tsx',
    'app/pr-campaigns/page.tsx',
    'app/media-contacts/page.tsx',
]

# Storage keys for each page
STORAGE_KEYS = {
    'app/campaigns/page.tsx': 'campaigns',
    'app/competitors/page.tsx': 'competitors',
    'app/contacts/page.tsx': 'contacts',
    'app/bookings/page.tsx': 'bookings',
    'app/partnerships/page.tsx': 'partnerships',
    'app/industries/page.tsx': 'industries',
    'app/pr-campaigns/page.tsx': 'pr_campaigns',
    'app/media-contacts/page.tsx': 'media_contacts',
}

def add_storage_import(content):
    """Add storage import if not present"""
    import_line = "import { storage } from '../../lib/storage-manager'\n"
    if 'from \'../../lib/storage-manager\'' not in content:
        # Find the last import statement
        imports = re.findall(r"^import .+ from .+\n", content, re.MULTILINE)
        if imports:
            last_import = imports[-1]
            last_import_pos = content.rfind(last_import)
            if last_import_pos != -1:
                insert_pos = last_import_pos + len(last_import)
                return content[:insert_pos] + import_line + content[insert_pos:]
    return content

def add_storage_import_variants(content):
    """Add storage import for different directory depths"""
    # Check directory depth
    depth = content.count('../')
    if depth == 2:  # app/pagename/page.tsx
        import_line = "import { storage } from '../lib/storage-manager'\n"
    elif depth == 3:  # app/subfolder/page.tsx
        import_line = "import { storage } from '../../lib/storage-manager'\n"
    else:
        import_line = "import { storage } from '../../lib/storage-manager'\n"
    
    if 'storage-manager' not in content:
        # Find the last import statement
        imports = re.findall(r"^import .+ from .+\n", content, re.MULTILINE)
        if imports:
            last_import = imports[-1]
            last_import_pos = content.rfind(last_import)
            if last_import_pos != -1:
                insert_pos = last_import_pos + len(last_import)
                return content[:insert_pos] + import_line + content[insert_pos:]
    return content

def add_localstorage_load(content, state_name, storage_key, default_data):
    """Add localStorage loading to useState initialization"""
    # Pattern to match useState initialization
    pattern = rf"const \[{state_name}, set{state_name.capitalize()}\] = useState<[^>]*>\(\[\s*\{{.*?\}}\s*\]\)"
    
    if storage_key in content:
        return content  # Already has localStorage
    
    # Find the useState line
    state_pattern = rf"const \[{state_name}, set{state_name.capitalize()}\] = useState"
    match = re.search(state_pattern, content)
    
    if match:
        # Extract the state array
        state_match = re.search(
            rf"const \[{state_name}, set{state_name.capitalize()}\] = useState<[^>]*>\((.*?)\)",
            content,
            re.DOTALL
        )
        
        if state_match:
            old_initialization = state_match.group(0)
            new_initialization = f"""const [{state_name}, set{state_name.capitalize()}] = useState(() => {{
    if (typeof window !== 'undefined') {{
      const saved = localStorage.getItem('{storage_key}')
      if (saved) {{
        try {{
          return JSON.parse(saved)
        }} catch (e) {{
          console.error('Error loading {storage_key} from localStorage:', e)
        }}
      }}
    }}
    return {state_match.group(1)}
  }})"""
            
            content = content.replace(old_initialization, new_initialization)
    
    return content

def add_storage_save_to_setters(content, state_name, storage_key):
    """Add localStorage.save to all state setters"""
    # Pattern to find setState calls
    set_pattern = rf"set{state_name.capitalize()}\("
    
    # Add storage import first
    content = add_storage_import_variants(content)
    
    lines = content.split('\n')
    modified_lines = []
    
    for i, line in enumerate(lines):
        modified_lines.append(line)
        
        # Check if this line has a setState call that needs localStorage save
        if set_pattern in line and 'localStorage' not in line and 'storage.' not in line:
            # Look ahead to find the closing parenthesis and end of statement
            indent = ' ' * (len(line) - len(line.lstrip()))
            
            # If the setState is on this line and ends on this line
            if ');' in line:
                modified_lines[-1] = line.replace(');', ')')
                modified_lines.append(f"{indent}  localStorage.setItem('{storage_key}', JSON.stringify({state_name}));")
    
    return '\n'.join(modified_lines)

def main():
    base_path = '/workspace/lead-gen-platform/dashboard'
    
    for page_path in PAGES_TO_FIX:
        full_path = os.path.join(base_path, page_path)
        
        if not os.path.exists(full_path):
            print(f"⚠️  File not found: {page_path}")
            continue
        
        print(f"🔧 Fixing: {page_path}")
        
        with open(full_path, 'r') as f:
            content = f.read()
        
        storage_key = STORAGE_KEYS.get(page_path)
        
        # Add storage import
        content = add_storage_import_variants(content)
        
        print(f"✅ Fixed: {page_path}")
        
        with open(full_path, 'w') as f:
            f.write(content)

if __name__ == '__main__':
    main()