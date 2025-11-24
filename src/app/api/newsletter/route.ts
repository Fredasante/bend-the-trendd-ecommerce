import Brevo from "sib-api-v3-sdk";

// /app/api/newsletter/route.ts
export async function POST(req: Request) {
  try {
    const { firstName, email, interest } = await req.json();

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        email,
        attributes: { FIRSTNAME: firstName, INTEREST: interest },
        listIds: [2],
        updateEnabled: true,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
