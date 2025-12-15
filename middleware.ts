import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

console.log("🟢 Clerk middleware chargé");

const adminEmails = new Set(
  (
    process.env.ADMIN_EMAILS?.split(",") || [
      "kingmetzo1@gmail.com",
      "momo@gmail.com",
    ]
  )
    .map((e) => e.trim())
    .filter(Boolean)
);

export default clerkMiddleware(async (auth, req) => {
  if (!req.nextUrl.pathname.startsWith("/admin")) {
    return;
  }

  await auth.protect();

  const session = await auth();
  const userId = session.userId;

  if (!userId) {
    const url = new URL("/", req.url);
    return Response.redirect(url);
  }

  try {
    const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch user from Clerk:', await response.text());
      const url = new URL("/", req.url);
      return Response.redirect(url);
    }

    const user = await response.json();
    const userEmail = user?.email_addresses?.find(
      (email: any) => email.id === user.primary_email_address_id
    )?.email_address;
    
    if (!userEmail) {
      console.error('No email found for user:', userId);
      const url = new URL("/", req.url);
      return Response.redirect(url);
    }

    if (!adminEmails.has(userEmail)) {
      console.log(`User ${userEmail} is not an admin`);
      const url = new URL("/", req.url);
      return Response.redirect(url);
    }
  } catch (error) {
    console.error('Error in middleware:', error);
    const url = new URL("/", req.url);
    return Response.redirect(url);
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
