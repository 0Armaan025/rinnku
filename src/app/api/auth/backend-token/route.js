import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

export async function POST(req) {
    const nextAuthToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!nextAuthToken) {
        return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Create a new token for your backend
    const backendToken = jwt.sign(
        {
            id: nextAuthToken.id,
            email: nextAuthToken.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return Response.json({ token: backendToken });
}
