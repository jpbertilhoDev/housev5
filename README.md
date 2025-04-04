# House of Digital Business

A modern, responsive website for House of Digital Business built with React and Framer Motion.

## Features

- Responsive design with modern UI inspired by Apple's design language
- Animations using Framer Motion for a premium user experience
- Multi-language support (EN, DE, PT, FR, IT) with i18next
- Light/Dark theme toggle with theme persistence
- Contact form with EmailJS integration
- Optimized for all devices and browsers

## Prerequisites

- Node.js 14.x or higher
- npm 6.x or higher

## Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/house-of-digital-business.git
cd house-of-digital-business
```

2. Install dependencies
```bash
npm install
```

3. Configure EmailJS

Replace the placeholders in `src/components/Contact.tsx` with your actual EmailJS credentials:
```javascript
const serviceId = 'your_service_id';
const templateId = 'your_template_id';
const userId = 'your_user_id';
```

4. Start the development server
```bash
npm start
```

## Building for Production

To create an optimized production build:
```bash
npm run build
```

The build files will be created in the `build/` directory, ready to be deployed to your hosting provider.

## Customization

### Adding New Languages

1. Create a new translation file in `src/locales/` following the existing pattern
2. Update `src/i18n.ts` to include the new language

### Modifying Theme Colors

Edit the CSS variables in `src/styles/global.css` to change the theme colors.

## Project Structure

- `public/` - Static assets
- `src/` - Source code
  - `assets/` - Images, fonts, etc.
  - `components/` - React components
  - `locales/` - Translation files
  - `styles/` - CSS files
  - `utils/` - Utility functions

## Technologies Used

- React
- TypeScript
- Framer Motion
- i18next
- Styled Components
- EmailJS

## License

[MIT](LICENSE)

## Contact

For inquiries, please contact info@houseofdigitalbusiness.de 