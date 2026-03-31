require('dotenv').config();
const { sequelize } = require('../config/db');
const Restaurant = require('../models/Restaurant');
const InventoryItem = require('../models/InventoryItem');
const MenuItem = require('../models/MenuItem');
const RestaurantOrder = require('../models/RestaurantOrder');
const Supplier = require('../models/Supplier');
const Department = require('../models/Department');
const Person = require('../models/Person');

async function seedRestaurantData() {
  try {
    console.log('Starting restaurant data seeding...');

    // Find SuberFood department (General 3 - Distribution Division)
    const department = await Department.findOne({
      where: { name: 'Distribution Division' }
    });

    if (!department) {
      console.error('Distribution Division department not found. Please ensure it exists first.');
      return;
    }

    console.log(`Found department: ${department.name}`);

    // Create suppliers
    console.log('Creating suppliers...');
    const suppliers = await Supplier.bulkCreate([
      {
        name: 'Fresh Farms Cameroon',
        contact_person: 'Jean Baptiste',
        phone: '+237 6XX XX XX XX',
        email: 'contact@freshfarms.cm',
        address: 'Yaounde, Cameroon',
        products_supplied: ['vegetables', 'fruits', 'herbs'],
        payment_terms: 'Net 30',
        delivery_schedule: 'Monday, Wednesday, Friday',
        rating: 4.5,
        status: 'active',
        notes: 'Reliable supplier for fresh produce'
      },
      {
        name: 'Meat Masters',
        contact_person: 'Paul Atanga',
        phone: '+237 6XX XX XX XX',
        email: 'info@meatmasters.cm',
        address: 'Douala, Cameroon',
        products_supplied: ['beef', 'chicken', 'fish', 'pork'],
        payment_terms: 'Net 15',
        delivery_schedule: 'Tuesday, Thursday',
        rating: 4.8,
        status: 'active',
        notes: 'Premium quality meats'
      },
      {
        name: 'Spice & Everything Nice',
        contact_person: 'Marie Ngono',
        phone: '+237 6XX XX XX XX',
        email: 'sales@spicenice.cm',
        address: 'Yaounde, Cameroon',
        products_supplied: ['spices', 'seasonings', 'condiments'],
        payment_terms: 'Immediate',
        delivery_schedule: 'As needed',
        rating: 4.3,
        status: 'active',
        notes: 'Wide variety of local and imported spices'
      },
      {
        name: 'Grain & More',
        contact_person: 'Ibrahim Sani',
        phone: '+237 6XX XX XX XX',
        email: 'order@grainmore.cm',
        address: 'Garoua, Cameroon',
        products_supplied: ['rice', 'beans', 'flour', 'oil'],
        payment_terms: 'Net 30',
        delivery_schedule: 'Weekly',
        rating: 4.6,
        status: 'active',
        notes: 'Bulk supplies at competitive prices'
      }
    ]);

    console.log(`Created ${suppliers.length} suppliers`);

    // Create restaurant
    console.log('Creating restaurant...');
    const restaurant = await Restaurant.create({
      name: 'Classical Restaurant - Yaounde',
      location: 'Yaounde',
      address: 'Avenue Kennedy, Yaounde, Cameroon',
      phone: '+237 6XX XX XX XX',
      email: 'yaounde@classicalrestaurant.cm',
      capacity: 80,
      operating_hours: {
        monday: { open: '08:00', close: '22:00' },
        tuesday: { open: '08:00', close: '22:00' },
        wednesday: { open: '08:00', close: '22:00' },
        thursday: { open: '08:00', close: '22:00' },
        friday: { open: '08:00', close: '23:00' },
        saturday: { open: '08:00', close: '23:00' },
        sunday: { open: '10:00', close: '22:00' }
      },
      status: 'active',
      departmentId: department.id
    });

    console.log(`Created restaurant: ${restaurant.name}`);

    // Create inventory items
    console.log('Creating inventory items...');
    const inventoryItems = await InventoryItem.bulkCreate([
      // Dry goods
      {
        restaurantId: restaurant.id,
        name: 'Rice (White)',
        category: 'dry_goods',
        current_stock: 50,
        unit: 'kg',
        minimum_stock: 20,
        cost_per_unit: 800,
        supplierId: suppliers[3].id,
        storage_location: 'Main Storage',
        status: 'in_stock'
      },
      {
        restaurantId: restaurant.id,
        name: 'Flour (All-purpose)',
        category: 'dry_goods',
        current_stock: 25,
        unit: 'kg',
        minimum_stock: 10,
        cost_per_unit: 500,
        supplierId: suppliers[3].id,
        storage_location: 'Main Storage',
        status: 'in_stock'
      },
      {
        restaurantId: restaurant.id,
        name: 'Vegetable Oil',
        category: 'liquids',
        current_stock: 15,
        unit: 'liters',
        minimum_stock: 10,
        cost_per_unit: 1500,
        supplierId: suppliers[3].id,
        storage_location: 'Main Storage',
        status: 'in_stock'
      },
      // Proteins
      {
        restaurantId: restaurant.id,
        name: 'Chicken (Whole)',
        category: 'proteins',
        current_stock: 20,
        unit: 'kg',
        minimum_stock: 15,
        cost_per_unit: 2500,
        supplierId: suppliers[1].id,
        storage_location: 'Walk-in Freezer',
        status: 'in_stock'
      },
      {
        restaurantId: restaurant.id,
        name: 'Beef (Chuck)',
        category: 'proteins',
        current_stock: 18,
        unit: 'kg',
        minimum_stock: 10,
        cost_per_unit: 3500,
        supplierId: suppliers[1].id,
        storage_location: 'Walk-in Freezer',
        status: 'in_stock'
      },
      {
        restaurantId: restaurant.id,
        name: 'Fish (Tilapia)',
        category: 'proteins',
        current_stock: 12,
        unit: 'kg',
        minimum_stock: 10,
        cost_per_unit: 2000,
        supplierId: suppliers[1].id,
        storage_location: 'Walk-in Freezer',
        status: 'in_stock'
      },
      // Produce
      {
        restaurantId: restaurant.id,
        name: 'Tomatoes',
        category: 'produce',
        current_stock: 15,
        unit: 'kg',
        minimum_stock: 10,
        cost_per_unit: 800,
        supplierId: suppliers[0].id,
        storage_location: 'Produce Cooler',
        status: 'in_stock'
      },
      {
        restaurantId: restaurant.id,
        name: 'Onions',
        category: 'produce',
        current_stock: 20,
        unit: 'kg',
        minimum_stock: 15,
        cost_per_unit: 600,
        supplierId: suppliers[0].id,
        storage_location: 'Produce Cooler',
        status: 'in_stock'
      },
      {
        restaurantId: restaurant.id,
        name: 'Lettuce',
        category: 'produce',
        current_stock: 5,
        unit: 'kg',
        minimum_stock: 5,
        cost_per_unit: 1000,
        supplierId: suppliers[0].id,
        storage_location: 'Produce Cooler',
        status: 'low_stock'
      },
      // Spices
      {
        restaurantId: restaurant.id,
        name: 'Salt',
        category: 'spices',
        current_stock: 10,
        unit: 'kg',
        minimum_stock: 5,
        cost_per_unit: 200,
        supplierId: suppliers[2].id,
        storage_location: 'Spice Rack',
        status: 'in_stock'
      },
      {
        restaurantId: restaurant.id,
        name: 'Black Pepper',
        category: 'spices',
        current_stock: 2,
        unit: 'kg',
        minimum_stock: 1,
        cost_per_unit: 5000,
        supplierId: suppliers[2].id,
        storage_location: 'Spice Rack',
        status: 'in_stock'
      },
      {
        restaurantId: restaurant.id,
        name: 'Curry Powder',
        category: 'spices',
        current_stock: 3,
        unit: 'kg',
        minimum_stock: 2,
        cost_per_unit: 3000,
        supplierId: suppliers[2].id,
        storage_location: 'Spice Rack',
        status: 'in_stock'
      }
    ]);

    console.log(`Created ${inventoryItems.length} inventory items`);

    // Create menu items
    console.log('Creating menu items...');
    const menuItems = await MenuItem.bulkCreate([
      // Appetizers
      {
        restaurantId: restaurant.id,
        name: 'Spring Rolls',
        description: 'Crispy vegetable spring rolls served with sweet chili sauce',
        category: 'appetizer',
        price: 1500,
        currency: 'XAF',
        preparation_time: 10,
        serving_size: '4 pieces',
        is_available: true,
        is_popular: true,
        spicy_level: 1,
        status: 'active'
      },
      {
        restaurantId: restaurant.id,
        name: 'Chicken Wings',
        description: 'Fried chicken wings tossed in BBQ or hot sauce',
        category: 'appetizer',
        price: 2000,
        currency: 'XAF',
        preparation_time: 15,
        serving_size: '6 pieces',
        is_available: true,
        is_popular: true,
        spicy_level: 2,
        status: 'active'
      },
      // Main courses
      {
        restaurantId: restaurant.id,
        name: 'Jollof Rice with Chicken',
        description: 'Traditional West African jollof rice with grilled chicken and plantains',
        category: 'main_course',
        price: 3500,
        currency: 'XAF',
        preparation_time: 25,
        serving_size: '1 plate',
        is_available: true,
        is_popular: true,
        dietary_info: { glutenFree: false, vegetarian: false },
        spicy_level: 2,
        status: 'active'
      },
      {
        restaurantId: restaurant.id,
        name: 'Grilled Tilapia with Plantains',
        description: 'Fresh grilled tilapia served with fried plantains and spicy sauce',
        category: 'main_course',
        price: 4000,
        currency: 'XAF',
        preparation_time: 20,
        serving_size: '1 fish',
        is_available: true,
        is_popular: true,
        dietary_info: { glutenFree: true, vegetarian: false },
        spicy_level: 3,
        status: 'active'
      },
      {
        restaurantId: restaurant.id,
        name: 'Beef Pepper Soup',
        description: 'Spicy beef soup with African spices, yams, and plantains',
        category: 'main_course',
        price: 3000,
        currency: 'XAF',
        preparation_time: 30,
        serving_size: '1 bowl',
        is_available: true,
        is_popular: false,
        dietary_info: { glutenFree: true, vegetarian: false },
        spicy_level: 3,
        status: 'active'
      },
      {
        restaurantId: restaurant.id,
        name: 'Vegetable Stir Fry',
        description: 'Mixed vegetables stir-fried with soy sauce served with rice',
        category: 'main_course',
        price: 2500,
        currency: 'XAF',
        preparation_time: 15,
        serving_size: '1 plate',
        is_available: true,
        is_popular: false,
        dietary_info: { glutenFree: false, vegetarian: true },
        spicy_level: 1,
        status: 'active'
      },
      // Sides
      {
        restaurantId: restaurant.id,
        name: 'Fried Plantains',
        description: 'Sweet fried plantains',
        category: 'side',
        price: 1000,
        currency: 'XAF',
        preparation_time: 10,
        serving_size: '1 portion',
        is_available: true,
        is_popular: true,
        dietary_info: { glutenFree: true, vegetarian: true },
        spicy_level: 0,
        status: 'active'
      },
      {
        restaurantId: restaurant.id,
        name: 'Coleslaw',
        description: 'Fresh cabbage and carrot salad',
        category: 'side',
        price: 800,
        currency: 'XAF',
        preparation_time: 5,
        serving_size: '1 bowl',
        is_available: true,
        is_popular: false,
        dietary_info: { glutenFree: true, vegetarian: true },
        spicy_level: 0,
        status: 'active'
      },
      // Desserts
      {
        restaurantId: restaurant.id,
        name: 'Chocolate Cake',
        description: 'Rich chocolate cake with vanilla ice cream',
        category: 'dessert',
        price: 2000,
        currency: 'XAF',
        preparation_time: 5,
        serving_size: '1 slice',
        is_available: true,
        is_popular: true,
        spicy_level: 0,
        status: 'active'
      },
      {
        restaurantId: restaurant.id,
        name: 'Fruit Salad',
        description: 'Fresh seasonal fruits',
        category: 'dessert',
        price: 1500,
        currency: 'XAF',
        preparation_time: 5,
        serving_size: '1 bowl',
        is_available: true,
        is_popular: false,
        dietary_info: { glutenFree: true, vegetarian: true },
        spicy_level: 0,
        status: 'active'
      },
      // Drinks
      {
        restaurantId: restaurant.id,
        name: 'Fresh Orange Juice',
        description: 'Freshly squeezed orange juice',
        category: 'drink',
        price: 1000,
        currency: 'XAF',
        preparation_time: 5,
        serving_size: '350ml',
        is_available: true,
        is_popular: true,
        dietary_info: { glutenFree: true, vegetarian: true },
        spicy_level: 0,
        status: 'active'
      },
      {
        restaurantId: restaurant.id,
        name: 'Soft Drink',
        description: 'Coca-Cola, Sprite, or Fanta',
        category: 'drink',
        price: 500,
        currency: 'XAF',
        preparation_time: 1,
        serving_size: '330ml',
        is_available: true,
        is_popular: true,
        dietary_info: { glutenFree: true, vegetarian: true },
        spicy_level: 0,
        status: 'active'
      }
    ]);

    console.log(`Created ${menuItems.length} menu items`);

    // Create sample orders
    console.log('Creating sample orders...');
    const orders = await RestaurantOrder.bulkCreate([
      {
        orderNumber: 'ORD-20260329-0001',
        restaurantId: restaurant.id,
        orderType: 'dine_in',
        tableNumber: '5',
        items: [
          { menu_item_id: menuItems[2].id, name: 'Jollof Rice with Chicken', quantity: 2, price: 3500 },
          { menu_item_id: menuItems[6].id, name: 'Fried Plantains', quantity: 2, price: 1000 },
          { menu_item_id: menuItems[10].id, name: 'Fresh Orange Juice', quantity: 2, price: 1000 }
        ],
        subtotal: 11000,
        tax: 0,
        total: 11000,
        payment_method: 'cash',
        payment_status: 'paid',
        order_status: 'completed',
        ordered_at: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        prepared_at: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
        served_at: new Date(Date.now() - 1 * 60 * 60 * 1000)
      },
      {
        orderNumber: 'ORD-20260329-0002',
        restaurantId: restaurant.id,
        orderType: 'takeout',
        items: [
          { menu_item_id: menuItems[3].id, name: 'Grilled Tilapia with Plantains', quantity: 1, price: 4000 },
          { menu_item_id: menuItems[11].id, name: 'Soft Drink', quantity: 1, price: 500 }
        ],
        subtotal: 4500,
        tax: 0,
        total: 4500,
        payment_method: 'mobile_money',
        payment_status: 'paid',
        order_status: 'completed',
        ordered_at: new Date(Date.now() - 1 * 60 * 60 * 1000),
        prepared_at: new Date(Date.now() - 0.5 * 60 * 60 * 1000),
        served_at: new Date(Date.now() - 0.25 * 60 * 60 * 1000)
      },
      {
        orderNumber: 'ORD-20260329-0003',
        restaurantId: restaurant.id,
        orderType: 'dine_in',
        tableNumber: '12',
        items: [
          { menu_item_id: menuItems[0].id, name: 'Spring Rolls', quantity: 1, price: 1500 },
          { menu_item_id: menuItems[1].id, name: 'Chicken Wings', quantity: 1, price: 2000 },
          { menu_item_id: menuItems[4].id, name: 'Beef Pepper Soup', quantity: 2, price: 3000 }
        ],
        subtotal: 9500,
        tax: 0,
        total: 9500,
        payment_method: 'cash',
        payment_status: 'pending',
        order_status: 'preparing',
        ordered_at: new Date(Date.now() - 0.25 * 60 * 60 * 1000),
        prepared_at: new Date()
      }
    ]);

    console.log(`Created ${orders.length} sample orders`);

    console.log('\n✅ Restaurant data seeding completed successfully!');
    console.log(`\nSummary:`);
    console.log(`- Restaurant: ${restaurant.name}`);
    console.log(`- Suppliers: ${suppliers.length}`);
    console.log(`- Inventory Items: ${inventoryItems.length}`);
    console.log(`- Menu Items: ${menuItems.length}`);
    console.log(`- Sample Orders: ${orders.length}`);

  } catch (error) {
    console.error('Error seeding restaurant data:', error);
    throw error;
  }
}

// Run the seeder if this file is executed directly
if (require.main === module) {
  seedRestaurantData()
    .then(() => {
      console.log('\nSeeding completed. Exiting...');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\nSeeding failed:', error);
      process.exit(1);
    });
}

module.exports = seedRestaurantData;
