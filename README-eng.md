# OmniRent Frontend

## Description

Frontend of the OmniRent platform, a marketplace for renting a wide range of equipment.

The application allows users to list equipment, search for available items, create rentals, track payments, and manage their operations through a responsive interface integrated with the OmniRent API.

## Objective

The project was developed as part of a frontend development portfolio, applying practices commonly used in modern web applications and integrating with a backend architecture designed to resemble production environments.

## Technologies

* **Frontend**: Angular 19, TypeScript, HTML, SCSS
* **UI Components**: PrimeNG, PrimeIcons
* **Authentication**: JWT through HttpOnly cookies, OAuth2 with Google and GitHub
* **API Communication**: Angular HttpClient, interceptors, and centralized error handling
* **Real-Time Communication**: WebSocket, STOMP, and SockJS
* **Payments**: Stripe Checkout integration(Sandbox)
* **Caching**: Local caching with expiration, versioning, and invalidation
* **Internationalization**: Multiple languages, locale support, and time zone handling
* **Security**: CSRF protection, authentication guards, and authorization guards
* **Responsive Design**: Interface adapted for desktop and mobile devices
* **CI/CD**: GitHub Actions

## Running the Application

**1.** Configure the API URL in the application environment files.

**2.** Install the dependencies:

```bash
npm install
```

**3.** Start the development server:

```bash
ng serve
```

## Features

### Equipment

* Feed of equipment available for rent
* Search by title
* Filtering by category, subcategory, and condition
* Sorting by date and price
* Detailed listing view
* Equipment creation and editing
* Image upload and visualization
* Listing availability management
* Responsive equipment listing interface

### Rentals

* Rental request creation
* Visualization of rentals made and received
* Rental lifecycle tracking
* Management of preparation, shipping, usage, and return stages
* Display of updated operational information
* Handling of status changes and availability conflicts

### Payments

* Redirection to Stripe Checkout
* Payment processing tracking
* Real-time payment status updates
* Integration with events received through WebSocket
* Handling of pending, processing, and confirmed payment states

### Authentication

* User registration
* Email and password login
* Login with Google and GitHub
* JWT-based sessions stored in HttpOnly cookies
* Protected authenticated routes
* Permission-based access control
* Session expiration and invalidation handling

### User Account

* Account dashboard
* Profile management
* Address creation, editing, and removal
* Management of listed equipment
* Visualization of rented and rented-out equipment
* Account settings
* Navigation adapted for desktop and mobile devices

### Administration

* Administrative area protected by permissions
* User search and management
* User banning and reactivation
* Equipment search and management
* Listing approval and rejection
* Equipment blocking and unblocking
* Dedicated interface for administrative operations

### Caching

* Local caching of frequently accessed information
* Different expiration periods depending on the type of data
* User-specific caching when required
* Automatic invalidation after create, update, or delete operations
* Cached data versioning
* Removal of expired or incompatible entries
* Reduction of unnecessary API requests

### Internationalization

* Interface available in multiple languages
* Dynamic translation of texts and enums
* Data formatting based on the selected locale
* Date and time zone handling

### Error Handling

* Centralized HTTP interceptor
* Handling of errors returned by the API
* User feedback through notifications
* Specific handling for rate limiting
* Server unavailability handling
* Resource-not-found states
* Redirection for unauthorized access

### Interface

* Responsive layout
* Adaptive navigation bar
* Navigation drawer
* Loading feedback
* Skeletons while data is being loaded
* Dedicated empty and not-found states
* Application theme support
