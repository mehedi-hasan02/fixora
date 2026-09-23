import Image from "next/image";
import { Star } from "lucide-react";

import Reveal from "@/components/motion/Reveal";

// Placeholder launch testimonials — not tied to real accounts or a reviews feature.
const testimonials = [
  {
    quote:
      "Very professional and on time. The plumber fixed our tap issue quickly. Highly recommend Fixora!",
    name: "Sarah Ahmed",
    location: "Dhaka, Bangladesh",
    avatar: "/images/avatars/avatar-1.jpg",
  },
  {
    quote:
      "Great service! The electrician was skilled and explained everything clearly. Will definitely use again.",
    name: "Rafiq Islam",
    location: "Chittagong, Bangladesh",
    avatar: "/images/avatars/avatar-2.jpg",
  },
  {
    quote:
      "Easy booking, real-time updates and excellent customer support. Fixora is the best!",
    name: "Nusrat Jahan",
    location: "Sylhet, Bangladesh",
    avatar: "/images/avatars/avatar-3.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <Reveal>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
          What Our Customers Say
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Trusted by Thousands of Homeowners
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal
            key={testimonial.name}
            delay={index * 0.08}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex gap-0.5 text-warning">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>

            <p className="mt-4 text-sm leading-6 text-muted">
              &ldquo;{testimonial.quote}&rdquo;
            </p>

            <div className="mt-5 flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={testimonial.avatar}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-text">
                  {testimonial.name}
                </p>
                <p className="text-xs text-muted">{testimonial.location}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
