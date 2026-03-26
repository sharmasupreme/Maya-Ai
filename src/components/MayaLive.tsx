/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { Mic, MicOff, Phone, PhoneOff, MessageSquare, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AudioProcessor, AudioPlayer } from '../lib/audio-utils';
import { BusinessConfig } from '../types';

const getSystemInstruction = (config: BusinessConfig, isAuthenticated: boolean, commandCount: number) => `
You are Maya, a professional and friendly AI receptionist for "${config.name}". 

CORE PROTOCOL:
1. FIRST INTERACTION: Your very first response MUST be to politely ask the user in both Nepali and English to choose their preferred language for the conversation. 
   Example: "Namaste! Welcome to ${config.name}. Would you like to continue in Nepali or English? / नमस्ते! ${config.name} मा स्वागत छ। के तपाईं नेपाली वा अंग्रेजीमा कुराकानी अगाडि बढाउन चाहनुहुन्छ?"
2. Once the user chooses a language, stick to that language for the rest of the conversation unless they ask to switch.

${!isAuthenticated ? `TRIAL MODE: The user is NOT signed up. They have a STRICT limit of 5 interactions. 
Current interaction count: ${commandCount + 1} of 5.
IMPORTANT: On the 5th interaction, you MUST politely inform the user that their trial has ended and they need to sign up at our website to unlock full features and continue the conversation. Say a warm goodbye and stop responding after that.` : 'FULL FEATURE MODE: The user is signed up. There are no interaction limits.'}

BUSINESS CONTEXT:
- Business Name: ${config.name}
- Category: ${config.category}
- Description: ${config.description}
- Services Provided: ${(config.services || []).join(', ')}
- Operating Hours: ${config.hours}
- Contact Phone: ${config.contactPhone}

CURRENT RESOURCE AVAILABILITY:
${(config.resources || []).map(r => `- ${r.label}: ${r.available} available out of ${r.total} total`).join('\n')}

KNOWLEDGE BASE (FAQ):
${(config.faq || []).map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')}

INSTRUCTIONS:
- After language selection, use the context above to answer questions accurately.
- If a customer asks about a service not listed, politely inform them and offer to take a message.
- Keep responses concise and natural for a voice conversation.
- If you don't know something, offer to take their contact details for a callback.
`;

interface MayaLiveProps {
  config: BusinessConfig;
  setView: (view: any) => void;
  isAuthenticated: boolean;
}

export default function MayaLive({ config, setView, isAuthenticated }: MayaLiveProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState<string>("");
  const [status, setStatus] = useState<string>("Ready to assist");
  const [commandCount, setCommandCount] = useState(() => {
    if (isAuthenticated) return 0;
    const saved = localStorage.getItem('maya_trial_count');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const audioProcessorRef = useRef<AudioProcessor | null>(null);
  const audioPlayerRef = useRef<AudioPlayer | null>(null);
  const sessionRef = useRef<any>(null);
  const commandCountRef = useRef(0);

  useEffect(() => {
    commandCountRef.current = commandCount;
    if (!isAuthenticated) {
      localStorage.setItem('maya_trial_count', commandCount.toString());
    }
  }, [commandCount, isAuthenticated]);

  const startCall = async () => {
    if (!isAuthenticated && commandCount >= 5) {
      setStatus("Trial ended. Please sign up.");
      setTimeout(() => setView('register'), 2000);
      return;
    }
    try {
      setStatus("Connecting...");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      audioPlayerRef.current = new AudioPlayer();
      
      const session = await ai.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-12-2025",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } }, // Friendly female-sounding voice
          },
          systemInstruction: getSystemInstruction(config, isAuthenticated, commandCountRef.current),
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: async () => {
            setIsConnected(true);
            setIsRecording(true);
            setStatus("Call Active");
            
            audioProcessorRef.current = new AudioProcessor((base64Data) => {
              session.sendRealtimeInput({
                audio: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
              });
            });
            
            try {
              if (audioPlayerRef.current?.getContext()?.state === 'suspended') {
                await audioPlayerRef.current.getContext()?.resume();
              }
              await audioProcessorRef.current.start();
            } catch (err) {
              console.error("Audio initialization failed:", err);
              setStatus("Microphone access failed");
              stopCall();
            }
          },
          onmessage: async (message) => {
            if (message.serverContent?.modelTurn?.parts) {
              // Increment command count on model turn
              if (!isAuthenticated) {
                setCommandCount(prev => {
                  const next = prev + 1;
                  if (next >= 5) {
                    // We'll handle redirection after the audio finishes
                    setTimeout(() => {
                      stopCall();
                      setView('register');
                    }, 8000); // Give enough time for the "sign up" message to play
                  }
                  return next;
                });
              }

              for (const part of message.serverContent.modelTurn.parts) {
                if (part.inlineData?.data) {
                  audioPlayerRef.current?.playChunk(part.inlineData.data);
                }
              }
            }

            if (message.serverContent?.interrupted) {
              audioPlayerRef.current?.stop();
            }
          },
          onclose: () => {
            stopCall();
          },
          onerror: (err) => {
            console.error("Live API Error:", err);
            stopCall();
            setStatus("Error occurred");
          }
        }
      });

      sessionRef.current = session;
    } catch (error) {
      console.error("Failed to start call:", error);
      setStatus("Connection failed");
    }
  };

  const stopCall = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }

    audioProcessorRef.current?.stop();
    audioPlayerRef.current?.stop();
    
    setIsConnected(false);
    setIsRecording(false);
    setStatus("Call Ended");
    
    setTimeout(() => setStatus("Ready to assist"), 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 max-w-md w-full mx-auto transition-colors">
      <div className="relative mb-12">
        <motion.div 
          animate={isConnected ? { scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
          className={`absolute inset-0 rounded-full blur-2xl ${isConnected ? 'bg-orange-400' : 'bg-gray-200 dark:bg-gray-800'}`}
        />
        <div className={`relative w-32 h-32 rounded-full flex items-center justify-center border-2 ${isConnected ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800'}`}>
          {isConnected ? (
            <Volume2 className="w-12 h-12 text-orange-600" />
          ) : (
            <Phone className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          )}
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Maya</h2>
        <p className="text-sm font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">{status}</p>
      </div>

      <div className="w-full space-y-4">
        {!isAuthenticated && (
          <div className="text-center mb-4">
            <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-1">Trial Interaction</div>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i} 
                  className={`w-8 h-1 rounded-full transition-colors ${i <= commandCount ? 'bg-orange-500' : 'bg-gray-100 dark:bg-gray-800'}`}
                />
              ))}
            </div>
          </div>
        )}
        {!isConnected ? (
          <button
            onClick={startCall}
            className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-200"
          >
            <Phone className="w-5 h-5" />
            Start Call with Maya
          </button>
        ) : (
          <button
            onClick={stopCall}
            className="w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-100"
          >
            <PhoneOff className="w-5 h-5" />
            End Call
          </button>
        )}
      </div>

      <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 w-full">
        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold mb-4">
          <MessageSquare className="w-3 h-3" />
          Nepali AI Receptionist
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed italic">
          "नमस्ते, म माया हुँ। म तपाईंलाई कसरी मद्दत गर्न सक्छु?"
        </p>
      </div>
    </div>
  );
}
