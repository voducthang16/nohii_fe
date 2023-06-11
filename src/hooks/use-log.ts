import axios from "axios";
import { API } from "../constants/API";

export const useLogContent = ({title, content}) => {
    return axios.post(`${API}/logs`, {
        title,
        content,
    })
}