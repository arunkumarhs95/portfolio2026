import React, { useEffect, useRef, useState } from "react";
import { socials } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";

const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);

  const tl = useRef(null);
  const iconTl = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);

  useGSAP(() => {
    gsap.set(navRef.current, {
      x: "100%",
    });

    gsap.set([...linksRef.current, contactRef.current], {
      autoAlpha: 0,
      x: -20,
    });

    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        x: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.4",
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2",
      );

    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -3.3,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<",
      );
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setShowBurger(currentScrollY <= lastScrollY || currentScrollY < 10);

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTl.current.reverse();
    } else {
      tl.current.play();
      iconTl.current.play();
    }

    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Menu */}
      <nav
        ref={navRef}
        className="
          fixed top-0 right-0 z-50
          flex flex-col
          h-screen
          w-full
          px-6 py-10
          bg-black
          text-white/80
          uppercase

          md:w-1/2
          md:px-12

          backdrop-blur-xl
        "
      >
        {/* Links */}
        <div className="flex items-center flex-1">
          <div className="flex flex-col w-full text-5xl md:text-6xl lg:text-8xl gap-y-2">
            {["home", "services", "about", "work", "contact"].map(
              (section, index) => (
                <div key={section} ref={(el) => (linksRef.current[index] = el)}>
                  <Link
                    to={section}
                    smooth
                    duration={1000}
                    offset={0}
                    onClick={toggleMenu}
                    className="cursor-pointer transition-all duration-300 hover:text-white"
                  >
                    {section}
                  </Link>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Contact */}
        <div
          ref={contactRef}
          className="
            flex flex-col
            gap-8
            pt-10
            border-t border-white/10

            md:flex-row
            md:items-end
            md:justify-between
          "
        >
          <div>
            <p className="mb-2 tracking-wider text-white/40">E-mail</p>
            <p className="text-base lowercase md:text-lg">
              arunkumarhs452@gmail.com
            </p>
          </div>

          <div>
            <p className="mb-2 tracking-wider text-white/40">Social Media</p>

            <div className="flex flex-wrap gap-3">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm tracking-wider transition-colors duration-300 hover:text-white"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Burger */}
      <div
        onClick={toggleMenu}
        className="
          fixed z-[60]
          flex items-center justify-center
          bg-black
          rounded-full
          cursor-pointer
          transition-all duration-300

          w-14 h-14
          md:w-20 md:h-20

          top-4 right-4
          md:right-10
        "
        style={{
          clipPath: showBurger
            ? "circle(50% at 50% 50%)"
            : "circle(0% at 50% 50%)",
        }}
      >
        <div className="flex flex-col gap-1">
          <span
            ref={topLineRef}
            className="block w-8 h-0.5 bg-white rounded-full origin-center"
          />

          <span
            ref={bottomLineRef}
            className="block w-8 h-0.5 bg-white rounded-full origin-center"
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
