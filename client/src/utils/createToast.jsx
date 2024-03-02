import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const createToast = (msg, type = 'error') => {
  toast(msg, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    type
  });
};

export default createToast;
