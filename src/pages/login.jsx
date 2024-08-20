import Logo from "../assets/logo1.png";
import LoginForm from "../components/loginform";

export default function Login() {
  return (
    <div className="w-full min-h-screen ">
      <main className="h-full w-full flex flex-col justify-center items-center bg-neutral min-h-screen pt-4 pb-8 space-y-2">
        <div className="flex flex-row justify-center items-center space-x-2">
          <img src={Logo} alt="" className="w-[42px]" />
          <span
            style={{
              fontFamily: "Bebas Neue",
            }}
            className=" text-primary font-medium text-3xl"
          >
            {" "}
            BSSPD{" "}
          </span>
        </div>

        <div className=" flex flex-col justify-center items-center w-full  ">
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
