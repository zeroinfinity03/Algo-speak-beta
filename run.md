# 🚀 How to Run the Algospeak Content Moderation System

Complete setup and run instructions for the two-stage AI content moderation system.

## 📋 Prerequisites

- **Python 3.8+** (for backend)
- **uv** (Python package manager) - `pip install uv` or `brew install uv`
- **Node.js 16+** (for frontend)
- **npm** (comes with Node.js)
- **Homebrew** (for Ollama installation on Mac)

## 🔧 Step 1: Install Ollama

```bash
# Install Ollama (Mac)
brew install ollama

# Start Ollama service
ollama serve
```

Keep this terminal running - Ollama needs to run in the background.

## 🤖 Step 2: Deploy the Fine-tuned Model

Open a **new terminal** and navigate to the backend directory:

```bash
cd backend

# Create the model in Ollama using our Modelfile
ollama create qwen-algospeak -f Modelfile

# Verify model is created
ollama list
```

You should see `qwen-algospeak:latest` in the list.

## 🛡️ Step 3: Start the Backend API

In the same backend directory:

```bash
# Install Python dependencies using uv
# This reads pyproject.toml and uv.lock to install exact versions
uv sync

# Start the FastAPI server
python main.py
```

The backend will start on **http://localhost:8000**

You should see:
```
✅ Loaded 114 algospeak patterns
✅ Loaded 10 safe context patterns  
✅ Ollama is running
✅ Model 'qwen-algospeak:latest' found
🚀 Starting Algospeak Content Moderation API...
```

## 🎨 Step 4: Start the Frontend

Open a **new terminal** and navigate to the frontend directory:

```bash
cd frontend

# Install Node.js dependencies using npm
# This reads package.json and package-lock.json to install exact versions
npm install

# Start the Next.js development server
npm run dev
```

The frontend will start on **http://localhost:3000** or **http://localhost:3001**

## 🧪 Step 5: Test the System

### Option 1: Use the Web Interface
- Open **http://localhost:3000** (or 3001) in your browser
- Use the content moderation demo interface
- Try the test cases from `backend/test.txt`

### Option 2: Test via API
```bash
# Test the backend API directly
curl -X POST "http://localhost:8000/moderate" \
  -H "Content-Type: application/json" \
  -d '{"text": "Need some corn star videos"}'
```

### Option 3: Health Check
```bash
# Check system health
curl http://localhost:8000/health
```

## 📊 Perfect Test Cases

Use these examples from `backend/test.txt` for demonstrations:

1. **"Need some corn star videos"** - Shows algospeak detection
2. **"Going to the accountant tonight"** - Shows algospeak detection  
3. **"Hi how are you n**ga"** - Shows offensive content detection
4. **"i killed it at work today"** - Shows safe context normalization

## 🔍 System Architecture

- **Backend**: http://localhost:8000 (FastAPI + Ollama)
- **Frontend**: http://localhost:3000/3001 (Next.js + React)
- **Model**: qwen-algospeak:latest (1.9GB fine-tuned GGUF)

## 🛠️ Troubleshooting

### Ollama Issues
```bash
# Check if Ollama is running
ollama list

# Restart Ollama service
brew services restart ollama
```

### Backend Issues
```bash
# Check if backend is running
curl http://localhost:8000/health

# Reinstall dependencies if needed
cd backend && uv sync

# Restart backend
cd backend && python main.py
```

### Frontend Issues
```bash
# Reinstall dependencies if needed
cd frontend && npm install

# Restart frontend
cd frontend && npm run dev
```

### Model Issues
```bash
# Recreate the model
cd backend
ollama create qwen-algospeak -f Modelfile
```

## 🎯 Success Indicators

✅ **Ollama**: `ollama list` shows `qwen-algospeak:latest`  
✅ **Backend**: Health check returns `{"api": "healthy"}`  
✅ **Frontend**: Web interface loads and connects to backend  
✅ **Model**: Test cases work as expected

## 🤖 AI Model Prompt

Our system sends this **simple prompt** to the fine-tuned GGUF model:

```
Classify this text as harmful or safe. Give a short answer.

Text: "{normalized_text}"
Classification:
```

**Example**:
- **Input**: `"Need some corn star videos"`
- **Stage 1 Normalized**: `"Need some porn star videos"`
- **Prompt to AI**: 
  ```
  Classify this text as harmful or safe. Give a short answer.
  
  Text: "Need some porn star videos"
  Classification:
  ```
- **AI Response**: `"harmful Category: general, Severity: 1"`

### Model Configuration:
- **Temperature**: 0.1 (low for consistent results)
- **Max Tokens**: 30 (short responses)
- **Stop Sequences**: `["\n\n", "Input:", "Text:", "Classification:"]`

## 📝 Notes

- Keep **3 terminals open**: Ollama server, Backend, Frontend
- The backend must start **after** Ollama is running
- The model file is **1.9GB** - ensure you have space
- All commands assume you're in the project root directory
- The AI model was fine-tuned with **52K instruction samples** using QLoRA

## 📦 Dependency Files

### Backend (Python with uv):
- `pyproject.toml` - Project configuration and dependencies
- `uv.lock` - Exact versions for reproducible installs

### Frontend (Node.js with npm):
- `package.json` - Project configuration and dependencies  
- `package-lock.json` - Exact versions for reproducible installs

---

**System is ready when all three components are running! 🎉** 