import Logo from "../assets/logo1.png";
import Header from "../components/header";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { FaCircleCheck } from "react-icons/fa6";
import HeroImage from "../assets/images/techny-cloud-storage.png";
import Feature1Image from "../assets/images/feature1.png";
import Feature2Image from "../assets/images/feature2.png";
import Feature4Image from "../assets/images/feature4.png";
import Feature5Image from "../assets/images/feature5.png";
import Feature6Image from "../assets/images/feature6.png";
import { Link } from "wouter";
import SLink from "../components/slink";

const howItWorks = [
  {
    step: "Data Encryption",
    description:
      "Encrypt your data using Ciphertext-Policy Attribute-Based Encryption (CP-ABE). Define access policies based on user attributes to ensure that only authorized users can decrypt and access the data. This process secures your data with advanced encryption techniques, making it accessible only to those with the appropriate permissions.",
  },
  {
    step: "Decentralized Storage",
    description:
      "Upload the encrypted data to the InterPlanetary File System (IPFS). IPFS distributes the data across a network of nodes, providing decentralized storage. This method prevents single points of failure and enhances data availability and resilience by ensuring that your data remains accessible even if individual nodes are down or unreliable.",
  },
  {
    step: "Blockchain Publishing",
    description:
      "Publish metadata and manage encryption keys using blockchain smart contracts. Blockchain technology provides a transparent and immutable ledger for recording transaction details, ensuring that the metadata associated with your data is secure and tamper-proof. Smart contracts automate the distribution of encryption keys, making the process efficient and reliable.",
  },
  {
    step: "Secure Access",
    description:
      "Allow authorized users to access and decrypt the data based on their attributes. The system checks user credentials against the access policies defined during encryption. Only users who meet the criteria can decrypt and view the data, ensuring that sensitive information remains protected and accessible only to those with the proper authorization.",
  },
];

const keyFeatures = [
  {
    title: "Decentralized Data Storage",
    description: [
      "Securely store your data on the InterPlanetary File System (IPFS), ensuring decentralization and resilience. IPFS allows data to be distributed across a global network of nodes, preventing single points of failure and enhancing availability and reliability.",
      "This approach not only increases security but also ensures that your data is always accessible when needed, regardless of server outages or central server failures.",
    ],
    img: Feature2Image,
  },
  {
    title: "Advanced Encryption",
    description: [
      "Protect your data with Ciphertext-Policy Attribute-Based Encryption (CP-ABE), a cutting-edge encryption method that enables fine-grained access control based on user attributes. This means you can define specific access policies that determine who can decrypt and access your data, providing a robust layer of security.",
      "CP-ABE ensures that sensitive information remains confidential and is only accessible to authorized users, making it ideal for protecting personal and sensitive data.",
    ],
    img: Feature5Image,
  },
  {
    title: "Immutable Records",
    description: [
      "Leverage the transparency and immutability of blockchain technology to create trustworthy data transactions. Once data is recorded on the blockchain, it becomes immutable, meaning it cannot be altered or deleted. This feature ensures a tamper-proof record of all transactions and data exchanges, providing a reliable audit trail.",
      "The immutable nature of blockchain enhances trust and accountability, making it an ideal solution for secure data sharing and verification.",
    ],
    img: Feature6Image,
  },
  {
    title: "User Empowerment",
    description: [
      "Maintain full control over your data without relying on third-party services. Our platform empowers users by allowing them to define and manage their own access control policies. You decide who gets access to your data and under what conditions, ensuring that you retain ownership and control.",
      "This user-centric approach puts you in charge, providing the flexibility to adjust access permissions as needed while keeping your data secure and private.",
    ],
    img: Feature1Image,
  },
  {
    title: "Seamless Integration",
    description: [
      "Easily integrate our platform with your existing systems to enhance security and privacy without disrupting your workflow. Our APIs and developer tools are designed for straightforward integration, allowing you to quickly add advanced data protection features to your current infrastructure.",
      "Whether you are a developer, IT administrator, or business owner, our platform provides the tools you need to safeguard your data while maintaining operational efficiency and user convenience.",
    ],
    img: Feature4Image,
  },
];

