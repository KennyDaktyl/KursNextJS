import { authMiddleware } from "@clerk/nextjs";

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

export default authMiddleware({
	publicRoutes: [
		"/",
		"/search",
        "/cart",
        "/cart/(.*)",
		"/categories/(.*)",
		"/collections",
		"/collections/(.*)",
		"/product/(.*)",
		"/products",
		"/products/(.*)",
		"/api/webhook/(.*)"
	],
});
