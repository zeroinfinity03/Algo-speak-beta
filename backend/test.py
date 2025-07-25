#!/usr/bin/env python3
"""
🧪 ALGOSPEAK MODERATION SYSTEM - COMPREHENSIVE TEST

This script tests:
1. ✅ Stage 1: Normalizer (algospeak → normal text)
2. 🔧 Ollama installation and service status
3. 🤖 Stage 2: AI Classifier (requires model deployment)
4. 🌐 Complete pipeline integration

Usage: python test.py
"""

import requests
import json
import subprocess
import sys
import time
from pathlib import Path

# Import our components
try:
    from normalizer import SimpleNormalizer
    print("✅ Normalizer imported successfully")
    normalizer_available = True
except ImportError as e:
    print(f"❌ Normalizer import failed: {e}")
    normalizer_available = False

try:
    from classifier import SimpleClassifier
    print("✅ Classifier imported successfully")
    classifier_available = True
except ImportError as e:
    print(f"❌ Classifier import failed: {e}")
    classifier_available = False

def test_normalizer():
    """Test Stage 1: Algospeak normalization"""
    print("\n" + "="*50)
    print("🔧 TESTING STAGE 1: NORMALIZER")
    print("="*50)
    
    if not normalizer_available:
        print("❌ Normalizer not available - check imports")
        return False
    
    try:
        normalizer = SimpleNormalizer()
        
        test_cases = [
            ("I want to unalive myself", "I want to kill myself"),
            ("This is seggs content", "This is sex content"),
            ("He got unalived", "He got killed"),
            ("Time for sewer slide", "Time for suicide"),
            ("Normal text stays the same", "Normal text stays the same")
        ]
        
        print(f"📊 Testing {len(test_cases)} algospeak patterns...")
        all_passed = True
        
        for i, (input_text, expected) in enumerate(test_cases, 1):
            result = normalizer.normalize(input_text)
            status = "✅" if result == expected else "❌"
            print(f"{status} Test {i}: '{input_text}' → '{result}'")
            
            if result != expected:
                print(f"   Expected: '{expected}'")
                all_passed = False
        
        if all_passed:
            print("\n🎉 Stage 1 (Normalizer): ALL TESTS PASSED!")
            return True
        else:
            print("\n⚠️ Stage 1 (Normalizer): Some tests failed")
            return False
            
    except Exception as e:
        print(f"❌ Normalizer test failed: {e}")
        return False

def check_ollama_installation():
    """Check if Ollama is installed"""
    print("\n" + "="*50)
    print("🔍 CHECKING OLLAMA INSTALLATION")
    print("="*50)
    
    try:
        result = subprocess.run(["ollama", "--version"], 
                              capture_output=True, text=True, timeout=5)
        if result.returncode == 0:
            version = result.stdout.strip()
            print(f"✅ Ollama installed: {version}")
            return True
        else:
            print("❌ Ollama not found or not working")
            return False
    except FileNotFoundError:
        print("❌ Ollama not installed")
        print("💡 Install with: brew install ollama")
        return False
    except subprocess.TimeoutExpired:
        print("❌ Ollama command timed out")
        return False
    except Exception as e:
        print(f"❌ Error checking Ollama: {e}")
        return False

def check_ollama_service():
    """Check if Ollama service is running"""
    print("\n🔍 Checking Ollama service status...")
    
    try:
        response = requests.get("http://localhost:11434/api/tags", timeout=5)
        if response.status_code == 200:
            print("✅ Ollama service is running")
            models = response.json()
            model_list = [m['name'] for m in models.get('models', [])]
            print(f"📋 Available models: {model_list}")
            return True, model_list
        else:
            print(f"❌ Ollama service not responding (status: {response.status_code})")
            return False, []
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to Ollama service")
        print("💡 Start Ollama with: ollama serve")
        return False, []
    except Exception as e:
        print(f"❌ Error connecting to Ollama: {e}")
        return False, []

def check_model_availability():
    """Check if our fine-tuned model is available"""
    print("\n🤖 Checking for fine-tuned model...")
    
    service_running, models = check_ollama_service()
    if not service_running:
        return False
    
    target_model = "qwen-algospeak:latest"
    if target_model in models:
        print(f"✅ Model '{target_model}' is available!")
        return True
    else:
        print(f"❌ Model '{target_model}' not found")
        print(f"💡 Available models: {models}")
        print("\n🔧 TO DEPLOY YOUR MODEL:")
        print("1. First, create a Modelfile:")
        print("   echo 'FROM ./quantized_model/unsloth.Q4_K_M.gguf' > Modelfile")
        print("2. Then create the model:")
        print("   ollama create qwen-algospeak -f Modelfile")
        return False

