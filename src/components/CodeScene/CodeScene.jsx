'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './CodeScene.module.css';

const examples = [
  {
    language: 'PYTHON',
    file: 'experience.py',
    lines: [
      [['def ', 'keyword'], ['build_experience', 'name'], ['(name):', 'punctuation']],
      [['    message = ', 'name'], ['f"Hello, {name}"', 'string']],
      [['    return ', 'keyword'], ['{"ready": ', 'punctuation'], ['True', 'keyword'], [',', 'punctuation']],
      [['        "message": message}', 'string']],
    ],
  },
  {
    language: 'JAVASCRIPT',
    file: 'experience.js',
    lines: [
      [['const ', 'keyword'], ['launch', 'name'], [' = (name) => {', 'punctuation']],
      [['  ', 'name'], ['return ', 'keyword'], ['{ greeting: ', 'punctuation'], ['`Hello, ${name}`', 'string'], [' };', 'punctuation']],
      [['};', 'punctuation']],
      [['launch(', 'name'], ['"world"', 'string'], [');', 'punctuation']],
    ],
  },
  {
    language: 'HTML',
    file: 'index.html',
    lines: [
      [['<', 'punctuation'], ['section', 'tag'], [' class', 'attribute'], ['=', 'punctuation'], ['"hero"', 'string'], ['>', 'punctuation']],
      [['  <', 'punctuation'], ['h1', 'tag'], ['>', 'punctuation'], ['Build with intent', 'name'], ['</', 'punctuation'], ['h1', 'tag'], ['>', 'punctuation']],
      [['  <', 'punctuation'], ['button', 'tag'], ['>', 'punctuation'], ['Explore', 'name'], ['</', 'punctuation'], ['button', 'tag'], ['>', 'punctuation']],
      [['</', 'punctuation'], ['section', 'tag'], ['>', 'punctuation']],
    ],
  },
  {
    language: 'JAVA',
    file: 'Experience.java',
    lines: [
      [['public class ', 'keyword'], ['Experience', 'name'], [' {', 'punctuation']],
      [['  public static void ', 'keyword'], ['main', 'name'], ['(String[] args) {', 'punctuation']],
      [['    System.out.println(', 'name'], ['"Hello, world!"', 'string'], [');', 'punctuation']],
      [['  }', 'punctuation']],
      [['}', 'punctuation']],
    ],
  },
];

function snippetLength(example) {
  return example.lines.reduce(
    (total, line) => total + line.reduce((lineTotal, [text]) => lineTotal + text.length, 0),
    0,
  );
}

function highlightLine(line, language) {
  if (language === 'HTML') {
    const tokens = line.matchAll(/<\/?|\/?>|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|[A-Za-z_:][\w:.-]*|\s+|./g);
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
      return <span className={styles[color]} key={`${index}-${text}`}>{text}</span>;
    });
  }

  const keywords = language === 'PYTHON'
    ? new Set(['def', 'return', 'True', 'False', 'None', 'class', 'if', 'else', 'for', 'in', 'import', 'from', 'as', 'and', 'or', 'not'])
    : language === 'JAVA'
      ? new Set(['public', 'private', 'protected', 'class', 'static', 'void', 'return', 'new', 'if', 'else', 'int', 'boolean'])
      : new Set(['const', 'let', 'var', 'return', 'function', 'class', 'new', 'if', 'else', 'true', 'false', 'null', 'undefined', 'async', 'await']);
  const tokens = line.matchAll(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|[A-Za-z_$][\w$]*|\s+|./g);
  return [...tokens].map(([text], index) => {
    let color = 'name';
    if (/^["'`]/.test(text)) {
      color = 'string';
    } else if (keywords.has(text)) {
      color = 'keyword';
    } else if (/^[{}()[\].,:;=<>!+*/%-]$/.test(text)) {
      color = 'punctuation';
    }
    return <span className={styles[color]} key={`${index}-${text}`}>{text}</span>;
  });
}

