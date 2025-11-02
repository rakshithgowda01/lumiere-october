"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X, Instagram, Linkedin, Twitter, Github } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

interface SocialLink {
  icon: React.ElementType
  href: string
}

interface TeamMember {
  name: string
  designation: string
  imageSrc: string
  socialLinks?: SocialLink[]
  bio?: string
  quote?: string
}

interface TeamSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  members: TeamMember[]
  registerLink?: string
  logo?: React.ReactNode
  socialLinksMain?: SocialLink[]
}

const TeamSection = React.forwardRef<HTMLDivElement, TeamSectionProps>(
  (
    {
  title,
      description,
      members,
      registerLink,
      logo,
      socialLinksMain,
  className,
      ...props
    },
    ref
  ) => {
    const [selectedMember, setSelectedMember] = React.useState<TeamMember | null>(null)

  return (
      <section
        ref={ref}
      className={cn(
          "relative w-full overflow-hidden bg-transparent py-12 md:py-24 lg:py-32",
          className
        )}
        {...props}
      >
        <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6">

          <div className="relative z-10 flex w-full flex-col items-center justify-between gap-4 md:flex-row md:items-start md:text-left lg:gap-8">
            <div className="grid gap-2 text-center md:text-left">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-muted-foreground">
                {title}
              </h1>
              {description && (
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {description}
                </p>
              )}
            </div>
            <div className="flex flex-col items-center gap-4 md:items-end">
              {logo && <div className="text-2xl font-bold">{logo}</div>}
        </div>
      </div>

          <div className="relative z-10 mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
            {members.map((member, index) => (
              <motion.div
                key={index}
                className="group relative flex flex-col items-center justify-end overflow-hidden rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 p-6 text-center shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:border-white/20 cursor-pointer"
                onClick={() => setSelectedMember(member)}
                whileHover={{ y: -5 }}
                style={{
                  backgroundColor:
                    index === 0
                      ? "rgba(255, 76, 76, 0.05)"
                      : index === 1
                      ? "rgba(107, 114, 128, 0.05)"
                      : "rgba(99, 102, 241, 0.05)",
                  color: "var(--foreground)",
                }}
              >
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/2 origin-bottom scale-y-0 transform rounded-t-full bg-gradient-to-t from-primary/20 to-transparent transition-transform duration-500 ease-out group-hover:scale-y-100"
                  style={{ transitionDelay: `${index * 50}ms` }}
                />

                <div
                  className="relative z-10 h-36 w-36 overflow-hidden rounded-full border-4 border-transparent bg-background/20 transition-all duration-500 ease-out group-hover:border-primary group-hover:scale-105"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <img
                    src={member.imageSrc}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
        </div>

                <h3 className="relative z-10 mt-4 text-xl font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="relative z-10 text-sm text-muted-foreground">
                  {member.designation}
                </p>

                {member.socialLinks && member.socialLinks.length > 0 && (
                  <div className="relative z-10 mt-4 flex gap-3 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                    {member.socialLinks.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <link.icon className="h-5 w-5" />
                      </a>
                    ))}
      </div>
                )}
    </motion.div>
            ))}
        </div>
      </div>

        <AnimatePresence>
          {selectedMember && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                onClick={() => setSelectedMember(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black/90 backdrop-blur-md border border-white/20 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
        <div className="relative">
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="absolute right-4 top-4 z-10 rounded-full bg-black/80 backdrop-blur-sm p-2 text-foreground hover:bg-black/90 transition-colors border border-white/10"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8 pb-0">
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="h-32 w-32 overflow-hidden rounded-full border-4 border-primary shadow-xl"
                      >
                        <img
                          src={selectedMember.imageSrc}
                          alt={selectedMember.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (target.src.endsWith('.heic')) {
                              target.src = selectedMember.imageSrc.replace('.heic', '.jpg');
                            } else if (target.src.endsWith('.jpg')) {
                              target.src = selectedMember.imageSrc.replace('.jpg', '.png');
                            }
                          }}
                        />
                      </motion.div>
                      <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-3xl font-bold text-foreground"
                      >
                        {selectedMember.name}
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="text-lg text-primary font-medium"
                      >
                        {selectedMember.designation}
                      </motion.p>
        </div>
      </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-8 space-y-6"
                  >
                    {selectedMember.bio && (
                      <div>
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                          About
                        </h3>
                        <p className="text-foreground leading-relaxed">
                          {selectedMember.bio}
                        </p>
        </div>
      )}

                    {selectedMember.quote && (
                      <div className="border-l-4 border-primary pl-4">
                        <p className="text-foreground italic leading-relaxed">
                          {selectedMember.quote}
        </p>
      </div>
                    )}

                    {selectedMember.socialLinks &&
                      selectedMember.socialLinks.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                            Connect
                          </h3>
                          <div className="flex gap-3">
                            {selectedMember.socialLinks.map((link, index) => (
                              <a
              key={index}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
                                <link.icon className="h-5 w-5" />
                              </a>
          ))}
        </div>
      </div>
                      )}
                  </motion.div>
    </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>
    )
  }
)

TeamSection.displayName = "TeamSection"

export default function TeamSectionDemo() {
  const teamMembers: TeamMember[] = [
    {
      name: "Nohil Yash Arthur",
      designation: "Founding Partner, Creative Director",
      imageSrc: "/team-member-1.heic",
      bio: "Always on the edge to turn raw elements into something beautiful with the means of art. Bringing unconventional yet market relevant ideas to life, ultimately redefining brands.",
      quote: "Bringing unconventional yet market relevant ideas to life, ultimately redefining brands.",
      socialLinks: [
        {
          icon: Instagram,
          href: "https://www.instagram.com/nasharthurr?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
        },
      ],
    },
    {
      name: "Hruthik. G",
      designation: "Founding Partner, Director of Photography",
      imageSrc: "/team-member-2.heic",
      bio: "With a keen eye towards capturing the essence of a moment and the need to delegate and manage a high performance system.",
      quote: "I let the best of both worlds intertwine, as a result brands are met with unwavering direction and high quality shots that replicate what was once an idea, now a film ready to show the world your brand's story.",
      socialLinks: [
        {
          icon: Instagram,
          href: "https://www.instagram.com/hruthik.g7?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
        },
      ],
    },
    {
      name: "Mayank V.N",
      designation: "Founding Partner, Financial Director",
      imageSrc: "/team-member-3.heic",
      bio: "What is brought to the table, I multiply. With firm commitment and sheer belief towards the growth of this company.",
      quote: "Mayank uses his expertise in the world of finance to take calculated steps and decisions that are bound to take our 'Lumière' above and beyond.",
      socialLinks: [
        {
          icon: Instagram,
          href: "https://www.instagram.com/mayank_939?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
        },
      ],
    },
  ]

  return (
    <TeamSection
      title="MEET THE FOUNDERS"
      description=""
      members={teamMembers}
      logo="Lumière"
    />
  )
}
