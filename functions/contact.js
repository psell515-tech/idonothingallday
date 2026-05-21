export async function onRequestPost(context) {
  const data = await context.request.json();

  const fileName = `${Date.now()}-${data.email}.json`;

  await context.env.MY_BUCKET_IDNAD_MESSAGES.put(
    fileName,
    JSON.stringify(data, null, 2)
  );

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" }
  });
}
