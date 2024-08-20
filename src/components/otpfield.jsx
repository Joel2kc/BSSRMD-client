import OTPInput from "react-otp-input";

export default function OTPField({ otp, setOtp, numInputs = 6 }) {
  //   console.log(OTP);

  return (
    <div className="w-full flex flex-row items-center justify-center">
      <OTPInput
        value={otp}
        placeholder=""
        onChange={setOtp}
        numInputs={numInputs}
        renderInput={OTPFragment}
        renderSeparator={<span> &nbsp;&nbsp; </span>}
        shouldAutoFocus
      />
    </div>
  );
}

function OTPFragment(props) {
  return (
    <input
      {...props}
      inputMode="numeric"
      className="min-w-[35px]   py-1 bg-transparent px-1 lg:min-w-[40px] min-h-[35px] lg:min-h-[45px]  inline-block   text-white font-medium border-b-2 border-white outline-none   select-none  text-base md:text-lg text-center "
    />
  );
}
