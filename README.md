# Fingerprint Marriage Scanner

A playful mobile-optimized web app that simulates a fingerprint scanning experience leading to a surprise marriage certificate reveal.

## Features

- **Mobile-First Design**: Optimized for touch interactions on mobile devices
- **Interactive Fingerprint Scanner**: Long-press the fingerprint icon to trigger the scanning animation
- **Animated Scanning Process**: Visual feedback with ripple effects and glowing animations
- **Surprise Marriage Certificate**: Beautiful certificate reveal with fade-in and scale effects
- **Celebratory Confetti**: Floating confetti animation when the certificate appears
- **Sound Effects**: Optional celebration sound (requires MP3 file)
- **Responsive Design**: Works seamlessly across different screen sizes

## Tech Stack

- **Next.js 15**: React framework with App Router
- **Tailwind CSS 4**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Howler.js**: Audio playback for celebration sounds
- **TypeScript**: Type-safe development

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use

1. **Initial View**: You'll see a dark background with a glowing fingerprint icon in the bottom right corner
2. **Instructions**: The center displays "Long-press the fingerprint to scan..."
3. **Interaction**: Long-press (hold for ~2.5 seconds) the fingerprint icon
4. **Scanning**: Watch the scanning animation with ripple effects
5. **Reveal**: The marriage certificate appears with confetti celebration
6. **Certificate**: Features the text "You are now officially married to David Adebayo" with congratulations

## Mobile Optimization

- Touch-friendly fingerprint button with appropriate sizing
- Smooth animations optimized for mobile performance
- Proper viewport settings to prevent zooming
- Responsive design that works on all screen sizes

## Customization

- **Sound**: Add a celebration MP3 file to `/public/celebration.mp3`
- **Colors**: Modify the gradient colors in the CSS
- **Text**: Change the marriage certificate content in the component
- **Animations**: Adjust timing and effects in the Framer Motion components

## File Structure

```
src/
├── app/
│   ├── globals.css      # Tailwind CSS and custom styles
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main fingerprint scanning component
public/
├── fingerprint.svg      # Fingerprint icon
└── celebration.mp3      # Celebration sound (optional)
```

## Browser Support

- Modern browsers with ES6+ support
- Mobile browsers (iOS Safari, Chrome Mobile, etc.)
- Touch event support required for fingerprint interaction

Enjoy the playful marriage certificate experience! 💍✨
