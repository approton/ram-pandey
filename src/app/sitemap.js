export default function sitemap(){const base='https://ram-pandey.auroradog65.chatgpt.site';return ['','about/','expertise/','projects/','contact/','projects/vyom/','projects/applypilot/','projects/omnext/'].map(path=>({url:`${base}/${path}`,lastModified:new Date('2026-10-30'),changeFrequency:'monthly',priority:path===''?1:.7}))}

export const dynamic = 'force-static';
