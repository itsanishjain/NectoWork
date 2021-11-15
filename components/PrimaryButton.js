
export default function PrimaryButton({ text, color }) {
    let background = color || 'bg-indigo-600 hover:bg-indigo-700'
    return (
        <div className={`rounded-md shadow w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium ${background} text-white  md:py-4 md:text-lg md:px-10`}>

            {text}

        </div>
    )
}
