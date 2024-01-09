import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, auth, role, ...rest }) => {
  if (auth) {
    return <Route {...rest} element={element} />;
  } else {
    return <Navigate to="/login" state={{ from: rest.location }} />;
  }
};

export default ProtectedRoute;
