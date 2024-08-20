import OTPForm from "./otpform";
import { useParams } from "wouter";

export default function VerifyForm() {
  const { acuid, rid } = useParams();

  return (
    <div className="w-[90%] sm:w-[80%] max-w-[400px] lg:max-w-lg xl:max-w-md bg-primary text-white rounded-2xl   px-8 pt-4">
      <div className="flex flex-col justify-center items-center w-full pt-6">
        <div className="space-y-2 w-full">
          <legend className="text-xl lg:text-2xl font-normal text-center">
            Verify your email
          </legend>

          <p className="text-center text-sm text-white/70">
            Confirmation code sent to {rid}
          </p>

          <OTPForm acuid={acuid} rid={rid} />
        </div>
      </div>
    </div>
  );
}
