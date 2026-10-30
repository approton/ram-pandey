'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './CodeScene.module.css';
import Link from 'next/link';

const examples = [
  {
    language: 'PYTHON',
    file: 'experience.py',
    lines: [
      [
        ['def ', 'keyword'],
        ['build_experience', 'name'],
        ['(name):', 'punctuation'],
      ],
      [
        ['    message = ', 'name'],
        ['f"Hello, {name}"', 'string'],
      ],
      [
        ['    return ', 'keyword'],
        ['{"ready": ', 'punctuation'],
        ['True', 'keyword'],
        [',', 'punctuation'],
      ],
      [['        "message": message}', 'string']],
    ],
  },
  {
    language: 'JAVASCRIPT',
    file: 'experience.js',
    lines: [
      [
        ['const ', 'keyword'],
        ['launch', 'name'],
        [' = (name) => {', 'punctuation'],
      ],
      [
        ['  ', 'name'],
        ['return ', 'keyword'],
        ['{ greeting: ', 'punctuation'],
        ['`Hello, ${name}`', 'string'],
        [' };', 'punctuation'],
      ],
      [['};', 'punctuation']],
      [
        ['launch(', 'name'],
        ['"world"', 'string'],
        [');', 'punctuation'],
      ],
    ],
  },
  {
    language: 'HTML',
    file: 'index.html',
    lines: [
      [
        ['<', 'punctuation'],
        ['section', 'tag'],
        [' class', 'attribute'],
        ['=', 'punctuation'],
        ['"hero"', 'string'],
        ['>', 'punctuation'],
      ],
      [
        ['  <', 'punctuation'],
        ['h1', 'tag'],
        ['>', 'punctuation'],
        ['Build with intent', 'name'],
        ['</', 'punctuation'],
        ['h1', 'tag'],
        ['>', 'punctuation'],
      ],
      [
        ['  <', 'punctuation'],
        ['button', 'tag'],
        ['>', 'punctuation'],
        ['Explore', 'name'],
        ['</', 'punctuation'],
        ['button', 'tag'],
        ['>', 'punctuation'],
      ],
      [
        ['</', 'punctuation'],
        ['section', 'tag'],
        ['>', 'punctuation'],
      ],
    ],
  },
  {
    language: 'JAVA',
    file: 'Experience.java',
    lines: [
      [
        ['public class ', 'keyword'],
        ['Experience', 'name'],
        [' {', 'punctuation'],
      ],
      [
        ['  public static void ', 'keyword'],
        ['main', 'name'],
        ['(String[] args) {', 'punctuation'],
      ],
      [
        ['    System.out.println(', 'name'],
        ['"Hello, world!"', 'string'],
        [');', 'punctuation'],
      ],
      [['  }', 'punctuation']],
      [['}', 'punctuation']],
    ],
  },
];

const profileLines = [
  [
    ['<', 'profilePunctuation'],
    ['Name', 'profileTag'],
    ['>', 'profilePunctuation'],
    [' Ram Niwash Pandey ', 'profileName'],
    ['</', 'profilePunctuation'],
    ['Name', 'profileTag'],
    ['>', 'profilePunctuation'],
  ],
  [
    ['<', 'profilePunctuation'],
    ['Designation', 'profileTag'],
    ['>', 'profilePunctuation'],
    ['Senior Software Engineer', 'profileValue'],
    ['</', 'profilePunctuation'],
    ['Designation', 'profileTag'],
    ['>', 'profilePunctuation'],
  ],
  [
    ['<', 'profilePunctuation'],
    ['AboutMe', 'profileTag'],
    ['>', 'profilePunctuation'],
  ],
  [
    [
      '  Senior Software Engineer I at HCLSoftware · BigFix. Based in Pune, India. Building with React, Next.js, accessible interfaces, frontend architecture, and practical AI tools.',
      'profileCopy',
    ],
  ],
  [
    ['</', 'profilePunctuation'],
    ['AboutMe', 'profileTag'],
    ['>', 'profilePunctuation'],
  ],
];

const profileXmlLength =
  profileLines.reduce(
    (total, line) => total + line.reduce((lineTotal, [text]) => lineTotal + text.length, 0),
    0,
  ) +
  profileLines.length -
  1;
const profileLinkText = 'View full profile ↗';
const profileLinkStart = profileXmlLength + 1;
const profileLength = profileLinkStart + profileLinkText.length;
const profileLineStarts = profileLines.map((_, index) =>
  profileLines
    .slice(0, index)
    .reduce(
      (total, line) => total + line.reduce((length, [text]) => length + text.length, 0) + 1,
      0,
    ),
);

