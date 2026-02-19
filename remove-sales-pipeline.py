#!/usr/bin/env python3
"""
Remove Sales Pipeline Automation from services page
"""

import re

file_path = '/workspace/lead-gen-platform/dashboard/app/services/page.tsx'

with open(file_path, 'r') as f:
    content = f.read()

# Find and remove the Sales Pipeline Automation service object
# Pattern: { id: 'sales-pipeline', ... } followed by closing brace and comma
pattern = r'\{\s*id:\s*[\'"]sales-pipeline[\'"].*?\},\s*\{'

# Replace with just the opening brace of the next service
content = re.sub(pattern, '{', content, flags=re.DOTALL)

with open(file_path, 'w') as f:
    f.write(content)

print("✅ Sales Pipeline Automation removed from services page")