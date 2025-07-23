import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

async function sendMail(html: string) {
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
    from: `Radar 360 – Simulador <no-reply@olvinternacional.com.br>`,
    to: 'consultores@olvinternacional.com.br',
    subject: `Lead Radar 360 – Simulador de Custos de Importação`,
    html,
  });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, phone, email, comments, format } = data;

    const html = `
      <h2>Lead – Radar 360 / Simulador de Custos de Importação (${format.toUpperCase()})</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Telefone/WhatsApp:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Comentários:</strong> ${comments || '—'}</p>
    `;

    try {
      await sendMail(html);
    } catch (err) {
      console.error('Email send failed', err);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error on report download registration', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}