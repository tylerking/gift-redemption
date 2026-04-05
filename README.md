# Gift Redemption

A TypeScript and Svelte application to redeem gifts

## Features

- Three redeemable bundles with unique themes
- Interactive date picker for redemption scheduling
- Progress tracking with localStorage persistence
- Fully responsive design (desktop & mobile)
- Accessible UI with semantic HTML and ARIA labels

## Tech Stack

- **Vite** - Fast build tool
- **Svelte 5** - Reactive UI framework
- **TypeScript** - Type-safe development
- **Vanilla CSS** - Custom styling with CSS variables
- **ESLint** - Code quality

## Getting Started

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

Lint code:
```bash
npm run lint
```

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── Header.svelte
│   │   ├── ProgressBar.svelte
│   │   ├── Card.svelte
│   │   └── Footer.svelte
│   └── stores/
│       └── bundles.ts
├── App.svelte
├── main.ts
├── app.css
└── tokens.ts
```

## Design Tokens

The application uses CSS variables for consistent theming:
- `--bg-primary`: Warm off-white background
- `--text-primary`: Primary text color
- `--font-mono`: JetBrains Mono font
- `--progress-fill`: Muted rose progress bar
- `--color-zen`: Pastel lavender (Zen bundle)
- `--color-watch`: Pastel rose-pink (Watch Party bundle)
- `--color-farm`: Pastel mint (Farming Coop bundle)
