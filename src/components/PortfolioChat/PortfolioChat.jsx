'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useExperience } from '@/components/Experience/ExperienceClient';
import { topics, matchTopic, topicAnswer } from './questions.mjs';
import styles from './PortfolioChat.module.css';

const greeting =
  'Hi, I’m Dububot, Ram’s portfolio guide. Ask a short question or pick a topic to get to know his work.';
function TypedAnswer({ text, animate = true, onProgress, audio = false }) {
  const [count, setCount] = useState(animate ? 0 : text.length);
  const typingDelay = useRef(audio ? 60 : 28);
  useEffect(() => {
    if (!animate) {
      setCount(text.length);
      return;
    }
    setCount(0);
    let position = 0;
    const interval = setInterval(() => {
      position = Math.min(text.length, position + 1);
      setCount(position);
      onProgress?.();
      if (position === text.length) clearInterval(interval);
    }, typingDelay.current);
    return () => clearInterval(interval);
  }, [text, animate, onProgress]);
  return (
    <p>
      <span className={styles.srOnly}>{text}</span>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {count < text.length && <span className={styles.typingCaret} />}
      </span>
    </p>
  );
}
function Robot({ idle, speaking, facing }) {
  const [welcoming, setWelcoming] = useState(false);
  const [codeLength, setCodeLength] = useState(0);
  const code = 'const hello = () => {\n  return "Hi, Ram!";\n};\nhello();';
  useEffect(() => {
    if (!idle) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setCodeLength(code.length);
      return;
    }
    if (welcoming) return;
    let hold = 0;
    const typing = setInterval(() => {
      if (document.hidden) return;
      setCodeLength((length) => {
        if (length < code.length) return length + 1;
        return ++hold > 22 ? ((hold = 0), 0) : length;
      });
    }, 100);
    return () => clearInterval(typing);
  }, [idle, welcoming, code.length]);
  useEffect(() => {
    if (!idle) {
      setWelcoming(false);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let welcomeTimer, returnTimer;
    let running = false;
    function schedule(delay = 6000) {
      clearTimeout(welcomeTimer);
      clearTimeout(returnTimer);
      running = false;
      setWelcoming(false);
      if (document.hidden) return;
      welcomeTimer = setTimeout(() => {
        running = true;
        setWelcoming(true);
        returnTimer = setTimeout(() => schedule(20000), 11000);
      }, delay);
    }
    const activity = () => {
      if (!running) schedule();
    };
    const visibility = () => schedule();
    const events = ['pointerdown', 'keydown', 'scroll'];
    events.forEach((event) => window.addEventListener(event, activity, { passive: true }));
    document.addEventListener('visibilitychange', visibility);
    schedule();
    return () => {
      clearTimeout(welcomeTimer);
      clearTimeout(returnTimer);
      events.forEach((event) => window.removeEventListener(event, activity));
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [idle]);
  return (
    <svg
      className={`${styles.dubuScene} ${welcoming ? styles.dubuGreeting : ''}`}
      viewBox="-75 0 470 320"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dubuShell" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ffffff" />
          <stop offset=".5" stopColor="#dce7f8" />
          <stop offset="1" stopColor="#8196b6" />
        </linearGradient>
        <linearGradient id="dubuMetal">
          <stop stopColor="#7488a7" />
          <stop offset=".45" stopColor="#d1def0" />
          <stop offset="1" stopColor="#536a89" />
        </linearGradient>
        <radialGradient id="dubuFloor">
          <stop stopColor="#8788d6" stopOpacity=".25" />
          <stop offset="1" stopColor="#8788d6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="146" cy="297" rx="230" ry="21" fill="url(#dubuFloor)" />
      <g>
        <path
          d="M157 203 241 175 313 193 229 221Z"
          fill="#a4b7d0"
          stroke="#8096b3"
          strokeWidth="1"
        />
        <path d="M157 203v7l72 18v-7Z" fill="#7087a6" />
        <path d="m229 221 84-28v7l-84 28Z" fill="#536d8e" />
        <path
          d="m162 210-10 80h7l10-78zm64 17 8 63h7l-9-65zm78-25 12 88h7l-12-90Z"
          fill="url(#dubuMetal)"
        />
        <path d="M178 204 237 184 283 195 221 216Z" fill="#233b56" fillOpacity=".3" />
      </g>
      <g>
        {/* The keyboard extends toward Dububot; the lid faces him across the hinge. */}
        <path
          d="M177 200 237 180 281 190 221 210Z"
          fill="#c3d3e8"
          stroke="#7187a5"
          strokeWidth="1.5"
        />
        <path d="M177 200v4l44 11 60-20v-5l-60 20Z" fill="#8298b6" />
        <path
          d="M221 210 237 115 297 95 281 190Z"
          fill="#657c9b"
          stroke="#afc3dc"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M228 200 242 121 290 105 276 184Z" fill="#102638" />
        <g transform="matrix(.43 -.143 -.145 .82 245 128)">
          <text x="0" y="0" fill="#a4eced" fontSize="8.5" fontFamily="monospace">
            {code
              .slice(0, codeLength)
              .split('\n')
              .map((line, index) => (
                <tspan key={index} x="0" dy={index ? 12 : 0}>
                  {line}
                  {index === code.slice(0, codeLength).split('\n').length - 1 ? '▌' : ''}
                </tspan>
              ))}
          </text>
        </g>
        <path d="M194 199 239 184 266 191 221 206Z" fill="#5b7291" />
        <path
          d="m202 197 27 7m-17-10 27 7m-17-10 27 7m-17-10 27 7M203 201l45-15m-34 18 45-15"
          stroke="#bfd1e7"
          strokeWidth="1.2"
        />
        <path d="m186 201 10-3 12 3-10 3Z" fill="#8ea5c1" />
        <path d="m221 210 60-20" stroke="#435f7e" strokeWidth="3" />
      </g>
      <g className={styles.dubuChair}>
        <path
          d="M84 164q-17-8-18 10v41q0 12 15 12h58v-13H84z"
          fill="#3a4565"
          stroke="#667698"
          strokeWidth="3"
        />
        <path
          d="M87 219q31-4 64 4 7 2 6 7-1 5-9 5H91q-10-1-10-7 0-6 6-9Z"
          fill="#495879"
          stroke="#7486a5"
          strokeWidth="2"
        />
        <path
          d="M96 222q27-1 49 4"
          stroke="#9cacc7"
          strokeOpacity=".5"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M119 235v49m-27 7 27-7 29 7"
          stroke="#7c8fae"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </g>
      <g className={styles.dubuCharacter}>
        <g className={styles.dubuTypingArms} strokeLinecap="round" strokeLinejoin="round">
          <path d="M141 166 155 187 201 194" stroke="#788eac" strokeWidth="17" />
          <path d="M141 166 155 187 201 194" stroke="url(#dubuShell)" strokeWidth="13" />
          <circle cx="141" cy="166" r="8" fill="#bfd0e6" stroke="#edf5ff" strokeWidth="1.5" />
          <circle cx="155" cy="187" r="7" fill="#9ab0cd" stroke="#e4efff" strokeWidth="1.5" />
          <g className={styles.dubuFingers}>
            <rect x="196" y="190" width="15" height="7" rx="3.5" fill="url(#dubuShell)" />
          </g>
        </g>
        <g className={styles.dubuFarWalkingArm} strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(126 170) scale(.8) translate(-126 -170)">
            <path d="M126 170 122 201 134 230" stroke="#7189a8" strokeWidth="16" />
            <path d="M126 170 122 201 134 230" stroke="url(#dubuShell)" strokeWidth="12" />
            <circle cx="122" cy="201" r="6" fill="#9aafca" />
            <rect x="127" y="225" width="16" height="20" rx="8" fill="#b0c3dc" stroke="none" />
          </g>
        </g>
        <g className={styles.dubuFeet} fill="url(#dubuShell)">
          <g className={styles.dubuLegLeft}>
            <path
              d="M116 209v30l-3 32"
              stroke="url(#dubuShell)"
              strokeWidth="17"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="116" cy="239" r="8" fill="#a4b8d3" stroke="#e6f1ff" strokeWidth="2" />
            <rect x="101" y="270" width="34" height="17" rx="8" />
          </g>
          <g className={styles.dubuLegRight}>
            <path
              d="M144 209v30l3 32"
              stroke="url(#dubuShell)"
              strokeWidth="17"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="144" cy="239" r="8" fill="#a4b8d3" stroke="#e6f1ff" strokeWidth="2" />
            <rect x="133" y="270" width="34" height="17" rx="8" />
          </g>
        </g>
        <g className={styles.dubuSeatedLegs} strokeLinecap="round" strokeLinejoin="round">
          <path d="M112 211q10 14 35 15l-2 44" stroke="#8199b8" strokeWidth="20" />
          <path d="M112 209q10 14 35 15l-2 44" stroke="url(#dubuShell)" strokeWidth="16" />
          <circle cx="147" cy="224" r="8" fill="#a4b8d3" stroke="#e6f1ff" strokeWidth="2" />
          <rect x="137" y="269" width="32" height="17" rx="8" fill="url(#dubuShell)" />
          <path d="M134 213q12 15 31 15l-2 43" stroke="#8199b8" strokeWidth="22" />
          <path d="M134 211q12 15 31 15l-2 43" stroke="url(#dubuShell)" strokeWidth="17" />
          <circle cx="165" cy="226" r="9" fill="#a4b8d3" stroke="#e6f1ff" strokeWidth="2" />
          <rect x="155" y="270" width="33" height="17" rx="8" fill="url(#dubuShell)" />
        </g>
        <g>
          <ellipse
            cx="125"
            cy="184"
            rx="36"
            ry="39"
            fill="url(#dubuShell)"
            stroke="#9aaec9"
            strokeWidth="1.5"
          />
          <ellipse cx="118" cy="177" rx="24" ry="28" fill="#f2f8ff" fillOpacity=".24" />
          <circle cx="146" cy="184" r="3" fill="#68d9e5" />
        </g>
        <path d="M111 143v12h25v-12" fill="#6d85a6" />
        <g className={styles.dubuSkull}>
          <path d="M106 58V45" stroke="#a4bbd5" strokeWidth="4" />
          <circle cx="106" cy="42" r="6" fill="#7ae9f1" />
          <path
            d="M77 69q16-17 48-12 35 4 39 32v27q-4 31-39 32-49 0-53-32V90q0-13 5-21"
            fill="url(#dubuShell)"
            stroke="#b3c6df"
            strokeWidth="2"
          />
          <g className={styles.dubuProfile}>
            <path d="M140 74q23 5 24 23v17q-3 19-23 22l-6-10V84z" fill="#102b40" />
            <ellipse cx="154" cy="101" rx="4" ry="10" fill="#7af2f5" />
            <path d="m150 121 8-3" stroke="#7af2f5" strokeWidth="2" strokeLinecap="round" />
            <ellipse
              cx="91"
              cy="103"
              rx="13"
              ry="20"
              fill="#a0b6d1"
              stroke="#e8f3ff"
              strokeWidth="3"
            />
            <circle cx="91" cy="103" r="6" fill="#6c86a8" />
          </g>
          <g className={styles.dubuFront}>
            <rect x="85" y="76" width="66" height="52" rx="19" fill="#102b40" />
            <rect x="99" y="91" width="8" height="17" rx="4" fill="#7af2f5" />
            <rect x="129" y="91" width="8" height="17" rx="4" fill="#7af2f5" />
            <path d="M112 116q7 9 14 0" stroke="#7af2f5" strokeWidth="2" fill="none" />
          </g>
        </g>
        <g className={styles.dubuTypingArms} strokeLinecap="round" strokeLinejoin="round">
          <path d="M110 168 131 196 185 202" stroke="#788eac" strokeWidth="20" />
          <path d="M110 168 131 196 185 202" stroke="url(#dubuShell)" strokeWidth="16" />
          <circle cx="110" cy="168" r="10" fill="#bfd0e6" stroke="#edf5ff" strokeWidth="2" />
          <circle cx="131" cy="196" r="8" fill="#9ab0cd" stroke="#e4efff" strokeWidth="1.5" />
          <g className={styles.dubuFingers}>
            <rect x="181" y="198" width="20" height="9" rx="4.5" fill="url(#dubuShell)" />
            <path d="M192 200h5" stroke="#8199b8" strokeWidth="1" />
          </g>
        </g>
        <g className={styles.dubuNearWalkingArm} strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(124 170) scale(.8) translate(-124 -170)">
            <path d="M124 170 132 200 145 229" stroke="#8299b7" strokeWidth="20" />
            <path d="M124 170 132 200 145 229" stroke="url(#dubuShell)" strokeWidth="15" />
            <circle cx="124" cy="170" r="10" fill="#c4d5e9" stroke="#edf5ff" strokeWidth="2" />
            <circle cx="132" cy="200" r="7" fill="#a4b8d3" stroke="#e6f1ff" strokeWidth="2" />
            <rect
              x="136"
              y="224"
              width="20"
              height="23"
              rx="9"
              fill="url(#dubuShell)"
              stroke="none"
            />
          </g>
        </g>
        <g className={styles.dubuRestArm} strokeLinecap="round">
          <g transform="translate(149 168) scale(.8) translate(-149 -168)">
            <path d="M149 168 165 194 161 219" stroke="#8299b7" strokeWidth="20" />
            <path d="M149 168 164 194 160 218" stroke="url(#dubuShell)" strokeWidth="15" />
            <circle cx="164" cy="194" r="7" fill="#a4b8d3" stroke="#e6f1ff" strokeWidth="2" />
            <rect x="150" y="213" width="21" height="25" rx="10" fill="url(#dubuShell)" />
          </g>
        </g>
        <g className={styles.dubuWaveArm} strokeLinecap="round">
          <g transform="translate(101 170) scale(.8) translate(-101 -170)">
            <path d="M101 170 74 152 66 119" stroke="#8299b7" strokeWidth="20" />
            <path d="M101 168 76 151 68 118" stroke="url(#dubuShell)" strokeWidth="15" />
            <rect x="57" y="97" width="22" height="31" rx="10" fill="url(#dubuShell)" />
          </g>
        </g>
      </g>
      <g className={styles.dubuHello}>
        <rect
          x="196"
          y="32"
          width="143"
          height="54"
          rx="16"
          fill="var(--surface)"
          stroke="var(--accent2)"
          strokeOpacity=".4"
        />
        <text x="211" y="54" fill="var(--text)" fontSize="13">
          Hi, I’m Dububot!
        </text>
        <text x="211" y="72" fill="var(--accent2)" fontSize="10">
          Tap me. Let’s talk ↗
        </text>
      </g>
    </svg>
  );
}
export default function PortfolioChat({ initialExperience, knowledge = topics }) {
  const experience = useExperience(initialExperience);
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const launcher = useRef(null);
  const chatPanel = useRef(null);
  useEffect(() => {
    if (!open || !window.matchMedia('(max-width: 950px)').matches) return;
    const frame = requestAnimationFrame(() =>
      chatPanel.current?.scrollIntoView({ block: 'nearest', behavior: 'instant' }),
    );
    return () => cancelAnimationFrame(frame);
  }, [open]);
  const [input, setInput] = useState('');
  const [, setIdle] = useState(true);
  const [audioAvailable, setAudioAvailable] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const messageId = useRef(0);
  const followBottom = useRef(true);
  const scrollAnswer = useCallback(() => {
    if (followBottom.current && log.current) log.current.scrollTop = log.current.scrollHeight;
  }, []);
  const [audioError, setAudioError] = useState('');
  const speech = useRef(null);
  const timer = useRef(null);
  const log = useRef(null);
  useEffect(() => {
    setAudioAvailable('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window);
    return () => {
      clearTimeout(timer.current);
      if (speech.current) {
        speech.current.onstart = null;
        speech.current.onend = null;
        speech.current.onerror = null;
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  useEffect(() => {
    if (messages.length && log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [messages]);
  function activity() {
    setIdle(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setIdle(true), 9000);
  }
  function stop() {
    if (speech.current) {
      speech.current.onstart = null;
      speech.current.onend = null;
      speech.current.onerror = null;
      window.speechSynthesis.cancel();
      speech.current = null;
    }
    setSpeaking(false);
  }
  function speak(text) {
    stop();
    if (!audioAvailable) return;
    activity();
    setAudioError('');
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 0.95;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => {
      setSpeaking(false);
      speech.current = null;
      activity();
    };
    utterance.onerror = () => {
      setSpeaking(false);
      speech.current = null;
      setAudioError('Audio couldn’t play. Select Replay to try again.');
    };
    speech.current = utterance;
    window.speechSynthesis.speak(utterance);
  }
  function readAloud() {
    const enabled = !audioEnabled;
    setAudioEnabled(enabled);
    if (enabled) speak(messages.length ? topicAnswer(messages.at(-1).topic, experience) : greeting);
    else stop();
  }
  function ask(text, topic = matchTopic(text, knowledge)) {
    if (!text.trim()) return;
    activity();
    stop();
    setAudioError('');
    followBottom.current = true;
    const id = ++messageId.current;
    setMessages((current) => [...current.slice(-7), { id, question: text.trim(), topic }]);
    if (audioEnabled) speak(topicAnswer(topic, experience));
    setInput('');
  }
  return (
    <aside className={styles.widget} aria-label="Dububot assistant">
      <button
        ref={launcher}
        hidden={open}
        type="button"
        className={`${styles.launcher} ${open ? styles.launcherOpen : ''}`}
        aria-label="Open chat with Dububot"
        aria-expanded={open}
        aria-controls="portfolio-chat"
        onClick={() => {
          setOpen(!open);
          stop();
          activity();
          if (!open && audioEnabled)
            speak(messages.length ? topicAnswer(messages.at(-1).topic, experience) : greeting);
        }}
      >
        <Robot idle={!open} speaking={speaking} facing={open} />
        <span className={styles.invitation}>
          <strong>{open ? 'Your portfolio companion' : 'A little curious about Ram?'}</strong>
          <span>{open ? 'Tap me to tuck the chat away' : 'Tap the robot. Let’s talk ↗'}</span>
        </span>
      </button>
      {open && (
        <div
          id="portfolio-chat"
          ref={chatPanel}
          className={styles.panel}
          aria-label="Ram’s portfolio chat"
          onPointerDown={activity}
          onKeyDown={(event) => {
            activity();
            if (event.key === 'Escape') {
              setOpen(false);
              stop();
              launcher.current?.focus();
            }
          }}
        >
          <header className={styles.header}>
            <div
              className={`${styles.chatAvatar} ${speaking ? styles.speaking : ''}`}
              aria-hidden="true"
            >
              <span className={styles.head}>
                <span className={styles.face}>
                  <i />
                  <i />
                  <span className={styles.smile} />
                </span>
              </span>
            </div>
            <div className={styles.headerTitle}>
              <h2>Ask Dububot</h2>
            </div>
            <div className={styles.headerActions}>
              <div className={`${styles.headerAudio} ${speaking ? styles.audioSpeaking : ''}`}>
                <button
                  type="button"
                  className={styles.audioToggle}
                  disabled={!audioAvailable}
                  onClick={readAloud}
                  aria-pressed={audioEnabled}
                  title={audioEnabled ? 'Turn off spoken answers' : 'Read aloud'}
                  aria-label={
                    audioEnabled
                      ? 'Turn off spoken answers'
                      : 'Read aloud and enable spoken answers'
                  }
                >
                  <svg
                    viewBox="0 0 30 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    aria-hidden="true"
                  >
                    <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                    {audioEnabled ? (
                      <g className={styles.soundWaves}>
                        <path d="M15 9q3 3 0 6" />
                        <path d="M19 6q5 6 0 12" />
                        <path d="M23 3q7 9 0 18" />
                      </g>
                    ) : (
                      <path d="m17 9 6 6m0-6-6 6" />
                    )}
                  </svg>
                </button>
                <span className={styles.srOnly}>
                  {audioEnabled
                    ? speaking
                      ? 'Dububot is speaking…'
                      : 'Audio on · next answers play automatically'
                    : 'Read aloud'}
                </span>
                {audioEnabled && (
                  <button
                    type="button"
                    className={styles.audioAction}
                    aria-label={speaking ? 'Stop reading' : 'Replay answer'}
                    title={speaking ? 'Stop reading' : 'Replay answer'}
                    onClick={() =>
                      speaking
                        ? stop()
                        : speak(
                            messages.length
                              ? topicAnswer(messages.at(-1).topic, experience)
                              : greeting,
                          )
                    }
                  >
                    <span aria-hidden="true">{speaking ? '■' : '↻'}</span>
                  </button>
                )}
              </div>
              <button
                type="button"
                className={styles.resetChat}
                disabled={!messages.length}
                onClick={() => {
                  stop();
                  setMessages([]);
                  setAudioError('');
                  if (audioEnabled) speak(greeting);
                }}
              >
                Reset
              </button>
              <button
                type="button"
                className={styles.close}
                aria-label="Close chat"
                onClick={() => {
                  setOpen(false);
                  stop();
                  launcher.current?.focus();
                }}
              >
                ×
              </button>
            </div>
          </header>
          <div
            className={styles.log}
            ref={log}
            role="log"
            aria-label="Conversation"
            aria-live="polite"
            tabIndex={0}
            onScroll={() => {
              const node = log.current;
              followBottom.current = node.scrollHeight - node.scrollTop - node.clientHeight < 45;
            }}
          >
            <div className={styles.response}>
              <span className={styles.author}>DUBUBOT</span>
              <TypedAnswer
                key="greeting"
                text={greeting}
                animate={!messages.length}
                onProgress={scrollAnswer}
                audio={audioEnabled}
              />
            </div>
            {messages.map((message, index) => (
              <div className={styles.exchange} key={message.id}>
                <div className={styles.question}>
                  <span className={styles.srOnly}>You asked: </span>
                  <p>{message.question}</p>
                </div>
                <div className={styles.response}>
                  <span className={styles.author}>DUBUBOT</span>
                  <TypedAnswer
                    key={message.id}
                    audio={audioEnabled}
                    text={topicAnswer(message.topic, experience)}
                    animate={index === messages.length - 1}
                    onProgress={scrollAnswer}
                  />
                  {message.topic && <Link href={message.topic.href}>{message.topic.link} ↗</Link>}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.suggestions} aria-label="Suggested questions">
            {knowledge
              .filter(
                (topic) =>
                  topics.some((suggestion) => suggestion.id === topic.id) ||
                  ['education', 'certificates', 'awards'].includes(topic.id),
              )
              .map((topic) => (
                <button type="button" key={topic.id} onClick={() => ask(topic.label, topic)}>
                  {topic.label} ↗
                </button>
              ))}
          </div>
          <form
            className={styles.composer}
            onSubmit={(event) => {
              event.preventDefault();
              ask(input);
            }}
          >
            <label className={styles.srOnly} htmlFor="robot-question">
              Ask about Ram
            </label>
            <input
              id="robot-question"
              value={input}
              maxLength={240}
              onChange={(event) => {
                setInput(event.target.value);
                activity();
              }}
              placeholder="Ask about education, projects, skills…"
              autoComplete="off"
            />
            <button type="submit" disabled={!input.trim()} aria-label="Send question">
              ↑
            </button>
          </form>
          <footer className={styles.note}>
            <span role="status">
              {audioError ||
                (!audioAvailable
                  ? 'Read-aloud isn’t supported in this browser.'
                  : audioEnabled
                    ? 'Spoken answers stay on until you turn audio off.'
                    : 'Select the audio icon to enable spoken answers.')}
            </span>
            <span>Guided keyword answers from Ram’s portfolio.</span>
          </footer>
        </div>
      )}
    </aside>
  );
}
