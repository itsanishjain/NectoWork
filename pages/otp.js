import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";

export default function OTP() {
    const [otp, setOtp] = useState('');
    return (
       <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 mt-5">
            <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="otp"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)} />
            <PrimaryButton text="Verify" />
       </div>
    )
}



