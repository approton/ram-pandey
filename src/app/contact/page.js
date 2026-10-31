import QuoteCloud from '@/components/QuoteCloud/QuoteCloud';
import ContactForm from '@/components/ContactForm/ContactForm';
import ContactActions, { SocialLinks } from '@/components/ContactActions/ContactActions';
import Icon from '@/components/Icon/Icon';
export const metadata = {
  title: 'Contact — Start a Conversation',
  description:
    'Email or call Ram Niwash Pandey to discuss React and Next.js development, frontend consulting, collaborations, and engineering opportunities.',
  alternates: { canonical: '/contact/' },
};
export default function Contact() {
  return (
    <>
      <section className="pageHero contactHeroWithQuote">
        <div>
          <span className="eyebrow">A GOOD CONVERSATION CAN CHANGE EVERYTHING</span>
          <h1>
            Let’s make
            <br />
            <em>something happen.</em>
          </h1>
          <p>
            A product idea, an engineering challenge, or a team worth building with. Tell me what’s
            on your mind.
          </p>
        </div>
        <QuoteCloud />
      </section>
      <section className="section contactSection contactPage">
        <div>
          <span className="availability">
            <span className="statusDot" /> OPEN TO MEANINGFUL OPPORTUNITIES
          </span>
          <h2>
            Good ideas deserve
            <br />
            <em>a thoughtful partner.</em>
          </h2>
          <p>
            Reach out about software development, frontend architecture, accessibility, AI-enabled
            tools, consulting, or suitable engineering roles.
          </p>
          <ContactActions />
          <div className="contactSocial">
            <span className="eyebrow">FIND ME ELSEWHERE</span>
            <SocialLinks />
          </div>
          <div className="locationCard">
            <Icon name="location" size={24} />
            <div>
              <strong>Pune, Maharashtra, India</strong>
              <small>Originally from Deoria, Uttar Pradesh.</small>
            </div>
          </div>
          <p className="subtleNote">
            The form sends your name, email, optional mobile number, and message through FormSubmit
            to my inbox. No mailing list or account is created.
          </p>
        </div>
        <ContactForm />
      </section>
      <section className="section">
        <span className="eyebrow">BEFORE YOU SAY HELLO</span>
        <h2>
          A little clarity
          <br />
          <em>before we begin.</em>
        </h2>
        <div className="faqList">
          <details>
            <summary>What should I include in my message?</summary>
            <p>
              A short description of the idea or challenge, what stage you’re at, and the kind of
              help you’re looking for. Add timing or constraints if they matter.
            </p>
          </details>
          <details>
            <summary>Can I reach out about an engineering role?</summary>
            <p>
              Yes. I’m open to suitable engineering opportunities. Share the role, team context,
              location or work arrangement, and what you’re building.
            </p>
          </details>
          <details>
            <summary>Do you discuss small projects and collaborations?</summary>
            <p>
              Yes. Start with the problem and the intended outcome. We can discuss the scope and
              whether it’s a good fit.
            </p>
          </details>
          <details>
            <summary>Can I email or call directly?</summary>
            <p>
              Use the Email me or Call me buttons above. Email: pandey.ram1397@gmail.com. Phone:
              +91-8874913546.
            </p>
          </details>
        </div>
      </section>
    </>
  );
}
