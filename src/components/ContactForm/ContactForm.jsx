'use client';
import { useId, useRef, useState } from 'react';
import Icon from '../Icon/Icon';
import styles from './ContactForm.module.css';
function Line({ number, children, active = false }) {
  return (
    <div className={`${styles.line} ${active ? styles.active : ''}`}>
      <span className={styles.number} aria-hidden="true">
        {number}
      </span>
      <div className={styles.code}>{children}</div>
    </div>
  );
}
function Tag({ children }) {
  return (
    <span className={styles.tag} aria-hidden="true">
      {children}
    </span>
  );
}
export default function ContactForm() {
  const id = useId();
  const form = useRef(null);
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');
  const [focused, setFocused] = useState('');
  const [preview, setPreview] = useState(false);
  const update = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  async function submit(e) {
    e.preventDefault();
    if (state === 'sending') return;
    const data = new FormData(e.currentTarget);
    if (data.get('website')) return;
    setState('sending');
    setError('');
    try {
      const response = await fetch('https://formsubmit.co/ajax/pandey.ram1397@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: AbortSignal.timeout(20000),
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          _subject: 'Portfolio — new message for Ram',
          _template: 'table',
          _honey: data.get('website'),
        }),
      });
      const result = await response.json();
      if (!response.ok || !(result.success === true || result.success === 'true'))
        throw new Error('Not accepted');
      setState('accepted');
      setValues({ name: '', email: '', message: '' });
    } catch {
      setState('error');
      setError(
        'Could not submit your message. Please try again or use Email me to contact Ram directly.',
      );
    }
  }
  const fieldProps = (name) => ({
    id: `${id}-${name}`,
    name,
    value: values[name],
    onChange: update,
    onFocus: () => setFocused(name),
    onBlur: () => setFocused(''),
    required: true,
    disabled: state === 'sending',
    'aria-describedby': `${id}-hint`,
  });
  return (
    <form
      ref={form}
      className={styles.ide}
      onSubmit={submit}
      onKeyDown={(e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
          e.preventDefault();
          if (state !== 'sending') form.current?.requestSubmit();
        }
      }}
      aria-label="Message Ram in the HTML editor"
    >
      <div className={styles.toolbar}>
        <div className={styles.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span>RAM’S INBOX / NEW MESSAGE</span>
        <span className={styles.connection}>
          <i /> ONLINE
        </span>
      </div>
      <div className={styles.tabBar}>
        <span className={styles.fileTab}>
          <Icon name="code" size={17} />
          <strong>message.html</strong>
          <i aria-hidden="true" />
        </span>
        <button
          className={styles.previewToggle}
          type="button"
          aria-expanded={preview}
          aria-controls={`${id}-preview`}
          onClick={() => setPreview(!preview)}
        >
          {preview ? 'Hide preview' : 'Live preview'}
          <span aria-hidden="true">{preview ? '−' : '+'}</span>
        </button>
      </div>
      <div className={styles.intro}>
        <h3>Your message. In code.</h3>
        <p id={`${id}-hint`}>Type in the highlighted fields. No coding needed.</p>
      </div>
      <div className={styles.editor}>
        <Line number="01">
          <span className={styles.comment} aria-hidden="true">
            &lt;!doctype html&gt;
          </span>
        </Line>
        <Line number="02">
          <span className={styles.comment} aria-hidden="true">
            &lt;!-- A conversation starts here. --&gt;
          </span>
        </Line>
        <Line number="03">
          <Tag>&lt;article </Tag>
          <span className={styles.attribute} aria-hidden="true">
            class
          </span>
          <Tag>=</Tag>
          <span className={styles.string} aria-hidden="true">
            &quot;hello&quot;
          </span>
          <Tag>&gt;</Tag>
        </Line>
        <Line number="04">
          <span className={styles.indent} />
          <Tag>&lt;h1&gt;</Tag>
          <span className={styles.fieldHint} aria-hidden="true">
            YOUR NAME ↓
          </span>
        </Line>
        <Line number="05" active={focused === 'name'}>
          <label className="srOnly" htmlFor={`${id}-name`}>
            Your name
          </label>
          <input
            className={styles.input}
            {...fieldProps('name')}
            placeholder="Type your name here"
            minLength={2}
            maxLength={100}
            autoComplete="name"
          />
        </Line>
        <Line number="06">
          <span className={styles.indent} />
          <Tag>&lt;/h1&gt;</Tag>
        </Line>
        <Line number="07">
          <span className={styles.indent} />
          <Tag>&lt;address&gt;</Tag>
          <span className={styles.fieldHint} aria-hidden="true">
            YOUR EMAIL ↓
          </span>
        </Line>
        <Line number="08" active={focused === 'email'}>
          <label className="srOnly" htmlFor={`${id}-email`}>
            Email address
          </label>
          <input
            className={styles.input}
            {...fieldProps('email')}
            type="email"
            placeholder="you@example.com"
            maxLength={254}
            autoComplete="email"
            spellCheck={false}
          />
        </Line>
        <Line number="09">
          <span className={styles.indent} />
          <Tag>&lt;/address&gt;</Tag>
        </Line>
        <Line number="10">
          <span className={styles.indent} />
          <Tag>&lt;p&gt;</Tag>
          <span className={styles.fieldHint} aria-hidden="true">
            YOUR MESSAGE ↓
          </span>
        </Line>
        <Line number="11" active={focused === 'message'}>
          <label className="srOnly" htmlFor={`${id}-message`}>
            Your message
          </label>
          <textarea
            className={styles.textarea}
            {...fieldProps('message')}
            placeholder="Hi Ram! I’d like to talk about…"
            minLength={10}
            maxLength={5000}
            rows={4}
          />
        </Line>
        <Line number="12">
          <span className={styles.indent} />
          <Tag>&lt;/p&gt;</Tag>
        </Line>
        <Line number="13">
          <Tag>&lt;/article&gt;</Tag>
        </Line>
      </div>
      <div className={styles.editorStatus}>
        <span>
          <i /> HTML
        </span>
        <span>{values.message.length.toLocaleString()} / 5,000 characters</span>
        <span>UTF-8</span>
      </div>
      {preview && (
        <section
          id={`${id}-preview`}
          className={styles.livePreview}
          aria-label="Live message preview"
        >
          <span className={styles.previewLabel}>
            <span className="statusDot" /> LIVE PREVIEW
          </span>
          <h4>{values.name || 'Your name will appear here'}</h4>
          <p className={styles.previewEmail}>{values.email || 'your@email.com'}</p>
          <p className={styles.previewMessage}>
            {values.message || 'Your message will appear here as you type.'}
          </p>
        </section>
      )}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className={styles.submitArea}>
        <div>
          <strong>Ready when you are.</strong>
          <span>Just a message to my inbox. Nothing else.</span>
        </div>
        <button className="button primary" disabled={state === 'sending'} type="submit">
          {state === 'sending' ? 'Sending…' : 'Send message'}
          <Icon name="arrow" size={18} />
        </button>
      </div>
      <p className={styles.shortcut}>
        Ctrl / ⌘ + Enter to send <span>·</span> Your message is sent as text.
      </p>
      <p
        className={`${styles.feedback} ${state === 'error' ? styles.error : ''}`}
        role="status"
        aria-live="polite"
      >
        {state === 'accepted'
          ? 'Submission accepted by FormSubmit. Inbox delivery requires recipient verification.'
          : error}
      </p>
      <p className={styles.deliveryNote}>
        Delivered through FormSubmit after one-time recipient email verification.
      </p>
    </form>
  );
}
