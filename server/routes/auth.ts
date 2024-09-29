import { Hono } from "hono";

import { getUser, kindeClient, sessionManager } from "../kinde";

export const authRoute = new Hono()
  .get("/login", async (context) => {
    const loginUrl = await kindeClient.login(sessionManager(context));
    return context.redirect(loginUrl.toString());
  })
  .get("/register", async (context) => {
    const registerUrl = await kindeClient.register(sessionManager(context));
    return context.redirect(registerUrl.toString());
  })
  .get("/callback", async (context) => {
    const url = new URL(context.req.url);
    console.log(url);
    await kindeClient.handleRedirectToApp(sessionManager(context), url);
    return context.redirect("/");
  })
  .get("/logout", async (context) => {
    const logoutUrl = await kindeClient.logout(sessionManager(context));
    return context.redirect(logoutUrl.toString());
  })
  .get("/me", getUser, async (context) => {
    const userProfile = context.var.userProfile;
    return context.json({ userProfile });
  });
