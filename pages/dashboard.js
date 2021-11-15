import { useEffect, useState } from "react"
import useFetch from "../useFetch";


export default function Dashboard() {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
    const url = BACKEND_URL + 'api/user/';
    const { data, loading, error } = useFetch(url);
    
    return (
        <div className="container mx-auto max-w-2xl">
            <h1>Dashboard</h1>
            {loading && <p>loading.......</p>}
            {error && <p>ERROR!!!.......</p>}
            {data && <p>Hi {data.first_name}</p>}
        </div>
    )
}
