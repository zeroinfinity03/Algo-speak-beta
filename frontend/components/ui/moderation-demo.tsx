"use client";

import { useState } from "react";
import {
    IconBrightnessUp,
    IconPlayerSkipForward,
    IconVolume3,
    IconLoader2,
    IconShield,
    IconScan,
} from "@tabler/icons-react";

interface ModerationResult {
    original_text: string;
    normalized_text: string;
    algospeak_detected: boolean;
    classification: string;
    stage1_status: string;
    stage2_status: string;
}

export function ModerationDemo() {
    const [inputText, setInputText] = useState("");
    const [result, setResult] = useState<ModerationResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const analyzeContent = async () => {
        if (!inputText.trim()) {
            setError("Please enter some text to analyze");
            return;
        }

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch("http://localhost:8000/moderate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: inputText }),
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data: ModerationResult = await response.json();
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to analyze content");
            console.error("API Error:", err);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="h-full w-full flex flex-col p-6 rounded-3xl bg-white/30 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/20 shadow-2xl shadow-black/10 dark:shadow-black/50 relative overflow-hidden"
             style={{
                 boxShadow: `
                     inset 1px 1px 0px rgba(255, 255, 255, 0.7),
                     inset -1px -1px 0px rgba(255, 255, 255, 0.7),
                     0px 8px 24px rgba(0, 0, 0, 0.15),
                     inset 0px 4px 8px rgba(255, 255, 255, 0.4)
                 `
             }}>
            
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/60 dark:border-white/20"
                         style={{
                             boxShadow: `
                                 inset 1px 1px 0px rgba(255, 255, 255, 0.8),
                                 inset -1px -1px 0px rgba(255, 255, 255, 0.8)
                             `
                         }}>
                        <IconShield className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            AI Content Moderation
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Two-stage algospeak detection
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-white/60 dark:border-white/20"
                     style={{
                         boxShadow: `
                             inset 1px 1px 0px rgba(255, 255, 255, 0.8),
                             inset -1px -1px 0px rgba(255, 255, 255, 0.8)
                         `
                     }}>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Live</span>
                </div>
            </div>

            {/* Input Section */}
            <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                    Content Analysis
                </label>
                <div className="relative">
                    <textarea
                        className="w-full p-4 bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/50 dark:border-white/20 rounded-2xl text-gray-800 dark:text-gray-200 text-sm focus:border-white/70 dark:focus:border-white/30 focus:outline-none transition-all duration-300 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 resize-none"
                        rows={3}
                        placeholder="Enter your content for AI moderation... (try: 'I want to unalive myself')"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        disabled={isLoading}
                        style={{
                            boxShadow: `
                                inset 1px 1px 0px rgba(255, 255, 255, 0.6),
                                inset -1px -1px 0px rgba(255, 255, 255, 0.6),
                                inset 0px 4px 8px rgba(255, 255, 255, 0.3)
                            `
                        }}
                    />
                    <div className="absolute right-3 bottom-3 flex gap-1">
                        <button className="p-2 rounded-xl bg-white/30 dark:bg-white/10 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-white/20 transition-all duration-200 group border border-white/40 dark:border-white/20"
                                style={{
                                    boxShadow: `
                                        inset 1px 1px 0px rgba(255, 255, 255, 0.7),
                                        inset -1px -1px 0px rgba(255, 255, 255, 0.7)
                                    `
                                }}>
                            <IconVolume3 className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200" />
                        </button>
                        <button className="p-2 rounded-xl bg-white/30 dark:bg-white/10 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-white/20 transition-all duration-200 group border border-white/40 dark:border-white/20"
                                style={{
                                    boxShadow: `
                                        inset 1px 1px 0px rgba(255, 255, 255, 0.7),
                                        inset -1px -1px 0px rgba(255, 255, 255, 0.7)
                                    `
                                }}>
                            <IconBrightnessUp className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Analyze Button */}
            <button 
                onClick={analyzeContent}
                disabled={isLoading || !inputText.trim()}
                className="bg-white/50 dark:bg-white/15 hover:bg-white/70 dark:hover:bg-white/25 disabled:bg-white/20 dark:disabled:bg-white/5 disabled:cursor-not-allowed text-gray-800 dark:text-gray-200 px-6 py-3 rounded-2xl font-medium transition-all duration-300 text-sm mb-6 flex items-center justify-center gap-3 group backdrop-blur-sm border border-white/60 dark:border-white/20"
                style={{
                    boxShadow: `
                        inset 1px 1px 0px rgba(255, 255, 255, 0.8),
                        inset -1px -1px 0px rgba(255, 255, 255, 0.8),
                        0px 4px 12px rgba(0, 0, 0, 0.1),
                        inset 0px 4px 8px rgba(255, 255, 255, 0.4)
                    `
                }}
            >
                {isLoading ? (
                    <>
                        <IconLoader2 className="w-5 h-5 animate-spin" />
                        <span>Analyzing Content...</span>
                    </>
                ) : (
                    <>
                        <IconScan className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                        <span>Analyze Content</span>
                        <IconPlayerSkipForward className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                )}
            </button>

            {/* Error Display */}
            {error && (
                <div className="p-4 bg-red-100/50 dark:bg-red-900/20 backdrop-blur-sm border border-red-200/60 dark:border-red-500/30 rounded-2xl mb-6"
                     style={{
                         boxShadow: `
                             inset 1px 1px 0px rgba(255, 255, 255, 0.6),
                             inset -1px -1px 0px rgba(255, 255, 255, 0.6)
                         `
                     }}>
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-xl bg-red-200/60 dark:bg-red-800/40 backdrop-blur-sm">
                            <span className="text-red-700 dark:text-red-300 text-sm">⚠️</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-red-800 dark:text-red-200">Analysis Error</p>
                            <p className="text-xs text-red-700 dark:text-red-300">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Results Display */}
            {result ? (
                <div className="flex-1 p-6 bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/50 dark:border-white/20 rounded-2xl max-h-80 overflow-y-auto scrollbar-hide"
                     style={{
                         boxShadow: `
                             inset 1px 1px 0px rgba(255, 255, 255, 0.7),
                             inset -1px -1px 0px rgba(255, 255, 255, 0.7),
                             0px 6px 20px rgba(0, 0, 0, 0.1),
                             inset 0px 4px 8px rgba(255, 255, 255, 0.3)
                         `
                     }}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-xl bg-white/60 dark:bg-white/20 backdrop-blur-sm"
                             style={{
                                 boxShadow: `
                                     inset 1px 1px 0px rgba(255, 255, 255, 0.8),
                                     inset -1px -1px 0px rgba(255, 255, 255, 0.8)
                                 `
                             }}>
                            <span className="text-green-600 dark:text-green-400 text-lg">✨</span>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                Analysis Complete
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Two-stage processing completed
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="p-4 bg-white/50 dark:bg-white/15 backdrop-blur-sm rounded-xl border border-white/60 dark:border-white/25"
                             style={{
                                 boxShadow: `
                                     inset 1px 1px 0px rgba(255, 255, 255, 0.8),
                                     inset -1px -1px 0px rgba(255, 255, 255, 0.8)
                                 `
                             }}>
                            <span className="text-xs font-medium text-gray-600/80 dark:text-gray-400/80 uppercase tracking-wide">Original Text</span>
                            <p className="text-sm text-gray-800 dark:text-gray-200 mt-1 break-words">"{result.original_text}"</p>
                        </div>
                        
                        {result.algospeak_detected && (
                            <div className="p-4 bg-amber-100/50 dark:bg-amber-900/20 backdrop-blur-sm rounded-xl border border-amber-200/60 dark:border-amber-500/30"
                                 style={{
                                     boxShadow: `
                                         inset 1px 1px 0px rgba(255, 255, 255, 0.7),
                                         inset -1px -1px 0px rgba(255, 255, 255, 0.7)
                                     `
                                 }}>
                                <span className="text-xs font-medium text-amber-700/80 dark:text-amber-400/80 uppercase tracking-wide">Normalized Text</span>
                                <p className="text-sm text-amber-800 dark:text-amber-200 mt-1 break-words">"{result.normalized_text}"</p>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mb-6">
                        <div className={`px-4 py-2 rounded-xl text-sm font-medium backdrop-blur-sm border ${
                            result.algospeak_detected 
                                ? 'bg-orange-100/60 dark:bg-orange-900/25 border-orange-200/70 dark:border-orange-500/30 text-orange-800 dark:text-orange-200'
                                : 'bg-green-100/60 dark:bg-green-900/25 border-green-200/70 dark:border-green-500/30 text-green-800 dark:text-green-200'
                        }`}
                             style={{
                                 boxShadow: `
                                     inset 1px 1px 0px rgba(255, 255, 255, 0.7),
                                     inset -1px -1px 0px rgba(255, 255, 255, 0.7)
                                 `
                             }}>
                            {result.algospeak_detected ? '🔍 Algospeak Detected' : '✅ Clean Text'}
                        </div>
                        <div className={`px-4 py-2 rounded-xl text-sm font-medium backdrop-blur-sm border ${
                            result.classification.includes('harmful')
                                ? 'bg-red-100/60 dark:bg-red-900/25 border-red-200/70 dark:border-red-500/30 text-red-800 dark:text-red-200'
                                : 'bg-green-100/60 dark:bg-green-900/25 border-green-200/70 dark:border-green-500/30 text-green-800 dark:text-green-200'
                        }`}
                             style={{
                                 boxShadow: `
                                     inset 1px 1px 0px rgba(255, 255, 255, 0.7),
                                     inset -1px -1px 0px rgba(255, 255, 255, 0.7)
                                 `
                             }}>
                            🤖 {result.classification}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/30 dark:border-white/20">
                        <div className="grid grid-cols-2 gap-4 text-xs">
                            <div className="p-3 bg-white/50 dark:bg-white/15 backdrop-blur-sm rounded-xl border border-white/60 dark:border-white/25"
                                 style={{
                                     boxShadow: `
                                         inset 1px 1px 0px rgba(255, 255, 255, 0.8),
                                         inset -1px -1px 0px rgba(255, 255, 255, 0.8)
                                     `
                                 }}>
                                <span className="text-gray-600 dark:text-gray-400 font-medium">Stage 1</span>
                                <p className="text-gray-800 dark:text-gray-200 mt-1">{result.stage1_status}</p>
                            </div>
                            <div className="p-3 bg-white/50 dark:bg-white/15 backdrop-blur-sm rounded-xl border border-white/60 dark:border-white/25"
                                 style={{
                                     boxShadow: `
                                         inset 1px 1px 0px rgba(255, 255, 255, 0.8),
                                         inset -1px -1px 0px rgba(255, 255, 255, 0.8)
                                     `
                                 }}>
                                <span className="text-gray-600 dark:text-gray-400 font-medium">Stage 2</span>
                                <p className="text-gray-800 dark:text-gray-200 mt-1">{result.stage2_status}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : !isLoading && !error ? (
                <div className="flex-1 p-8 bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/50 dark:border-white/20 rounded-2xl"
                     style={{
                         boxShadow: `
                             inset 1px 1px 0px rgba(255, 255, 255, 0.7),
                             inset -1px -1px 0px rgba(255, 255, 255, 0.7),
                             inset 0px 4px 8px rgba(255, 255, 255, 0.3)
                         `
                     }}>
                    <div className="text-center">
                        <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/20 backdrop-blur-sm inline-block mb-4 border border-white/70 dark:border-white/30"
                             style={{
                                 boxShadow: `
                                     inset 1px 1px 0px rgba(255, 255, 255, 0.8),
                                     inset -1px -1px 0px rgba(255, 255, 255, 0.8)
                                 `
                             }}>
                            <span className="text-3xl">👋</span>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            Ready to Analyze Content
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Enter text above and click "Analyze Content" to see our two-stage AI moderation in action
                        </p>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
