import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquareCode,
  Send,
  Sparkles,
  Bot,
  User,
  RefreshCw,
  Lightbulb,
  Copy,
  Check,
  ChevronRight,
  Terminal,
  Trash2
} from 'lucide-react';
import { AnalysisReport, ChatMessage, StudentProfile } from '../types';

interface AiCareerAssistantPageProps {
  report: AnalysisReport;
  profile: StudentProfile;
}

interface MessageExtended extends ChatMessage {
  suggestedFollowUps?: string[];
  aiPowered?: boolean;
}

// Custom Markdown & Code Renderer for crystal clear answers
const FormattedMessage: React.FC<{ content: string }> = ({ content }) => {
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);

  // Split into blocks by code blocks
  const parts = content.split(/(```[\s\S]*?```)/g);

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  const renderInlineStyles = (text: string) => {
    const segments = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return segments.map((seg, i) => {
      if (seg.startsWith('**') && seg.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-slate-900 dark:text-white">
            {seg.slice(2, -2)}
          </strong>
        );
      }
      if (seg.startsWith('`') && seg.endsWith('`')) {
        return (
          <code
            key={i}
            className="px-1.5 py-0.5 mx-0.5 rounded font-mono text-[11px] bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700"
          >
            {seg.slice(1, -1)}
          </code>
        );
      }
      return seg;
    });
  };

  return (
    <div className="space-y-3 leading-relaxed text-xs sm:text-sm">
      {parts.map((part, pIdx) => {
        // Handle Fenced Code Blocks
        if (part.startsWith('```') && part.endsWith('```')) {
          const lines = part.slice(3, -3).trim().split('\n');
          const firstLine = lines[0].trim();
          const hasLang = /^[a-zA-Z0-9_-]+$/.test(firstLine);
          const lang = hasLang ? firstLine : 'code';
          const codeContent = hasLang ? lines.slice(1).join('\n') : lines.join('\n');

          return (
            <div
              key={pIdx}
              className="my-3 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 font-mono text-xs shadow-md"
            >
              <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5 uppercase font-semibold">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  {lang}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyCode(codeContent, pIdx)}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  {copiedCodeIdx === pIdx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto leading-normal text-slate-300">
                {codeContent}
              </pre>
            </div>
          );
        }

        // Handle regular text with headings & bullets
        const lines = part.split('\n');
        return (
          <div key={pIdx} className="space-y-1.5">
            {lines.map((line, lIdx) => {
              const trimmed = line.trim();

              if (!trimmed) {
                return <div key={lIdx} className="h-1.5" />;
              }

              // Heading 3: ### Title
              if (trimmed.startsWith('### ')) {
                return (
                  <h4
                    key={lIdx}
                    className="text-sm font-bold text-slate-900 dark:text-white pt-2.5 pb-0.5 flex items-center gap-1.5"
                  >
                    {renderInlineStyles(trimmed.slice(4))}
                  </h4>
                );
              }

              // Heading 2: ## Title
              if (trimmed.startsWith('## ')) {
                return (
                  <h3
                    key={lIdx}
                    className="text-base font-bold text-slate-900 dark:text-white pt-3 pb-1 border-b border-slate-100 dark:border-slate-800"
                  >
                    {renderInlineStyles(trimmed.slice(3))}
                  </h3>
                );
              }

              // Bullet points: - ... or * ...
              if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-2">
                    <span className="text-blue-500 font-bold mt-0.5">•</span>
                    <span className="text-slate-700 dark:text-slate-300">
                      {renderInlineStyles(trimmed.slice(2))}
                    </span>
                  </div>
                );
              }

              // Numbered lists: 1. ...
              const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
              if (numMatch) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-2">
                    <span className="font-bold text-blue-600 dark:text-blue-400 min-w-4 text-right">
                      {numMatch[1]}.
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">
                      {renderInlineStyles(numMatch[2])}
                    </span>
                  </div>
                );
              }

              // Regular paragraph
              return (
                <p key={lIdx} className="text-slate-700 dark:text-slate-300">
                  {renderInlineStyles(line)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export const AiCareerAssistantPage: React.FC<AiCareerAssistantPageProps> = ({
  report,
  profile
}) => {
  const topGaps = report.criticalGaps.slice(0, 3).map((g) => g.skillName);

  const initialWelcomeText = `### 👋 Welcome ${profile.fullName ? profile.fullName.split(' ')[0] : 'Student'}! I'm your AI Career Coach.

I've evaluated your skills, projects, and coursework against industry hiring standards for **${report.roleTitle}**.

### Your Career Snapshot:
- **Target Role**: **${report.roleTitle}**
- **Overall Readiness**: **${report.readinessScore}/100**
- **Critical Skill Gaps**: **${topGaps.join(', ') || 'Core role proficiencies'}**
- **Evaluation**: ${
    report.readinessScore >= 70
      ? 'Strong interview candidate foundation. Time to refine projects and practice mock technical rounds.'
      : 'Active preparation phase. Focus on closing your #1 critical gap to unlock interview eligibility.'
  }

Ask me anything about study schedules, project blueprints, coding interview preparation, or resume optimization!`;

  const [messages, setMessages] = useState<MessageExtended[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: initialWelcomeText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedFollowUps: [
        'What skills should I learn next?',
        'How can I improve my readiness score?',
        'Suggest projects for my career',
        'Create a 30-day learning plan'
      ]
    }
  ]);

  const [inputText, setInputText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Exact 6 core prompts from requirements
  const quickPrompts = [
    'What skills should I learn next?',
    'How can I improve my readiness score?',
    'Suggest projects for my career',
    'Create a 30-day learning plan',
    'Analyze my biggest skill gaps',
    'How can I improve my resume?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleCopyMessage = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(msgId);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: initialWelcomeText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: [
          'What skills should I learn next?',
          'How can I improve my readiness score?',
          'Suggest projects for my career',
          'Create a 30-day learning plan'
        ]
      }
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || loading) return;

    const userMsg: MessageExtended = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Keep history of previous turns (excluding initial welcome)
    const historyPayload = messages
      .slice(-6)
      .map((m) => ({ sender: m.sender, text: m.text }));

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: historyPayload,
          profile,
          roleTitle: report.roleTitle,
          readinessScore: report.readinessScore,
          topGaps
        })
      });

      if (res.ok) {
        const data = await res.json();
        const assistantMsg: MessageExtended = {
          id: `reply-${Date.now()}`,
          sender: 'assistant',
          text: data.reply || 'I am ready to assist with your next career milestone.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedFollowUps: data.suggestedFollowUps || [
            'What skills should I learn next?',
            'Suggest projects for my career',
            'How can I improve my resume?'
          ],
          aiPowered: data.aiPowered
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error('Server responded with error');
      }
    } catch {
      // Local fallback response tailored to student profile
      const firstGap = topGaps[0] || 'Core Technical Foundations';
      const fallbackMsg: MessageExtended = {
        id: `fallback-${Date.now()}`,
        sender: 'assistant',
        text: `### 🎯 Targeted Advice for ${report.roleTitle}

Based on your current readiness score of **${report.readinessScore}%**, your highest leverage is dedicating time to: **${firstGap}**.

### Action Steps:
1. **Daily Practice**: Spend 60 minutes writing clean code rather than reading passive articles.
2. **Close Gaps in Roadmap**: Check your **Learning Roadmap** tab to follow the Phase 1 curriculum.
3. **Build to Showcase**: Start a GitHub project validating your problem-solving and systems understanding.

### 🎯 Next Immediate Action
Commit one working algorithm or project module to your repository today.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: [
          'Create a 30-day learning plan',
          'Suggest projects for my career',
          'How can I improve my resume?'
        ]
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-12 flex flex-col h-[calc(100vh-8.5rem)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 shrink-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquareCode className="w-5 h-5 text-emerald-500" />
            <span>AI Career Assistant & Mentor</span>
          </h1>
          <p className="text-xs text-slate-500">
            Personalized guidance grounded in your <strong>{report.roleTitle}</strong> analysis ({report.readinessScore}% Readiness).
          </p>
        </div>

        <button
          onClick={handleClearChat}
          className="text-xs font-semibold text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors shadow-2xs"
          title="Clear chat and start fresh"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Suggested Quick Prompts Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0 scrollbar-none">
        <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap flex items-center gap-1">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          Suggested:
        </span>
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSendMessage(prompt)}
            disabled={loading}
            className="text-xs px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 text-slate-700 dark:text-slate-300 whitespace-nowrap transition-all shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 hover:-translate-y-0.5"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`flex items-start gap-3 sm:gap-4 ${isUser ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                    isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gradient-to-tr from-emerald-500 via-indigo-600 to-blue-600 text-white'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble Container */}
                <div
                  className={`max-w-[90%] sm:max-w-[80%] space-y-2 ${
                    isUser ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`p-4 sm:p-5 rounded-3xl shadow-xs transition-all ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-tr-xs'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-tl-xs'
                    }`}
                  >
                    {isUser ? (
                      <div className="text-xs sm:text-sm whitespace-pre-line leading-relaxed">
                        {msg.text}
                      </div>
                    ) : (
                      <FormattedMessage content={msg.text} />
                    )}

                    {/* Bubble Footer */}
                    <div
                      className={`flex items-center justify-between gap-3 mt-3 pt-2 text-[10px] ${
                        isUser
                          ? 'text-blue-200 border-t border-blue-500/50'
                          : 'text-slate-400 border-t border-slate-100 dark:border-slate-800'
                      }`}
                    >
                      <span>
                        {isUser
                          ? 'You'
                          : msg.aiPowered
                          ? 'AI Mentor (Gemini 3.8 Flash)'
                          : 'Career Intelligence Engine'}
                      </span>
                      <div className="flex items-center gap-2">
                        {!isUser && (
                          <button
                            type="button"
                            onClick={() => handleCopyMessage(msg.id, msg.text)}
                            className="hover:text-slate-700 dark:hover:text-slate-200 flex items-center gap-1 transition-colors"
                            title="Copy advice to clipboard"
                          >
                            {copiedMsgId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-500" />
                                <span className="text-emerald-500 font-semibold">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        )}
                        <span>{msg.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contextual Follow-up Chips for Assistant Messages */}
                  {!isUser && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1 pl-1">
                      <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1 mr-1">
                        <ChevronRight className="w-3 h-3 text-blue-500" />
                        Follow up:
                      </span>
                      {msg.suggestedFollowUps.map((q) => (
                        <button
                          key={q}
                          onClick={() => handleSendMessage(q)}
                          disabled={loading}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-all shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800/80 disabled:opacity-50"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Typing Indicator with Bouncing Dots */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 sm:gap-4"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-indigo-600 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-tl-xs shadow-xs text-xs text-slate-600 dark:text-slate-300 flex items-center gap-3">
              <div className="flex items-center gap-1.5 py-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-slate-500 dark:text-slate-400">
                AI Coach is analyzing your {report.roleTitle} skill profile...
              </span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Composer Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-2 sm:p-2.5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex items-end gap-2 shrink-0 focus-within:ring-2 focus-within:ring-blue-500/50 transition-all"
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Ask about ${report.roleTitle} prep, projects, or study plans... (Enter to send)`}
          disabled={loading}
          className="flex-1 px-3 py-2 text-xs sm:text-sm bg-transparent border-none text-slate-900 dark:text-white focus:outline-none resize-none max-h-32 min-h-6 leading-relaxed"
        />

        <button
          type="submit"
          disabled={loading || !inputText.trim()}
          className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all disabled:opacity-40 shadow-xs shrink-0 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Ask AI</span>
        </button>
      </form>
    </div>
  );
};
