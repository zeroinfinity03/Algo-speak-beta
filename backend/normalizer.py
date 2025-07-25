#!/usr/bin/env python3
"""
🛡️ SIMPLE STAGE 1: Algospeak Normalization

GOAL: Convert "unalive" → "kill", "seggs" → "sex", etc.
INPUT: "I want to unalive myself"
OUTPUT: "I want to kill myself"

That's it! No complex classes, just simple pattern replacement.
"""

import json
import re
from pathlib import Path

class SimpleNormalizer:
    """Simple algospeak pattern replacer."""
    
    def __init__(self):
        """Load algospeak patterns and safe context patterns from JSON."""
        # Load patterns from our centralized dataset location
        patterns_file = Path(__file__).parent / "dataset/algospeak_patterns.json"
        
        with open(patterns_file, 'r') as f:
            data = json.load(f)
        
        # Extract all pattern mappings
        self.patterns = {}
        
        # Direct mappings (most important)
        self.patterns.update(data.get("direct_mappings", {}))
        
        # Add other pattern types
        self.patterns.update(data.get("homophones", {}))
        self.patterns.update(data.get("misspellings", {}))
        self.patterns.update(data.get("leetspeak", {}))
        
        # Load safe context patterns
        self.safe_patterns = data.get("safe_context_patterns", {})
        
        print(f"✅ Loaded {len(self.patterns)} algospeak patterns")
        print(f"✅ Loaded {len(self.safe_patterns)} safe context patterns")
    
    def normalize(self, text: str) -> str:
        """
        Replace algospeak patterns with normal words and safe context patterns with safe expressions.
        
        Args:
            text: Input text like "I want to unalive myself" or "I killed it at work"
            
        Returns:
            Normalized text like "I want to kill myself" or "I succeeded at work"
        """
        normalized = text
        replacements_made = []
        
        # First, check for safe context patterns (longer phrases first)
        for safe_phrase, safe_replacement in sorted(self.safe_patterns.items(), key=len, reverse=True):
            # Create regex pattern for phrase replacement (case-insensitive)
            pattern = re.escape(safe_phrase)
            
            if re.search(pattern, normalized, re.IGNORECASE):
                normalized = re.sub(pattern, safe_replacement, normalized, flags=re.IGNORECASE)
                replacements_made.append(f'"{safe_phrase}" → "{safe_replacement}" (safe context)')
        
        # Then replace algospeak patterns (case-insensitive, whole words)
        for algospeak, normal in self.patterns.items():
            # Create regex pattern for whole word replacement
            pattern = r'\b' + re.escape(algospeak) + r'\b'
            
            if re.search(pattern, normalized, re.IGNORECASE):
                normalized = re.sub(pattern, normal, normalized, flags=re.IGNORECASE)
                replacements_made.append(f'"{algospeak}" → "{normal}"')
        
        # Log what we changed (for debugging)
        if replacements_made:
            print(f"🔄 Normalized: {', '.join(replacements_made)}")
        
        return normalized

def normalize_text(text: str) -> str:
    """
    Simple function to normalize algospeak in text.
    
    Args:
        text: Input text with potential algospeak
        
    Returns:
        Text with algospeak replaced by normal words
    """
    normalizer = SimpleNormalizer()
    return normalizer.normalize(text)

# Quick test
if __name__ == "__main__":
    normalizer = SimpleNormalizer()
    
    # Test cases from README
    test_cases = [
        "I want to unalive myself",
        "This is seggs content", 
        "He got unalived in the game",
        "Time for sewer slide",
        "This is normal text"
    ]
    
    print("\n🧪 TESTING SIMPLE NORMALIZER:")
    print("=" * 40)
    
    for text in test_cases:
        normalized = normalizer.normalize(text)
        if text != normalized:
            print(f"✅ '{text}' → '{normalized}'")
        else:
            print(f"➡️  '{text}' (no changes)")
