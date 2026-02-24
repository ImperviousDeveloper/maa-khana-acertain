import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { productRouter } from "./routers/product";
import { categoryRouter } from "./routers/category";
import { cartRouter } from "./routers/cart";
import { orderRouter } from "./routers/order";
import { reviewRouter } from "./routers/review";
import { couponRouter } from "./routers/coupon";
import { wishlistRouter } from "./routers/wishlist";
import { notificationRouter } from "./routers/notification";
import { userRouter } from "./routers/user";
import { adminRouter } from "./routers/admin";
import { inventoryRouter } from "./routers/inventory";
import { paymentRouter } from "./routers/payment";
import { authRouter } from "./routers/auth";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  product: productRouter,
  category: categoryRouter,
  cart: cartRouter,
  order: orderRouter,
  review: reviewRouter,
  coupon: couponRouter,
  wishlist: wishlistRouter,
  notification: notificationRouter,
  user: userRouter,
  admin: adminRouter,
  inventory: inventoryRouter,
  payment: paymentRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 */
export const createCaller = createCallerFactory(appRouter);
