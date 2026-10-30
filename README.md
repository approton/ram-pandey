# Ram Pandey portfolio

Next.js App Router, React, JavaScript, CSS Modules and semantic HTML. Main content is statically rendered and exported to `dist/` for Sites hosting. No database, tracking, or mailing list.

## Development

`npm install`, `npm run dev`. Production: `npm run build`. Copy the generated `.next-production/` export to `dist/`. The deployment output is `dist/`.

## Content and architecture

- `src/data/profile.js`: editable profile, skills and honest project statuses.
- `src/app/page.js`: long-form landing page, with section links and contact.
- `src/app/about`, `expertise`, `projects`, `contact`: focused detail routes.
- `src/components`: shared navigation/theme, project filtering, contact form.
- `src/app/globals.css`: global tokens, light/dark themes, responsive layouts.
- `src/app/page.module.css`: homepage portrait/depth composition.

Fonts are locally hosted. The supplied portrait is optimized to WebP. Decorative depth uses CSS rather than a heavy WebGL runtime. Reduced motion disables visual animation. No fabricated results, testimonials, or project deployments.

## Email activation — required

The contact form posts only name, email and message to FormSubmit for delivery to pandey.ram1397@gmail.com. The recipient must activate delivery through FormSubmit's verification email after the first submission. There is no Gmail password or API key in the app. Submission acceptance does not confirm inbox delivery. Provider-side spam prevention and rate limiting are controlled by FormSubmit; there is no custom server endpoint in this static export. The form shows network/provider errors and provides a direct mailto fallback. No real message was sent during development.

If a first-party API is later needed, remove static export, implement a server-only transactional provider adapter with validation, request-size limits and distributed rate limiting. Do not put provider credentials in client code.

## Launch checklist

1. Verify FormSubmit recipient activation, then test actual delivery with owner consent.
2. Review the professional facts and project statuses in the content config.
3. Update canonical origin, sitemap, robots and structured data for a custom domain.
4. Submit sitemap.xml in Google Search Console and Bing Webmaster Tools after the Site is public. Verify domain ownership through DNS.
5. Check keyboard navigation, both themes, mobile layouts and reduced-motion preferences.
6. Measure Core Web Vitals after launch; no performance score is claimed without measurement.

Sites start owner-private. Search engines and external visitors require a subsequent access change. Source does not include an invented resume or empty blog pages.

## Optional evolution

Keep this as one deployment. If teams later need independent releases, extract shared UI/tokens and route-based feature apps into a monorepo. Verify framework compatibility before adopting Module Federation.

## Spatial redesign

The homepage uses a custom WebGL torus-knot mesh with lighting and pointer rotation. Its animation can be paused; reduced-motion preferences render a still frame. WebGL-unavailable devices receive a CSS fallback. GPU pixel density is capped at 1.5, and offscreen/hidden scenes avoid rendering work.

The shared UI uses translucent layers, backdrop blur, a sticky floating header, reading progress, and pointer-reactive CSS perspective. Fine-pointer hover effects are disabled for reduced motion and touch input. Scattered decorative words stay outside the main text flow and out of the accessibility tree.

Navigation uses full route links. The homepage is a long overview; About, Expertise, Services, Contact, the searchable Projects workspace, and five project detail routes are separate documents. The Watcher and Income Tax Calculator were added using owner-supplied descriptions. Omnext links to https://omnext.vercel.app and the calculator links to https://calculate-tax-nine.vercel.app.

Formatting: `npm run format` writes Prettier output for project sources and configuration. `npm run format:check` validates it. Generated builds, dependencies and binary assets are excluded.

## HTML-style contact editor

The shared contact form is an accessible HTML-styled IDE with editable name, email and message controls, line numbers, syntax colors, a live React-rendered preview, character count, and Ctrl/Cmd+Enter submission. Preview content is escaped text, not executable HTML. Native required, length and email constraints apply before the existing FormSubmit request. Provider acceptance is distinguished from delivery, and requests have a 20-second timeout.

Mobile navigation uses native details/summary so opening the menu does not depend on React hydration. Theme storage is optional and guarded. On narrow screens the scene has an explicit 310px height, followed by the portrait and a separate caption; decorative labels are reduced to avoid overlaps.

## Portrait and theme controls

The homepage portrait banner uses the original supplied PNG without saturation filters, animated transforms, or backdrop blur on the image. Its photo and details are separate keyboard-focusable controls. Photo hover/focus opens a larger portrait; details hover/focus opens a medium portrait with professional context. Taps pin a preview; close, Escape, or clicking outside dismisses it.

The theme control is a native checkbox switch with CSS `:has()` theme tokens. Native checking changes the visible theme independently of React click handling; JavaScript initializes and saves the preference where localStorage is available.
