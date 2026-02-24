import { PrismaClient, Role, AddressType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    // 1. Create Categories
    const cat1 = await prisma.category.upsert({
        where: { slug: "flavored-makhana" },
        update: {},
        create: {
            name: "Flavored Makhana",
            slug: "flavored-makhana",
        },
    });

    const cat2 = await prisma.category.upsert({
        where: { slug: "roasted-makhana" },
        update: {},
        create: {
            name: "Roasted Makhana",
            slug: "roasted-makhana",
        },
    });

    const cat3 = await prisma.category.upsert({
        where: { slug: "raw-makhana" },
        update: {},
        create: {
            name: "Raw Makhana",
            slug: "raw-makhana",
        },
    });

    // 2. Create Admin User
    const admin = await prisma.user.upsert({
        where: { email: "admin@maakhana.com" },
        update: {},
        create: {
            name: "Admin User",
            email: "admin@maakhana.com",
            role: Role.ADMIN,
        },
    });

    // 3. Create Regular User
    const user = await prisma.user.upsert({
        where: { email: "user@maakhana.com" },
        update: {},
        create: {
            name: "Demo User",
            email: "user@maakhana.com",
            role: Role.USER,
        },
    });

    // 4. Create Products
    const products = [
        {
            name: "Peri Peri Makhana",
            slug: "peri-peri-makhana",
            description: "Spicy and tangy makhana with authentic peri peri seasoning.",
            price: 199.0,
            specialPrice: 149.0,
            imageUrl: "https://images.unsplash.com/photo-1621210185383-7474bbc14605?q=80&w=1000&auto=format&fit=crop",
            categoryId: cat1.id,
            stock: 50,
            isFeatured: true,
        },
        {
            name: "Tangy Tomato Makhana",
            slug: "tangy-tomato-makhana",
            description: "Sweet and sour tomato flavor that kids love.",
            price: 189.0,
            specialPrice: 159.0,
            imageUrl: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?q=80&w=1000&auto=format&fit=crop",
            categoryId: cat1.id,
            stock: 40,
        },
        {
            name: "Cheese & Jalapeno Makhana",
            slug: "cheese-jalapeno-makhana",
            description: "Creamy cheese with a hint of jalapeno spice.",
            price: 210.0,
            imageUrl: "https://images.unsplash.com/photo-1599422314077-f4dfdaa4cd09?q=80&w=1000&auto=format&fit=crop",
            categoryId: cat1.id,
            stock: 30,
        },
        {
            name: "Pink Himalayan Salt Makhana",
            slug: "pink-salt-makhana",
            description: "Lightly roasted with pure Pink Himalayan salt.",
            price: 150.0,
            imageUrl: "https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?q=80&w=1000&auto=format&fit=crop",
            categoryId: cat2.id,
            stock: 100,
        },
        {
            name: "Classic Raw Makhana",
            slug: "classic-raw-makhana",
            description: "Premium quality raw makhana for your own recipes.",
            price: 499.0,
            imageUrl: "https://images.unsplash.com/photo-1621210185383-7474bbc14605?q=80&w=1000&auto=format&fit=crop",
            categoryId: cat3.id,
            stock: 200,
        },
    ];

    for (const p of products) {
        await prisma.product.upsert({
            where: { slug: p.slug },
            update: {},
            create: p,
        });
    }

    // 5. Create Coupons
    await prisma.coupon.upsert({
        where: { code: "WELCOME10" },
        update: {},
        create: {
            code: "WELCOME10",
            discountType: "PERCENTAGE",
            discountAmount: 10,
            minOrderAmount: 500,
            active: true,
        },
    });

    console.log("Seeding completed successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
