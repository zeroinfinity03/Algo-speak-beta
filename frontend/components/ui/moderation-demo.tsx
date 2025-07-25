"use client";

import { useState } from "react";
import {
    IconBrightnessUp,
    IconPlayerSkipForward,
    IconVolume3,
    IconLoader2,
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
        <div className="h-full w-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-black dark:text-white flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    AI Content Moderation
                </h3>
            </div>
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-black dark:text-white">
                        Content Analysis
                    </label>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                        Real-time scanning
                    </span>
                </div>
                <div className="relative">
                    <textarea
                        className="w-full p-3 border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-800/50 text-black dark:text-white text-sm backdrop-blur-sm focus:border-blue-500 dark:focus:border-blue-400 transition-colors placeholder:text-gray-400/60 dark:placeholder:text-gray-500/60"
                        rows={2}
                        placeholder="Enter your content for AI moderation... (try: 'I want to unalive myself')"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        disabled={isLoading}
                    />
                    <div className="absolute right-2 bottom-2 flex gap-2">
                        <button className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors">
                            <IconVolume3 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors">
                            <IconBrightnessUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>
                </div>
            </div>
            <button 
                onClick={analyzeContent}
                disabled={isLoading || !inputText.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-lg font-medium transition-all text-sm mb-4 flex items-center justify-center gap-2 group"
            >
                {isLoading ? (
                    <>
                        <IconLoader2 className="w-4 h-4 animate-spin" />
                        Analyzing...
                    </>
                ) : (
                    <>
                        Analyze Content
                        <IconPlayerSkipForward className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                )}
            </button>
            {/* Error Display */}
            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg mb-4">
                    <p className="text-sm text-red-700 dark:text-red-300 font-medium">❌ Error</p>
                    <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
                </div>
            )}

            {/* Results Display */}
            {result ? (
                <div className="p-4 bg-gradient-to-br from-green-50/50 via-blue-50/30 to-purple-50/50 dark:from-green-950/30 dark:via-blue-900/20 dark:to-purple-950/30 border border-green-100/50 dark:border-green-800/30 rounded-lg shadow-sm backdrop-blur-lg relative overflow-hidden max-h-96 overflow-y-auto">
                    <div className="relative">
                        <div className="mb-4">
                            <h4 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">
                                ✅ Analysis Complete
                            </h4>
                            <div className="space-y-2 text-xs">
                                <div className="break-words">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Original:</span>
                                    <div className="ml-2 text-gray-600 dark:text-gray-400 break-all">"{result.original_text}"</div>
                                </div>
                                {result.algospeak_detected && (
                                    <div className="break-words">
                                        <span className="font-medium text-orange-700 dark:text-orange-300">Normalized:</span>
                                        <div className="ml-2 text-orange-600 dark:text-orange-400 break-all">"{result.normalized_text}"</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                result.algospeak_detected 
                                    ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                                    : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            }`}>
                                {result.algospeak_detected ? '🔍 Algospeak Detected' : '✅ Clean Text'}
                            </span>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium break-words max-w-full ${
                                result.classification.includes('harmful')
                                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                    : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            }`}>
                                <span className="break-all">🤖 {result.classification}</span>
                            </div>
                        </div>

                        <div className="pt-3 border-t border-green-100/30 dark:border-green-800/30">
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                <span>Stage 1: {result.stage1_status}</span>
                                <span>Stage 2: {result.stage2_status}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : !isLoading && !error ? (
                <div className="p-4 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-950/30 dark:via-purple-900/20 dark:to-pink-950/30 border border-blue-100/50 dark:border-blue-800/30 rounded-lg shadow-sm backdrop-blur-lg relative overflow-hidden">
                    <div className="text-center">
                        <p className="text-sm text-blue-700/90 dark:text-blue-300/90 font-medium">
                            👋 Ready to analyze content!
                        </p>
                        <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-1">
                            Enter text above and click "Analyze Content"
                        </p>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
