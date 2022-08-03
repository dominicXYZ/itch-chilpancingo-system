import axios from 'axios';
export {getIsAuth}

function getIsAuth(){
    return axios.get('/api/usuario/isAuth').then(res => res.data);
}