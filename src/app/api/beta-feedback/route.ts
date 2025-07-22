import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

async function sendMail(html: string, subject: string) {
  if (!process.env.EMAIL_HOST) {
    console.warn('EMAIL_HOST env var not set – skipping email send');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `Beta Feedback <no-reply@olvinternacional.com.br>`,
    to: 'plataformas@olvinternacional.com.br',
    subject,
    html,
  });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log('Beta feedback received', data);

    // Build email body
    const html = `
      <h2>Beta Feedback – ${data.platform}</h2>
      <p><strong>Maior desafio hoje:</strong> ${data.desafio || '—'}</p>
      <p><strong>Funcionalidade desejada:</strong> ${data.funcionalidade || '—'}</p>
      <p><strong>E-mail para contato:</strong> ${data.email || '—'}</p>
    `;

    try {
      await sendMail(html, `Beta Feedback – ${data.platform}`);
    } catch (mailErr) {
      console.error('Failed to send feedback email', mailErr);
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error processing beta feedback', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
} 