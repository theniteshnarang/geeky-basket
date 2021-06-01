import { useState, useEffect} from 'react';
import {useAuth} from './context/authProvider'
import axios from 'axios';
const useAxios = (requestType, url, postObject) => {
    const {token} = useAuth()
    const [data, setData] = useState({ data: null, error: false, loading: false, status: 0 })
    useEffect(() => {
        (async () => {
            try {
                setData((prev) => ({ ...prev, loading: true }))
                const response = await axios({
                    method: requestType,
                    url,
                    data: postObject,
                    headers : {Authorization : token}
                })
                setData((prev) => ({ ...prev, data: response.data, status: response.status }))
            } catch (err) {
                setData((prev) => ({ ...prev, error: err }))
            } finally {
                setData((prev) => ({ ...prev, loading: false }))
            }
        })()
    }, [url, requestType, postObject, token])
    return data
}

export { useAxios }