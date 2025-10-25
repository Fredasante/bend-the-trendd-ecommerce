import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Write token needed
  apiVersion: "2024-01-01",
});

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    // Create order in Sanity
    const order = await client.create({
      _type: "order",
      ...orderData,
    });

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
      _id: order._id,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create order",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
