import Link from "next/link"
import PrimaryButton from "../components/PrimaryButton"
import { useState, useEffect } from "react"


export default function Solution() {
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [description, setDescription] = useState('')
    const [value_proposition, setValueProposition] = useState('')
    const [image, setImage] = useState('')
    const [link, setLink] = useState('')
    const [loading, setLoading] = useState(false)

    const [notification, setNotification] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setNotification(false)
        }, 3000)
        return () => {
            console.log('cleanup')
        }
    }, [])

    console.log(notification)



    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault()
        console.log("HI SUBMIT")
    }
    return (
        <div className="container mt-5 mx-auto flex-1 max-w-2xl p-4">


            {notification ? <div className="bg-red-100 border-l-4 border-red-500 text-orange-700 p-4 mb-2 transition duration-500 ease-out-in  hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110" role="alert">
                <p className="font-bold">Be Warned</p>
                <p>Something not ideal might be happening.</p>
            </div>
                : null}


            <form onSubmit={handleSubmit}>
                
                <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="name"
                    placeholder="Solution Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="type"
                    placeholder="Solution Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />

                <textarea
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="description"
                    placeholder="Solution Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <textarea
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="value_proposition"
                    placeholder="Value Proposition"
                    value={value_proposition}
                    onChange={(e) => setValueProposition(e.target.value)}
                />

                <label htmlFor="files" className="fs-2">Select Deck</label>
                <input type="file"
                    multiple
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    placeholder="Deck"

                />

                <label htmlFor="files" classNamee="fs-2">Select Case Studie</label>
                <input type="file"
                    multiple
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    placeholder="Deck"

                />


                <label htmlFor="files" classNamee="fs-2">Select Testimonial</label>
                <input type="file"
                    multiple
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    placeholder="Deck"

                />

                {
                    loading ?
                        <div className="flex justify-center items-center">
                            <div
                                className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"
                            ></div>
                        </div> : <PrimaryButton text="Create Solution" />
                }

            </form>


        </div>


    )
}


