import { useState, useEffect } from 'react'
import PrimaryButton from '../components/PrimaryButton'
import postData from '../postData'

const companies = [
    { name: "Amazon", location: "San Fransico", id: 1 },
    { name: "Google", location: "Mountain View", id: 2 },
    { name: "Microsoft", location: "Redmond", id: 3 },
    { name: "Apple", location: "Cupertino", id: 4 },
    { name: "Facebook", location: "Menlo Park", id: 5 },
]


export default function ServiceProvider() {

    const [authToken, setAuthToken] = useState(null)
    const [about_me, setAboutMe] = useState("")
    const [location, setLocation] = useState("")
    const [gst_no, setGstNo] = useState("")
    const [account_no, setAccountNo] = useState("")
    const [selected_company, setSelectedCompany] = useState(companies[0])
    const [loading, setLoading] = useState(false)

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
    const url = BACKEND_URL + 'api/user/service-provider'

    useEffect(() => {
        setAuthToken(localStorage.getItem('authToken'))
        return () => {
            console.log("unmounting")
        }
    }, [])

    const handleSubmit = async () => {
        console.log("submitted")
        let body = {
            about_me,
            location,
            gst_no,
            account_no,
            selected_company
        }
        const { data, error } = await postData(url, body, authToken);
        console.log("@@@@@@@@@@",data, error)
    }

    return (
        <div className="container bg-gray-50 mt-5 mx-auto flex-1 max-w-2xl p-4">
            <form>
                <textarea
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="about_me"
                    placeholder="About Me"
                    value={about_me}
                    onChange={(e) => setAboutMe(e.target.value)} />


                <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="location"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)} />

                <select onChange={(e) => setSelectedCompany(e.target.value)}>
                    {
                        companies && companies.map((company, index) => (
                            <option key={index} value={company.id}>{company.name}</option>
                        ))
                    }
                </select>

                <h3 className="text-center my-4">Billing information</h3>


                <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="gst_no"
                    placeholder="GST NO"
                    value={gst_no}
                    onChange={(e) => setGstNo(e.target.value)} />


                <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="account_no"
                    placeholder="Account No"
                    value={account_no}
                    onChange={(e) => setAccountNo(e.target.value)} />


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




        </div>

    )
}
