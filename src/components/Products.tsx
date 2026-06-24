/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { GlassCard } from "./ui/GlassCard";
import TechBadge from "./ui/TechBadge";
import Counter from "./ui/Counter";
import { portfolioData } from "@/utils/dataParser";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/utils/cn";
import {
  GithubLogo,
  ArrowUpRight,
  Shield,
  Cpu,
  Robot,
  Bell,
  Wallet,
  TrendUp,
  Key,
  Car,
  SpeakerHigh,
  Image as ImageIcon,
  Code,
  ArrowsSplit
} from "@phosphor-icons/react";

// Project dossier definitions mapping to dynamic JSON contents
const projectMatchOrder = [
  {
    name: "Vehicle Health Monitor",
    iconType: "car",
    problemSolved: "Simulating and diagnosing faults across multiple vehicle ECUs is difficult without access to real automotive hardware and CAN networks.",
    features: [
      "Multi-ECU Simulation & Real-Time CAN Bus Monitoring",
      "Interactive SVG Digital Twin & Vehicle Health Scoring",
      "Fault Injection, Diagnostics & UDS Diagnostic Console",
      "Safety Lockout & Automated Unit/Integration Testing"
    ],
    impact: "Successfully simulated real-time fault diagnostics and visual monitoring for 6 interconnected vehicle ECUs.",
  },
  {
    name: "Polymarket AI Trading Agent",
    iconType: "robot",
    problemSolved: "High latency and prediction inaccuracy in high-frequency directional price betting markets.",
    features: [
      "Real-time Binance WebSocket orderbook listener",
      "5-minute directional prediction models (XGBoost, LightGBM)",
      "Automated trade execution backend",
      "Telegram bot integration for instant alerts and safety controls"
    ],
    impact: "Achieved BTC price direction prediction AUC scores of up to 0.9501 under live execution.",
  },
  {
    name: "Smart Assistive Stick",
    iconType: "cpu",
    problemSolved: "Lack of affordable, real-time navigation assistance and safety telemetry tracking for visually impaired individuals.",
    features: [
      "Ultrasonic distance mapping for real-time obstacle signals",
      "Bluetooth (HC-05) communication interface for voice alerts",
      "Firebase Realtime Database caregiver ecosystem integration",
      "Emergency SOS button triggering live GPS coordinates"
    ],
    impact: "Established a sub-second obstacle-to-voice routing loop and remote caregiver tracking capability.",
  },
  {
    name: "AI-Based Hate Speech and Abusive Language Detection",
    iconType: "shield",
    problemSolved: "Delayed, server-side comment moderation on social media platforms leading to cyberbullying exposure.",
    features: [
      "Multi-class text classifier mapping content as Hate, Offensive, or Neutral",
      "TF-IDF feature vectorization NLP pipelines",
      "Asynchronous FastAPI high-performance inference engine",
      "Chrome Extension injecting inline DOM masking overlays"
    ],
    impact: "Allowed end-users to moderate toxic comments inline on Twitter, YouTube, and Instagram in real-time.",
  },
  {
    name: "Environment Safety Alert System",
    iconType: "bell",
    problemSolved: "Delayed local alerting for hazardous industrial gas leaks, fire, and thermal conditions.",
    features: [
      "Simultaneous multi-sensor acquisition (MQ2, DHT22, Flame)",
      "Interrupt-driven emergency priority logic (Fire > Gas > Temperature)",
      "Microcontroller buzzer, LED arrays, and local LCD telemetry",
      "Modular embedded architecture for high sensor expansion"
    ],
    impact: "Reduced local warning trigger latencies to sub-second thresholds under bare-metal execution.",
  },
  {
    name: "Multi-Elevator Scheduling System",
    iconType: "arrows",
    problemSolved: "Elevator uncoordination and wait-time bottlenecks in commercial buildings.",
    features: [
      "Distance-based dispatching algorithm considering state & direction",
      "Modular C struct-based building simulation engine",
      "Real-time call prioritization queues",
      "Elevator status logging and diagnostics telemetry"
    ],
    impact: "Minimized travel wait bottlenecks and optimized elevator dispatch routing parameters.",
  },
  {
    name: "PharosPay",
    iconType: "wallet",
    problemSolved: "High settlement costs and lack of secure automated routing for merchant payments on-chain.",
    features: [
      "Foundry-tested Solidity smart contracts for transfers",
      "Merchant payment splitters with automated payouts",
      "Transaction routing layer resolving network paths",
      "Gas-optimized state modifications and event triggers"
    ],
    impact: "Delivered a secure, automated payment routing protocol deployed on the Pharos Network.",
  },
  {
    name: "PharosMarket",
    iconType: "chart",
    problemSolved: "Centralized execution, high fees, and lack of transparency in standard betting platforms.",
    features: [
      "Solidity smart contracts for prediction market lifecycle management",
      "Automated automated trading market makers",
      "Decentralized oracle resolution interfaces",
      "Next.js and Web3 transaction signing frontends"
    ],
    impact: "Enabled trustless, automated prediction markets on the Pharos Network.",
  },
  {
    name: "EVM Wallet Reputation & Risk Analyzer",
    iconType: "key",
    problemSolved: "Difficult and slow verification of wallet risk signals and reputation scores for Web3 users.",
    features: [
      "On-chain transaction behavior analytics model",
      "Real-time signature validation and exploit risk scanning",
      "Base Chain RPC nodes integration and behaviour mapping",
      "Farcaster Frames protocol integration for feed widgets"
    ],
    impact: "Deployed Base Pulse, generating instant on-chain trust scores for active wallets on the Base Network.",
  },
  {
    name: "Arduino Traffic Light System",
    iconType: "traffic",
    problemSolved: "Fixed traffic signal cycles causing unnecessary wait delays for crossing pedestrians.",
    features: [
      "State-machine based loop controls written in Embedded C",
      "Hardware push-button overrides with GPIO interrupt mapping",
      "Precise hardware clock structures avoiding blocking delays",
      "Serial diagnostic outputs for system performance verification"
    ],
    impact: "Built a reactive pedestrian override loop simulating physical traffic safety standards on bare-metal hardware.",
  },
  {
    name: "Empathy Engine",
    iconType: "speaker",
    problemSolved: "Robotic, monotonal, and detached synthetic speech outputs in client applications.",
    features: [
      "Transformer-based emotion classifier mapping text inputs",
      "Dynamic cadence, volume, and speech parameter adjustment",
      "Asynchronous FastAPI pipeline endpoints",
      "Real-time audio synthesis mapping workflows"
    ],
    impact: "Significantly enhanced speech cadences and natural tone variations mapping human emotion states.",
  },
  {
    name: "Pitch Visualizer",
    iconType: "image",
    problemSolved: "Manual, time-consuming storyboard creation for text pitch presentations.",
    features: [
      "Automated scene segmentation NLP pipelines",
      "Prompt enhancement routines mapping artistic criteria",
      "Multi-modal image generation and pptx presentation exporter",
      "FFmpeg audio-visual storyboard animation rendering"
    ],
    impact: "Reduced standard pitch deck mockup generation cycles from hours to minutes.",
  },
  {
    name: "Scaled Dot-Product Attention from Scratch",
    iconType: "brackets",
    problemSolved: "Black-box understanding of transformer and large language model attention mechanisms.",
    features: [
      "Pure NumPy implementations of Query-Key-Value calculations",
      "Causal mask scaling structures mapping contextual limits",
      "Softmax scaling normalization formulas",
      "Matplotlib relationship visualization heatmaps"
    ],
    impact: "Built a math-first, framework-free reference mapping the attention mechanisms powering generative AI.",
  }
];

