import './styles/App.css'
import routes from './config/routes'
import { Routes, Route, HashRouter } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {

  return (
    <HashRouter>
      <Navbar />
        {/* <Provider store={store}> */}
          <Routes>
            { routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            )) }
          </Routes>
        {/* </Provider> */}
    </HashRouter>
  )
}

export default App