def test_classifier():
    """Test Stage 2: AI Classification"""
    print("\n" + "="*50)
    print("🤖 TESTING STAGE 2: AI CLASSIFIER")
    print("="*50)
    
    if not classifier_available:
        print("❌ Classifier not available - check imports")
        return False
    
    if not check_model_availability():
        print("❌ Cannot test classifier - model not available")
        return False
    
    try:
        classifier = SimpleClassifier()
        
        test_cases = [
            "I want to unalive myself",
            "I killed it at work today",
            "Great job on the presentation!",
            "This is seggs content"
        ]
        
        print(f"📊 Testing {len(test_cases)} classification cases...")
        
        for i, text in enumerate(test_cases, 1):
            print(f"\n🧪 Test {i}: '{text}'")
            result = classifier.classify(text)
            
            if 'error' in result:
                print(f"❌ Error: {result['error']}")
                return False
            else:
                print(f"✅ Classification: {result.get('classification', 'Unknown')}")
                print(f"🔄 Normalized: {result.get('normalized_text', 'N/A')}")
        
        print("\n🎉 Stage 2 (Classifier): ALL TESTS PASSED!")
        return True
        
    except Exception as e:
        print(f"❌ Classifier test failed: {e}")
        return False

def test_complete_pipeline():
    """Test the complete two-stage pipeline"""
    print("\n" + "="*50)
    print("🌐 TESTING COMPLETE PIPELINE")
    print("="*50)
    
    try:
        response = requests.post("http://localhost:8000/moderate", 
                               json={"text": "I want to unalive myself"},
                               timeout=10)
        
        if response.status_code == 200:
            result = response.json()
            print("✅ API endpoint working!")
            print(f"📝 Original: {result['original_text']}")
            print(f"🔄 Normalized: {result['normalized_text']}")
            print(f"🤖 Classification: {result['classification']}")
            print(f"📊 Stage 1: {result['stage1_status']}")
            print(f"📊 Stage 2: {result['stage2_status']}")
            return True
        else:
            print(f"❌ API returned status {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to API server")
        print("💡 Start the server with: python main.py")
        return False
    except Exception as e:
        print(f"❌ Pipeline test failed: {e}")
        return False

def main():
    """Run all tests"""
    print("🧪 ALGOSPEAK MODERATION SYSTEM - COMPREHENSIVE TEST")
    print("=" * 60)
    
    # Test results tracking
    results = {}
    
    # Test 1: Normalizer (Stage 1)
    results['normalizer'] = test_normalizer()
    
    # Test 2: Ollama Installation
    results['ollama_installed'] = check_ollama_installation()
    
    # Test 3: Ollama Service
    if results['ollama_installed']:
        results['ollama_service'], _ = check_ollama_service()
    else:
        results['ollama_service'] = False
    
    # Test 4: Model Availability
    if results['ollama_service']:
        results['model_available'] = check_model_availability()
    else:
        results['model_available'] = False
    
    # Test 5: Classifier (Stage 2)
    if results['model_available']:
        results['classifier'] = test_classifier()
    else:
        results['classifier'] = False
        print("\n❌ Skipping classifier test - model not available")
    
    # Test 6: Complete Pipeline
    print("\n🔍 Checking if API server is running...")
    results['pipeline'] = test_complete_pipeline()
    
    # Final Summary
    print("\n" + "="*60)
    print("📊 FINAL TEST SUMMARY")
    print("="*60)
    
    for test_name, passed in results.items():
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{status} {test_name.replace('_', ' ').title()}")
    
    total_tests = len(results)
    passed_tests = sum(results.values())
    
    print(f"\n🎯 Results: {passed_tests}/{total_tests} tests passed")
    
    if passed_tests == total_tests:
        print("🎉 ALL SYSTEMS OPERATIONAL! Ready for production!")
    else:
        print("\n🔧 NEXT STEPS TO FIX ISSUES:")
        
        if not results['ollama_installed']:
            print("1. Install Ollama: brew install ollama")
        
        if not results['ollama_service']:
            print("2. Start Ollama service: ollama serve")
        
        if not results['model_available']:
            print("3. Deploy your model:")
            print("   cd backend")
            print("   echo 'FROM ./quantized_model/unsloth.Q4_K_M.gguf' > Modelfile")
            print("   ollama create qwen-algospeak -f Modelfile")
        
        if not results['pipeline']:
            print("4. Start API server: python main.py")

if __name__ == "__main__":
    main() 