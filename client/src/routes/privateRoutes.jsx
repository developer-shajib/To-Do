import Layout from '../components/Layout.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Project from '../pages/Project.jsx';
import PrivateGrad from './privateGrad.jsx';

// Create Router
const privateRouter = [
  {
    element: <PrivateGrad />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: '/',
            element: <Dashboard />
          },
          {
            path: '/project/:id',
            element: <Project />
          }
        ]
      }
    ]
  }
];

export default privateRouter;
