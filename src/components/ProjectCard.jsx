import React from "react";
import { ArrowUpRightFromSquare } from "lucide-react";

const ProjectCard = ({ image, title, description, demoLink, codeLink }) => {
  return (
    <div className="min-w-[200px] max-w-[220px] sm:min-w-[280px] sm:max-w-[300px] bg-carbon-mist rounded-3xl overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-[0px_2px_20px_#7d7d81]">
      <div
        className="h-[180px] bg-cover bg-center "
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="p-5">
        <h3 className="text-[#f5f5f7] text-xl font-bold font-robert-medium mb-2">
          {title}
        </h3>
        <p className="text-[#7d7d81] text-sm mb-4 font-robert-medium line-clamp-2">
          {description}
        </p>
        <div className="flex gap-4">
          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center font-robert-medium gap-1 text-[#f5f5f7] text-sm hover:text-[#7d7d81] transition-colors"
          >
            Demo <ArrowUpRightFromSquare size={14} />
          </a>
          <a
            href={codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex font-robert-medium items-center gap-1 text-[#f5f5f7] text-sm hover:text-[#7d7d81] transition-colors"
          >
            GitHub <ArrowUpRightFromSquare size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
