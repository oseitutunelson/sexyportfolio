import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import aethercore from "../assets/aethercore.png";
import ecom from "../assets/ecom.png";
import iphone from "../assets/iphone.png";
import password from "../assets/password.png";
import spotify from "../assets/spotify.png";
import todo from "../assets/todo.png";
import studysync from "../assets/studysync.png";
import simonsays from "../assets/simonsays.png";

const projects = [
  {
    image: aethercore,
    title: "Intimatex",
    description:
      "Decentralized adult content webapp",
    demoLink: "https://matex-two.vercel.app/",
    codeLink: "https://github.com/oseitutunelson/matex",
  },
  {
    image: iphone,
    title: "Campaigns - Crowd Funding Platform",
    description:
      "A crowdfunding platform built on the blockchain",
    demoLink: "https://github.com/oseitutunelson/campaigns/",
    codeLink: "https://github.com/oseitutunelson/campaigns",
  },
  {
    image: password,
    title: "Fractional nft smart contract",
    description:
      "A fractional nft contract,the first of itskind",
    demoLink: "https://github.com/oseitutunelson/fractionalNft",
    codeLink: "https://github.com/oseitutunelson/fractionalNft",
  },
  {
    image: studysync,
    title: "Decentralized Voting Smart Contract",
    description:
      "A blockchain based voting smart contract",
    demoLink: "https://github.com/oseitutunelson/Decentralized_Voting/",
    codeLink: "https://github.com/oseitutunelson/Decentralized_Voting",
  },
  {
    image: spotify,
    title: "Blockchain Bank Smart contract",
    description: "A bank built on the blockchian",
    demoLink: "https://github.com/oseitutunelson/foundry_decentralisedBank",
    codeLink: "https://github.com/oseitutunelson/foundry_decentralisedBank",
  },
  {
    image: todo,
    title: "Decentralized Estate Platform",
    description: "Tokenized Real Estate platform",
    demoLink: "https://proprieta.vercel.app",
    codeLink: "https://github.com/oseitutunelson/estateta",
  },
  {
    image: ecom,
    title: "Ecommerce-site Miles Brand",
    description:
      "eCommerce website of the Miles clothing brand, built with React and Tailwind for a seamless shopping experience",
    demoLink: "https://github.com/oseitutunelson",
    codeLink: "https://github.com/oseitutunelson/miles",
  },
  {
    image: simonsays,
    title: "Decentralised lottery",
    description:
      "A dectralized lottery system",
    demoLink: "https://vishvjeet-rana.github.io/Simon-Says-Game/",
    codeLink: "https://github.com/oseitutunelson/foundry_raffle",
  },
];

const Carousel = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -220 : 220;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative max-w-[60vw] mx-auto">
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth py-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>

      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-alpine-frost text-carbon-mist p-2 rounded-full shadow-lg hover:bg-[#7d7d81] transition-colors"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-alpine-frost text-carbon-mist p-2 rounded-full shadow-lg hover:bg-[#7d7d81] transition-colors"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default Carousel;
