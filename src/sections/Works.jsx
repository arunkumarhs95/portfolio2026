import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects } from "../constants";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Works = () => {
  const overlayRefs = useRef([]);
  const previewRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(null);

  const text = `Featured projects that have been meticulously
crafted with passion to drive
results and impact.`;

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef(null);
  const moveY = useRef(null);

  useGSAP(() => {
    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });

    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 2,
      ease: "power3.out",
    });

    gsap.from("#project", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.2,
      ease: "back.out(1.4)",
      scrollTrigger: {
        trigger: "#project",
      },
    });
  }, []);

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;

    setCurrentIndex(index);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);

    gsap.fromTo(
      el,
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 0.15,
        ease: "power2.out",
      },
    );

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;

    setCurrentIndex(null);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);

    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;

    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;

    moveX.current(mouse.current.x);
    moveY.current(mouse.current.y);
  };

  return (
    <section id="work" className="flex flex-col min-h-screen overflow-hidden">
      <AnimatedHeaderSection
        subTitle="Logic meets Aesthetics, Seamlessly"
        title="Works"
        text={text}
        textColor="text-black"
        withScrollTrigger={true}
      />

      <div
        className="relative flex flex-col font-light"
        onMouseMove={handleMouseMove}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            id="project"
            className="relative flex flex-col gap-2 py-6 cursor-pointer group md:gap-0"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {/* Desktop Hover Overlay */}
            <div
              ref={(el) => {
                overlayRefs.current[index] = el;
              }}
              className="absolute inset-0 hidden md:block bg-black -z-10"
            />

            {/* Title */}
            <div className="flex justify-between px-5 md:px-10 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white">
              <h2 className="text-xl sm:text-2xl lg:text-[32px] leading-none">
                {project.name}
              </h2>

              <Icon
                icon="lucide:arrow-up-right"
                className="size-5 md:size-6 shrink-0"
              />
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-black/80" />

            {/* Frameworks */}
            <div
              className="
                flex flex-wrap
                px-5 md:px-10
                text-xs md:text-sm
                leading-loose
                uppercase
                gap-x-3 gap-y-1
                transition-all duration-500
                md:group-hover:px-12
              "
            >
              {project.frameworks.map((framework) => (
                <p
                  key={framework.id}
                  className="text-black transition-colors duration-500 md:group-hover:text-white"
                >
                  {framework.name}
                </p>
              ))}
            </div>

            {/* Mobile Preview */}
            <div className="relative flex items-center justify-center px-5 mt-3 md:hidden h-[220px] sm:h-[280px]">
              <img
                src={project.bgImage}
                alt={`${project.name}-bg`}
                className="object-cover w-full h-full rounded-xl brightness-50"
              />

              <img
                src={project.image}
                alt={`${project.name}-preview`}
                className="
                  absolute
                  w-[75%]
                  sm:w-[65%]
                  max-w-[320px]
                  rounded-xl
                  shadow-2xl
                "
              />
            </div>
          </div>
        ))}

        {/* Desktop Floating Preview */}
        <div
          ref={previewRef}
          className="
            fixed
            top-0
            left-0
            z-50
            hidden
            md:block
            overflow-hidden
            border-8
            border-black
            rounded-xl
            pointer-events-none
            opacity-0

            w-[420px]
            lg:w-[600px]
            xl:w-[800px]
          "
        >
          {currentIndex !== null && (
            <img
              src={projects[currentIndex].image}
              alt="preview"
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Works;
