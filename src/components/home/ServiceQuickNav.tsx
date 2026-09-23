import Link from "next/link";
import {
  Wrench,
  Zap,
  Snowflake,
  Fan,
  Paintbrush,
  Refrigerator,
  ArrowRight,
} from "lucide-react";

import type { ServiceCategoryModel } from "../../../generated/prisma/models";
import Reveal from "@/components/motion/Reveal";

const iconMap = { Wrench, Zap, Snowflake, Fan, Paintbrush, Refrigerator };

const CHIP_COLORS = [
  "bg-primary/10 text-primary",
  "bg-success/10 text-success",
  "bg-accent/10 text-accent",
  "bg-warning/10 text-warning",
  "bg-error/10 text-error",
  "bg-secondary/10 text-secondary",
];

type Props = {
  categories: ServiceCategoryModel[];
};

const ServiceQuickNav = ({ categories }: Props) => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <Reveal>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
          Our Services
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          What Service Do You Need?
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Choose from our wide range of home repair services and get
          professional help, fast.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {categories.map((category, index) => {
          const Icon = iconMap[category.icon as keyof typeof iconMap] ?? Wrench;
          const color = CHIP_COLORS[index % CHIP_COLORS.length];

          return (
            <Reveal key={category.id} delay={index * 0.05}>
              <Link
                href={`/services/${category.id}`}
                className="group block rounded-2xl border border-border bg-card p-5 text-center transition-shadow hover:shadow-lg hover:shadow-border/50"
              >
                <div
                  className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-3 font-semibold text-text">
                  {category.name}
                </h3>
                <p className="mt-1 text-xs text-muted">
                  {category.estimatedDuration}
                </p>

                <ArrowRight className="mx-auto mt-2 h-4 w-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

export default ServiceQuickNav;
