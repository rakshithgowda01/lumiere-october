import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ 
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div'
  
  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-lg border-t",
        "bg-gradient-to-b from-muted/50 to-muted/10",
        "p-5 text-start sm:p-6",
        "hover:from-muted/60 hover:to-muted/20",
        "w-[350px] sm:w-[380px]",
        "min-h-[200px] sm:min-h-[220px]",
        "transition-colors duration-300",
        "border-white/10 bg-black/40 backdrop-blur-sm",
        "flex-shrink-0",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-12 w-12 flex-shrink-0">
          <AvatarImage src={author.avatar} alt={author.name} className="object-cover" />
        </Avatar>
        <div className="flex flex-col items-start min-w-0">
          <h3 className="text-base font-semibold leading-tight text-white truncate w-full">
            {author.name}
          </h3>
          <p className="text-sm text-gray-400 truncate w-full">
            {author.handle}
          </p>
        </div>
      </div>
      <p className="text-sm sm:text-base text-gray-300 leading-relaxed mt-2 line-clamp-none">
        {text}
      </p>
    </Card>
  )
}

