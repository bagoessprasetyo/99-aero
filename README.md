# 99 Aero Power - Company Profile Website

A professional company profile website for 99 Aero Power (PT. Iklima Sukses Mandiri), built with React, Vite, and Tailwind CSS.

## Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Performance**: Built with Vite for fast development and optimized production builds
- **SEO Friendly**: Semantic HTML and optimized meta tags
- **Interactive**: Smooth scrolling, hover effects, and interactive components

## Sections

1. **Hero Section**: Compelling introduction with company branding
2. **About Us**: Company overview, vision, and mission
3. **Services**: Detailed service offerings with descriptions
4. **Advantages**: What makes the company different
5. **Portfolio**: Showcase of completed projects
6. **Contact**: Contact information and form

## Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icons
- **PostCSS**: CSS processing with autoprefixer

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd 99aeropower-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production build will be created in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # Navigation header
│   ├── Hero.jsx        # Hero section
│   ├── About.jsx       # About section
│   ├── Services.jsx    # Services section
│   ├── Advantages.jsx  # Advantages section
│   ├── Portfolio.jsx   # Portfolio section
│   ├── Contact.jsx     # Contact section
│   └── Footer.jsx      # Footer
├── App.jsx             # Main App component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Customization

### Colors

The color scheme can be customized in `tailwind.config.js`. The primary color is currently set to a cyan/blue theme.

### Content

All content can be easily modified by editing the respective component files. The content is stored in JavaScript objects for easy maintenance.

### Styling

The website uses Tailwind CSS for styling. Custom styles are defined in `src/index.css` and can be extended as needed.

## Performance Optimizations

- **Lazy Loading**: Images and components are optimized for loading
- **Code Splitting**: React components are efficiently bundled
- **Minification**: Production builds are minified and optimized
- **Caching**: Static assets are cached for better performance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

The website can be deployed to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use the `dist` folder contents

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For any questions or support, please contact:

- **Email**: sales.project@99aeropower.com
- **Phone**: +62 815 194 20311
- **Website**: www.99aeropower.com

---

Built with ❤️ for 99 Aero Power by [Your Name]