import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/material.css';
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;
    
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
        console.log(ph);
        sessionStorage.setItem("phonenumber", ph);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }
  function resendOtp(){
    const ph=sessionStorage.getItem("phonenumber")
    const appVerifier = window.recaptchaVerifier;
   
    const formatPh = "+" + ph;
    
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
        console.log(ph);
        sessionStorage.setItem("phonenumber", ph);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }
  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Invalid OTP");
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section className=" flex items-center justify-center h-screen text-black	">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            {/* <h1 className="text-center leading-normal   font-medium text-3xl mb-6">
          </h1> */}

            <div className="text-emerald-500 w-fit mx-auto p-4 rounded-full">
              <img
                src="https://i.ibb.co/QrBn06t/Group-7824.png"
                alt="Group-7824"
                border="0"
              />
            </div>
            <label htmlFor="" className="font-bold text-xl text-center">
              Welcome to AdmitKard
            </label>
            <div className="text-center font-medium	">
              <h1 className="text-gray-400	text-s">
                In order to provide you with <br />a custom experience,
              </h1>
              <h1 className="text-gray-600">
                we need to ask you a few questions.
              </h1>
            </div>

            <button
              onClick={onSignup}
              className="bg-orange-300 w-full mt-9 flex gap-1 items-center justify-center py-2.5   rounded-full"
            >
              {loading && <CgSpinner size={20} className="mt-3 animate-spin" />}
              <span>Get Started</span>
            </button>
            <p className="text-center text-gray-400 mb-0 text-sm">
              *This will only take 5 min.
            </p>
          </div>
        ) : (
          <div className="w-80 items-center flex flex-col gap-4 rounded-lg p-4">
            {showOTP ? (
              <>
                {/* <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
    <BsTelephoneFill size={30} />
  </div> */}
                <img
                  width="150"
                  src="https://i.ibb.co/Wp79SSk/Group-7825.png"
                  alt="Group-7825"
                  border="0"
                />
                <label
                  htmlFor=""
                  className="font-bold mt-2 text-xl   text-center"
                >
                  Please verify Mobile number
                </label>

                <div className="font-bold text-base   text-center">
                  
                An OTP is sent to  +{ph} 
                  <p className="text-orange-300 text-xs underline" style={{cursor:"pointer"}} onClick={()=>{
                    console.log(user)
                    setShowOTP(false);
                  }}>Change Phone Number
                    </p>
                </div>

                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container mt-3" 
                  inputStyles={{border:'1px solid #d0d0d0'}}
                ></OtpInput>
                <div className="font-bold text-base mt-6 text-center space-y-10">
                  Didn't receive the code?  
                   <span className=" text-orange-300 font-extrabold underline" style={{cursor:"pointer"}} onClick={resendOtp}>  Resend</span> 
                </div>
                <button
                  onClick={onOTPVerify}
                  className="bg-orange-300 w-full mt-3 flex gap-1 items-center justify-center py-2.5   rounded-full"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify</span>
                </button>
              </>
            ) : (
              <>
                {/* <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div> */}
                {/* <img src="https://i.ibb.co/hfPcPWD/Group-7826.png" alt="Group-7826" border="0"></img> */}
                {/* <label
                  htmlFor=""
                  className="font-bold text-xl   text-center"
                >
                  Verify your phone number
              </label> */}
                <img
                  src="https://i.ibb.co/hfPcPWD/Group-7826.png"
                  alt="Group-7826"
                  border="0"
                ></img>

                <div  className="py-8 mt-3 text-center leading-normal   font-medium text-3xl">
                  Welcome Back
                  <div className="text-sm text-gray-600 gap-0 mt-2 text-center leading-normal   font-medium text-1xl ">
                  Please Sign in to your account
                </div>
                </div>
               
                <PhoneInput className="mt-12 border-orange-300" specialLabel='Enter Contact Number' value={ph} country={"in"} onChange ={setPh} />
                <br></br>
                {/* <div className="font-bold text-base   text-center"> We will send send you a one time SMS message.
                Charges may apply.
                </div> */}
                <div className="text-center font-medium	">
                  <h1 className=" overflow-clip text-gray-600 mb-12 text-sm ">
                   We will send you a one time SMS message. Charges may apply.
                  
                  </h1>
                  
                </div>

                <button
                  onClick={onSignup}
                  className="btn w-full mb-6 flex gap-1 items-center justify-center py-2.5  text-white rounded-full"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Sign in with OTP</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
 };

  export default App;
