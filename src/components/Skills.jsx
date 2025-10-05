import React from "react";
import SplitText from "./SplitText";
import AnimatedList from "./AnimatedList";
import "./Styles/stack.css";

const items = [
  "----- FIRST SEE MY FRONT-END SKILLS -----",
  "HTML",
  "Vanilla CSS",
  "JavaScript",
  "React.js",
  "Tailwind CSS",
  "GSAP - Animations",
  "Hardhat",
  "Solidity",
  "API Handling",
  "Three.js & React three fibre/drei (Occasionally)",
  "----- NOW SEE MY BACK-END SKILLS -----",
  "Node.js",
  "Express.js",
  "Mongo DB",
  "REST APIs",
  "Blockchain",
  "Chainlink",
  "----- OTHER TECH & TOOLS -----",
  "Git & GitHub",
  "Docker",
  "VS Code",
];

const Skills = () => {
  return (
    <section id="skills" className="h-dvh w-screen overflow-x-hidden stack">
      <div className="h-full w-full bg-vanilla-latte flex items-center justify-center">
        {/* main container */}
        <div className="flex flex-col-reverse xl:flex-row items-center justify-center h-[100%] w-[100%] p-5">
          {/* left part - have skills  */}
          <div className=" w-[100%] h-[50%]  flex items-center justify-center lg:w-[50%] lg:h-[100%] overflow-hidden ">
            <div className="h-full w-[100%] sm:w-[80%] flex xl:flex-col items-center justify-center">
              <p className="w-[50%] font-zentry text-lg text-expresso-brown hidden xl:block">
                Scroll to see my skills
              </p>

              <AnimatedList
                items={items}
                onItemSelect={(item, index) => console.log(item, index)}
                showGradients={true}
                enableArrowNavigation={true}
                displayScrollbar={true}
              />
            </div>
          </div>

          {/* right part - text */}
          <div className=" w-[100%] h-[50%] sm:w-[50%] sm:h-[100%] ">
            {/* holding text container */}
            <div className="h-auto w-[100%] flex flex-col  items-start justify-start">
              <p className="text-6xl sm:text-9xl  font-zentry font-extrabold special-font text-expresso-brown">
                H<b>e</b>r<b>e</b>
              </p>

              <p className="text-6xl sm:text-9xl  font-zentry special-font font-extrabold text-expresso-brown">
                <b>M</b>y
              </p>

              <p className="text-6xl sm:text-9xl special-font  font-zentry font-extrabold text-expresso-brown">
                S<b>k</b>ill<b>s</b>.
              </p>

              {/* some text */}
              <div className="mt-5">
                <div>
                  <SplitText
                    text="These skills aren’t just things I’ve picked up—they're how I create, solve problems, and bring ideas to life. Whether it's structuring something from the ground up or refining the smallest details, I enjoy making things work seamlessly and feel just right."
                    className="text-xs sm:text-2xl font-robert-medium text-dark-vanilla"
                    delay={12}
                    animationFrom={{
                      opacity: 0,
                      transform: "translate3d(0,50px,0)",
                    }}
                    animationTo={{
                      opacity: 1,
                      transform: "translate3d(0,0,0)",
                    }}
                    easing="easeOutCubic"
                    threshold={0.2}
                    rootMargin="-50px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
