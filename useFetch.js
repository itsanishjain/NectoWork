import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const abortCont = new AbortController()
        fetch(url, {
            signal:abortCont.signal,
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": "Token " + token }
        }).then((res) => {
            if (!res.ok) {
                throw Error('could not fetch the data from that resource')
            }
            return res.json()
        }).then((data) => {
            setData(data);
            setLoading(false)
            setError(null)

        }).catch((err) => {
            setLoading(false);
            setError(err.message)
            console.error("ERROR!!!!", err)
        })
        return () => {
            console.log('Cleanup Function')
            abortCont.abort()
        }
    }, [url])
    return {data,error,loading}
}


export default useFetch;