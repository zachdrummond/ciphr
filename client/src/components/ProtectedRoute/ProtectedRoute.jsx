// React
import { Redirect, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
// File Modules
import AuthContext from "../../context/AuthContext/AuthContext";
import API from "../../utils/API";

// Takes in a component and all of its props
const ProtectedRoute = ({ component: Component, ...rest }) => {
  // Destructures jwt from the AuthContextAPI
  const { jwt, setJwt } = useContext(AuthContext);

  // useEffect(() => {
  if (!jwt) {
    API.getCookieToken()
      .then((res) => {
        console.log(res);
        setJwt(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // }, []);

  // If the user has logged in or signed up, the user can access the website. Otherwise, the user is redirected to the login page.
  return (
    <Route
      {...rest}
      render={(props) => {
        if (jwt) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
export default ProtectedRoute;
