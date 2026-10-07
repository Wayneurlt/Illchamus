// Protects /admin pages: anyone without an admin session goes to the login page.
export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === "/admin/login") return;
  const { loggedIn, fetch } = useUserSession();
  if (!loggedIn.value) await fetch();
  if (!loggedIn.value) return navigateTo({ path: "/admin/login", query: { next: to.fullPath } });
});
