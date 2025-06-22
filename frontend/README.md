## Components Overview

### Hero
The [`Hero`](src/components/Hero.jsx) component is the landing section of the homepage. It features a visually engaging background image, a headline, a short description, and a search form. The search form allows users to select a destination, check-in and check-out dates, and the number of guests. This component is designed to immediately capture the user's attention and encourage them to start searching for hotels.

### Navbar
The [`Navbar`](src/components/Navbar.jsx) component provides the main navigation for the site. It includes links to Home, Hotels, Experience, and About pages, as well as a Dashboard button for hotel owners. The navbar adapts its style based on scroll position and user authentication state, showing login/signup options or user actions accordingly. It also features a responsive mobile menu.

### Title
The [`Title`](src/components/Title.jsx) component is a reusable section header. It displays a main title and a subtitle, with optional alignment and font customization. It is used across different sections like Featured Destinations, Exclusive Offers, and Testimonials to maintain consistent styling.

### FeaturedDestination
The [`FeaturedDestination`](src/components/FeaturedDestination.jsx) component showcases a curated list of hotel rooms as "Featured Destinations." It uses the [`HotelCard`](src/components/HotelCard.jsx) component to display each room, including hotel name, address, price, and a "Book Now" button. There's also a call-to-action button to view all destinations.

### HotelCard
The [`HotelCard`](src/components/HotelCard.jsx) component displays information about a single hotel room. It includes an image, hotel name, address, price per night, and a booking button. If the card is in an even position, it displays a "Best Seller" badge. Clicking the card navigates to the room's detail page.

### ExclusiveOffers
The [`ExclusiveOffers`](src/components/ExclusiveOffers.jsx) component presents a grid of limited-time hotel offers. Each offer card displays a background image, discount badge, offer title, description, expiry date, and a button to view more details. The section header uses the [`Title`](src/components/Title.jsx) component.

### Testimonial
The [`Testimonial`](src/components/Testimonial.jsx) component displays customer reviews in a visually appealing card format. Each testimonial shows the guest's name, address, photo, star rating (via the [`StarRating`](src/components/StarRating.jsx) component), and their review. This section helps build trust and credibility with potential customers.

### StarRating
The [`StarRating`](src/components/StarRating.jsx) component visually represents a star rating out of five. It fills stars based on the given rating and is used in the testimonial cards to show guest satisfaction.

---

All these components are styled using Tailwind CSS and are designed to be responsive and user-friendly, providing a seamless hotel booking