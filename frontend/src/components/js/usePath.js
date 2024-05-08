// usePath.js
import { useLocation } from 'react-router-dom';

const usePath = () => {
 const location = useLocation();
 const currentPath = location.pathname;

 const isActive = (path) => {
    return currentPath === path;
 };

 return isActive;
};

export default usePath;
