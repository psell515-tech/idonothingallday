export async function onRequestPost(context) {
  try {
    const bucket = context.env.IDNAD_MESSAGES;
    const data = await context.request.json();

    const key = `msg-${new Date().toISOString()}-${crypto.randomUUID()}.json`;
    await bucket.put(key, JSON.stringify({
      name: data.name,
      email: data.email,
      message: data.message,
      created_at: new Date().toISOString()
    }), {
      httpMetadata: { contentType: "application/json" }
    });

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
