import './styles/App.css'
import routes from './config/routes'
import { Routes, Route, HashRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setSubmittedAction, setSubmittedActionFalse } from './redux/result_reducer'

function App() {
  const dispatch = useDispatch()
  
  const getResults = async (email) =>{
    if (email) {
    axios({
      method: "GET",
            // url:`http://127.0.0.1:5000/results/${email}`,
            url: `https://quiz-backend-aao5.onrender.com/results/${email}`,
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }

          })
          .then(function (response) {
            console.log("response.data.email")
            console.log(response.data.user_email)
            if (response.data.user_email) {
                console.log("setSubmittedAction")
                // dispatch(setSubmittedAction())
            } else {
              console.log("setSubmittedActionFalse")
                // dispatch(setSubmittedActionFalse())
            }
          })
          .catch(function (error) {
            if (error.response){
                console.log(error.response)
                if(error.response.status === 401){
                    alert("Invalid Credentials")
                }
            }
          });
    }
  }

  useEffect( () => {
    getResults(localStorage.getItem('email'))
  }, [])

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