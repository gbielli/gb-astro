import { Resend } from 'resend';

const prerender = false;
const resend = new Resend("re_P3exY6hW_Ecyh7kQ4gDnZqEBmDK5iy3sC");
const POST = async ({ request }) => {
  const { email } = await request.json();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: "Email invalide" }), {
      status: 400
    });
  }
  const audienceId = "8fa45722-faae-42d4-a633-5968af7bffe5";
  try {
    const { error } = await resend.contacts.create({
      email,
      audienceId
    });
    if (error) {
      console.error("[subscribe] Resend error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500
      });
    }
  } catch (err) {
    console.error("[subscribe] Exception:", err);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500
    });
  }
  return new Response(JSON.stringify({ success: true }), { status: 200 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
