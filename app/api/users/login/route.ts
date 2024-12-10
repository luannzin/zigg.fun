import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { LoginSchema } from "@/app/schema/user";

import { compare } from "bcrypt";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { createSession } from "../(utils)/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password } = LoginSchema.parse(body);

    const data = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    const user = data[0];

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    const compared = await compare(password, user.password);

    if (!compared) {
      return NextResponse.json(
        {
          message: "Invalid password.",
        },
        {
          status: 401,
        }
      );
    }

    await createSession(user.id);

    return NextResponse.json({
      message: "Login successful.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    const err = e as Error;

    return NextResponse.json(
      {
        message: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
