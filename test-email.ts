// test-email.ts
import "dotenv/config";

import { Resend } from 'resend';

const resend = new Resend('re_WcofvVKm_7Sn7Xt3fySacak7wbmhfCae9');

async function sendTestEmail() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Test <onboarding@resend.dev>',
      to: 'kingmetzo1@gmail.com',
      subject: 'Test email',
      html: '<strong>Ceci est un test</strong>',
    });

    if (error) {
      console.error('Erreur Resend:', error);
      return;
    }

    console.log('Email envoyé avec succès:', data);
  } catch (error) {
    console.error('Erreur lors de l\'envoi du test:', error);
  }
}

sendTestEmail();