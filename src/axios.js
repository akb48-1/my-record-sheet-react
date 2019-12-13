import axios from 'axios';

const url = process.env.NODE_ENV === "development"? 'http://localhost:8088/MySpringMvc' : '/MySpringMvc';

export function queryNavList() {
    return axios({
        method: 'post',
        url: url + '/queryNavList',
        data: JSON.stringify({
        })
      });
}

export function queryPersonList() {
    return axios({
        method: 'post',
        url: url + '/queryAllPerson',
        data: JSON.stringify({
        })
      });
}