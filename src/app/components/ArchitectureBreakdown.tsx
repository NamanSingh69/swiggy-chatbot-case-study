"use client";

import { motion } from "framer-motion";

interface FlowNode {
    id: string;
    label: string;
    sublabel?: string;
    color: "cyan" | "danger" | "success" | "warning" | "purple" | "muted";
    x: number;
    y: number;
    width?: number;
}

const nodes: FlowNode[] = [
    { id: "input", label: "User Input", sublabel: '"I want to cancel my order"', color: "cyan", x: 375, y: 30, width: 250 },
    { id: "nlp", label: "NLP Intent Classifier", sublabel: "Pattern Matching Engine", color: "cyan", x: 375, y: 160, width: 250 },
    { id: "cancel", label: "intent: order_cancellation", sublabel: "Hardcoded rejection path", color: "danger", x: 100, y: 310, width: 280 },
    { id: "escalate", label: "intent: general_escalation", sublabel: '"I have a concern"', color: "success", x: 620, y: 310, width: 280 },
    { id: "reject", label: "REJECTION WALL", sublabel: "Emotional manipulation + deflection", color: "danger", x: 100, y: 460, width: 280 },
    { id: "queue", label: "VoIP Callback Queue", sublabel: "Agent assignment system", color: "warning", x: 620, y: 460, width: 280 },
    { id: "dead", label: "❌ USER BLOCKED", sublabel: "Cannot reach human agent", color: "danger", x: 100, y: 610, width: 280 },
    { id: "voip_fail", label: "⚠️ EXECUTION FAILURE", sublabel: "Call queued but never initiated", color: "warning", x: 620, y: 610, width: 280 },
    { id: "context_drop", label: "CONTEXT DROP", sublabel: "New session — history lost", color: "purple", x: 375, y: 760, width: 250 },
    { id: "loop", label: "🔄 INFINITE LOOP", sublabel: "Generic automated responses", color: "purple", x: 375, y: 900, width: 250 },
];

interface FlowEdge {
    from: string;
    to: string;
    color: "cyan" | "danger" | "success" | "warning" | "purple";
    label?: string;
}

const edges: FlowEdge[] = [
    { from: "input", to: "nlp", color: "cyan" },
    { from: "nlp", to: "cancel", color: "danger", label: "cancellation keywords" },
    { from: "nlp", to: "escalate", color: "success", label: '"concern" / "feedback"' },
    { from: "cancel", to: "reject", color: "danger" },
    { from: "escalate", to: "queue", color: "success" },
    { from: "reject", to: "dead", color: "danger" },
    { from: "queue", to: "voip_fail", color: "warning" },
    { from: "voip_fail", to: "context_drop", color: "purple" },
    { from: "context_drop", to: "loop", color: "purple" },
];

function getColor(c: string) {
    const map: Record<string, string> = {
        cyan: "#06b6d4",
        danger: "#ef4444",
        success: "#22c55e",
        warning: "#f59e0b",
        purple: "#a855f7",
        muted: "#71717a",
    };
    return map[c] || map.muted;
}

function getNodeCenter(n: FlowNode) {
    const w = n.width || 250;
    return { x: n.x + w / 2, y: n.y + 42 };
}

