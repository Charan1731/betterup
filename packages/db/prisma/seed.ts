import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const userId = "user_2zclGfV2t05bYi2MQDSEyf2f3m9";

  // Create websites
  const websites = await prisma.website.createMany({
    data: [
      { id: "web_40", url: "https://youtube.com", userId },
      { id: "web_41", url: "https://x.com", userId },
      { id: "web_42", url: "https://facebook.com", userId },
      { id: "web_43", url: "https://twitter.com", userId },
      { id: "web_44", url: "https://instagram.com", userId },
    ],
    skipDuplicates: true,
  });

  // Create validators
  const validators = await prisma.validator.createMany({
    data: [
      { id: "val_40", publicKey: "pubKey1", location: "US", ip: "192.168.1.1" },
      { id: "val_41", publicKey: "pubKey2", location: "IN", ip: "192.168.1.2" },
      { id: "val_42", publicKey: "pubKey3", location: "DE", ip: "192.168.1.3" },
    ],
    skipDuplicates: true,
  });

  // Create website ticks with recent timestamps for better demo
  const now = new Date();
  const ticks = await prisma.websiteTick.createMany({
    data: [
      {
        id: "tick_31",
        websiteId: "web_40",
        validatorId: "val_40",
        createdAt: new Date(now.getTime() - 5 * 60 * 1000), // 5 mins ago
        status: "Good",
        latency: 120,
      },
      {
        id: "tick_32",
        websiteId: "web_41",
        validatorId: "val_41",
        createdAt: new Date(now.getTime() - 3 * 60 * 1000), // 3 mins ago
        status: "Good",
        latency: 150,
      },
      {
        id: "tick_33",
        websiteId: "web_42",
        validatorId: "val_42",
        createdAt: new Date(now.getTime() - 10 * 60 * 1000), // 10 mins ago
        status: "Good",
        latency: 90,
      },
      {
        id: "tick_34",
        websiteId: "web_43",
        validatorId: "val_43",
        createdAt: new Date(now.getTime() - 1 * 60 * 1000), // 1 min ago
        status: "Good",
        latency: 80,
      },
      {
        id: "tick_35",
        websiteId: "web_44",
        validatorId: "val_44",
        createdAt: new Date(now.getTime() - 15 * 60 * 1000), // 15 mins ago
        status: "Bad",
        latency: 400,
      },
      {
        id: "tick_36",
        websiteId: "web_40",
        validatorId: "val_40",
        createdAt: new Date(now.getTime() - 2 * 60 * 1000), // 2 mins ago
        status: "Good",
        latency: 95,
      },
      // Add more recent ticks for better dashboard visualization
      {
        id: "tick_37",
        websiteId: "web_41",
        validatorId: "val_41",
        createdAt: new Date(now.getTime() - 8 * 60 * 1000),
        status: "Good",
        latency: 110,
      },
      {
        id: "tick_38",
        websiteId: "web_42",
        validatorId: "val_42",
        createdAt: new Date(now.getTime() - 6 * 60 * 1000),
        status: "Good",
        latency: 130,
      },
      {
        id: "tick_39",
        websiteId: "web_43",
        validatorId: "val_43",
        createdAt: new Date(now.getTime() - 12 * 60 * 1000),
        status: "Good",
        latency: 75,
      },
      {
        id: "tick_30",
        websiteId: "web_44",
        validatorId: "val_44",
        createdAt: new Date(now.getTime() - 4 * 60 * 1000),
        status: "Good",
        latency: 200,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Database seeded successfully!");
  console.log(`📊 Created ${websites.count} websites`);
  console.log(`🔧 Created ${validators.count} validators`);
  console.log(`📈 Created ${ticks.count} website ticks`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });