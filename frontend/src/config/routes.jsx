import Main from "../components/main";
// import { CheckUserExist } from "../helper/helper";
import Quiz from "../components/quiz";
import Result from "../components/result";
import Login from "../components/login";
import Register from "../components/Register";
import Dashboard from "../components/Dashboard";

const routes = [
    {
      path: "/",
      component: Main,
      name: "Home Screen",
    //   protected: false
    },
    {
      path: "/quiz",
      component: Quiz,
      name: "Quiz",
    //   protected: true,
    },
    {
        path: "/result",
        component: Result,
        name: "Result",
        // protected: false,
    },
    {
      path: "/login",
      component: Login,
      name: "Login",
      // protected: false,
    },

    {
      path: "/register",
      component: Register,
      name: "Register",
      // protected: false,
    },
    {
      path: "/profile",
      component: Dashboard,
      name: "Dashboard",
      // protected: false,
    }
  ];

export default routes