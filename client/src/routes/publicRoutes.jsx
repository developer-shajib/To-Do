import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import PublicGard from './publicGard.jsx';

// Create Router
const publicRouter = [
  {
    element: <PublicGard />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
      // {
      //   path: '/forget',
      //   element: <Forgot />
      // },
      // {
      //   path: '/forget/:token/:id',
      //   element: <ChangePass />
      // }
    ]
  }
];

export default publicRouter;
