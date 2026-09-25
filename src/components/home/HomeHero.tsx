import Image from "next/image";

import type { ServiceCategoryModel } from "../../../generated/prisma/models";
import Reveal from "@/components/motion/Reveal";
import HeroSearch from "@/components/home/HeroSearch";

type Props = {
  categories: ServiceCategoryModel[];
};

const HomeHero = ({ categories }: Props) => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/home/banner.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[80%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/20 sm:to-navy/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal className="max-w-xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Your Home
            <br />
            Our <span className="text-accent">Priority</span>
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-8 text-white/80">
            Fast, reliable and professional home repair services. Book a
            service, track progress and get your home fixed with ease.
          </p>

          <HeroSearch categories={categories} />
        </Reveal>
      </div>
    </section>
  );
};

export default HomeHero;
