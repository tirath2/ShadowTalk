"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isChecked, setChecked] = useState(false);
  const { push } = useRouter();

  const handleCheckboxChange = (e: any) => {
    setChecked(e.target.checked);
  };
  const btnClickHandler = async () => {
    if (isChecked) {
      push("/call");
      try {
        const apiUrl = "";
        const body = {
          key1: "value1",
          key2: "value2",
        };
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await axios.post(apiUrl, body, { headers });
        console.log(response.data);
      } catch (error) {
        console.error("Error making API request:", error);
      }
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/shadow.png"
            alt="sh"
            className="dark:invert"
            width={400}
            height={400}
            priority
          />
        </a>
      </div>
      <div className="policy-box  max-h-40 overflow-y-auto mb-4 p-4 border rounded">
        <p>
          Privacy Policy for Random Video Chat Website Introduction This Privacy
          Policy describes how [Website Name] ("we," "us," or "our") collects,
          uses, and discloses your personal information when you use our website
          or services. Information We Collect We collect the following types of
          information from you: Personal Information: This includes information
          that identifies you as an individual, such as your name, email
          address, phone number, and IP address. We may also collect other
          personal information, such as your gender, age, and interests, if you
          voluntarily provide it to us. Usage Data: This includes information
          about how you use our website and services, such as your browsing
          history, search queries, and the pages you visit. We may also collect
          information about your device, such as your browser type, operating
          system, and IP address. Cookies and Similar Technologies: We use
          cookies and other similar technologies to collect information about
          your use of our website and services. Cookies are small files that are
          stored on your device and can be used to remember your preferences and
          settings. How We Use Your Information We use your information to:
          Provide you with our website and services Improve our website and
          services Personalize your experience on our website and services
          Communicate with you about our website and services Send you marketing
          and promotional communications How We Share Your Information We may
          share your information with third-party service providers who help us
          operate our website and services. These third-party service providers
          are required to protect your information in accordance with our
          Privacy Policy. We may also share your information with third-party
          advertisers, who may use it to serve you targeted advertisements. You
          can opt out of interest-based advertising from many networks,
          including those operated by participants in the Network Advertising
          Initiative ("NAI") and the Digital Advertising Alliance ("DAA"). For
          more information about these opt-out options, please visit the
          websites of the NAI and DAA. We may also disclose your information if
          we are required to do so by law or in the good faith belief that such
          action is necessary to comply with the law, protect our rights or
          property, or prevent harm to others. Your Choices You can control the
          collection of your information by our website and services by:
          Clearing your cookies Disabling cookies in your browser Opting out of
          interest-based advertising from many networks, including those
          operated by participants in the Network Advertising Initiative ("NAI")
          and the Digital Advertising Alliance ("DAA"). For more information
          about these opt-out options, please visit the websites of the NAI and
          DAA. Data Security We use industry-standard security measures to
          protect your information from unauthorized access, disclosure,
          alteration, or destruction. International Transfers Your information
          may be transferred to and processed in countries other than the
          country in which you reside. These countries may have different data
          protection laws than your country. We will take all necessary steps to
          ensure that your information is treated in accordance with this
          Privacy Policy and applicable law. Changes to Our Privacy Policy We
          may update this Privacy Policy from time to time. If we make any
          material changes, we will notify you by email or by posting the
          updated Privacy Policy on our website. Contact Us If you have any
          questions about this Privacy Policy, please contact us at
          contact@shadowtalk.com
        </p>
      </div>
      <input type="checkbox" name="" id="" onChange={handleCheckboxChange} />
      <input type="text" style={{ color: "black" }} />
      <button
        onClick={btnClickHandler}
        className={` ${
          isChecked
            ? "bg-blue-500 hover:bg-blue-700"
            : "bg-gray-300 cursor-not-allowed"
        } text-white font-bold py-2 px-4 rounded`}
        disabled={!isChecked}
        onMouseEnter={() => setChecked(true)}
        onMouseLeave={() => setChecked(false)}
        style={{ transform: isChecked ? "translateX(50px)" : "translateX(0)" }}
      >
        Start Chat
      </button>
    </main>
  );
}