function snippetLength(example) {
  return example.lines.reduce(
    (total, line) => total + line.reduce((lineTotal, [text]) => lineTotal + text.length, 0),
    0,
  );
}

function highlightLine(line, language) {
  if (language === 'HTML') {
    const tokens = line.matchAll(
      /<\/?|\/?>|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|[A-Za-z_:][\w:.-]*|\s+|./g,
    );
    let insideTag = false;
    let expectTagName = false;
    return [...tokens].map(([text], index) => {
      let color = 'name';
      if (text === '<' || text === '</') {
        insideTag = true;
        expectTagName = true;
        color = 'punctuation';
      } else if (text === '>' || text === '/>') {
        insideTag = false;
        color = 'punctuation';
      } else if (/^["']/.test(text)) {
        color = 'string';
      } else if (/^[A-Za-z_:]/.test(text)) {
        color = expectTagName ? 'tag' : insideTag ? 'attribute' : 'name';
        expectTagName = false;
      } else if (text === '=') {
        color = 'punctuation';
      }
      return (
        <span className={styles[color]} key={`${index}-${text}`}>
          {text}
        </span>
      );
    });
  }

  const keywords =
    language === 'PYTHON'
      ? new Set([
          'def',
          'return',
          'True',
          'False',
          'None',
          'class',
          'if',
          'else',
          'for',
          'in',
          'import',
          'from',
          'as',
          'and',
          'or',
          'not',
        ])
      : language === 'JAVA'
        ? new Set([
            'public',
            'private',
            'protected',
            'class',
            'static',
            'void',
            'return',
            'new',
            'if',
            'else',
            'int',
            'boolean',
          ])
        : new Set([
            'const',
            'let',
            'var',
            'return',
            'function',
            'class',
            'new',
            'if',
            'else',
            'true',
            'false',
            'null',
            'undefined',
            'async',
            'await',
          ]);
  const tokens = line.matchAll(
    /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|[A-Za-z_$][\w$]*|\s+|./g,
  );
  return [...tokens].map(([text], index) => {
    let color = 'name';
    if (/^["'`]/.test(text)) {
      color = 'string';
    } else if (keywords.has(text)) {
      color = 'keyword';
    } else if (/^[{}()[\].,:;=<>!+*/%-]$/.test(text)) {
      color = 'punctuation';
    }
    return (
      <span className={styles[color]} key={`${index}-${text}`}>
        {text}
      </span>
    );
  });
}

export default function CodeScene({ showProfile = false }) {
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [animationVisible, setAnimationVisible] = useState(true);
  const scene = useRef(null);
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [visibleChars, setVisibleChars] = useState(4);
  const [profileChars, setProfileChars] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [outputOpen, setOutputOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [sequenceVersion, setSequenceVersion] = useState(0);
  const visibleCharsRef = useRef(4);
  const playback = useRef({ deleting: false, holdTicks: 0 });
  const codeInput = useRef(null);
  const editorStage = useRef(null);
  const example = examples[snippetIndex];
  const totalChars = snippetLength(example);

  useEffect(() => {
    let inView = true;
    const update = () => setAnimationVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    if (scene.current) observer.observe(scene.current);
    document.addEventListener('visibilitychange', update);
    update();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    let timer = 0;
    const frame = requestAnimationFrame(() => {
      if (!showProfile) {
        setProfileChars(0);
        return;
      }
      if (reducedMotion) {
        setProfileChars(profileLength);
        return;
      }

      setProfileChars(0);
      let visible = 0;
      timer = window.setInterval(() => {
        visible = Math.min(visible + 1, profileLength);
        setProfileChars(visible);
        if (visible === profileLength) window.clearInterval(timer);
      }, 36);
    });

    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(timer);
    };
  }, [showProfile, reducedMotion]);

  useEffect(() => {
    if (!editing) return;
    const blurWhenLeavingEditor = (event) => {
      if (!editorStage.current?.contains(event.target)) codeInput.current?.blur();
    };
    document.addEventListener('pointerdown', blurWhenLeavingEditor);
    return () => document.removeEventListener('pointerdown', blurWhenLeavingEditor);
  }, [editing]);

  useEffect(() => {
    if (reducedMotion) {
      visibleCharsRef.current = totalChars;
      return;
    }
    if (showProfile || paused || hovered || editing || !animationVisible) return;

    let { deleting, holdTicks } = playback.current;
    let visible = visibleCharsRef.current;
    const timer = window.setInterval(() => {
      if (!deleting && visible < totalChars) {
        visible += 1;
      } else if (!deleting) {
        holdTicks += 1;
        if (holdTicks >= 24) deleting = true;
      } else if (visible > 0) {
        visible = Math.max(0, visible - 2);
      } else {
        setSnippetIndex((current) => (current + 1) % examples.length);
        deleting = false;
        holdTicks = 0;
      }

      playback.current = { deleting, holdTicks };
      visibleCharsRef.current = visible;
      setVisibleChars(visible);
    }, 36);

    return () => window.clearInterval(timer);
  }, [
    showProfile,
    animationVisible,
    editing,
    hovered,
    paused,
    reducedMotion,
    sequenceVersion,
    snippetIndex,
    totalChars,
  ]);

  const displayedChars = reducedMotion ? totalChars : visibleChars;
  let remainingChars = displayedChars;
  const visibleCode = example.lines
    .map((line) => {
      const text = line.map(([segment]) => segment).join('');
      const visible = text.slice(0, Math.max(0, remainingChars));
      remainingChars -= text.length;
      return visible;
    })
    .join('\n');
  const editorLines = editing ? editValue.split('\n') : visibleCode.split('\n');
  const lineLengths = example.lines.map((line) =>
    line.reduce((total, [text]) => total + text.length, 0),
  );
  const lineStarts = lineLengths.map((_, lineIndex) =>
    lineLengths.slice(0, lineIndex).reduce((total, length) => total + length, 0),
  );
  const activeLineIndex = lineStarts.findIndex(
    (start, lineIndex) =>
      displayedChars >= start && displayedChars < start + lineLengths[lineIndex],
  );
  const renderedProfileLines = profileLines.map((line, lineIndex) => {
    const start = profileLineStarts[lineIndex];
    const length = line.reduce((total, [text]) => total + text.length, 0);
    if (profileChars < start) return null;

    let remaining = Math.max(0, profileChars - start);
    return (
      <div className={styles.profileLine} key={lineIndex}>
        {line.map(([text, className], segmentIndex) => {
          const visibleText = text.slice(0, remaining);
          remaining = Math.max(0, remaining - text.length);
          return (
            <span className={styles[className]} key={`${lineIndex}-${segmentIndex}`}>
              {visibleText}
            </span>
          );
        })}
        {profileChars < start + length && <span className={styles.cursor} aria-hidden="true" />}
      </div>
    );
  });
  const visibleProfileLinkLength = Math.max(
    0,
    Math.min(profileLinkText.length, profileChars - profileLinkStart),
  );

  function selectExample(index) {
    codeInput.current?.blur();
    playback.current = { deleting: false, holdTicks: 0 };
    if (index === snippetIndex) {
      visibleCharsRef.current = 0;
      setVisibleChars(0);
      setSequenceVersion((version) => version + 1);
      return;
    }
    visibleCharsRef.current = 0;
    setVisibleChars(0);
    setSnippetIndex(index);
    setOutputOpen(false);
  }

  function startEditing() {
    if (editing) return;
    setEditValue(visibleCode);
    setEditing(true);
  }

  function stopEditing() {
    if (!editing) return;
    setEditing(false);
    setEditValue('');
    setHovered(false);
  }

  function toggleEditing() {
    if (editing) {
      codeInput.current?.blur();
    } else {
      codeInput.current?.focus();
    }
  }

  function tiltEditor(event) {
    if (event.pointerType !== 'mouse' || reducedMotion || editing || showProfile) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty('--tilt-x', `${-y * 5}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${x * 7}deg`);
  }

  function resetEditorTilt(event) {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  }

  return (
    <div ref={scene} className={`${styles.scene} ${paused ? styles.paused : ''}`}>
      <div className={styles.halo} aria-hidden="true" />
      <div
        ref={editorStage}
        className={styles.editorStage}
        aria-label={`Interactive 3D ${example.language} code editor`}
        onPointerMove={tiltEditor}
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') setHovered(true);
        }}
        onPointerLeave={(event) => {
          resetEditorTilt(event);
          setHovered(false);
          if (event.pointerType === 'mouse') codeInput.current?.blur();
        }}
        onClick={(event) => {
          if (!showProfile && !event.target.closest('button, textarea, a'))
            codeInput.current?.focus();
        }}
      >
        <div className={styles.editor} data-profile={showProfile}>
          {showProfile ? (
            <div className={styles.profileView}>
              <div className={styles.profileTitle}>ram-pandey / profile.xml</div>
              <div className={styles.profileBody}>
                {renderedProfileLines}
                {visibleProfileLinkLength > 0 && (
                  <Link href="/about/" aria-label="View full profile">
                    {profileLinkText.slice(0, visibleProfileLinkLength)}
                    {visibleProfileLinkLength < profileLinkText.length && (
                      <span className={styles.cursor} aria-hidden="true" />
                    )}
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className={styles.titlebar}>
                <span className={styles.windowDots} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className={styles.workspaceName}>
                  ram-pandey <span>/</span> workspace
                </span>
                <span className={styles.liveIndicator}>
                  <i /> LIVE
                </span>
                <button
                  className={styles.editButton}
                  type="button"
                  onClick={toggleEditing}
                  aria-pressed={editing}
                >
                  {editing ? 'DONE' : 'EDIT'}
                </button>
                <button
                  className={styles.runButton}
                  type="button"
                  onClick={() => {
                    codeInput.current?.blur();
                    setOutputOpen((current) => !current);
                  }}
                  aria-expanded={outputOpen}
                >
                  <span aria-hidden="true">▶</span> RUN
                </button>
              </div>
              <div className={styles.tabbar}>
                <span className={styles.fileName}>
                  <i className={styles.languageDot} />
                  {example.file}
                </span>
                <div className={styles.languageTabs} aria-label="Choose a code language">
                  {examples.map((item, index) => (
                    <button
                      className={`${styles.languageTab} ${index === snippetIndex ? styles.selectedTab : ''}`}
                      key={item.language}
                      type="button"
                      onClick={() => selectExample(index)}
                      aria-label={`Show ${item.language} code`}
                      aria-pressed={index === snippetIndex}
                    >
                      {item.language === 'JAVASCRIPT' ? 'JS' : item.language}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.codeArea}>
                <div className={styles.activityRail}>
                  <span>⌘</span>
                  <span>⌕</span>
                  <span>◇</span>
                  <span>◷</span>
                </div>
                <div className={styles.codeLines} data-editing={editing}>
                  {editing
                    ? editorLines.map((line, lineIndex) => (
                        <div className={styles.codeLine} key={`edited-line-${lineIndex}`}>
                          <span className={styles.lineNumber}>
                            {String(lineIndex + 1).padStart(2, '0')}
                          </span>
                          <code className={styles.editedCode}>
                            {line ? highlightLine(line, example.language) : '\u00a0'}
                          </code>
                        </div>
                      ))
                    : example.lines.map((line, lineIndex) => {
                        const lineVisibleChars = Math.max(
                          0,
                          displayedChars - lineStarts[lineIndex],
                        );
                        const visibleSegments = line.map(([text, color], segmentIndex) => {
                          const segmentStart = line
                            .slice(0, segmentIndex)
                            .reduce((total, [segment]) => total + segment.length, 0);
                          const segmentChars = Math.max(
                            0,
                            Math.min(text.length, lineVisibleChars - segmentStart),
                          );
                          return segmentChars ? (
                            <span
                              className={styles[color]}
                              key={`${lineIndex}-${color}-${text}-${segmentIndex}`}
                            >
                              {text.slice(0, segmentChars)}
                            </span>
                          ) : null;
                        });
                        return (
                          <div className={styles.codeLine} key={lineIndex}>
                            <span className={styles.lineNumber}>
                              {String(lineIndex + 1).padStart(2, '0')}
                            </span>
                            <code>
                              {visibleSegments}
                              {activeLineIndex === lineIndex && <span className={styles.cursor} />}
                            </code>
                          </div>
                        );
                      })}
                  <textarea
                    ref={codeInput}
                    className={styles.codeInput}
                    value={editing ? editValue : visibleCode}
                    onFocus={startEditing}
                    onChange={(event) => setEditValue(event.target.value)}
                    onBlur={stopEditing}
                    aria-label={`Edit ${example.language} code. Focus to pause animation.`}
                    spellCheck="false"
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    inputMode="text"
                    wrap="off"
                    tabIndex={0}
                  />
                </div>
              </div>
              <div className={styles.statusbar}>
                <span>
                  <i /> main
                </span>
                <span>
                  UTF-8 <b>·</b> {example.language}
                </span>
                <span>100%</span>
              </div>
              <div
                className={`${styles.output} ${outputOpen ? styles.outputOpen : ''}`}
                aria-live="polite"
              >
                <span className={styles.outputTitle}>
                  <i /> OUTPUT
                </span>
                <span>
                  {outputOpen ? `✓ ${example.language} snippet ran successfully` : 'Ready to run'}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      <button
        className={styles.pause}
        type="button"
        onClick={() => setPaused((current) => !current)}
        aria-label={paused ? 'Play 3D code animation' : 'Pause 3D code animation'}
        aria-pressed={paused}
      >
        {paused ? '▶' : 'Ⅱ'}
      </button>
    </div>
  );
}
