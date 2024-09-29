import {
  createKindeServerClient,
  GrantType,
  type SessionManager,
  type UserType,
} from "@kinde-oss/kinde-typescript-sdk";
import { type Context } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

// Client for authorization code flow
export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    authDomain: process.env.KINDE_DOMAIN!,
    clientId: process.env.KINDE_CLIENT_ID!,
    clientSecret: process.env.KINDE_CLIENT_SECRET!,
    redirectURL: process.env.KINDE_REDIRECT_URI!,
    logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URI!,
  }
);

let store: Record<string, unknown> = {};

export const sessionManager = (context: Context): SessionManager => ({
  async getSessionItem(key: string) {
    const result = getCookie(context, key);
    return result;
  },
  async setSessionItem(key: string, value: unknown) {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    } as const;

    console.log({
      key,
      value,
    });
    if (typeof value === "string") {
      setCookie(context, key, value, cookieOptions);
    }
  },
  async removeSessionItem(key: string) {
    deleteCookie(context, key);
  },
  async destroySession() {
    ["id_token", "access_token", "user", "refresh_token"].forEach((key) => {
      deleteCookie(context, key);
    });
  },
});

type Env = {
  Variables: {
    userProfile: UserType;
  };
};

export const getUser = createMiddleware<Env>(async (context, next) => {
  try {
    const isAuthenticated = await kindeClient.isAuthenticated(
      sessionManager(context)
    ); // Boolean: true or false

    if (!isAuthenticated) {
      return context.json({ error: "Unauthorized" }, 401);
    }

    const userProfile = await kindeClient.getUserProfile(
      sessionManager(context)
    );
    context.set("userProfile", userProfile);
    await next();
  } catch (error) {
    console.error(error);
    return context.json({ error: "Unauthorized" }, 401);
  }
});
