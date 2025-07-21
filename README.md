# LeetCodeCalendar

A customizable React component to display a GitHub-like contribution calendar based on your LeetCode submissions. Easily installable via npm and styled with themes!

![LeetCode Calendar Demo](https://raw.githubusercontent.com/yash700701/leetcodecalendar/main/image/demoComponentImage.png)



---

## ✨ Features

- Displays LeetCode submission activity in a contribution-style calendar.
- Fully customizable: block size, spacing, fonts, and color themes.
- Works in both SSR and CSR environments.
- CORS-safe using a simple Node.js proxy server.

---

## 📦 Installation

```bash
npm install @yashx700/leetcodecalendar

## 📚 Usage

```jsx
import { LeetCodeCalendar } from '@yashx700/leetcodecalendar';

<LeetCodeCalendar
  username="leetcode username"
  blockSize={14}
  blockMargin={3}
  fontSize={14}
  theme={{
    background: 'transparent',
    text: '#000000ff',
    level0: '#d5d5d5ff',
    level1: '#0e4429',
    level2: '#006d32',
    level3: '#26a641',
    level4: '#39d353',
  }}
  style={{ maxWidth: '800px' }}
/>
