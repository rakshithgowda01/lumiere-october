"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, User, Star, MapPin } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  skills: string[];
  rating: number;
  location: string;
}

interface PinContainerProps {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}

interface PinPerspectiveProps {
  title?: string;
  href?: string;
  isHovered?: boolean;
  isTouched?: boolean;
  isMobile?: boolean;
}

const PinContainer: React.FC<PinContainerProps> = ({
  children,
  title,
  href,
  className,
  containerClassName,
}) => {
  const [transform, setTransform] = useState(
    "translate(-50%,-50%) rotateX(0deg)"
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const onMouseEnter = () => {
    setIsHovered(true);
    setTransform("translate(-50%,-60%) rotateX(40deg) scale(0.8)");
  };
  const onMouseLeave = () => {
    setIsHovered(false);
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
  };

  const onTouchStart = () => {
    setIsTouched(true);
    setTransform("translate(-50%,-60%) rotateX(40deg) scale(0.8)");
  };
  const onTouchEnd = () => {
    setTimeout(() => {
      setIsTouched(false);
      setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
    }, 3000);
  };

  return (
    <div
      className={cn(
        "relative group/pin group-touch/pin z-50 cursor-pointer",
        containerClassName
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchStart}
    >
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-8 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          style={{
            transform: transform,
          }}
          className="absolute left-1/2 p-4 top-1/2 flex justify-start items-start rounded-2xl shadow-[0_8px_16px_rgb(0_0_0/0.4)] bg-black border border-white/[0.1] group-hover/pin:border-white/[0.2] transition duration-700 overflow-hidden"
        >
          <div className={cn("relative z-50", className)}>{children}</div>
        </div>
      </div>
      <PinPerspective title={title} href={href} isHovered={isHovered} isTouched={isTouched} isMobile={isMobile} />
    </div>
  );
};

const PinPerspective: React.FC<PinPerspectiveProps> = ({ 
  title, 
  href, 
  isHovered = false, 
  isTouched = false, 
  isMobile = false 
}) => {
  // Show pin effect only when hovered on desktop or touched on mobile
  const shouldShow = isMobile ? isTouched : isHovered;
  
  return (
    <motion.div className={cn(
      "pointer-events-none flex items-center justify-center z-[60] transition duration-500",
      isMobile ? "w-72 h-48" : "w-96 h-80",
      shouldShow ? "opacity-100" : "opacity-0"
    )}
    >
      <div className="w-full h-full -mt-7 flex-none inset-0">
        <div className="absolute top-0 inset-x-0 flex justify-center">
          <a
            href={href}
            target={"_blank"}
            className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10"
          >
            <span className="relative z-20 text-white text-xs font-bold inline-block py-0.5">
              {title}
            </span>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40"></span>
          </a>
        </div>

        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-8 -translate-x-1/2 -translate-y-1/2"
        >
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 0,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 2,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 4,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
          </>
        </div>

        <>
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40 blur-[2px]" />
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40" />
          <motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-cyan-600 translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]" />
          <motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-cyan-300 translate-y-[14px] w-[2px] h-[2px] rounded-full z-40" />
        </>
      </div>
    </motion.div>
  );
};

const TeamMemberCard: React.FC<{ member: TeamMember; isMobile: boolean }> = ({ member, isMobile }) => {
  return (
    <div className={cn(
      "flex flex-col tracking-tight text-slate-100/50 bg-gradient-to-b from-slate-800/50 to-slate-800/0 backdrop-blur-sm border border-slate-700/50 rounded-2xl",
      isMobile ? "w-[14rem] h-[22rem] p-3" : "w-[24rem] h-[32rem] p-6"
    )}>
      {/* Header with status */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          <div className="size-2 rounded-full bg-green-500 animate-pulse" />
          <div className="text-xs text-slate-400">Available</div>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-xs text-slate-300">{member.rating}</span>
        </div>
      </div>

      {/* Profile Image */}
      <div className="flex justify-center mb-2">
        <div className="relative">
          <img
            src={member.image}
            alt={member.name}
            className={cn(
              "rounded-full object-cover border-2 border-slate-600",
              isMobile ? "w-12 h-12" : "w-20 h-20"
            )}
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800 flex items-center justify-center">
            <User className="w-2 h-2 text-white" />
          </div>
        </div>
      </div>

      {/* Name and Role */}
      <div className="text-center mb-2">
        <h3 className={cn("font-bold text-slate-100 mb-1", isMobile ? "text-sm" : "text-xl")}>{member.name}</h3>
        <p className={cn("text-sky-400 font-medium", isMobile ? "text-xs" : "text-sm")}>{member.role}</p>
      </div>

      {/* Location */}
      <div className="flex items-center justify-center gap-1 mb-2">
        <MapPin className="w-3 h-3 text-slate-400" />
        <span className="text-xs text-slate-400">{member.location}</span>
      </div>

      {/* Bio */}
      <div className="flex-1 mb-2">
        <p className={cn("text-slate-300 leading-relaxed line-clamp-2", isMobile ? "text-xs" : "text-sm")}>
          {member.bio}
        </p>
      </div>

      {/* Skills */}
      <div className="mb-2">
        <h4 className="text-xs text-slate-400 mb-1 uppercase tracking-wide">Skills</h4>
        <div className="flex flex-wrap gap-1">
          {member.skills.slice(0, isMobile ? 2 : 4).map((skill, index) => (
            <span
              key={index}
              className="px-1 py-0.5 text-xs bg-slate-700/50 text-slate-300 rounded-full border border-slate-600/50"
            >
              {skill}
            </span>
          ))}
          {member.skills.length > (isMobile ? 2 : 4) && (
            <span className="px-1 py-0.5 text-xs bg-slate-700/50 text-slate-400 rounded-full border border-slate-600/50">
              +{member.skills.length - (isMobile ? 2 : 4)}
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <div className="text-xs text-slate-400">
          {isMobile ? "Active" : "Last active: 2 hours ago"}
        </div>
        <div className="text-emerald-400 text-xs font-medium">
          View →
        </div>
      </div>
    </div>
  );
};

const TeamCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const teamMembers: TeamMember[] = [
    {
      id: "1",
    name: "Alex Rivera",
    role: "Creative Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "With over 8 years in video production, Alex leads our creative vision and ensures every project tells a compelling story.",
      skills: ["Creative Direction", "Storytelling", "Brand Strategy", "Video Production"],
      rating: 4.9,
      location: "San Francisco, CA"
    },
    {
      id: "2",
    name: "Sam Chen",
    role: "Lead Editor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Sam brings technical expertise and artistic flair to every edit, specializing in color grading and motion graphics.",
      skills: ["Video Editing", "Color Grading", "Motion Graphics", "Post Production"],
      rating: 4.8,
      location: "Austin, TX"
    },
    {
      id: "3",
    name: "Jordan Taylor",
    role: "Social Media Specialist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "Jordan creates viral-worthy content and understands the nuances of each social platform to maximize engagement.",
      skills: ["Social Media", "Content Strategy", "Trend Analysis", "Community Management"],
      rating: 4.9,
      location: "New York, NY"
    },
    {
      id: "4",
    name: "Casey Morgan",
    role: "Producer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Casey manages project timelines and client relationships, ensuring smooth production from concept to delivery.",
      skills: ["Project Management", "Client Relations", "Production Planning", "Budget Management"],
      rating: 4.7,
      location: "Seattle, WA"
    },
    {
      id: "5",
      name: "Lisa Thompson",
      role: "Content Strategist",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      bio: "Strategic content leader with a track record of creating engaging video content that drives business results.",
      skills: ["Content Strategy", "Analytics", "Brand Development", "Campaign Planning"],
      rating: 4.8,
      location: "Boston, MA"
    }
  ];

  const nextMember = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevMember = () => {
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = window.setInterval(nextMember, 5000);
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <section id="team" className="py-16 md:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 relative z-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Talented individuals working together to create exceptional video content
          </p>
          </div>

        {/* Carousel Container */}
        <div 
          className="relative flex flex-col items-center justify-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Desktop Navigation Buttons */}
          {!isMobile && (
            <>
              <button
                onClick={prevMember}
                className="absolute left-0 z-10 p-3 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 text-white hover:bg-slate-700/80 transition-all duration-300 hover:scale-110"
                style={{ transform: 'translateX(-50%)' }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextMember}
                className="absolute right-0 z-10 p-3 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 text-white hover:bg-slate-700/80 transition-all duration-300 hover:scale-110"
                style={{ transform: 'translateX(50%)' }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Main Card */}
          <div className="flex justify-center">
            <PinContainer
              title={`Connect with ${teamMembers[currentIndex].name}`}
              href="#"
              className="w-full"
            >
              <TeamMemberCard member={teamMembers[currentIndex]} isMobile={isMobile} />
            </PinContainer>
            </div>

            </div>

        {/* Mobile Navigation Buttons - Much Further Below Card */}
        {isMobile && (
          <div className="flex gap-8 mt-32 justify-center">
            <button
              onClick={prevMember}
              className="p-5 rounded-full bg-slate-800/95 backdrop-blur-sm border-2 border-slate-600/50 text-white hover:bg-slate-700/80 transition-all duration-300 hover:scale-110 shadow-xl"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextMember}
              className="p-5 rounded-full bg-slate-800/95 backdrop-blur-sm border-2 border-slate-600/50 text-white hover:bg-slate-700/80 transition-all duration-300 hover:scale-110 shadow-xl"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default TeamCarousel;
