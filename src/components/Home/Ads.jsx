import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import apiRequest from "../../../utils/apiRequest";
import settings from "../../../utils/settings";
import ServeLangItem from "../Helpers/ServeLangItem";
export default function Ads() {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const [announcment, setAnnouncmentData] = useState(null);
  const [email, setEmail] = useState("");
  const [ads, setAds] = useState(null);
  const adsHandle = () => {
    if (announcment) {
      localStorage.setItem("ads", "false");
      let date = new Date();
      date.setDate(date.getDate() + parseInt(announcment.expired_date));
      localStorage.setItem("upcoming_announcement", `${date}`);
      setAds(false);
    }
  };
  const subscribehandler = () => {
    apiRequest
      .subscribeRequest({ email: email })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response && err.response.data.message);
      });
  };
  useEffect(() => {
    if (!announcment) {
      setAnnouncmentData(
        websiteSetup && websiteSetup.payload.announcementModal
      );
    }
    let ads = JSON.parse(localStorage.getItem("ads"));
    let crrDate = new Date();
    let upcomingDate = new Date(localStorage.getItem("upcoming_announcement"));
    if (ads) {
      setAds(true);
    } else {
      if (upcomingDate) {
        if (crrDate > upcomingDate) {
          setAds(true);
        } else {
          setAds(false);
        }
      } else {
        setAds(true);
      }
    }
  });
  const { logo } = settings();
  return (
    <>
      <div>
        {ads && announcment && parseInt(announcment.status) === 1 && (
          <div className="w-full h-full flex fixed left-0 top-0 justify-center z-40 items-center ">
            <div
              className="w-full h-full fixed left-0 right-0 bg-black  bg-opacity-25"
            ></div>
            <div
              className="lg:w-[812px] md:w-[650px] w-[310px] md:h-[509px] relative z-50 bg-slate-700 ltr:md:pl-10 ltr:pl-3 rtl:md:pr-10 rtl:pr-3 pr-3 md:py-[108px] py-20 flex flex-col justify-end overflow-hidden"
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL + announcment.image
                  })`,
                backgroundRepeat: " no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div>
                <div className="logo mb-[20px]">
                  <Link href="/" passHref>
                    <a>
                      <Image
                        width="152"
                        height="36"
                        src={`${logo
                            ? process.env.NEXT_PUBLIC_BASE_URL + logo
                            : "/assets/images/logo.svg"
                          }`}
                        alt="logo"
                      />
                    </a>
                  </Link>
                </div>
                <h1 className="md:text-[30px] text-xl font-bold text-qblack mb-1">
                  {announcment.title}
                </h1>
                <p className="text-qgray md:w-[480px] w-full md:text-base text-sm">
                  {announcment.description}
                </p>
              </div>

              <div className="md:w-[415px] w-full h-[54px] sm:flex mt-8">
                <div className="flex-1 bg-white ltr:pl-4 rtl:pr-4 mb-2 md:mb-0 flex space-x-2 rtl:space-x-reverse items-center h-full focus-within:text-qgreen text-qblack overflow-hidden">
                  <span>
                    <svg
                      width="17"
                      height="15"
                      viewBox="0 0 17 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 14H2C1.4 14 1 13.6 1 13V2C1 1.4 1.4 1 2 1H15C15.6 1 16 1.4 16 2V13C16 13.6 15.6 14 15 14Z"
                        stroke="currentColor"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 4L8.5 8.5L14 4"
                        stroke="currentColor"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <input
                    type="email"
                    name="email"
                    className="w-full h-full focus:outline-none text-sm placeholder:uppercase placeholder:text-xs placeholder:text-qblack text-qblack font-400 tracking-wider"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value.trim())}
                    value={email}
                  />
                </div>
                <button
                  onClick={subscribehandler}
                  type="button"
                  className="w-[120px] h-full bg-qyellow text-qblack text-sm font-600"
                >
                  {ServeLangItem()?.Subscribe}
                </button>
              </div>
              <button type="button" className="absolute ltr:right-5 rtl:left-5 top-5 cursor-pointer">
                <svg
                  onClick={adsHandle}
                  viewBox="0 0 34 34"
                  fill="none"
                  className="cursor-pointer md:w-[54px] md:h-[54px] w-[30px] h-[30px]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.64,1.27L7.5,6.13l4.84-4.84C12.5114,1.1076,12.7497,1.0029,13,1c0.5523,0,1,0.4477,1,1&#xA;&#x9;c0.0047,0.2478-0.093,0.4866-0.27,0.66L8.84,7.5l4.89,4.89c0.1648,0.1612,0.2615,0.3796,0.27,0.61c0,0.5523-0.4477,1-1,1&#xA;&#x9;c-0.2577,0.0107-0.508-0.0873-0.69-0.27L7.5,8.87l-4.85,4.85C2.4793,13.8963,2.2453,13.9971,2,14c-0.5523,0-1-0.4477-1-1&#xA;&#x9;c-0.0047-0.2478,0.093-0.4866,0.27-0.66L6.16,7.5L1.27,2.61C1.1052,2.4488,1.0085,2.2304,1,2c0-0.5523,0.4477-1,1-1&#xA;&#x9;C2.2404,1.0029,2.4701,1.0998,2.64,1.27z"
                    fill="#F34336"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
