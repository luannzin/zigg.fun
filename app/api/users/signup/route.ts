import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { SignupSchema } from "@/app/schema/user";

import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { createSession } from "../(utils)/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, password } = SignupSchema.parse(body);

    const hashedPassword = await hash(password, 10);

    const data = await db
      .insert(usersTable)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning({
        id: usersTable.id,
      });

    const user = data[0];

    if (!user) {
      return NextResponse.json(
        {
          message: "Failed to create account.",
        },
        {
          status: 500,
        }
      );
    }

    await createSession(user.id);

    return NextResponse.json({
      message: "Account created successfully.",
      user,
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
