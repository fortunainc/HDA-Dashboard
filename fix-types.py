#!/usr/bin/env python3
"""
Script to fix all TypeScript type errors related to implicit 'any' types
"""

import os
import re

# Files to fix
FILES_TO_FIX = [
    'dashboard/app/partnerships/page.tsx',
    'dashboard/app/campaigns/page.tsx',
    'dashboard/app/competitors/page.tsx',
    'dashboard/app/bookings/page.tsx',
    'dashboard/app/pr-campaigns/page.tsx',
    'dashboard/app/media-contacts/page.tsx',
    'dashboard/app/targets/page.tsx',
]

def fix_filter_types(content, array_name):
    """Fix filter callback type annotations"""
    # Pattern: array_name.filter(item => 
    pattern = rf'({array_name}\.filter\()\s*(\w+)\s*(=>)'
    
    def replace_func(match):
        full_match = match.group(0)
        open_paren = match.group(1)
        param_name = match.group(2)
        arrow = match.group(3)
        
        # Check if already has type annotation
        if ':' in param_name:
            return full_match
        
        return f'{open_paren}({param_name}: typeof {array_name}[0]){arrow}'
    
    content = re.sub(pattern, replace_func, content)
    return content

def fix_map_types(content, array_name):
    """Fix map callback type annotations"""
    # Pattern: array_name.map(item => 
    pattern = rf'({array_name}\.map\()\s*(\w+)\s*(=>)'
    
    def replace_func(match):
        full_match = match.group(0)
        open_paren = match.group(1)
        param_name = match.group(2)
        arrow = match.group(3)
        
        # Check if already has type annotation
        if ':' in param_name:
            return full_match
        
        return f'{open_paren}({param_name}: typeof {array_name}[0]){arrow}'
    
    content = re.sub(pattern, replace_func, content)
    return content

def main():
    base_path = '/workspace/lead-gen-platform'
    
    # Array names in each file
    array_names_map = {
        'dashboard/app/partnerships/page.tsx': 'partnerships',
        'dashboard/app/campaigns/page.tsx': 'campaigns',
        'dashboard/app/competitors/page.tsx': 'competitors',
        'dashboard/app/bookings/page.tsx': 'bookingsData',
        'dashboard/app/pr-campaigns/page.tsx': 'campaigns',
        'dashboard/app/media-contacts/page.tsx': 'contacts',
        'dashboard/app/targets/page.tsx': 'targets',
    }
    
    for file_path in FILES_TO_FIX:
        full_path = os.path.join(base_path, file_path)
        
        if not os.path.exists(full_path):
            print(f"⚠️  File not found: {file_path}")
            continue
        
        print(f"🔧 Fixing: {file_path}")
        
        with open(full_path, 'r') as f:
            content = f.read()
        
        array_name = array_names_map.get(file_path)
        
        if array_name:
            content = fix_filter_types(content, array_name)
            content = fix_map_types(content, array_name)
        
        with open(full_path, 'w') as f:
            f.write(content)
        
        print(f"✅ Fixed: {file_path}")

if __name__ == '__main__':
    main()