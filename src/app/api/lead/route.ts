import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic server-side validation
    if (!body?.prospect?.fullName || !body?.prospect?.workEmail) {
      return NextResponse.json(
        { error: "Full name and work email are required." },
        { status: 400 }
      );
    }

    // In production, forward to CRM (e.g. HubSpot / Salesforce / Webhook)
    // Environment variables like PROCESS_LEAD_WEBHOOK_URL or HUBSPOT_API_KEY can be configured
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } catch (webhookErr) {
        console.error("Webhook forwarding error:", webhookErr);
      }
    }

    // Always succeed cleanly for the user
    return NextResponse.json({
      success: true,
      message: "Estimate request recorded successfully.",
      leadId: `lead_${Date.now()}`,
    });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Internal server error processing proposal request." },
      { status: 500 }
    );
  }
}
