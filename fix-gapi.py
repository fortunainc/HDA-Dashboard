#!/usr/bin/env python3
"""
Fix gapi references in google-calendar-integration.ts
"""

import re

file_path = '/workspace/lead-gen-platform/dashboard/lib/google-calendar-integration.ts'

with open(file_path, 'r') as f:
    content = f.read()

# Add gapi declaration at the beginning of each method that uses it
# Pattern: find methods that use gapi but don't declare it
methods_to_fix = [
    'createEvent',
    'getEvents',
    'updateEvent',
    'deleteEvent',
    'isAuthenticated',
    'signOut'
]

for method in methods_to_fix:
    # Find the method definition
    pattern = rf'(async {method}\([^)]*\): [^{{]+\{{)'
    
    def add_gapi_decl(match):
        return match.group(1) + '\n    const gapi = (window as any).gapi;'
    
    content = re.sub(pattern, add_gapi_decl, content)

with open(file_path, 'w') as f:
    f.write(content)

print("✅ Fixed gapi references in google-calendar-integration.ts")