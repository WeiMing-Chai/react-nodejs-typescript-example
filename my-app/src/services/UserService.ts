import axios from 'axios';
import { useAxios } from '../utils/hooks'

export const useGetAllUsers = async () => {

    const axiosInstance = useAxios('http://localhost:4200');
    const response = await axiosInstance.get('/api/patients');
    return response?.data;
    // const response = await axios.get('/api/patients');
    // return response.data;
}

export async function createUser(data: {firstname: string, lastname: string, email: string}) {
    const response = await axios.post('/api/patient',{
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({patient: data})
    })
    return await response.data;
}