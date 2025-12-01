import * as React from 'react';

import { RadialIntro } from '@/components/radial';

// Using Simple Icons CDN for brand logos
// https://cdn.simpleicons.org/<slug>
const ITEMS = [
  { id: 1, name: 'Figma', src: 'https://cdn.simpleicons.org/figma' },
  { id: 2, name: 'PHP', src: 'https://cdn.simpleicons.org/php' },
  { id: 3, name: 'Laravel', src: 'https://cdn.simpleicons.org/laravel' },
  { id: 4, name: 'React', src: 'https://cdn.simpleicons.org/react' },
  { id: 5, name: 'Vue', src: 'https://cdn.simpleicons.org/vuedotjs' },
  { id: 6, name: 'TypeScript', src: 'https://cdn.simpleicons.org/typescript' },
  { id: 7, name: 'Tailwind CSS', src: 'https://cdn.simpleicons.org/tailwindcss' },
  { id: 8, name: 'C#', src: 'https://cdn.simpleicons.org/csharp' },
  { id: 9, name: 'Vite', src: 'https://cdn.simpleicons.org/vite' },
  { id: 10, name: 'Node.js', src: 'https://cdn.simpleicons.org/nodedotjs' },
  { id: 11, name: '.NET', src: 'https://cdn.simpleicons.org/dotnet' },
  { id: 12, name: 'Python', src: 'https://cdn.simpleicons.org/python' },
  { id: 13, name: 'Azure', src: 'https://cdn.simpleicons.org/microsoftazure' },
  { id: 14, name: 'GitHub', src: 'https://cdn.simpleicons.org/github' },
  { id: 15, name: 'Vercel', src: 'https://cdn.simpleicons.org/vercel' },
  { id: 16, name: 'Nginx', src: 'https://cdn.simpleicons.org/nginx' },
  { id: 17, name: 'SQL Server', src: 'https://cdn.simpleicons.org/microsoftsqlserver' },
  { id: 18, name: 'MySQL', src: 'https://cdn.simpleicons.org/mysql' },
  { id: 19, name: 'MongoDB', src: 'https://cdn.simpleicons.org/mongodb' },

];

export const TechStack = () => (
  <RadialIntro orbitItems={ITEMS} stageSize={480} imageSize={44} />
);