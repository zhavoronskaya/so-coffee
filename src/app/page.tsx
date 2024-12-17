"use client";

import SOCoffeScene from "../components/Scene";
import { ArrowUp, Logo } from "../components/Icons";
import ShowingBlock from "../components/ShowingBlock";
import ScrollButton from "../ui/components/ScrollToTopButton";
import CoffeeSelectButtons from "../components/CoffeeSelectButtons";
import AppModals from "@/components/Modals";
import LocationSelectButtons from "@/components/LocationSelectButtons";
import LocationSelectedImage from "@/components/LocationSelectedImage";
import LanguageSwitch from "@/components/LanguageSwitch";
import useTranslations from "@/hooks/useTranslations";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeSwitch from "@/components/ThemeSwitch";
import ThemeImage from "@/components/ThemeImage";
import { useEffect } from "react";

export default function Home() {
  const { t } = useTranslations();
  const preventZoom = (e: Event) => {
    e.preventDefault();
    // special hack to prevent zoom-to-tabs gesture in safari
    document.body.style.zoom = "0.99";
  };
  useEffect(() => {
    document.addEventListener("gesturestart", preventZoom);

    document.addEventListener("gesturechange", preventZoom);

    document.addEventListener("gestureend", preventZoom);
    return () => {
      document.removeEventListener("gestureend", preventZoom);

      document.removeEventListener("gesturechange", preventZoom);

      document.removeEventListener("gestureend", preventZoom);
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <header className="px-16 pt-8 h-24 fixed left-0 top-0 w-full z-20">
          <div className="flex justify-between">
            <a
              className=" w-[32px] h-[32px]"
              target="_blank"
              rel="noopener noreferrer"
              href={"  https://www.soroasters.com/"}
            >
              <Logo className="w-full h-full" />
            </a>

            <div className="flex justify-between gap-4">
              <ThemeSwitch />
              <LanguageSwitch />
            </div>
          </div>
        </header>

        <main className="main absolute left-0 top-0 z-10 w-full min-h-screen ">
          <ShowingBlock
            trigger=".section-1"
            el=".first-block-el"
            immediateRender={true}
          />
          <ShowingBlock
            trigger=".second-block-el"
            el=".second-block-el"
            delay={0.4}
            immediateRender={false}
          />
          <ShowingBlock
            trigger=".third-block-el"
            el=".third-block-el"
            delay={0.1}
            immediateRender={false}
          />
          <ShowingBlock
            trigger=".third1-block-el"
            el=".third1-block-el"
            delay={0.2}
            staggerEach={0.1}
            // opacity={1}
            immediateRender={false}
          />
          <ShowingBlock
            trigger=".fourth-block-el"
            el=".fourth-block-el"
            delay={0.5}
            immediateRender={false}
          />
          <ShowingBlock
            trigger=".five-block-el"
            el=".five-block-el"
            delay={0.5}
            immediateRender={false}
          />
          <ShowingBlock
            trigger=".six-block-el"
            el=".six-block-el"
            delay={0}
            immediateRender={false}
          />

          <div className="section-1 pt-32 pb-20 px-16 min-h-screen flex flex-col justify-between mix-blend-difference ">
            <div className="overflow-hidden">
              <h1 className="first-block-el translate-y-[11rem] opacity-0 uppercase text-[13rem]/[1] sm:text-[15rem]/[11.5rem] font-bold ">
                So Coffee Roasters
              </h1>
            </div>

            <div className=" mt-8 ">
              <div className="sm:grid grid-cols-12 gap-4 mb-12">
                <div className="sm:col-start-1 sm:col-span-6">
                  <h4 className="first-block-el text-5xl font-semibold translate-y-[3rem] opacity-0">
                    {t.homeH4_1}
                  </h4>
                </div>
              </div>
              <div className="first-block-el flex justify-between  items-end translate-y-[2rem] opacity-0">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={"https://www.soroasters.com/"}
                  className="text-xl font-semibold block group transition duration-300"
                >
                  {t.homeLink}
                  <span className="link-underline block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5"></span>
                </a>
                <span className="hidden sm:inline text-sm">({t.homeSpan})</span>
              </div>
            </div>
          </div>

          <div className="section-2 pt-32 pb-20 px-16 min-h-screen mix-blend-difference ">
            <div className="pt-[460px] sm:pt-0 sm:grid grid-cols-12 gap-4 mb-12">
              <div className="sm:col-start-8 sm:col-span-4">
                <div className="overflow-hidden">
                  <h3 className="second-block-el text-7xl font-semibold  opacity-0 translate-y-[4.5rem]">
                    {t.aboutH3_1}
                  </h3>
                </div>
                <div className="overflow-hidden">
                  <h3 className="second-block-el text-7xl font-semibold mb-32 opacity-0 translate-y-[4.5rem]">
                    {t.aboutH3_2}
                  </h3>
                </div>

                <p className="second-block-el text-2xl mb-20 opacity-0 translate-y-[5rem] beans">
                  {t.aboutParagraph}
                </p>

                <div className="second-block-el flex opacity-0 translate-y-[1.75rem]">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://www.soroasters.com/humanize"}
                    className="text-xl font-semibold block group transition duration-300"
                  >
                    {t.aboutLink}
                    <span className="link-underline block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="section-3 pt-20 pb-20 px-16 min-h-[756px] sm:min-h-screen mix-blend-difference ">
            <div className="sm:grid grid-cols-12 gap-4 ">
              <div className="sm:col-start-1 sm:col-span-12 mb-20">
                <div className="overflow-hidden">
                  <div className="third-block-el flex gap-8 justify-between opacity-0 translate-y-[1.75rem] items-end">
                    <p className="text-lg ">({t.shopParagraph})</p>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={"https://www.soroasters.com/online-coffee-shop"}
                      className="text-4xl font-semibold block group transition duration-300 "
                    >
                      {t.shopLink}
                      <span className="link-underline block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5"></span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="sm:col-start-1 sm:col-span-8">
                <CoffeeSelectButtons />

                <div className="third1-block-el flex opacity-0 translate-y-[2rem] mt-12 sm:mt-64">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://www.soroasters.com/online-coffee-shop"}
                    className="text-xl font-semibold block group transition duration-300"
                  >
                    {t.coffeLink}
                    <span className="link-underline block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="section-4 pt-20 pb-20 px-16 min-h-screen mix-blend-difference ">
            <div className="sm:grid grid-cols-12 gap-4 ">
              <div className="sm:col-start-6 sm:col-span-6 ">
                <div className="overflow-hidden">
                  <h3 className="fourth-block-el text-7xl font-semibold opacity-0 translate-y-[4.5rem]">
                    {t.merchH3_1}
                  </h3>
                </div>
                <div className="overflow-hidden">
                  <h3 className="fourth-block-el text-7xl font-semibold mb-32 opacity-0 translate-y-[4.5rem]">
                    {t.merchH3_2}
                  </h3>
                </div>
              </div>
            </div>
            <div className="sm:grid grid-cols-12 gap-4 fourth-block-el opacity-0 translate-y-[5rem]">
              <div className="sm:col-start-6 sm:col-span-2">
                <p className="text-lg mb-4">({t.merchSpan})</p>
              </div>
              <div className="sm:col-start-8 sm:col-span-4 fourth-block-el">
                <p className="text-2xl mb-20">{t.merchParagraph}</p>

                <div className="flex gap-8 justify-between">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      "https://www.soroasters.com/online-coffee-shop/merchandise"
                    }
                    className="beanstrigger text-xl font-semibold block group transition duration-300 "
                  >
                    {t.merchLink}
                    <span className="link-underline block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="section-5 pt-20 pb-20 px-16 min-h-screen mix-blend-difference mb-32">
            <div className="sm:grid grid-cols-12 gap-4 ">
              <div className="sm:col-start-1 sm:col-span-12 mb-32">
                <div className="overflow-hidden">
                  <div className="five-block-el sm:flex gap-8 justify-between opacity-0 translate-y-[4.5rem] items-end">
                    <p className="text-lg mb-4">({t.instagramSpan})</p>
                    <div className="flex gap-8 justify-between ">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={
                          "https://www.instagram.com/socoffeeroasters?utm_medium=copy_link%22"
                        }
                        className="text-4xl font-semibold block group transition duration-300  "
                      >
                        {t.instagramLink}
                        <span className="link-underline block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:col-start-1 sm:col-span-4 ">
                <div className="overflow-hidden">
                  <h3 className="text-7xl font-semibold five-block-el opacity-0 translate-y-[8rem] ">
                    {t.spotH3_1}
                  </h3>
                </div>
                <div className="overflow-hidden">
                  <h3 className="mb-32 text-7xl font-semibold five-block-el opacity-0 translate-y-[8rem] ">
                    {t.spotH3_2}
                  </h3>
                </div>
                <p className="text-2xl mb-24 five-block-el opacity-0 translate-y-[5rem] ">
                  {t.spotParagraph}
                </p>
                <div className="flex gap-8 justify-between five-block-el opacity-0 translate-y-[2.5rem]">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://www.soroasters.com/coffee-shops"}
                    className="text-4xl font-semibold block group transition duration-300  "
                  >
                    {t.spotLink}
                    <span className="link-underline block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="section-6 pt-20 pb-20 px-16 mix-blend-difference mb-12">
            <div className="sm:grid grid-cols-12 gap-4 ">
              <div className="sm:col-start-1 sm:col-span-3 relative">
                <LocationSelectedImage />
              </div>

              <div className="sm:col-start-5 sm:col-span-8 gap-4">
                <LocationSelectButtons />
              </div>
            </div>
          </div>

          <footer className="section-footer pt-32 pb-20 px-16 min-h-[16rem] mix-blend-difference">
            <div className="sm:grid grid-cols-12 gap-4 ">
              <div className="mb-8 sm:mb-0 sm:col-start-1 sm:col-span-2">
                <div className="flex justify-center ">
                  <a
                    className="w-[50%] sm:w-[75%]"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://www.soroasters.com/"}
                  >
                    <ThemeImage />
                  </a>
                </div>
              </div>

              <div className="sm:col-start-4 sm:col-span-9  pb-12 border-b-2 ">
                <h1 className="text-7xl uppercase mb-20 block">
                  So coffee Roasters
                </h1>
                <div className="flex justify-between">
                  <div>
                    <p className="text-2xl font-semibold mb-8 uppercase">
                      {t.footerContactParagraph}
                    </p>

                    <p className="text-xl mb-4">
                      Rua Sá de Noronha 119
                      <br />
                      4050-526 Porto, Portugal
                    </p>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={"  https://www.soroasters.com/work-with-us"}
                      className="text-xl block opacity-50 hover:opacity-100 transition duration-300 "
                    >
                      socoffeeroasters@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold mb-8 uppercase">
                      {t.footerServicesParagraph}
                    </p>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={"  https://www.soroasters.com"}
                      className="text-xl block opacity-50 hover:opacity-100 transition duration-300  mb-2"
                    >
                      {t.footerAboutLink}
                    </a>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={"  https://www.soroasters.com/work-with-us"}
                      className="text-xl block opacity-50 hover:opacity-100 transition duration-300 "
                    >
                      Work with us
                    </a>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold mb-8 uppercase">
                      Social
                    </p>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={"  https://www.soroasters.com/work-with-us"}
                      className="text-xl block opacity-50 hover:opacity-100 transition duration-300 mb-2"
                    >
                      Facebook
                    </a>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={"  https://www.soroasters.com/work-with-us"}
                      className="text-xl block opacity-50 hover:opacity-100 transition duration-300 "
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-end mt-8">
              <ScrollButton className="flex items-baseline text-xl">
                ({t.footerBackButton}&nbsp;
                <ArrowUp className={" h-[0.875rem]"} />)
              </ScrollButton>
            </div>
          </footer>
        </main>

        <SOCoffeScene />
        <AppModals />
      </div>
    </ThemeProvider>
  );
}
