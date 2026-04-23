import { render, screen } from '@testing-library/react';
import MovieCard from './components/MovieCard';

test('renderiza dados basicos de um filme no card', () => {
  const movie = {
    title: 'Filme Teste',
    year: 2025,
    genre: ['Drama', 'Aventura'],
    rating: 8.6,
    poster: 'https://example.com/poster.jpg',
    director: 'Diretor Teste',
  };

  render(<MovieCard movie={movie} />);

  expect(screen.getByText('Filme Teste')).toBeTruthy();
  expect(screen.getByText('2025')).toBeTruthy();
});
