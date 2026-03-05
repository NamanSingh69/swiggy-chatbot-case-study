"use client";

import { motion } from "framer-motion";

export default function ProposedSolution() {
    return (
        <section id="solution" className="relative py-24 sm:py-32">
            <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="badge bg-success/10 text-success border border-success/20 mb-4">
                        Solution
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
                        The <span className="gradient-text">Proposed Fix</span>
                    </h2>
                    <p className="mt-4 text-base sm:text-lg md:text-xl text-muted max-w-3xl mx-auto">
                        Why the context window drops between bot tiers, and how to patch the
                        pipeline using a unified state manager.
                    </p>
                </motion.div>

                {/* Root Cause Analysis */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass rounded-2xl p-8 sm:p-10 mb-24"
                >
                    <h3 className="text-2xl xl:text-3xl font-bold text-danger mb-6 flex items-center justify-center gap-3">
                        <span className="w-2 h-2 bg-danger rounded-full animate-pulse" />
                        Root Cause Analysis
                    </h3>
                    <div className="space-y-6 text-base xl:text-lg text-foreground/80 leading-relaxed">
                        <div className="glass rounded-xl p-6 text-center">
                            <h4 className="text-lg font-semibold text-warning mb-3">
                                1. Stateless Tier Transitions
                            </h4>
                            <p>
                                Each support tier (Tier 1 Bot → Human Agent → Escalation Desk) operates
                                as an <strong className="text-foreground">isolated session</strong>. When a chat is
                                transferred, the receiving tier gets a blank context window with zero
                                conversation history. The NLP classification result{" "}
                                <code className="text-cyan font-mono bg-cyan/10 px-1.5 py-0.5 rounded text-xs">
                                    intent: general_escalation
                                </code>{" "}
                                that triggered the transfer is <em>not</em> passed downstream.
                            </p>
                        </div>

                        <div className="glass rounded-xl p-6 text-center">
                            <h4 className="text-lg font-semibold text-warning mb-3">
                                2. VoIP Queue Without Execution Verification
                            </h4>
                            <p>
                                The callback system successfully <strong className="text-foreground">enqueues</strong> a
                                VoIP call when an agent is assigned, but there is no execution
                                verification loop. The queue entry is created, marked as &quot;pending,&quot; and
                                then left without a timeout or retry mechanism. The agent sees the
                                assignment but has no mechanism to initiate the actual call — the VoIP
                                bridge between the queue and the telephony system is disconnected.
                            </p>
                        </div>

                        <div className="glass rounded-xl p-6 text-center">
                            <h4 className="text-lg font-semibold text-warning mb-3">
                                3. Intent Classification Bypass via Semantic Framing
                            </h4>
                            <p>
                                The NLP intent classifier uses a{" "}
                                <strong className="text-foreground">keyword-first matching strategy</strong>. Any input
                                containing &quot;cancel&quot; is routed to{" "}
                                <code className="text-danger font-mono bg-danger/10 px-1.5 py-0.5 rounded text-xs">
                                    order_cancellation
                                </code>{" "}
                                regardless of semantic context. By reframing the request as &quot;I have a
                                concern&quot; — removing cancellation keywords while preserving the user&apos;s
                                intent — the classifier maps to{" "}
                                <code className="text-success font-mono bg-success/10 px-1.5 py-0.5 rounded text-xs">
                                    general_escalation
                                </code>
                                , which has no hardcoded rejection gate.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Proposed Architecture */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass rounded-2xl p-6 sm:p-8 mb-24"
                >
                    <h3 className="text-2xl xl:text-3xl font-bold text-success mb-6 flex items-center justify-center gap-3">
                        <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                        Unified State Manager Architecture
                    </h3>
                    <p className="text-base xl:text-lg text-muted mb-8 text-center">
                        Replace stateless tier transitions with a centralized conversation state
                        manager that persists context across all tiers:
                    </p>

                    {/* Architecture diagram (simplified) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        {[
                            {
                                tier: "Tier 1",
                                label: "NLP Bot",
                                desc: "Intent classification + initial response",
                                color: "#06b6d4",
                            },
                            {
                                tier: "State Manager",
                                label: "Context Bridge",
                                desc: "Persists conversation, intent, and metadata across all transitions",
                                color: "#22c55e",
                            },
                            {
                                tier: "Tier 2+",
                                label: "Human / Escalation",
                                desc: "Receives full context window from State Manager",
                                color: "#a855f7",
                            },
                        ].map((item) => (
                            <div
                                key={item.tier}
                                className="rounded-xl border p-4 text-center transition-all hover:scale-[1.02]"
                                style={{
                                    borderColor: `${item.color}30`,
                                    background: `linear-gradient(135deg, ${item.color}08, ${item.color}03)`,
                                }}
                            >
                                <div
                                    className="text-[10px] font-mono font-bold uppercase tracking-wider mb-1"
                                    style={{ color: item.color }}
                                >
                                    {item.tier}
                                </div>
                                <div className="text-sm font-semibold text-foreground mb-1">
                                    {item.label}
                                </div>
                                <div className="text-xs text-muted">{item.desc}</div>
                            </div>
                        ))}
                    </div>

                    {/* Code snippet */}
                    <div className="code-block p-4 overflow-x-auto">
                        <pre className="text-foreground/80 text-sm md:text-base xl:text-lg">
                            <code>{`// Proposed: Unified Conversation State Manager
interface ConversationState {
  sessionId: string;
  userId: string;
  history: Message[];               // Full conversation history
  intents: IntentClassification[];   // All detected intents
  currentTier: 'bot' | 'agent' | 'escalation';
  metadata: {
    orderId: string;
    escalationReason: string;
    callbackStatus: 'pending' | 'queued' | 'initiated' | 'failed';
    contextTransfers: number;
  };
}

class StateManager {
  // Persist across tier transitions — no more context drops
  async transferToTier(
    state: ConversationState,
    targetTier: string
  ): Promise<ConversationState> {
    // 1. Serialize full conversation context
    const snapshot = await this.createSnapshot(state);

    // 2. Transfer with verification
    const transferred = await this.bridge.send(targetTier, snapshot);

    // 3. Verify receiving tier acknowledged context
    if (!transferred.contextReceived) {
      throw new ContextTransferError('Tier did not acknowledge context');
    }

    return { ...state, currentTier: targetTier };
  }

  // VoIP callback with execution verification
  async initiateCallback(state: ConversationState): Promise<void> {
    const callId = await this.voip.queue(state.userId);

    // Retry loop with exponential backoff
    for (let attempt = 0; attempt < 3; attempt++) {
      const status = await this.voip.checkStatus(callId);
      if (status === 'initiated') return;

      await this.wait(Math.pow(2, attempt) * 1000);
      await this.voip.retry(callId);
    }

    // Fallback: route to live chat with full context
    await this.fallbackToChat(state);
  }
}`}</code>
                        </pre>
                    </div>
                </motion.div>

                {/* Key Recommendations */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="glass rounded-2xl p-6 sm:p-8 mb-24"
                >
                    <h3 className="text-2xl xl:text-3xl font-bold gradient-text mb-8 text-center">
                        Key Recommendations
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            {
                                num: "01",
                                title: "Semantic Intent Classification",
                                desc: "Replace keyword-first matching with embedding-based classification. Use sentence transformers to understand user intent holistically rather than pattern-matching on trigger words.",
                            },
                            {
                                num: "02",
                                title: "Context Persistence Layer",
                                desc: "Implement a Redis-backed session store that persists across tier transitions. Every agent (bot or human) receives the full conversation state.",
                            },
                            {
                                num: "03",
                                title: "VoIP Execution Verification",
                                desc: "Add a callback monitoring service with retry logic, timeouts, and automatic fallback to live chat when telephony pipeline fails.",
                            },
                            {
                                num: "04",
                                title: "Adversarial Testing Pipeline",
                                desc: "Run automated red-team tests against the intent classifier to detect semantic bypass vectors before they reach production.",
                            },
                        ].map((rec) => (
                            <div
                                key={rec.num}
                                className="glass rounded-xl p-5 transition-all hover:border-border-hover text-center"
                            >
                                <div className="text-2xl font-bold text-cyan/30 font-mono mb-2">
                                    {rec.num}
                                </div>
                                <h4 className="text-base xl:text-xl font-semibold text-foreground mb-3">
                                    {rec.title}
                                </h4>
                                <p className="text-sm xl:text-base text-muted leading-relaxed">{rec.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Author / CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="relative rounded-2xl p-10 sm:p-14 text-center overflow-hidden"
                    style={{
                        background: "linear-gradient(135deg, rgba(6,182,212,0.08), rgba(168,85,247,0.08), rgba(34,197,94,0.06))",
                        border: "1px solid rgba(6,182,212,0.15)",
                    }}
                >
                    {/* Background glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan/10 rounded-full blur-[100px] pointer-events-none" />

                    <h3 className="relative text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Authored by Naman Singh
                    </h3>
                    <p className="relative text-lg sm:text-xl text-muted mb-10 max-w-xl mx-auto leading-relaxed">
                        Second year B.Tech Computer Engineering student with a
                        passion for AI systems, security research, and building
                        things that matter.
                    </p>
                    <div className="relative flex flex-wrap items-center justify-center gap-4">
                        <a
                            href="https://github.com/NamanSingh69"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-cyan/15 text-cyan border border-cyan/25 text-base font-bold transition-all hover:bg-cyan/25 hover:scale-[1.04] hover:shadow-lg hover:shadow-cyan/10"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            GitHub Profile
                        </a>
                        <a
                            href="https://www.linkedin.com/in/naman-singh419/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/25 text-base font-bold transition-all hover:bg-blue-500/25 hover:scale-[1.04] hover:shadow-lg hover:shadow-blue-500/10"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            LinkedIn Profile
                        </a>
                    </div>
                </motion.div>

                {/* Footer */}
                <div className="mt-20 pb-8 text-center">
                    <p className="text-sm text-muted/40">
                        This case study documents a real interaction for educational and responsible disclosure
                        purposes. All findings were reported to the platform.
                    </p>
                </div>
            </div>
        </section>
    );
}
