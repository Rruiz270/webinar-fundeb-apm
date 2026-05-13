const TENANT_ID = process.env.MSGRAPH_TENANT_ID || "";
const CLIENT_ID = process.env.MSGRAPH_CLIENT_ID || "";
const CLIENT_SECRET = process.env.MSGRAPH_CLIENT_SECRET || "";
const SENDER = "apaulista@apaulista.org.br";

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60000) {
    return cachedToken.token;
  }

  const res = await fetch(
    `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        scope: "https://graph.microsoft.com/.default",
        client_secret: CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Graph token error: ${err}`);
  }

  const data = await res.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return data.access_token;
}

export async function sendEmail(
  to: string,
  subject: string,
  htmlBody: string
): Promise<{ success: boolean; error?: string }> {
  if (!TENANT_ID || !CLIENT_ID || !CLIENT_SECRET) {
    console.warn("Microsoft Graph credentials not configured — skipping email");
    return { success: false, error: "Graph API not configured" };
  }

  try {
    const token = await getAccessToken();

    const res = await fetch(
      `https://graph.microsoft.com/v1.0/users/${SENDER}/sendMail`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            subject,
            body: { contentType: "HTML", content: htmlBody },
            toRecipients: [{ emailAddress: { address: to } }],
          },
          saveToSentItems: false,
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("Graph sendMail error:", err);
      return { success: false, error: err };
    }

    return { success: true };
  } catch (err) {
    console.error("Graph sendMail exception:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
