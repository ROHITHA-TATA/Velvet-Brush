# ArtGallery - Original Paintings Website

A responsive website for showcasing and selling original paintings with a fully functional shopping cart.

## Features

- Responsive design that works on all devices
- Gallery to display all paintings with filtering capability
- Interactive shopping cart with local storage
- Add/remove items functionality
- Quantity adjustment in cart
- Category filtering system
- Beautiful hover animations and transitions

## Project Structure

```
artgallery/
│
├── index.html             # Main HTML file
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   └── script.js          # JavaScript functionality
└── images/                # Directory for painting images
    ├── painting1.jpg
    ├── painting2.jpg
    ├── painting3.jpg
    ├── painting4.jpg
    ├── painting5.jpg
    ├── painting6.jpg
    └── hero-bg.jpg        # Hero section background
```

## Setup Instructions

1. Clone or download this repository.
2. Replace the placeholder images in the `images/` folder with your actual paintings.
3. Customize the paintings data in `js/script.js` with your painting details (titles, prices, categories).
4. Optionally, customize the colors and styling in `css/style.css` to match your brand.
5. Open `index.html` in your browser to view the website.

## Customization Options

### Changing Painting Information

Edit the `paintings` array in `js/script.js`:

```javascript
const paintings = [
    {
        id: 1,
        title: "Your Painting Title",
        price: 120.00,
        image: "images/your-image-file.jpg",
        category: "your-category"
    },
    // Add more paintings...
];
```

### Adding New Categories

1. Add new category buttons in the HTML:

```html
<button class="filter-btn" data-filter="your-new-category">Your Category</button>
```

2. Update your paintings data with the new category.

### Changing Colors

Edit the CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #your-color-code;
    --secondary-color: #your-color-code;
    /* other variables */
}
```

## Contact Information

For help or feedback, please contact:
- Email: your-email@example.com
- Phone: Your phone number

## License

This project is licensed under the MIT License. 