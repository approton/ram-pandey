import { getExperience } from '@/lib/experience.mjs';
import ExperienceClient from './ExperienceClient';
export default function Experience(props) {
  return <ExperienceClient {...props} initialSnapshot={getExperience()} />;
}
