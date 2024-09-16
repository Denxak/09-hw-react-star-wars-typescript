import Home from './Home'
import { navItems } from '../utils/constants'
import AboutMe from './AboutMe'
import Contact from './Contact'
import StarWars from './StarWars'
import { Routes, Route } from 'react-router-dom'
import ErrorPage from './ErrorPage'

const Main = () => {

  return (
    <Routes>
      {['/', navItems[0].path].map(path => <Route key={path} path={path} element={<Home />} />)}
      {[navItems[1].path, `${navItems[1].path}/:heroid`].map(path => <Route key={path} path={path} element={<AboutMe />} />)}
      
      <Route path={navItems[2].path} element={<StarWars />} />
      <Route path={navItems[3].path} element={<Contact />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default Main