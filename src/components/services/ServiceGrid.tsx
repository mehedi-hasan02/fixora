import ServiceCard from "./ServiceCard";
import { getServiceCategories } from "@/action/server/services";

const ServiceGrid = async () => {
  const categories = await getServiceCategories();

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <ServiceCard
          key={category.id}
          id={category.id}
          name={category.name}
          description={category.description}
          price={`৳${category.basePrice}`}
          duration={category.estimatedDuration}
          icon={category.icon}
        />
      ))}
    </div>
  );
};

export default ServiceGrid;
