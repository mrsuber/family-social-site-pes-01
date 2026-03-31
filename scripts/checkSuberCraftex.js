const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL
});

async function checkSuberCraftex() {
  try {
    console.log('\n🏪 SUBERCRAFTEX - CURRENT STATE\n');
    console.log('═'.repeat(80));

    // Check products
    const products = await prisma.product.findMany({
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 20
    });

    console.log(`\n📦 PRODUCTS (Total: ${await prisma.product.count()})`);
    console.log('─'.repeat(80));

    if (products.length > 0) {
      products.forEach(p => {
        console.log(`\n✓ ${p.name}`);
        console.log(`  Category: ${p.category?.name || 'Uncategorized'}`);
        console.log(`  Price: ${p.price} XAF`);
        console.log(`  Stock: ${p.stock || 0}`);
        console.log(`  Status: ${p.isActive ? '🟢 Active' : '🔴 Inactive'}`);
      });
    } else {
      console.log('  No products found');
    }

    // Check categories
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });

    console.log(`\n\n📁 CATEGORIES (Total: ${categories.length})`);
    console.log('─'.repeat(80));
    categories.forEach(c => {
      console.log(`  • ${c.name}`);
    });

    // Check services
    const services = await prisma.service.findMany({
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 20
    });

    console.log(`\n\n🔧 SERVICES (Total: ${await prisma.service.count()})`);
    console.log('─'.repeat(80));

    if (services.length > 0) {
      services.forEach(s => {
        console.log(`\n✓ ${s.name}`);
        console.log(`  Category: ${s.category?.name || 'Uncategorized'}`);
        console.log(`  Type: ${s.serviceType}`);
        console.log(`  Price: From ${s.basePrice} XAF`);
        console.log(`  Status: ${s.isActive ? '🟢 Active' : '🔴 Inactive'}`);
      });
    } else {
      console.log('  No services found');
    }

    // Check service bookings
    const bookings = await prisma.serviceBooking.count();
    console.log(`\n\n📅 SERVICE BOOKINGS: ${bookings}`);

    // Check orders
    const orders = await prisma.order.count();
    const orderStats = await prisma.order.groupBy({
      by: ['status'],
      _count: true
    });

    console.log(`\n\n🛒 ORDERS (Total: ${orders})`);
    console.log('─'.repeat(80));
    orderStats.forEach(stat => {
      console.log(`  ${stat.status}: ${stat._count}`);
    });

    // Check investors
    const investors = await prisma.investor.count();
    const activeInvestors = await prisma.investor.count({
      where: { kycStatus: 'approved' }
    });

    console.log(`\n\n💰 INVESTORS`);
    console.log('─'.repeat(80));
    console.log(`  Total Registered: ${investors}`);
    console.log(`  KYC Approved: ${activeInvestors}`);

    // Check deposits
    const deposits = await prisma.investorDeposit.aggregate({
      _sum: { netAmount: true },
      _count: true
    });

    console.log(`\n\n💵 INVESTOR DEPOSITS`);
    console.log('─'.repeat(80));
    console.log(`  Total Deposits: ${deposits._count}`);
    console.log(`  Total Amount: ${deposits._sum.netAmount || 0} XAF`);

    // Check equipment
    const equipment = await prisma.equipment.findMany({
      take: 10
    });

    console.log(`\n\n⚙️  EQUIPMENT (Total: ${await prisma.equipment.count()})`);
    console.log('─'.repeat(80));

    if (equipment.length > 0) {
      equipment.forEach(e => {
        console.log(`\n✓ ${e.name}`);
        console.log(`  Type: ${e.equipmentType}`);
        console.log(`  Purchase Price: ${e.purchasePrice} ${e.currency}`);
        console.log(`  Current Value: ${e.currentValue} ${e.currency}`);
        console.log(`  Status: ${e.status}`);
      });
    } else {
      console.log('  No equipment found');
    }

    console.log('\n\n📊 SUMMARY');
    console.log('═'.repeat(80));
    console.log(`  Products: ${await prisma.product.count()}`);
    console.log(`  Services: ${await prisma.service.count()}`);
    console.log(`  Categories: ${categories.length}`);
    console.log(`  Orders: ${orders}`);
    console.log(`  Bookings: ${bookings}`);
    console.log(`  Investors: ${investors} (${activeInvestors} approved)`);
    console.log(`  Equipment: ${await prisma.equipment.count()}`);
    console.log(`\n  🌐 Live at: https://subercraftex.com\n`);

    await prisma.$disconnect();
    process.exit(0);
  } catch (err) {
    console.error('\n✗ Error:', err.message);
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

checkSuberCraftex();