export default function CodeScene() {
  const [paused, setPaused] = useState(false);
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [visibleChars, setVisibleChars] = useState(4);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [outputOpen, setOutputOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [sequenceVersion, setSequenceVersion] = useState(0);
  const visibleCharsRef = useRef(4);
  const codeInput = useRef(null);
  const editorStage = useRef(null);
  const example = examples[snippetIndex];
  const totalChars = snippetLength(example);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

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
    if (paused || editing) return;

    let deleting = false;
    let holdTicks = 0;
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

      visibleCharsRef.current = visible;
      setVisibleChars(visible);
    }, 36);

    return () => window.clearInterval(timer);
  }, [editing, paused, reducedMotion, sequenceVersion, snippetIndex, totalChars]);

  const displayedChars = reducedMotion ? totalChars : visibleChars;
  const fullCode = example.lines
    .map((line) => line.map(([text]) => text).join(''))
    .join('\n');
  const visibleCode = fullCode.slice(0, displayedChars);
  const editorLines = editing ? editValue.split('\n') : visibleCode.split('\n');
  const lineLengths = example.lines.map((line) =>
    line.reduce((total, [text]) => total + text.length, 0),
  );
  const lineStarts = lineLengths.map((_, lineIndex) =>
    lineLengths.slice(0, lineIndex).reduce((total, length) => total + length, 0),
  );
  const activeLineIndex = lineStarts.findIndex(
    (start, lineIndex) => displayedChars >= start && displayedChars < start + lineLengths[lineIndex],
  );

  function selectExample(index) {
    codeInput.current?.blur();
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
    visibleCharsRef.current = 0;
    setVisibleChars(0);
    setSequenceVersion((version) => version + 1);
  }

  function toggleEditing() {
    if (editing) {
      codeInput.current?.blur();
    } else {
      codeInput.current?.focus();
    }
  }

  function tiltEditor(event) {
    if (event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty('--tilt-x', `${-y * 12}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${x * 16}deg`);
  }

  function resetEditorTilt(event) {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  }

  return (
    <div className={`${styles.scene} ${paused ? styles.paused : ''}`}>
      <div className={styles.halo} aria-hidden="true" />
      <div
        ref={editorStage}
        className={styles.editorStage}
        aria-label={`Interactive 3D ${example.language} code editor`}
        onPointerMove={tiltEditor}
        onPointerLeave={resetEditorTilt}
      >
        <div className={styles.editor}>
          <div className={styles.titlebar}>
            <span className={styles.windowDots} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className={styles.workspaceName}>ram-pandey <span>/</span> workspace</span>
            <span className={styles.liveIndicator}><i /> LIVE</span>
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
                const lineVisibleChars = Math.max(0, displayedChars - lineStarts[lineIndex]);
                const visibleSegments = line.map(([text, color], segmentIndex) => {
                  const segmentStart = line
                    .slice(0, segmentIndex)
                    .reduce((total, [segment]) => total + segment.length, 0);
                  const segmentChars = Math.max(
                    0,
                    Math.min(text.length, lineVisibleChars - segmentStart),
                  );
                  return segmentChars ? (
                    <span className={styles[color]} key={`${lineIndex}-${color}-${text}-${segmentIndex}`}>
                      {text.slice(0, segmentChars)}
                    </span>
                  ) : null;
                });
                return (
                  <div className={styles.codeLine} key={lineIndex}>
                    <span className={styles.lineNumber}>{String(lineIndex + 1).padStart(2, '0')}</span>
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
            <span><i /> main</span>
            <span>UTF-8 <b>·</b> {example.language}</span>
            <span>100%</span>
          </div>
          <div className={`${styles.output} ${outputOpen ? styles.outputOpen : ''}`} aria-live="polite">
            <span className={styles.outputTitle}><i /> OUTPUT</span>
            <span>{outputOpen ? `✓ ${example.language} snippet ran successfully` : 'Ready to run'}</span>
          </div>
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
