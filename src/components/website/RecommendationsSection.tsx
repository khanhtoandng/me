"use client";

import { cn } from "@/lib/utils";
import { MagicCard } from "../ui/MagicCard";
import Marquee from "../ui/marquee";
import { ScrollEffect } from "@/lib/animations";
import Image from "next/image";

const RecommendationsSection = () => {
  const reviews = [
    {
      name: "Mohammed Abu Harb 🌀",
      title: "Digital Product Designer at LOGIX ERP",
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQFo5M71pj69Qw/profile-displayphoto-shrink_100_100/B4DZN95ApYHMAU-/0/1732983918432?e=1741824000&v=beta&t=Q6vjWiOAIb_4HtbqSyPurqBH3Wz_zHWZVNB880strIA",
      review: `I’m thrilled to recommend Baraa, an incredibly skilled software developer I’ve had the pleasure of working with. Baraa's technical skills are top-notch, and his passion for development is evident in every project he tackles. Not only does he deliver high-quality work, but he also brings a positive attitude and strong problem-solving skills to the table. If you’re looking for someone who’s both skilled and dedicated, Baraa is your go-to developer. Highly recommended!`,
    },
    {
      name: "Fahad Hummadi",
      title: "Co-Founder & CEO @ Perfect Touch",
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQG9oH7QfpaEwA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1703751939226?e=1741824000&v=beta&t=vT-6fPiITv7O2wNfMyJ6wl8l0yiDJxhwqipFsjoRgcI",
      review: `To Whom It May Concern,
          
          I am pleased to recommend Baraa, who worked as a Front-End Developer at PTIT company. During his time with us, Baraa consistently demonstrated exceptional technical skills in front-end development, with a keen eye for detail and a deep understanding of modern web technologies. Baraa was highly dedicated, always eager to learn, and contributed significantly to the success of our projects. His ability to collaborate effectively with both the development team and other departments made him a valuable asset to our company. He consistently met deadlines and produced high-quality work that exceeded our expectations. I am confident that Baraa will bring the same level of professionalism, commitment, and expertise to any team he joins. I highly recommend him for any front-end development role.`,
    },
    {
      name: "Ali Khaled",
      title: "Front-end Engineer",
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQF_AUH9ZCnYxg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1719186347762?e=1741824000&v=beta&t=BLtOPVOrl6AHTeH49XekqUgE7Arufi-jXZrxgtAanLQ",
      review: `It was an absolute privilege to work with Baraa. His exceptional skills as a developer, combined with his dedication to delivering high-quality work, made every project a success. Baraa has a unique ability to solve complex problems efficiently, and his collaborative spirit makes him an asset to any team. I have no doubt that he will achieve great things in his career, and I would gladly work with him again. He comes highly recommended!`,
    },
  ];

  return (
    <div className="section h flex flex-col items-center justify-center gap-4 overflow-x-hidden pb-10 text-center">
      <div className="flex flex-col items-center justify-center gap-4">
        {reviews.map((review, index) => (
          <ScrollEffect 
          key={index}
          type="fadeUp">

          <MagicCard
            data-aos="fade-up"
            data-aos-easing="ease-in-out"
            gradientColor="#7e7e7e12"
            className={cn("flex h-max w-full p-8")}
            ref={undefined}
          >
            <header className="flex items-start gap-2">
              <Image
                src={review.image}
                alt={review.name}
                width={50}
                height={50}
                className="mb-4  rounded-full"
              />
              <div className="pt-1 text-start">
                <h3 className="text-sm font-semibold text-[var(--card-headline)]">
                  {review.name}
                </h3>
                <p className="text-sm text-[var(--card-paragraph)]">
                  {review.title}
                </p>
              </div>
            </header>

            <p className="mt-0 line-clamp-6 text-start text-[var(--card-paragraph)]">
              {review.review}
            </p>
          </MagicCard>
          </ScrollEffect>

        ))}
      </div>
    </div>
  );
};

export default RecommendationsSection;
