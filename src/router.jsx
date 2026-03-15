import { createHashRouter } from 'react-router'

import App from './containers/App'
import Home from './containers/Home'
import Films from './containers/Films'
import FilmsSearch from './containers/App/FilmsSearch/FilmsSearch'
import Film from './containers/Film'
import Favorites from './containers/Favorites'

export const router = createHashRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: 'films', Component: Films },
      { path: 'search', Component: FilmsSearch },
      { path: 'film/:id', Component: Film },
      { path: 'favorites', Component: Favorites },
    ],
  },
])
