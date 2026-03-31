const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function querySuberCraftex() {
  try {
    console.log('\n📊 SUBERCRAFTEX - LIVE PLATFORM STATE');
    console.log('═'.repeat(80));

    // Count totals
    const stats = {
      products: await prisma.product.count(),
      activeProducts: await prisma.product.count({ where: { isActive: true } }),
      services: await prisma.service.count(),
      activeServices: await prisma.service.count({ where: { isActive: true } }),
      categories: await prisma.category.count(),
      orders: await prisma.order.count(),
      investors: await prisma.investor.count(),
      approvedInvestors: await prisma.investor.count({ where: { kycStatus: 'approved' } }),
      equipment: await prisma.equipment.count()
    };

    console.log('\n📈 PLATFORM METRICS:');
    console.log('─'.repeat(80));
    console.log(`  Products: ${stats.products} (${stats.activeProducts} active)`);
    console.log(`  Services: ${stats.services} (${stats.activeServices} active)`);
    console.log(`  Categories: ${stats.categories}`);
    console.log(`  Orders: ${stats.orders}`);
    console.log(`  Investors: ${stats.investors} (${stats.approvedInvestors} KYC approved)`);
    console.log(`  Equipment: ${stats.equipment}`);

    // Sample products
    const products = await prisma.product.findMany({
      take: 10,
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    });

    console.log('\n\n📦 SAMPLE PRODUCTS:');
    console.log('─'.repeat(80));
    if (products.length > 0) {
      products.forEach(p => {
        const status = p.isActive ? '🟢' : '🔴';
        console.log(`  ${status} ${p.name}`);
        console.log(`     Category: ${p.category?.name || 'Uncategorized'}`);
        console.log(`     Price: ${Number(p.price).toLocaleString()} XAF | Stock: ${p.stock || 0}`);
      });
    } else {
      console.log('  No products found');
    }

    // Sample services
    const services = await prisma.service.findMany({
      take: 10,
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    });

    console.log('\n\n🔧 SAMPLE SERVICES:');
    console.log('─'.repeat(80));
    if (services.length > 0) {
      services.forEach(s => {
        const status = s.isActive ? '🟢' : '🔴';
        console.log(`  ${status} ${s.name}`);
        console.log(`     Type: ${s.serviceType} | Category: ${s.category?.name || 'N/A'}`);
        console.log(`     Base Price: ${Number(s.basePrice).toLocaleString()} XAF`);
      });
    } else {
      console.log('  No services found');
    }

    // Categories
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });

    console.log('\n\n📁 PRODUCT CATEGORIES:');
    console.log('─'.repeat(80));
    categories.forEach(c => {
      console.log(`  • ${c.name}`);
    });

    // Service categories
    const serviceCategories = await prisma.serviceCategory.findMany({
      orderBy: { name: 'asc' }
    });

    if (serviceCategories.length > 0) {
      console.log('\n\n🔧 SERVICE CATEGORIES:');
      console.log('─'.repeat(80));
      serviceCategories.forEach(c => {
        console.log(`  • ${c.name}`);
      });
    }

    // Equipment
    const equipment = await prisma.equipment.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' }
    });

    if (equipment.length > 0) {
      console.log('\n\n⚙️  EQUIPMENT (Investor-Funded):');
      console.log('─'.repeat(80));
      equipment.forEach(e => {
        console.log(`  • ${e.name}`);
        console.log(`     Type: ${e.equipmentType} | Status: ${e.status}`);
        console.log(`     Purchase: ${Number(e.purchasePrice).toLocaleString()} ${e.currency}`);
        console.log(`     Current Value: ${Number(e.currentValue).toLocaleString()} ${e.currency}`);
      });
    }

    // Order stats
    const ordersByStatus = await prisma.order.groupBy({
      by: ['status'],
      _count: true
    });

    if (ordersByStatus.length > 0) {
      console.log('\n\n🛒 ORDER STATUS BREAKDOWN:');
      console.log('─'.repeat(80));
      ordersByStatus.forEach(stat => {
        console.log(`  ${stat.status}: ${stat._count}`);
      });
    }

    console.log('\n\n🌐 LIVE AT: https://subercraftex.com');
    console.log('═'.repeat(80));
    console.log('');

    await prisma.$disconnect();
    process.exit(0);
  } catch (err) {
    console.error('\n✗ Error:', err.message);
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

querySuberCraftex();
