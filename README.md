# Cinescope

## Overview
The **Cinescope** is a React-based web application that allows users to search for movies, view detailed information, and manage a list of favorite movies. The app integrates with the **OMDB API** to fetch movie data.

## Features
   **Search Movies**: Users can search for movies by title or keyword.
   **Movie Details**: View detailed movie information including title, year, genre, cast, ratings, and plot.
   **Favorites**: Add movies to a favorites list and view them in a modal.
   **Pagination**: Browse large sets of search results with pagination.
   **Filter by Type**: Filter movies using the OMDB API filter endpoint (Movies).
   **Responsive UI**: Clean and modern UI built with Tailwind CSS.
   **Error Handling**: Displays appropriate messages for API errors or no results found.

## Tech Stack
   **React.js** - Frontend library
   **React Router** - Navigation handling
   **Tailwind CSS** - Styling framework
   **OMDB API** - Movie data source

## Installation & Setup

1. **Clone the repository**:
   git clone https://github.com/yourusername/movie-search-app.git

2. **Install dependencies**:
   npm install

4. **Start the development server**:
   npm run dev

## API Usage
The app fetches data from the **OMDB API**:

**Search Movies**:
  https://www.omdbapi.com/?s={movie_title}&apikey=YOUR_API_KEY

**Movie Details**:
  https://www.omdbapi.com/?i={movie_id}&apikey=YOUR_API_KEY



