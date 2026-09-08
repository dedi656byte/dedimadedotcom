import { Router, type IRouter } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";
import {
  SendContactMessageBody,
  SendContactMessageResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();
const connectors = new ReplitConnectors();

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SendContactMessageBody.safeParse(req.body);

  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.flatten().fieldErrors }, "Invalid contact message");
    res.status(400).json({ error: "Vérifiez les informations du formulaire." });
    return;
  }

  const recipient = process.env.DEDIMADE_CONTACT_EMAIL;
  if (!recipient) {
    req.log.error("Contact email is not configured");
    res.status(500).json({ error: "Le service de contact est momentanément indisponible." });
    return;
  }

  const from = process.env.RESEND_FROM_EMAIL ?? "DEDIMADE <onboarding@resend.dev>";
  const { email, projectType, message } = parsed.data;

  try {
    const resendResponse = await connectors.proxy("resend", "/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: email,
        subject: `Nouvelle demande DEDIMADE — ${projectType}`,
        text: [
          "Nouvelle demande reçue depuis le site DEDIMADE.",
          "",
          `Adresse du client : ${email}`,
          `Type de projet : ${projectType}`,
          "",
          "Message :",
          message,
        ].join("\n"),
      }),
    });

    if (!resendResponse.ok) {
      req.log.error({ statusCode: resendResponse.status }, "Resend rejected contact message");
      res.status(502).json({ error: "Le message n’a pas pu être envoyé. Réessayez dans quelques instants." });
      return;
    }

    req.log.info({ statusCode: resendResponse.status }, "Contact message sent");
    res.json(
      SendContactMessageResponse.parse({
        status: "sent",
        message: "Votre message a bien été envoyé.",
      }),
    );
  } catch (error) {
    req.log.error({ err: error }, "Unable to send contact message");
    res.status(502).json({ error: "Le message n’a pas pu être envoyé. Réessayez dans quelques instants." });
  }
});

export default router;