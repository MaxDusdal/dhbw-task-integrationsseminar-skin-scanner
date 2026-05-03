import { NextRequest, NextResponse } from "next/server";

// Proxy route: forwards the image to the Python prediction service.
// Running this server-side keeps PREDICTION_SERVICE_URL out of the browser
// and avoids CORS issues when the service is on localhost or a private network.
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const response = await fetch(process.env.PREDICTION_SERVICE_URL + "/predict", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Prediction service error: ${response.status} ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Predict API error:", error);
    return NextResponse.json(
      { error: "Failed to connect to prediction service. Is it running on localhost:8000?" },
      { status: 503 }
    );
  }
}
