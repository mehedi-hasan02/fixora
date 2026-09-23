"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Wrench,
  Zap,
  Snowflake,
  Fan,
  Paintbrush,
  Refrigerator,
  Clock,
  ArrowRight,
} from "lucide-react";

import { easeOut } from "@/lib/motion";

type Service = {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  icon: string;
  index?: number;
};

const iconMap = {
  Wrench,
  Zap,
  Snowflake,
  Fan,
  Paintbrush,
  Refrigerator,
};

const ServiceCard = ({
  id,
  name,
  description,
  price,
  duration,
  icon,
  index = 0,
}: Service) => {
  const Icon = iconMap[icon as keyof typeof iconMap];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: easeOut, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
    >
      <Link
        href={`/services/${id}`}
        className="group block rounded-2xl border border-border bg-card p-6 transition-shadow duration-200 hover:border-border hover:shadow-xl hover:shadow-border/50"
      >
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-background transition-colors group-hover:bg-primary">
          <Icon className="h-6 w-6 text-text transition-colors group-hover:text-white" />
        </div>

        <h3 className="text-xl font-semibold text-primary">{name}</h3>

        <p className="mt-2 min-h-[48px] text-sm leading-6 text-muted">
          {description}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-background pt-5">
          <div>
            <p className="text-xs text-muted">Starting from</p>
            <p className="mt-1 font-semibold text-primary">{price}</p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted">
            <Clock className="h-4 w-4" />
            {duration}
          </div>
        </div>

        <div className="mt-5 flex items-center text-sm font-semibold text-primary">
          View service
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
