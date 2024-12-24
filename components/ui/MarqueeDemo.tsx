import { cn } from "@/lib/utils";
import Marquee from "./marquee";
 
const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
];
 
const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);
 
const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-40 w-36 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-600 opacity-30 bg-[#56298e] bg-opacity-10 hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium bg-gradient-to-b from-[#f3eafe] to-[#d6b7fc] bg-clip-text text-transparent">
            {name}
          </figcaption>
          <p className="text-xs font-medium bg-gradient-to-b from-[#f3eafe] to-[#d6b7fc] bg-clip-text text-transparent">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm bg-gradient-to-b from-[#f3eafe] to-[#d6b7fc] bg-clip-text text-transparent">{body}</blockquote>
    </figure>
  );
};
 
export function MarqueeDemoVertical() {
  return (
    <div className="relative flex flex-row md:flex-row justify-end right-0  overflow-hidden rounded-lg text-white">
      <Marquee pauseOnHover vertical className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

    </div>
  );
}