import { useState } from "react";

const solutions = [
    { name: "Webdev", id: 1 },
    { name: "Mobile", id: 2 },
    { name: "Desktop", id: 3 },
    { name: "Backend", id: 4 },
    { name: "Frontend", id: 5 },
    { name: "DevOps", id: 6 },

]


export default function Create() {
    const [selected_solutions, setSelectedSolutions] = useState([]);
    return (
        <div className="container mt-5 mx-auto flex-1 max-w-2xl p-4">
            <h1 className="text-lg my-2">Create Your Job</h1>
            <input type="text" className="block border border-grey-light w-full p-3 rounded mb-4" placeholder="Job Title" />
            <textarea type="text" className="block border border-grey-light w-full p-3 rounded mb-4" placeholder="Job Description" />
            <input type="text" className="block border border-grey-light w-full p-3 rounded mb-4" placeholder="Job Location" />
            <input type="text" className="block border border-grey-light w-full p-3 rounded mb-4" placeholder="Job Salary" />
            <input type="text" className="block border border-grey-light w-full p-3 rounded mb-4" placeholder="Job Type" />


            <p className="text-lg text-center mt-2">Choose your Solutions</p>

            <input type="text" list="data" className="block border border-grey-light w-full p-3 rounded mb-4" onKeyPress={(e)=>setSelectedSolutions([...selected_solutions , e.target.value])} />
            <datalist id="data" >

                {solutions.map((item, key) =>
                    <option key={key}  value={item.name}/>

                )}
            </datalist>
        </div>
    )
}
