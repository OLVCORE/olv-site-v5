import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseAdmin';
import nodemailer from 'nodemailer';

async function sendLeadEmail(payload: any) {
  if (!process.env.EMAIL_HOST) {
    console.warn('EMAIL_HOST not set. Skipping mail send.');
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

  const html = `
    <h2>Novo Lead – Importação Exclusiva</h2>
    <table cellspacing="0" cellpadding="6" style="border:1px solid #eee;">
      ${Object.entries(payload).map(([k,v]) => `<tr><td><strong>${k}</strong></td><td>${v}</td></tr>`).join('')}
    </table>
  `;

  await transporter.sendMail({
    from: 'OLV Internacional <comercial@olvinternacional.com.br>',
    to: 'comercial@olvinternacional.com.br',
    subject: 'Novo Lead – Importação Exclusiva',
    html,
  });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Insert into Supabase if configured
    if (supabase) {
      const { error } = await supabase.from('leads').insert([{ ...data }]);
      if (error) console.error('Supabase insert error', error.message);
    }

    // Send notification email (non-blocking)
    sendLeadEmail(data).catch(err => console.error('Email send error', err));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Lead API error', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
} 