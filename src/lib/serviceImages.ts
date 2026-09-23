// Maps ServiceCategory.icon (a lucide-react icon name) to its representative photo.
export const SERVICE_IMAGES: Record<string, string> = {
  Wrench: "/images/services/plumbing.jpg",
  Zap: "/images/services/electrical.jpg",
  Snowflake: "/images/services/ac-repair.jpg",
  Fan: "/images/services/fan-repair.jpg",
  Paintbrush: "/images/services/painting.jpg",
  Refrigerator: "/images/services/appliance-repair.jpg",
};

export const getServiceImage = (icon: string) =>
  SERVICE_IMAGES[icon] ?? "/images/services/plumbing.jpg";
