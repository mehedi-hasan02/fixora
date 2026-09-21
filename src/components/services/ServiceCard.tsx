import Link from "next/link";
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

type Service = {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  icon: string;
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
}: Service) => {
  const Icon = iconMap[icon as keyof typeof iconMap];

  return (
    <Link
      href={`/services/${id}`}
      className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50"
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 transition-colors group-hover:bg-slate-900">
        <Icon className="h-6 w-6 text-slate-700 transition-colors group-hover:text-white" />
      </div>

      <h3 className="text-xl font-semibold text-slate-900">{name}</h3>

      <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-600">
        {description}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
        <div>
          <p className="text-xs text-slate-500">Starting from</p>
          <p className="mt-1 font-semibold text-slate-900">{price}</p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock className="h-4 w-4" />
          {duration}
        </div>
      </div>

      <div className="mt-5 flex items-center text-sm font-semibold text-slate-900">
        View service
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default ServiceCard;
