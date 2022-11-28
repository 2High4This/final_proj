// import { Navigate, useLocation } from 'react-router-dom';
// import useAuth from './useAuth';

// const RequireAuth = () => {

//     const { auth } = useAuth();
//     const location = useLocation();

//     return (
//         auth?.user
//             ? <Navigate to="/unauthorized" state={{ from: location }} replace />
//             : <Navigate to="/login" state={{ from: location }} replace />
//     );
// }

// export default RequireAuth;