export default function ArchitectureBreakdown() {
    return (
        <section id="architecture" className="relative py-24 sm:py-32 grid-bg">
            <div className="max-w-[1400px] mx-auto pl-10 sm:pl-14 lg:pl-20 pr-6 sm:pr-8 lg:pr-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="badge bg-warning/10 text-warning border border-warning/20 mb-4">
                        Architecture
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
                        The <span className="gradient-text">Decision Tree</span>
                    </h2>
                    <p className="mt-4 text-base sm:text-lg md:text-xl text-muted max-w-3xl mx-auto">
                        How the rigid NLP intent classifier created an exploitable bypass
                        path and led to a broken execution pipeline.
                    </p>
                </motion.div>

                {/* Flowchart */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="glass rounded-2xl p-6 sm:p-8 overflow-x-auto flex justify-center"
                >
                    <div className="min-w-[900px] relative mx-auto" style={{ width: 1000, height: 1000 }}>
                        <svg
                            viewBox="0 0 1000 1000"
                            className="absolute inset-0 w-full h-full"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                {["cyan", "danger", "success", "warning", "purple"].map((c) => (
                                    <marker
                                        key={c}
                                        id={`arrow-${c}`}
                                        viewBox="0 0 10 7"
                                        refX="10"
                                        refY="3.5"
                                        markerWidth="8"
                                        markerHeight="6"
                                        orient="auto-start-reverse"
                                    >
                                        <path d="M 0 0 L 10 3.5 L 0 7 z" fill={getColor(c)} />
                                    </marker>
                                ))}
                                {["cyan", "danger", "success", "warning", "purple"].map((c) => (
                                    <linearGradient key={`glow-${c}`} id={`glow-${c}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={getColor(c)} stopOpacity="0.6" />
                                        <stop offset="100%" stopColor={getColor(c)} stopOpacity="0.1" />
                                    </linearGradient>
                                ))}
                            </defs>

                            {/* Edges */}
                            {edges.map((edge, i) => {
                                const fromNode = nodes.find((n) => n.id === edge.from)!;
                                const toNode = nodes.find((n) => n.id === edge.to)!;
                                const fromC = getNodeCenter(fromNode);
                                const toC = getNodeCenter(toNode);
                                const fromBottom = { x: fromC.x, y: fromNode.y + 85 };
                                const toTop = { x: toC.x, y: toNode.y };

                                // Curve for diagonal lines
                                const isDiagonal = Math.abs(fromC.x - toC.x) > 50;
                                const midY = (fromBottom.y + toTop.y) / 2;

                                return (
                                    <g key={i}>
                                        {isDiagonal ? (
                                            <path
                                                d={`M ${fromBottom.x} ${fromBottom.y} C ${fromBottom.x} ${midY}, ${toTop.x} ${midY}, ${toTop.x} ${toTop.y}`}
                                                stroke={getColor(edge.color)}
                                                strokeWidth="2"
                                                strokeDasharray={edge.color === "danger" ? "6 4" : "none"}
                                                markerEnd={`url(#arrow-${edge.color})`}
                                                opacity={0.7}
                                            />
                                        ) : (
                                            <line
                                                x1={fromBottom.x}
                                                y1={fromBottom.y}
                                                x2={toTop.x}
                                                y2={toTop.y}
                                                stroke={getColor(edge.color)}
                                                strokeWidth="2"
                                                markerEnd={`url(#arrow-${edge.color})`}
                                                opacity={0.7}
                                            />
                                        )}
                                        {edge.label && (
                                            <text
                                                x={(fromBottom.x + toTop.x) / 2 + (fromC.x < toC.x ? -60 : 10)}
                                                y={midY - 5}
                                                fill={getColor(edge.color)}
                                                fontSize="12"
                                                fontFamily="'JetBrains Mono', monospace"
                                                opacity={0.8}
                                            >
                                                {edge.label}
                                            </text>
                                        )}
                                    </g>
                                );
                            })}
                        </svg>

                        {/* Nodes */}
                        {nodes.map((node, i) => {
                            const nodeColor = getColor(node.color);
                            return (
                                <motion.div
                                    key={node.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.08 }}
                                    className="absolute rounded-xl border text-center px-3 py-2.5 cursor-default transition-all hover:scale-[1.03]"
                                    style={{
                                        left: node.x,
                                        top: node.y,
                                        width: node.width || 250,
                                        height: 85,
                                        borderColor: `${nodeColor}40`,
                                        background: `linear-gradient(135deg, ${nodeColor}10, ${nodeColor}05)`,
                                        boxShadow: `0 0 20px ${nodeColor}10`,
                                    }}
                                >
                                    <div
                                        className="text-sm font-bold font-mono"
                                        style={{ color: nodeColor }}
                                    >
                                        {node.label}
                                    </div>
                                    {node.sublabel && (
                                        <div className="text-xs text-muted mt-1.5 leading-tight">
                                            {node.sublabel}
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Key insights */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {[
                        {
                            title: "Rigid Intent Classification",
                            desc: 'The NLP engine uses keyword-matching for "cancel" → hardcoded rejection. Semantic variations like "concern" map to a completely different path.',
                            color: "danger",
                            icon: "🔒",
                        },
                        {
                            title: "Broken VoIP Pipeline",
                            desc: "Agent assignment succeeds but the callback initiation step fails silently. No timeout, no retry logic, no fallback to chat resolution.",
                            color: "warning",
                            icon: "📞",
                        },
                        {
                            title: "Context Amnesia",
                            desc: "Every tier transfer creates a new session. Prior conversation, intent classification results, and user context are completely dropped.",
                            color: "purple",
                            icon: "🧠",
                        },
                    ].map((card) => (
                        <div
                            key={card.title}
                            className="glass rounded-xl p-6 transition-all hover:border-border-hover"
                        >
                            <div className="text-2xl mb-3">{card.icon}</div>
                            <h3
                                className="text-lg xl:text-xl font-semibold mb-3"
                                style={{ color: getColor(card.color) }}
                            >
                                {card.title}
                            </h3>
                            <p className="text-base text-muted leading-relaxed">{card.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
