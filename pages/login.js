
import Link from 'next/link'
import PrimaryButton from '../components/PrimaryButton'
import { useState } from 'react'
import useFetch from '../useFetch'
import { useRouter } from 'next/router'
export default function Login() {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
    const url = BACKEND_URL + 'api/user/'
    const { data, loading, error } = useFetch(url)
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        console.log(email, password)
        fetch(BACKEND_URL + 'api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: email,
                password,
            }),
        }).then(res => {
            console.log(res)
            return res.json()
        }).then((data) => {
            console.log(data)
            localStorage.setItem('authToken', data.token)
        })


    }
    if (data) {
        router.push("/dashboard")
    }


    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Log In</h1>



                    {/* <span class="text-red-500 text-xs">
                        Invalid username field !
                    </span> */}
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                    {/* <span class="text-red-500 text-xs">
                        Invalid username field !
                    </span> */}

                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />



                    <div onClick={handleSubmit}>
                        <PrimaryButton text="Log In" />
                    </div>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div className="text-grey-dark mt-6">
                    Don't have an account?
                    <Link href="/signup">
                        <a className="no-underline border-b border-blue text-blue">
                            {' '} Singup
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}
