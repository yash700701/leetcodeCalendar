import { createRoot } from 'react-dom/client';
import { LeetCodeCalendar } from '../src';

createRoot(document.getElementById('root')!).render(
  <LeetCodeCalendar
    username="yash_tiwari700"
    blockSize={16}
    borderRadius={2}
    blockMargin={3}
    fontSize={14}
    theme={{
      background: 'transparent',
      text: '#000000',
      level0: '#d5d5d5ff',
      level1: '#0e4429',
      level2: '#006d32',
      level3: '#26a641',
      level4: '#39d353',
    }}
  />
);
