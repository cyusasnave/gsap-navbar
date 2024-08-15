"use client";

import React, { useState, useRef, useEffect, MutableRefObject } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const menuLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/work", label: "Work" },
  { path: "/blogs", label: "Blogs" },
  { path: "/contact", label: "Contact" },
];

const Menu = () => {
  const container: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tl = useRef<GSAPTimeline | undefined>(undefined);

  useGSAP(
    () => {
      gsap.set(".menu-overlay", {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      });
      gsap.set(".menu-link-item-holder", { y: 75 });

      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          duration: 1.25,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.inOut",
          delay: -0.75,
        });
    },
    { scope: container }
  );

  useEffect(() => {
    if (isMenuOpen && tl.current) {
      tl.current.play();
    } else if (tl.current) {
      tl.current.reverse().then(() => {
        gsap.set(".menu-overlay", {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        });
      });
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((curr) => !curr);
  return (
    <div className="relative z-[2]" ref={container}>
      <div className="fixed top-0 left-0 w-screen flex justify-between items-center p-8 z-[1]">
        <div className="text-white cursor-pointer">
          <Link href="/" className="text-white">
            CodeGrid
          </Link>
        </div>
        <div className="text-white cursor-pointer" onClick={toggleMenu}>
          <p className="text-white">Menu</p>
        </div>
      </div>
      <div className="menu-overlay fixed top-0 left-0 w-screen h-screen overflow-y-scroll p-8 bg-[#c5fb45] z-[2] flex flex-col place-content-between">
        <div className="flex justify-between items-center">
          <div className="text-white cursor-pointer">
            <Link href="/">CodeGrid</Link>
          </div>
          <div className="text-black cursor-pointer" onClick={toggleMenu}>
            <p>Close</p>
          </div>
        </div>
        <div className="flex flex-col space-y-4 pt-4 pl-0 md:pl-40">
          {menuLinks.map((item, index) => (
            <div className="menu-link-item" key={index} onClick={toggleMenu}>
              <div className="menu-link-item-holder relative translate-y-[75px]">
                <Link
                  href={item.path}
                  className="text-black text-4xl md:text-[80px] font-normal tracking-[-0.02em] leading-[85%]"
                >
                  {item.label}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full pt-8">
            <div>
              <p className="font-semibold tracking-wide mb-2">Social media</p>
              <div className="flex-1 flex flex-wrap gap-4">
                <a
                  href="#"
                  className="text-black text-center flex-center gap-2 whitespace-nowrap text-black/70"
                >
                  <div className="w-2 h-2 rounded-full bg-black" />
                  <span>Twitter &#8599;</span>
                </a>
                <a
                  href="#"
                  className="text-black text-center flex-center gap-2 whitespace-nowrap text-black/70"
                >
                  <div className="w-2 h-2 rounded-full bg-black" />
                  <span>Instagram &#8599;</span>
                </a>
                <a
                  href="#"
                  className="text-black text-center flex-center gap-2 whitespace-nowrap text-black/70"
                >
                  <div className="w-2 h-2 rounded-full bg-black" />
                  <span>LinkedIn &#8599;</span>
                </a>
              </div>
            </div>
            <div>
              <p className="font-semibold tracking-wide mb-2 text-start md:text-end">Get in touch</p>
              <div className="flex-1 flex flex-wrap flex-row md:flex-col justify-between md:justify-end items-center md:items-end gap-2">
                <p className="text-black/70">info@codegrid.com</p>
                <p className="text-black/70">+250 789 413 177</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
