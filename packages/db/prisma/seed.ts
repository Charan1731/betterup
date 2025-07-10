import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const userId = "user_2zclGfV2t05bYi2MQDSEyf2f3m9";

  // Create websites
  const websites = await prisma.website.createMany({
    data: [
      { id: "web_1", url: "https://example.com", userId },
      { id: "web_2", url: "https://github.com", userId },
      { id: "web_3", url: "https://prisma.io", userId },
      { id: "web_4", url: "https://stackoverflow.com", userId },
      { id: "web_5", url: "https://openai.com", userId },
    ],
    skipDuplicates: true,
  });

  // Create validators
  const validators = await prisma.validator.createMany({
    data: [
      { id: "val_1", publicKey: "pubKey1", location: "US", ip: "192.168.1.1" },
      { id: "val_2", publicKey: "pubKey2", location: "IN", ip: "192.168.1.2" },
      { id: "val_3", publicKey: "pubKey3", location: "DE", ip: "192.168.1.3" },
    ],
    skipDuplicates: true,
  });

  // Create website ticks with recent timestamps for better demo
  const now = new Date();
  const ticks = await prisma.websiteTick.createMany({
    data: [
      {
        id: "tick_1",
        websiteId: "web_1",
        validatorId: "val_1",
        createdAt: new Date(now.getTime() - 5 * 60 * 1000), // 5 mins ago
        status: "Good",
        latency: 120,
      },
      {
        id: "tick_2",
        websiteId: "web_1",
        validatorId: "val_2",
        createdAt: new Date(now.getTime() - 3 * 60 * 1000), // 3 mins ago
        status: "Good",
        latency: 150,
      },
      {
        id: "tick_3",
        websiteId: "web_2",
        validatorId: "val_1",
        createdAt: new Date(now.getTime() - 10 * 60 * 1000), // 10 mins ago
        status: "Good",
        latency: 90,
      },
      {
        id: "tick_4",
        websiteId: "web_3",
        validatorId: "val_3",
        createdAt: new Date(now.getTime() - 1 * 60 * 1000), // 1 min ago
        status: "Good",
        latency: 80,
      },
      {
        id: "tick_5",
        websiteId: "web_4",
        validatorId: "val_2",
        createdAt: new Date(now.getTime() - 15 * 60 * 1000), // 15 mins ago
        status: "Bad",
        latency: 400,
      },
      {
        id: "tick_6",
        websiteId: "web_5",
        validatorId: "val_3",
        createdAt: new Date(now.getTime() - 2 * 60 * 1000), // 2 mins ago
        status: "Good",
        latency: 95,
      },
      // Add more recent ticks for better dashboard visualization
      {
        id: "tick_7",
        websiteId: "web_1",
        validatorId: "val_3",
        createdAt: new Date(now.getTime() - 8 * 60 * 1000),
        status: "Good",
        latency: 110,
      },
      {
        id: "tick_8",
        websiteId: "web_2",
        validatorId: "val_2",
        createdAt: new Date(now.getTime() - 6 * 60 * 1000),
        status: "Good",
        latency: 130,
      },
      {
        id: "tick_9",
        websiteId: "web_3",
        validatorId: "val_1",
        createdAt: new Date(now.getTime() - 12 * 60 * 1000),
        status: "Good",
        latency: 75,
      },
      {
        id: "tick_10",
        websiteId: "web_4",
        validatorId: "val_3",
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