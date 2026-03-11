import { createBrowserRouter } from 'react-router'

import App from './containers/App'
import Home from './containers/Home'

import Posts from './containers/Posts/Posts'
import Persons from './containers/App/Persons/Persons'
import FilmsSearch from './containers/App/FilmsSearch/FilmsSearch'
import UserName from './containers/UserName'

import Favorites from './containers/Favorites'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: 'posts', Component: Posts },
      { path: 'persons', Component: Persons },
      { path: 'search', Component: FilmsSearch },
      { path: 'user', Component: UserName },
      { path: 'favorites', Component: Favorites },
    ],
  },
])
