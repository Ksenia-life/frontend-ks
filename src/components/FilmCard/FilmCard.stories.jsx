import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'

import { store } from '../../store/store'
import { FilmCard } from './index'

const sampleFilm = {
  id: 666,
  filmId: 666,
  name: 'Форсаж',
  nameRu: 'Форсаж',
  nameEn: 'The Fast and the Furious',
  poster: 'https://kinopoiskapiunofficial.tech/images/posters/kp/666.jpg',
  posterUrl: 'https://kinopoiskapiunofficial.tech/images/posters/kp/666.jpg',
  posterUrlPreview:
    'https://kinopoiskapiunofficial.tech/images/posters/kp_small/666.jpg',
  genres: [{ genre: 'боевик' }, { genre: 'криминал' }],
  year: 2001,
}

const filmWithoutPoster = {
  id: 123456,
  filmId: 123456,
  name: 'Фильм без постера',
  nameRu: 'Фильм без постера',
  genres: [{ genre: 'драма' }],
}

const decorators = [
  (Story) => {
    const storyContent = Story()

    return (
      <Provider store={store}>
        <MemoryRouter>
          <div style={{ padding: '24px' }}>{storyContent}</div>
        </MemoryRouter>
      </Provider>
    )
  },
]

const meta = {
  title: 'Components/FilmCard',
  component: FilmCard,
  decorators,
  args: {
    onFavoriteClick: () => {},
  },
}

export default meta

export const Default = {
  args: {
    film: sampleFilm,
    isFavorite: false,
  },
}

export const Favorite = {
  args: {
    film: sampleFilm,
    isFavorite: true,
  },
}

export const WithoutPoster = {
  args: {
    film: filmWithoutPoster,
    isFavorite: false,
  },
}
