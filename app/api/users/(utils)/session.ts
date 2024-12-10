import { db } from "@/app/db";
import { sessionsTable } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { randomUUID } from "node:crypto";

export const createSession = async (userId: number) => {
  const token = randomUUID();
  await db.delete(sessionsTable).where(eq(sessionsTable.user_id, userId));

  await db.insert(sessionsTable).values({
    user_id: userId,
    token,
  });
  (await cookies()).set("session", token);

  return token;
};

export const deleteSession = async (token: string) => {
  (await cookies()).set("session", "");
  await db.delete(sessionsTable).where(eq(sessionsTable.token, token));
};

export const verifySession = async (token: string, userId?: number) => {
  const data = await db
    .select()
    .from(sessionsTable)
    .where(eq(sessionsTable.token, token));

  const session = data[0];

  if (!session) {
    (await cookies()).set("session", "");
    return false;
  }

  if (userId) {
    return session.user_id === userId;
  }

  return session;
};
