'use client';
import { useState } from 'react';
export default function ContactForm() {
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');
  async function submit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get('website')) return;
    setState('sending');
    setError('');
    try {
      const response = await fetch('https://formsubmit.co/ajax/pandey.ram1397@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          _subject: 'Portfolio — new message for Ram',
          _template: 'table',
          _honey: data.get('website'),
        }),
      });
      const result = await response.json();
      if (!response.ok || !(result.success === true || result.success === 'true'))
        throw new Error('Unable to submit');
      setState('accepted');
      e.target.reset();
    } catch {
      setState('error');
      setError(
        'Your message could not be submitted. Please try again or email pandey.ram1397@gmail.com directly.',
      );
    }
  }
  return (
    <form className="contactForm" onSubmit={submit}>
      <h3>A good conversation starts here.</h3>
      <div className="formRow">
        <div>
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            name="name"
            placeholder="How should I call you?"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@company.com"
            required
            maxLength={254}
            autoComplete="email"
          />
        </div>
      </div>
      <label htmlFor="message">What’s on your mind?</label>
      <textarea
        id="message"
        name="message"
        placeholder="A little about your idea, project, or opportunity…"
        required
        minLength={10}
        maxLength={5000}
        rows={5}
      />
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="formNote">Sent to my inbox through FormSubmit. No mailing list, no account.</p>
      <button className="button primary" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Send your message'} <span>↗</span>
      </button>
      <p role="status" aria-live="polite" className={state === 'error' ? 'error' : 'accent'}>
        {state === 'accepted'
          ? 'Submission accepted. Inbox delivery depends on email verification.'
          : error}
      </p>
      <small className="activationNote">
        Email delivery is enabled after the recipient verifies the FormSubmit activation email.
      </small>
    </form>
  );
}