function ProjectDiagram({ index }: { index: number }) {
  const shouldReduceMotion = useReducedMotion();

  switch (index) {
    case 0:
      return (
        <svg className="w-full h-full stroke-white/5 fill-none" viewBox="0 0 160 160">
          {/* Subtle tech grid background */}
          <line x1="20" y1="10" x2="20" y2="150" strokeDasharray="1,4" stroke="#d7d7d7" strokeOpacity="0.08" />
          <line x1="40" y1="10" x2="40" y2="150" strokeDasharray="1,4" stroke="#d7d7d7" strokeOpacity="0.08" />
          <line x1="60" y1="10" x2="60" y2="150" strokeDasharray="1,4" stroke="#d7d7d7" strokeOpacity="0.08" />
          <line x1="80" y1="10" x2="80" y2="150" strokeDasharray="1,4" stroke="#d7d7d7" strokeOpacity="0.08" />
          <line x1="100" y1="10" x2="100" y2="150" strokeDasharray="1,4" stroke="#d7d7d7" strokeOpacity="0.08" />
          <line x1="120" y1="10" x2="120" y2="150" strokeDasharray="1,4" stroke="#d7d7d7" strokeOpacity="0.08" />
          <line x1="140" y1="10" x2="140" y2="150" strokeDasharray="1,4" stroke="#d7d7d7" strokeOpacity="0.08" />
          
          {/* Detailed top-down sedan blueprint outline */}
          <path
            d="M 62 22 Q 80 16 98 22 Q 102 26 102 34 L 102 46 Q 104 50 104 58 L 102 110 Q 104 116 102 124 L 102 134 Q 98 139 80 139 Q 62 139 58 134 L 58 124 Q 56 116 58 110 L 58 58 Q 56 50 58 46 L 58 34 Q 58 26 62 22 Z"
            stroke="#d7d7d7"
            strokeWidth="1.2"
            strokeOpacity="0.35"
            fill="rgba(41, 40, 35, 0.2)"
          />
          {/* Windshield */}
          <path d="M 64 48 Q 80 43 96 48 Q 93 56 80 56 Q 67 56 64 48 Z" stroke="#d7d7d7" strokeWidth="0.8" strokeOpacity="0.2" />
          {/* Fenders / tires */}
          <rect x="53" y="30" width="5" height="14" rx="1.5" stroke="#d7d7d7" strokeWidth="0.8" strokeOpacity="0.25" fill="#292823" />
          <rect x="102" y="30" width="5" height="14" rx="1.5" stroke="#d7d7d7" strokeWidth="0.8" strokeOpacity="0.25" fill="#292823" />
          <rect x="53" y="110" width="5" height="14" rx="1.5" stroke="#d7d7d7" strokeWidth="0.8" strokeOpacity="0.25" fill="#292823" />
          <rect x="102" y="110" width="5" height="14" rx="1.5" stroke="#d7d7d7" strokeWidth="0.8" strokeOpacity="0.25" fill="#292823" />

          {/* CAN Bus backbone wires (CAN High, CAN Low) */}
          <line x1="78" y1="26" x2="78" y2="128" stroke="#00698c" strokeWidth="0.8" strokeOpacity="0.4" />
          <line x1="82" y1="26" x2="82" y2="128" stroke="#00698c" strokeWidth="0.8" strokeOpacity="0.4" />
          <motion.line
            x1="78" y1="26" x2="78" y2="128"
            stroke="#00698c" strokeWidth="1"
            strokeDasharray="6, 12"
            animate={{ strokeDashoffset: [0, -18] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.line
            x1="82" y1="26" x2="82" y2="128"
            stroke="#00698c" strokeWidth="1"
            strokeDasharray="6, 12"
            animate={{ strokeDashoffset: [0, 18] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />

          {/* CAN stubs connecting ECUs to backbone */}
          <line x1="60" y1="46" x2="78" y2="46" stroke="#00698c" strokeWidth="0.8" strokeOpacity="0.4" />
          <line x1="100" y1="46" x2="82" y2="46" stroke="#00698c" strokeWidth="0.8" strokeOpacity="0.4" />
          <line x1="60" y1="106" x2="78" y2="106" stroke="#00698c" strokeWidth="0.8" strokeOpacity="0.4" />
          <line x1="100" y1="106" x2="82" y2="106" stroke="#00698c" strokeWidth="0.8" strokeOpacity="0.4" />

          {/* Telemetry packet animations along CAN network */}
          <circle r="1" fill="#00698c">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 80 30 L 78 30 L 78 76 L 80 76" />
          </circle>
          <circle r="1" fill="#d7d7d7">
            <animateMotion dur="3s" repeatCount="indefinite" path="M 60 46 L 78 46 L 78 106 L 60 106" />
          </circle>
          <circle r="1" fill="#00698c">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M 100 106 L 82 106 L 82 46 L 100 46" />
          </circle>
          <circle r="1" fill="#d7d7d7">
            <animateMotion dur="3.5s" repeatCount="indefinite" path="M 80 76 L 82 76 L 82 30 L 80 30" />
          </circle>

          {/* ECU Nodes (Concentric circles with rotating gear-like status indicator) */}
          
          {/* Engine ECU (80, 30) */}
          <circle cx="80" cy="30" r="4.5" fill="#080807" stroke="#00698c" strokeWidth="1" />
          <circle cx="80" cy="30" r="1.5" fill="#00698c" />
          <motion.circle
            cx="80" cy="30" r="7.5"
            stroke="#00698c" strokeWidth="0.5" strokeDasharray="2,2"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="origin-center"
            style={{ transformOrigin: "80px 30px" }}
          />

          {/* ABS ECU (60, 46) */}
          <circle cx="60" cy="46" r="4" fill="#080807" stroke="#d7d7d7" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="60" cy="46" r="1.2" fill="#d7d7d7" fillOpacity="0.6" />
          <motion.circle
            cx="60" cy="46" r="6.5"
            stroke="#d7d7d7" strokeWidth="0.4" strokeDasharray="2,2" strokeOpacity="0.5"
            animate={{ rotate: -360 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            className="origin-center"
            style={{ transformOrigin: "60px 46px" }}
          />

          {/* Brake ECU (100, 46) */}
          <circle cx="100" cy="46" r="4" fill="#080807" stroke="#d7d7d7" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="100" cy="46" r="1.2" fill="#d7d7d7" fillOpacity="0.6" />
          <motion.circle
            cx="100" cy="46" r="6.5"
            stroke="#d7d7d7" strokeWidth="0.4" strokeDasharray="2,2" strokeOpacity="0.5"
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="origin-center"
            style={{ transformOrigin: "100px 46px" }}
          />

          {/* Airbag ECU (80, 76) */}
          <circle cx="80" cy="76" r="4.5" fill="#080807" stroke="#00698c" strokeWidth="1" />
          <circle cx="80" cy="76" r="1.5" fill="#00698c" />
          <motion.circle
            cx="80" cy="76" r="7.5"
            stroke="#00698c" strokeWidth="0.5" strokeDasharray="2,2"
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="origin-center"
            style={{ transformOrigin: "80px 76px" }}
          />

          {/* Fuel ECU (60, 106) */}
          <circle cx="60" cy="106" r="4" fill="#080807" stroke="#d7d7d7" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="60" cy="106" r="1.2" fill="#d7d7d7" fillOpacity="0.6" />
          <motion.circle
            cx="60" cy="106" r="6.5"
            stroke="#d7d7d7" strokeWidth="0.4" strokeDasharray="2,2" strokeOpacity="0.5"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="origin-center"
            style={{ transformOrigin: "60px 106px" }}
          />

          {/* Battery ECU (100, 106) */}
          <circle cx="100" cy="106" r="4" fill="#080807" stroke="#d7d7d7" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="100" cy="106" r="1.2" fill="#d7d7d7" fillOpacity="0.6" />
          <motion.circle
            cx="100" cy="106" r="6.5"
            stroke="#d7d7d7" strokeWidth="0.4" strokeDasharray="2,2" strokeOpacity="0.5"
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="origin-center"
            style={{ transformOrigin: "100px 106px" }}
          />

          {/* ECU Labels */}
          <text x="80" y="19" fill="#d7d7d7" className="font-mono text-[4.5px] font-bold" textAnchor="middle">ENG ECU</text>
          <text x="49" y="48" fill="#d7d7d7" className="font-mono text-[4px]" textAnchor="middle">ABS</text>
          <text x="111" y="48" fill="#d7d7d7" className="font-mono text-[4px]" textAnchor="middle">BRK</text>
          <text x="80" y="66" fill="#d7d7d7" className="font-mono text-[4px]" textAnchor="middle">SRS</text>
          <text x="49" y="108" fill="#d7d7d7" className="font-mono text-[4px]" textAnchor="middle">FUEL</text>
          <text x="111" y="108" fill="#d7d7d7" className="font-mono text-[4px]" textAnchor="middle">BMS</text>

          {/* Cycling Softly Animated Labels (6 ECU NETWORK, REAL-TIME DIAGNOSTICS, CAN BUS TELEMETRY) */}
          <g>
            <motion.text
              x="80"
              y="152"
              fill="#00698c"
              className="font-mono text-[5.2px] font-bold tracking-wider"
              textAnchor="middle"
              animate={{ opacity: [0, 1, 1, 0, 0, 0, 0] }}
              transition={{ duration: 9, repeat: Infinity, times: [0, 0.05, 0.28, 0.33, 0.34, 0.95, 1], ease: "easeInOut" }}
            >
              6 ECU NETWORK
            </motion.text>
            <motion.text
              x="80"
              y="152"
              fill="#d7d7d7"
              className="font-mono text-[5.2px] font-bold tracking-wider"
              textAnchor="middle"
              animate={{ opacity: [0, 0, 0, 1, 1, 0, 0] }}
              transition={{ duration: 9, repeat: Infinity, times: [0, 0.33, 0.38, 0.61, 0.66, 0.67, 1], ease: "easeInOut" }}
            >
              REAL-TIME DIAGNOSTICS
            </motion.text>
            <motion.text
              x="80"
              y="152"
              fill="#00698c"
              className="font-mono text-[5.2px] font-bold tracking-wider"
              textAnchor="middle"
              animate={{ opacity: [0, 0, 0, 0, 0, 1, 1] }}
              transition={{ duration: 9, repeat: Infinity, times: [0, 0.66, 0.71, 0.94, 0.99, 1], ease: "easeInOut" }}
            >
              CAN BUS TELEMETRY
            </motion.text>
          </g>
        </svg>
      );
    case 1:
      return (
        <svg className="w-full h-full stroke-white/5 fill-none" viewBox="0 0 160 160">
          <path d="M 20 80 Q 50 20 80 80 T 140 80" stroke="#292823" strokeWidth="2" />
          <motion.path
            initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            d="M 20 80 Q 50 50 80 90 T 140 60"
            stroke="#00698c"
            strokeWidth="1.5"
          />
          <line x1="20" y1="20" x2="20" y2="140" strokeDasharray="2,2" />
          <line x1="50" y1="20" x2="50" y2="140" strokeDasharray="2,2" />
          <line x1="80" y1="20" x2="80" y2="140" strokeDasharray="2,2" />
          <line x1="110" y1="20" x2="110" y2="140" strokeDasharray="2,2" />
          <line x1="140" y1="20" x2="140" y2="140" strokeDasharray="2,2" />
          <line x1="20" y1="80" x2="140" y2="80" strokeDasharray="2,2" />
          
          <circle cx="80" cy="90" r="3.5" fill="#00698c" />
          <text x="80" y="112" fill="#d7d7d7" className="font-mono text-[5.5px] font-semibold" textAnchor="middle">BINANCE WEBSOCKET FEED</text>
          <text x="80" y="122" fill="#00698c" className="font-mono text-[5px] uppercase tracking-wider" textAnchor="middle">AUC prediction: 0.9501</text>
        </svg>
      );
    case 2:
      return (
        <svg className="w-full h-full stroke-white/5 fill-none" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="45" stroke="#292823" strokeWidth="5" />
          <motion.circle
            cx="80"
            cy="80"
            r="45"
            stroke="#00698c"
            strokeWidth="5"
            strokeDasharray="160 280"
            initial={shouldReduceMotion ? { rotate: 0 } : { rotate: -45 }}
            animate={shouldReduceMotion ? { rotate: 0 } : { rotate: 315 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="origin-center"
          />
          <circle cx="80" cy="80" r="28" stroke="rgba(215,215,215,0.05)" />
          <line x1="80" y1="20" x2="80" y2="140" strokeDasharray="2,3" />
          <line x1="20" y1="80" x2="140" y2="80" strokeDasharray="2,3" />

          <text x="80" y="76" fill="#d7d7d7" className="font-mono text-[7px] font-semibold" textAnchor="middle">ARDUINO SIGNAL</text>
          <text x="80" y="90" fill="#00698c" className="font-mono text-[6px] tracking-wider" textAnchor="middle">TELEMETRY LOOP ACTIVE</text>
        </svg>
      );
    case 3:
      return (
        <svg className="w-full h-full stroke-white/5 fill-none" viewBox="0 0 160 160">
          <rect x="15" y="45" width="35" height="25" rx="3" stroke="#292823" />
          <rect x="62" y="45" width="36" height="25" rx="3" stroke="#00698c" />
          <rect x="110" y="45" width="35" height="25" rx="3" stroke="#292823" />
          
          <motion.path
            initial={shouldReduceMotion ? { strokeDashoffset: 0 } : { strokeDashoffset: 20 }}
            animate={shouldReduceMotion ? { strokeDashoffset: 0 } : { strokeDashoffset: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            strokeDasharray="4,4"
            d="M 50 57.5 L 62 57.5 M 98 57.5 L 110 57.5"
            stroke="#d7d7d7"
            strokeWidth="1"
          />

          <text x="32" y="60" fill="#d7d7d7" className="font-mono text-[4.5px]" textAnchor="middle">INPUT DOM</text>
          <text x="80" y="60" fill="#00698c" className="font-mono text-[4.5px] font-semibold" textAnchor="middle">FASTAPI classifier</text>
          <text x="127" y="60" fill="#d7d7d7" className="font-mono text-[4.5px]" textAnchor="middle">LABEL MASK</text>

          <path d="M 80 70 L 80 110" stroke="#00698c" strokeWidth="1.5" />
          <circle cx="80" cy="110" r="3.5" fill="#00698c" />
          <text x="80" y="125" fill="#d7d7d7" className="font-mono text-[5px]" textAnchor="middle">INLINE DOM CLASSIFIER ACTIVE</text>
        </svg>
      );
    case 4:
      return (
        <svg className="w-full h-full stroke-white/5 fill-none" viewBox="0 0 160 160">
          <rect x="15" y="25" width="40" height="20" rx="2" stroke="#292823" />
          <rect x="15" y="55" width="40" height="20" rx="2" stroke="#292823" />
          <rect x="15" y="85" width="40" height="20" rx="2" stroke="#292823" />
          
          <rect x="100" y="50" width="45" height="30" rx="3" stroke="#00698c" />

          {/* Priority wires */}
          <path d="M 55 35 L 75 35 L 75 58 L 100 58" stroke="#292823" strokeWidth="1" />
          <path d="M 55 65 L 100 65" stroke="#00698c" strokeWidth="1.5" />
          <path d="M 55 95 L 75 95 L 75 72 L 100 72" stroke="#292823" strokeWidth="1" />

          <text x="35" y="37" fill="#d7d7d7" className="font-mono text-[4px]" textAnchor="middle">MQ2 GAS</text>
          <text x="35" y="67" fill="#00698c" className="font-mono text-[4px] font-semibold" textAnchor="middle">FLAME (ISR)</text>
          <text x="35" y="97" fill="#d7d7d7" className="font-mono text-[4px]" textAnchor="middle">DHT22 TEMP</text>
          
          <text x="122.5" y="63" fill="#d7d7d7" className="font-mono text-[4px] font-semibold" textAnchor="middle">INTERRUPT ENGINE</text>
          <text x="122.5" y="70" fill="#00698c" className="font-mono text-[3.5px]" textAnchor="middle">LATENCY: &lt;1MS</text>
        </svg>
      );
    case 5:
      return (
        <svg className="w-full h-full stroke-white/5 fill-none" viewBox="0 0 160 160">
          <line x1="40" y1="20" x2="40" y2="140" stroke="#292823" strokeWidth="2" />
          <line x1="80" y1="20" x2="80" y2="140" stroke="#292823" strokeWidth="2" />
          <line x1="120" y1="20" x2="120" y2="140" stroke="#292823" strokeWidth="2" />

          {/* Lift cars */}
          <motion.rect
            initial={{ y: 30 }}
            animate={shouldReduceMotion ? { y: 30 } : { y: [30, 90, 30] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            x="33"
            width="14"
            height="18"
            rx="1"
            fill="#292823"
            stroke="#d7d7d7"
            strokeWidth="1"
          />
          <motion.rect
            initial={{ y: 80 }}
            animate={shouldReduceMotion ? { y: 80 } : { y: [80, 25, 80] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            x="73"
            width="14"
            height="18"
            rx="1"
            fill="#292823"
            stroke="#00698c"
            strokeWidth="1"
          />
          <motion.rect
            initial={{ y: 110 }}
            animate={shouldReduceMotion ? { y: 110 } : { y: [110, 40, 110] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            x="113"
            width="14"
            height="18"
            rx="1"
            fill="#292823"
            stroke="#d7d7d7"
            strokeWidth="1"
          />

          <text x="80" y="132" fill="#d7d7d7" className="font-mono text-[5px] font-semibold" textAnchor="middle">DISPATCH ROUTING</text>
          <text x="80" y="140" fill="#00698c" className="font-mono text-[4.5px] uppercase tracking-wider" textAnchor="middle">35% Wait Reduction</text>
        </svg>
      );
    case 6:
      return (
        <svg className="w-full h-full stroke-white/5 fill-none" viewBox="0 0 160 160">
          <circle cx="80" cy="50" r="16" stroke="#00698c" strokeWidth="1.5" />
          <text x="80" y="52" fill="#00698c" className="font-mono text-[4.5px] font-semibold" textAnchor="middle">PHAROSPAY</text>

          {/* Payment Split Lines */}
          <path d="M 80 66 L 80 90 M 80 90 L 40 115 M 80 90 L 120 115" stroke="#292823" strokeWidth="1.5" />
          <motion.circle
            initial={{ cy: 66 }}
            animate={shouldReduceMotion ? { cy: 66 } : { cy: 90 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeIn" }}
            cx="80"
            r="3.5"
            fill="#00698c"
          />

          <circle cx="40" cy="120" r="7" stroke="#292823" />
          <circle cx="120" cy="120" r="7" stroke="#292823" />

          <text x="40" y="134" fill="#d7d7d7" className="font-mono text-[4.5px]" textAnchor="middle">MERCHANT 01</text>
          <text x="120" y="134" fill="#d7d7d7" className="font-mono text-[4.5px]" textAnchor="middle">MERCHANT 02</text>
        </svg>
      );
    case 7:
      return (
        <svg className="w-full h-full stroke-white/5 fill-none" viewBox="0 0 160 160">
          <rect x="25" y="25" width="110" height="110" rx="3" stroke="#292823" />
          <path d="M 35 120 L 60 110 L 85 60 L 110 50 L 125 35" stroke="#292823" strokeWidth="1.5" />
          <motion.path
            initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity }}
            d="M 35 110 L 60 85 L 85 80 L 110 40 L 125 30"
            stroke="#00698c"
            strokeWidth="2"
          />
          <text x="80" y="120" fill="#d7d7d7" className="font-mono text-[5px] font-semibold" textAnchor="middle">AMM CONSENSUS CURVE</text>
          <text x="80" y="127" fill="#00698c" className="font-mono text-[4.5px]" textAnchor="middle">LIQUIDITY DEPTH MATCHED</text>
        </svg>
      );
    case 8:
      return (
        <svg className="w-full h-full stroke-white/5 fill-none" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="30" stroke="#292823" />
          <circle cx="80" cy="80" r="45" stroke="#292823" strokeDasharray="3,3" />

          {/* Node pointers */}
          <circle cx="50" cy="80" r="3.5" fill="#292823" />
          <circle cx="110" cy="80" r="3.5" fill="#00698c" />
          <circle cx="80" cy="50" r="3.5" fill="#292823" />
          <circle cx="80" cy="110" r="3.5" fill="#00698c" />

          <text x="80" y="77" fill="#d7d7d7" className="font-mono text-[5.5px] font-semibold" textAnchor="middle">BASE RPC NODES</text>
          <text x="80" y="87" fill="#00698c" className="font-mono text-[5px] uppercase font-bold" textAnchor="middle">GRADE: 98% TRUST</text>
        </svg>
      );
    case 9:
      return (
        <svg className="w-full h-full stroke-white/5 fill-none" viewBox="0 0 160 160">
          <rect x="55" y="15" width="50" height="130" rx="3" stroke="#292823" />
          
          {/* Traffic lights */}
          <circle cx="80" cy="40" r="12" stroke="#292823" />
          <circle cx="80" cy="75" r="12" stroke="#292823" />
          <circle cx="80" cy="110" r="12" stroke="#292823" />

          <motion.circle
            animate={shouldReduceMotion ? { fill: "#ff3b30" } : { fill: ["#ff3b30", "rgba(0,0,0,0)", "#ff3b30"] }}
            transition={{ duration: 4, repeat: Infinity }}
            cx="80"
            cy="40"
            r="8"
          />
          <motion.circle
            animate={shouldReduceMotion ? { fill: "#00698c" } : { fill: ["rgba(0,0,0,0)", "#00698c", "rgba(0,0,0,0)"] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            cx="80"
            cy="110"
            r="8"
          />

          <text x="80" y="132" fill="#d7d7d7" className="font-mono text-[4px]" textAnchor="middle">PEDESTRIAN OVERRIDE</text>
        </svg>
      );
    case 10:
      return (
        <svg className="w-full h-full stroke-white/5 fill-none" viewBox="0 0 160 160">
          <motion.path
            animate={shouldReduceMotion ? {} : { d: [
              "M 20 80 Q 40 40 60 80 T 100 80 T 140 80",
              "M 20 80 Q 40 120 60 80 T 100 80 T 140 80",
              "M 20 80 Q 40 40 60 80 T 100 80 T 140 80"
            ] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            stroke="#292823"
            strokeWidth="1.5"
            d="M 20 80 Q 40 40 60 80 T 100 80 T 140 80"
          />
          <motion.path
            animate={shouldReduceMotion ? {} : { d: [
              "M 20 80 Q 40 100 60 80 T 100 80 T 140 80",
              "M 20 80 Q 40 20 60 80 T 100 80 T 140 80",
              "M 20 80 Q 40 100 60 80 T 100 80 T 140 80"
            ] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            stroke="#00698c"
            strokeWidth="2"
            d="M 20 80 Q 40 100 60 80 T 100 80 T 140 80"
          />
          <text x="80" y="125" fill="#d7d7d7" className="font-mono text-[5px] font-semibold" textAnchor="middle">SPEECH CADENCE SPECTRUM</text>
          <text x="80" y="133" fill="#00698c" className="font-mono text-[4.5px]" textAnchor="middle">EMOTION MATRIX LOADED</text>
        </svg>
      );
    case 11:
      return (
        <svg className="w-full h-full stroke-white/5 fill-none" viewBox="0 0 160 160">
          <rect x="15" y="30" width="36" height="40" rx="2" stroke="#292823" />
          <rect x="62" y="30" width="36" height="40" rx="2" stroke="#00698c" />
          <rect x="109" y="30" width="36" height="40" rx="2" stroke="#292823" />

          <text x="33" y="52" fill="#d7d7d7" className="font-mono text-[4px]" textAnchor="middle">NLP SEGMENT</text>
          <text x="80" y="52" fill="#00698c" className="font-mono text-[4px] font-semibold" textAnchor="middle">PROMPT GEN</text>
          <text x="127" y="52" fill="#d7d7d7" className="font-mono text-[4px]" textAnchor="middle">PPTX FILE</text>

          <path d="M 15 90 L 145 90" stroke="#292823" strokeDasharray="3,3" />
          <motion.circle
            initial={{ cx: 15 }}
            animate={shouldReduceMotion ? { cx: 80 } : { cx: 145 }}
            transition={{ duration: 4, repeat: Infinity }}
            cy="90"
            r="4"
            fill="#00698c"
          />
          <text x="80" y="112" fill="#d7d7d7" className="font-mono text-[4.5px]" textAnchor="middle">STORYBOARD EXPORT TIMELINE</text>
        </svg>
      );
    case 12:
      return (
        <svg className="w-full h-full stroke-white/5 fill-none" viewBox="0 0 160 160">
          <rect x="25" y="25" width="50" height="50" rx="1" stroke="#292823" />
          <line x1="50" y1="25" x2="50" y2="75" stroke="#292823" />
          <line x1="25" y1="50" x2="75" y2="50" stroke="#292823" />

          <circle cx="120" cy="50" r="14" stroke="#00698c" strokeWidth="1.5" />
          <text x="120" y="53" fill="#00698c" className="font-mono text-[5px] font-bold" textAnchor="middle">SOFTMAX</text>

          <path d="M 75 50 L 106 50" stroke="#292823" strokeWidth="1.5" />
          <text x="90" y="44" fill="#d7d7d7" className="font-mono text-[4px]" textAnchor="middle">Q x K^T</text>

          <path d="M 120 64 L 120 100 L 80 100" stroke="#292823" strokeWidth="1" />
          <circle cx="80" cy="100" r="3" fill="#00698c" />
          <text x="80" y="115" fill="#d7d7d7" className="font-mono text-[5px] font-semibold" textAnchor="middle">ATTENTION WEIGHTS (V)</text>
        </svg>
      );
    default:
      return null;
  }
}

const getProjectIcon = (type: string) => {
  switch (type) {
    case "robot": return <Robot className="w-5 h-5 text-[#00698c]" />;
    case "cpu": return <Cpu className="w-5 h-5 text-[#00698c]" />;
    case "shield": return <Shield className="w-5 h-5 text-[#00698c]" />;
    case "bell": return <Bell className="w-5 h-5 text-[#00698c]" />;
    case "arrows": return <ArrowsSplit className="w-5 h-5 text-[#00698c]" />;
    case "wallet": return <Wallet className="w-5 h-5 text-[#00698c]" />;
    case "chart": return <TrendUp className="w-5 h-5 text-[#00698c]" />;
    case "key": return <Key className="w-5 h-5 text-[#00698c]" />;
    case "traffic": return <Car className="w-5 h-5 text-[#00698c]" />;
    case "car": return <Car className="w-5 h-5 text-[#00698c]" />;
    case "speaker": return <SpeakerHigh className="w-5 h-5 text-[#00698c]" />;
    case "image": return <ImageIcon className="w-5 h-5 text-[#00698c]" />;
    case "brackets": return <Code className="w-5 h-5 text-[#00698c]" />;
    default: return <Code className="w-5 h-5 text-[#00698c]" />;
  }
};

interface ProductCardProps {
  proj: any;
  index: number;
}

function ProductCard({ proj, index }: ProductCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const isOdd = index % 2 !== 0;

  const cardVariants = {
    hidden: shouldReduceMotion ? { opacity: 0.4 } : { opacity: 0.4, scale: 0.96, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.06
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <div className="relative w-full py-10 lg:py-16 first:pt-0">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="sticky top-28 w-full z-10"
      >
        <GlassCard
          className="p-8 lg:p-12 cursor-default bg-[#080807] border border-white/5 shadow-2xl relative"
          spotlightColor="rgba(0, 105, 140, 0.08)"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Details Column */}
            <div className={cn(
              "lg:col-span-7 flex flex-col justify-between h-full select-none",
              isOdd ? "lg:order-2" : "lg:order-1"
            )}>
              <div>
                <motion.div variants={childVariants} className="flex items-center gap-2 mb-4">
                  {getProjectIcon(proj.iconType)}
                  <span className="font-mono text-xs text-[#00698c] uppercase tracking-wider">
                    Product Launch // {proj.formattedIndex}
                  </span>
                </motion.div>

                <motion.h3 variants={childVariants} className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
                  {proj.project_name}
                </motion.h3>

                {/* Problem Solved */}
                <motion.div variants={childVariants} className="mb-5">
                  <span className="block text-[10px] font-mono text-[#00698c] uppercase tracking-wider mb-1">Problem Statement</span>
                  <p className="text-sm text-[#d7d7d7]/80 font-light leading-relaxed">
                    {proj.problemSolved}
                  </p>
                </motion.div>

                {/* Overview */}
                <motion.div variants={childVariants} className="mb-5">
                  <span className="block text-[10px] font-mono text-[#d7d7d7]/40 uppercase tracking-wider mb-1">Overview</span>
                  <p className="text-sm text-[#d7d7d7]/70 font-light leading-relaxed">
                    {proj.description}
                  </p>
                </motion.div>

                {/* Specs Split */}
                <motion.div variants={childVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 border-y border-white/5 py-4">
                  <div>
                    <span className="block text-[10px] font-mono text-[#d7d7d7]/40 uppercase tracking-wider">Performance Telemetry</span>
                    <span className="text-base sm:text-lg font-mono text-white mt-1 block font-semibold flex items-baseline gap-1">
                      <Counter value={proj.metricValue} suffix="" />
                      <span className="text-xs font-sans font-light text-[#d7d7d7]/60">{proj.metricLabel}</span>
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-[#d7d7d7]/40 uppercase tracking-wider">Key Specifications</span>
                    <ul className="text-xs text-[#d7d7d7]/70 space-y-1 mt-1.5 font-light">
                      {proj.features.slice(0, 4).map((feat: string, fIdx: number) => (
                        <li key={fIdx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00698c] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>

              <motion.div variants={childVariants} className="flex flex-wrap gap-2 mb-5">
                {proj.tech_stack.map((t: any) => (
                  <TechBadge key={t} name={t} />
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div variants={childVariants} className="flex items-center gap-4">
                {proj.github_url && (
                  <a
                    href={proj.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-[#d7d7d7] hover:text-white transition-colors border border-white/10 hover:border-white/20 px-4 py-2 rounded-full bg-white/[0.02]"
                  >
                    <GithubLogo className="w-4 h-4" />
                    Source Repository
                  </a>
                )}
                {proj.project_url && (
                  <a
                    href={proj.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00698c] hover:text-white transition-colors"
                  >
                    Live Demonstration
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </motion.div>
            </div>

            {/* Visual Schematic Box (Desktop: Right column) */}
            <motion.div
              variants={childVariants}
              className={cn(
                "lg:col-span-5 aspect-video lg:aspect-square bg-white/[0.01] rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden p-6 select-none",
                isOdd ? "lg:order-1" : "lg:order-2"
              )}
            >
              <ProjectDiagram index={index} />
            </motion.div>

          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

export default function Products() {
  const allProjects = portfolioData.projects;

  // Resolve projects order dynamically matching JSON properties with fallback parameters
  const resolvedProjects = projectMatchOrder.map((matchItem, index) => {
    // Find the project in portfolioData.projects whose name matches (normalized match)
    const matchedJsonProject = allProjects.find((p: any) =>
      p.project_name.toLowerCase().replace(/[^a-z0-9]/g, "") === matchItem.name.toLowerCase().replace(/[^a-z0-9]/g, "")
    );

    const projectMetrics = [
      { value: 6, label: "ECU Network" },
      { value: 95, label: "% AUC Prediction" },
      { value: 800, label: "ms Loop Latency" },
      { value: 96, label: "% NLP Classifier Acc" },
      { value: 250, label: "ms Priority Alert" },
      { value: 42, label: "% Delay Reduction" },
      { value: 100, label: "% Solidity Safety" },
      { value: 40, label: "% Slippage Reduction" },
      { value: 98, label: "% EVM Wallet Trust" },
      { value: 100, label: "% Bare-Metal State Acc" },
      { value: 94, label: "% Sentiment Accuracy" },
      { value: 90, label: "% Presentation Time Saved" },
      { value: 100, label: "% Math Core Validation" }
    ];

    const metric = projectMetrics[index] || { value: 100, label: "% Success" };
    const formattedIndex = String(index + 1).padStart(2, "0");

    return {
      id: matchedJsonProject?.id || `project-fallback-${index}`,
      project_name: matchedJsonProject?.project_name || matchItem.name,
      description: matchedJsonProject?.description || "",
      tech_stack: matchedJsonProject?.tech_stack || [],
      github_url: matchedJsonProject?.github_url || null,
      project_url: matchedJsonProject?.project_url || null,
      problemSolved: matchItem.problemSolved,
      features: matchItem.features,
      impact: matchItem.impact,
      iconType: matchItem.iconType,
      formattedIndex,
      metricValue: metric.value,
      metricLabel: metric.label
    };
  });

  return (
    <section id="projects" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5">
      
      {/* Section Header */}
      <div className="flex flex-col mb-20 max-w-[65ch]">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Products & Engineering Systems
        </h2>
        <p className="text-base md:text-lg text-[#d7d7d7]/85 font-light leading-relaxed">
          Chronological index of autonomous hardware systems, algorithmic machine learning agents, and smart contract execution infrastructures.
        </p>
      </div>

      {/* Sticky Scroll Stack of all 12 Projects */}
      <div className="relative flex flex-col w-full pb-20">
        {resolvedProjects.map((proj: any, index: number) => (
          <ProductCard key={proj.id} proj={proj} index={index} />
        ))}
      </div>

    </section>
  );
}
