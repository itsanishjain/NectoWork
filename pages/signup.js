import Link from "next/link"
import PrimaryButton from "../components/PrimaryButton"
import { useState } from "react"
import { useRouter } from "next/router"


export default function Signup() {
    const [first_name, setfName] = useState('')
    const [last_name, setlName] = useState('')
    const [email, setEmail] = useState('')
    const [business_name, setBusinessName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [accountType, setAccountType] = useState('personal')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
    const router = useRouter()


    const handleSubmit = async () => {
        setLoading(true)
        router.push('/service-provider-profile')

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }
        try {
            console.log("phone", phone, 'Password', password)
            const response = await fetch(BACKEND_URL + 'api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name,
                    last_name,
                    username: email,
                    email,
                    phone,
                    country_code: "91",
                    password,
                    type: accountType === 'personal' ? 'sp' : 'bp'

                })
            })

            const data = await response.json()
            console.log("DATA", data)

            localStorage.setItem('authToken', data.token)



            // const { success, message } = await response.json()

            // console.log(success, message)
            // if (success) {
            //     setError('')
            //     setfName('')
            //     setlName('')
            //     setEmail('')
            //     setPassword('')
            //     setConfirmPassword('')
            // } else {
            //     setError(message)
            // }
        } catch (err) {
            console.log(err, 'ERROR')
        }
        console.log("TRIED")
        setLoading(false)




    }


    return (

        <div className="bg-grey-lighter min-h-screen flex flex-col mt-5">
            <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <div className="mb-2">
                        <span className="text-gray-700">Account Type</span>
                        <form className="mt-2" onClick={(e) => setAccountType(e.target.value)}>
                            <div className="row">

                                <div className="col-lg-6">
                                    <label className="inline-flex items-center">
                                        <input type="radio" className="form-radio" name="accountType" value="personal" />
                                        <span className="ml-2">Service Provider</span>
                                    </label>
                                </div>

                                <div className="col-lg-6">
                                    <label className="inline-flex items-center">
                                        <input type="radio" className="form-radio" name="accountType" value="business" />
                                        <span className="ml-2">Business Provider</span>
                                    </label>
                                </div>

                            </div>
                        </form>
                    </div>

                    {accountType === 'personal' ? <div className="mb-2">
                        <PrimaryButton text="Sign in with Google" color='bg-blue-600 hover:bg-blue-700' />
                        <p className="text-center">OR</p>
                    </div> : null}

                    <form>


                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="first_name"
                            placeholder="First Name"
                            value={first_name}
                            onChange={(e) => setfName(e.target.value)} />

                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="last_name"
                            placeholder="Last Name"
                            value={last_name}
                            onChange={(e) => setlName(e.target.value)} />

                        <input
                            type="email"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />

                        <input
                            type="tel"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="phone"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)} />

                        {
                            accountType === 'business' ? <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="business_name"
                                placeholder="Business Name"
                                value={business_name}
                                onChange={(e) => setPhone(e.target.value)} /> : null

                        }

                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} />

                        <div onClick={handleSubmit}>
                            {
                                loading ?
                                    <div class="flex justify-center items-center">
                                        <div
                                            class="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"
                                        ></div>
                                    </div> : <PrimaryButton text="Create Account" />
                            }

                        </div>
                    </form>
                    
                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the {' '}
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and {' '}
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account? {' '}
                    <Link href="/login">
                        <a className="no-underline border-b border-blue text-blue">
                            Log in
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}
