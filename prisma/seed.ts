import { prisma } from "../src/lib/prisma";

const categories = [
  {
    name: "Plumbing",
    description:
      "Professional plumbing services for leaks, taps, pipes, sinks, toilets, and other plumbing problems.",
    basePrice: 500,
    estimatedDuration: "1–2 hours",
    icon: "Wrench",
    features: [
      "Tap and faucet repair",
      "Water leakage repair",
      "Pipe and drainage problems",
      "Sink and toilet repair",
      "General plumbing maintenance",
    ],
  },
  {
    name: "Electrical",
    description:
      "Reliable electrical services for wiring, switches, sockets, lights, and other household electrical problems.",
    basePrice: 500,
    estimatedDuration: "1–2 hours",
    icon: "Zap",
    features: [
      "Switch and socket repair",
      "Light installation",
      "Electrical wiring",
      "Circuit problems",
      "General electrical maintenance",
    ],
  },
  {
    name: "AC Repair",
    description:
      "AC inspection, repair, cleaning, and maintenance to keep your air conditioner working properly.",
    basePrice: 800,
    estimatedDuration: "1–3 hours",
    icon: "Snowflake",
    features: [
      "AC servicing",
      "Cooling problems",
      "Water leakage",
      "AC noise problems",
      "General AC maintenance",
    ],
  },
  {
    name: "Fan Repair",
    description:
      "Repair and maintenance services for ceiling fans, wall fans, exhaust fans, and other household fans.",
    basePrice: 400,
    estimatedDuration: "30–60 minutes",
    icon: "Fan",
    features: [
      "Fan not starting",
      "Slow fan speed",
      "Fan noise",
      "Capacitor replacement",
      "General fan maintenance",
    ],
  },
  {
    name: "Painting",
    description:
      "Professional home painting services for rooms, walls, ceilings, and other areas of your home.",
    basePrice: 1500,
    estimatedDuration: "4–8 hours",
    icon: "Paintbrush",
    features: [
      "Room painting",
      "Wall painting",
      "Ceiling painting",
      "Wall touch-ups",
      "Color replacement",
    ],
  },
  {
    name: "Appliance Repair",
    description:
      "Repair services for common household appliances including refrigerators, washing machines, and more.",
    basePrice: 700,
    estimatedDuration: "1–3 hours",
    icon: "Refrigerator",
    features: [
      "Refrigerator repair",
      "Washing machine repair",
      "Microwave repair",
      "Small appliance repair",
      "General appliance maintenance",
    ],
  },
];

async function main() {
  for (const category of categories) {
    await prisma.serviceCategory.upsert({
      where: { name: category.name },
      update: category,
      create: category,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
