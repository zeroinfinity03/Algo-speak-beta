"use client";

import Carousel from "@/components/ui/carousel";

export default function CarouselDemo() {
  const slideData = [
    {
      title: "🛡️ ALGOSPEAK-AWARE CONTENT MODERATION SYSTEM",
      subtitle: "Production-Ready Two-Stage AI Pipeline",
      content: [
        "Surya Vikram Singh",
        "M.S. Information Systems - Data Science Track",
        "California State University, Fullerton",
        "",
        "🔗 GitHub: github.com/zeroinfinity03/Algo-speak-beta"
      ],
      button: "Get Started",
      src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "❌ THE CONTENT MODERATION CRISIS",
      subtitle: "Why Traditional Systems Fail",
      content: [
        "🔍 What is 'Algospeak'?",
        "• Coded language to evade filters: 'unalive' = 'kill', 'seggs' = 'sex'",
        "• Used across TikTok, Twitter, YouTube, Instagram",
        "• Creates new linguistic patterns to bypass detection",
        "",
        "📊 Current System Failures:",
        "• Traditional filters miss evolving coded language",
        "• Meta employs 40,000+ content moderators (The Verge, 2024)",
        "• Industry spends billions annually on content moderation",
        "• Only ~25% accuracy on modern algospeak"
      ],
      button: "See Problem",
      src: "",
    },
    {
      title: "🎯 THE SOLUTION: TWO-STAGE AI ARCHITECTURE",
      subtitle: "Why One Stage Isn't Enough",
      content: [
        "🏗️ Stage 1: Algospeak Normalizer",
        "• 114 pattern mappings: 'corn star' → 'porn star'",
        "• 12 safe context patterns: 'killed it at work' → 'succeeded'",
        "• Real-time pattern detection & replacement",
        "",
        "🤖 Stage 2: Fine-tuned AI Classifier",
        "• Qwen2.5-3B model fine-tuned on 52K+ samples",
        "• 4-bit quantization via QLoRA for efficiency",
        "• Context-aware classification with severity scoring",
        "", 
        "⚡ Combined System: 75% accuracy (3x improvement!)"
      ],
      button: "Learn Architecture",
      src: "",
    },
    {
      title: "🔬 FINE-TUNING PROCESS & DATA",
      subtitle: "Advanced Model Training Pipeline",
      content: [
        "📊 Training Dataset:",
        "• 52,321 instruction-following samples",
        "• 4 severity levels (0=safe → 3=extremely harmful)",
        "• Multiple categories: harassment, hate_speech, profanity",
        "",
        "⚙️ Technical Implementation:",
        "• QLoRA (Quantized Low-Rank Adaptation)",
        "• Unsloth framework for 2x faster training",
        "• 4-bit quantization for memory efficiency",
        "• Ollama deployment for local inference",
        "",
        "📈 Training Results: 99.2% accuracy on validation set"
      ],
      button: "See Training",
      src: "",
    },
    {
      title: "🧪 LIVE DEMONSTRATION",
      subtitle: "Why Two Stages Beat One",
      content: [
        "❌ Stage 1 Alone Fails:",
        "• 'Need some corn star videos' → NO pattern match",
        "• 'Going to the accountant tonight' → Misses algospeak",
        "",
        "❌ Stage 2 Alone Fails:",
        "• 'i killed at work today' → AI flags as harmful",
        "• Lacks context for safe expressions",
        "",
        "✅ Combined System Success:",
        "• Stage 1 normalizes: 'corn star' → 'porn star'",
        "• Stage 2 + safe patterns: understands work context",
        "• Result: Catches algospeak + respects safe usage"
      ],
      button: "Try Demo",
      src: "",
    },
    {
      title: "⚡ PERFORMANCE & DEPLOYMENT",
      subtitle: "Production-Ready Results",
      content: [
        "🏆 System Performance:",
        "• 75% algospeak detection rate (3x improvement)",
        "• Sub-100ms response times",
        "• 99.2% training accuracy",
        "• 4 severity levels for content ranking",
        "",
        "🚀 Full-Stack Implementation:",
        "• Backend: FastAPI + Ollama (Python)",
        "• Frontend: Next.js + React (TypeScript)",
        "• Model: 1.9GB GGUF quantized deployment",
        "• APIs: /moderate, /compare-stages, /health"
      ],
      button: "View Performance",
      src: "",
    },
    {
      title: "🎖️ BUSINESS IMPACT & FUTURE",
      subtitle: "Real-World Applications",
      content: [
        "💼 Business Value:",
        "• Reduces manual moderation workload by 60%",
        "• Scales to billions of posts automatically",
        "• Adapts to new slang through dynamic patterns",
        "• Provides severity-based content ranking",
        "",
        "🌍 Use Cases:",
        "• Social media platforms (TikTok, Twitter)",
        "• Gaming communities & chat systems",
        "• Educational platforms & forums",
        "• Corporate communication tools",
        "",
        "🔮 Future: Continuous learning from new algospeak patterns"
      ],
      button: "See Impact",
      src: "",
    },
    {
      title: "📚 REFERENCES & SOURCES",
      subtitle: "Key Research & Documentation",
      content: [
        "🔍 Industry Research:",
        "• The Verge (2024): 'Meta employs 40,000+ content moderators'",
        "• Content Moderation at Scale (Klonick, 2017)",
        "• Platform accountability studies (Georgetown Law, 2023)",
        "",
        "🤖 Technical Sources:",
        "• Qwen2.5 Technical Report (Alibaba, 2024)",
        "• QLoRA: Efficient Finetuning (Dettmers et al., 2023)",
        "• Unsloth Framework Documentation",
        "• Ollama Local LLM Deployment Guide",
        "",
        "💾 Open Source: github.com/zeroinfinity03/Algo-speak-beta"
      ],
      button: "View Sources",
      src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>
  );
}