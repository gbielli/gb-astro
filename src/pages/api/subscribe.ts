export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const { email } = await request.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: "Email invalide" }), {
      status: 400,
    });
  }

  const audienceId = import.meta.env.RESEND_AUDIENCE_ID;

  if (!audienceId) {
    return new Response(JSON.stringify({ error: "Audience non configurée" }), {
      status: 500,
    });
  }

  try {
    const { error } = await resend.contacts.create({
      email,
      audienceId,
    });

    if (error) {
      console.error("[subscribe] Resend error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  } catch (err) {
    console.error("[subscribe] Exception:", err);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