export default function Home() {
  return (
    <div id="home" className="w-full h-screen">
      <main className="h-full w-full">
        <Header />

        <div className="pt-16"></div>

        {/* s1  */}

        <div className="center justify-start w-full min-h-[80vh] lg:min-h-screen bg-neutral ">
          <div className="w-[90%] grid grid-cols-10 lg:gap-x-8 pt-6 lg:pt-10">
            {/* g1  */}

            <div className="space-y-8 lg:space-y-8 col-span-10 lg:col-span-6">
              <h1 className="text-xl md:text-2xl font-bold ">
                Welcome to{" "}
                <span
                  style={{
                    fontFamily: "Bebas Neue",
                  }}
                  className="text-primary"
                >
                  BSSPD🛡️
                </span>
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold">
                Your Gateway to Secure and Efficient{" "}
                <span className="text-primary">Data Sharing</span>
              </h1>

              <p className="tetx-lg md:text-xl text-contrast/70">
                Welcome to the Blockchain-based Security Sharing Scheme for
                Personal Data (BSSPD). Our cutting-edge platform combines
                blockchain technology, Ciphertext-Policy Attribute-Based
                Encryption (CP-ABE), and the InterPlanetary File System (IPFS)
                to offer a user-centric, secure solution for personal data
                sharing.
              </p>

              <div className="flex flex-row justify-start items-center space-x-4">
                <Link to="/register">
                  <button className="btn-1">Get Started</button>
                </Link>

                <SLink offset={-200} to="features">
                  <button className="btn-2 flex flex-row justify-start space-x-2 items-center">
                    <span> Learn More</span>

                    <HiOutlineArrowSmRight className="text-2xl" />
                  </button>
                </SLink>
              </div>
            </div>

            {/* g2  */}
            <div className="col-span-10 lg:col-span-4">
              <img src={HeroImage} alt="BSSPD" className="h-full" />
            </div>
          </div>
        </div>

        {/* s2  */}

        <div
          id="features"
          className="center justify-start w-full min-h-screen bg-neutral border-t border-contrast/20 pt-6"
        >
          <div className="w-[90%] max-w-6xl space-y-8  ">
            <div className="space-y-2">
              <h2 className="text-2xl lg:text-3xl text-center font-bold">
                {" "}
                Key Features{" "}
              </h2>
              <p className="text-center text-lg ">
                Redefining Data Sharing with Security and Trust
              </p>
            </div>

            <div className="space-y-8 md:space-y-16 lg:space-y-32 ">
              {keyFeatures.map((v, i) => {
                return (
                  <div
                    className="w-full group grid grid-cols-1 lg:grid-cols-2 "
                    key={i}
                  >
                    {/* g1  */}

                    <div className="lg:group-odd:order-0  lg:group-even:order-1  p-4 space-y-4 place-content-center">
                      <h1 className="text-2xl lg:text-3xl font-bold text-primary">
                        {v.title}
                      </h1>

                      <div className="space-y-4">
                        {v.description.map((v, i) => (
                          <div
                            key={i}
                            className="flex justify-start items-start space-x-2"
                          >
                            <div>
                              <FaCircleCheck className="text-xl text-contrast/80" />
                            </div>
                            <p className="text-contrast/70">{v}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* g2  */}
                    <div className=" center lg:group-odd:order-1  lg:group-even:order-0">
                      <img
                        src={v.img}
                        alt={v.title}
                        className=" max-w-[200px] max-h-[200px] lg:max-w-[300px] lg:max-h-[300px]"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* s3  */}

        <div
          id="howitworks"
          className="center justify-start w-full  min-h-screen bg-neutral border-t border-contrast/20 pt-6"
        >
          <div className="w-[90%] max-w-6xl space-y-8  ">
            <div className="space-y-2 py-8">
              <h2 className="text-2xl lg:text-3xl text-center font-bold">
                How it works
              </h2>
            </div>

            <div className="  grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 lg:gap-x-16 gap-y-16 ">
              {howItWorks.map((v, i) => {
                return (
                  <div
                    className="w-full rounded shadow-lg border border-primary/50 "
                    key={i}
                  >
                    <div className="  p-4 space-y-4 ">
                      <h1 className="text-xl lg:text-2xl  text-primary space-x-4">
                        <span className="inline-block rounded border bg-primary text-neutral px-4">
                          {i + 1}
                        </span>
                        <span>{v.step}</span>
                      </h1>

                      <div className="flex justify-start items-start space-x-2">
                        <p className="text-primary/70">{v.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* s4  */}

        <div
          id="contact"
          className="center justify-start w-full py-16 bg-neutral border-t border-contrast/20 "
        >
          <div className="w-[90%] center max-w-6xl space-y-8  ">
            <div className="space-y-2 center">
              <img src={Logo} alt="" className="w-16" />
              <h2 className="text-xl text-primary lg:text-2xl text-center ">
                Join Us Today
              </h2>
            </div>

            <p className="text-center text-xl max-w-2xl text-primary ">
              Experience the future of secure data sharing. Sign up now and take
              the first step towards a more secure and user-centric data sharing
              model.
            </p>

            <Link to="/register">
              <button className="btn-2">Try it</button>
            </Link>
            <p className="text-center text-xl max-w-2xl text-primary ">
              For more information, please contact us at contact@bsspd.com.
            </p>
          </div>
        </div>

        <footer className="py-2 text-sm  center bg-neutral">
          <div className="w-[90%] center max-w-6xl  space-y-1 ">
            <p>
              &copy; {new Date().getFullYear()} BSSPD - Some rights reserved
            </p>

            <p>Redefining Data Sharing with Security and Trust. </p>
            <p className="text-xs font-medium">
              {" "}
              Developed by Oluwatukesi Joel (CPE/18/6679){" "}
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
