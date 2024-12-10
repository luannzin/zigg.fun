import { NextResponse } from "next/server";
import { verifySession } from "../(utils)/session";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const sessionHeader = request.headers.get("session");
    if (!sessionHeader) {
      return NextResponse.json(
        {
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }
    const session = (await verifySession(sessionHeader)) as {
      user_id: number;
    };

    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const data = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, session.user_id));

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

    return NextResponse.json({
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
