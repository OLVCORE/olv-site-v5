import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  departamento: string;
  assunto: string;
  mensagem: string;
}

async function sendContactEmail(data: ContactFormData) {
  console.log('=== DEBUG EMAIL CONFIG ===');
  console.log('EMAIL_HOST:', process.env.EMAIL_HOST ? 'SET' : 'NOT SET');
  console.log('EMAIL_PORT:', process.env.EMAIL_PORT || 'NOT SET');
  console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'SET' : 'NOT SET');
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET' : 'NOT SET');
  
  if (!process.env.EMAIL_HOST) {
    console.error('EMAIL_HOST not set. Cannot send email.');
    throw new Error('EMAIL_HOST environment variable not configured');
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Test connection
    await transporter.verify();
    console.log('SMTP connection verified successfully');

  // Mapear códigos de departamento para labels e emails
  const departamentoInfo: Record<string, { label: string; email: string }> = {
    projetos: { 
      label: 'Projetos', 
      email: 'consultores@olvinternacional.com.br' 
    },
    atendimento: { 
      label: 'Atendimento', 
      email: 'consultores@olvinternacional.com.br' 
    },
  };

  const departamento = departamentoInfo[data.departamento] || { 
    label: data.departamento, 
    email: 'consultores@olvinternacional.com.br' 
  };

  // Mapear códigos de assunto para labels legíveis
  const assuntoLabels: Record<string, string> = {
    comercial: 'Contato Comercial',
    suporte: 'Suporte Técnico',
    consultoria: 'Consultoria Estratégica',
    parceria: 'Proposta de Parceria',
    imprensa: 'Assessoria de Imprensa',
    totvs: 'Tecnologia TOTVS',
    outro: 'Outro',
  };

  const assuntoLabel = assuntoLabels[data.assunto] || data.assunto;
  const timestamp = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0a58ca 0%, #003366 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h2 { margin: 0; font-size: 24px; }
        .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        td { padding: 12px; border-bottom: 1px solid #f0f0f0; }
        td:first-child { font-weight: bold; color: #0a58ca; width: 30%; vertical-align: top; }
        .message-box { background: #f8f9fa; padding: 15px; border-left: 4px solid #0a58ca; margin: 15px 0; }
        .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
        .badge { display: inline-block; background: #d4af37; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>📬 Nova Mensagem de Contato</h2>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">Website OLV Internacional</p>
        </div>
        
        <div class="content">
          <p style="margin-top: 0;">
            <span class="badge" style="background: #0a58ca;">${departamento.label}</span>
            <span class="badge" style="margin-left: 8px;">${assuntoLabel}</span>
          </p>
          
          <table>
            <tr>
              <td>Nome Completo</td>
              <td>${data.nome}</td>
            </tr>
            <tr>
              <td>Empresa</td>
              <td>${data.empresa}</td>
            </tr>
            <tr>
              <td>E-mail</td>
              <td><a href="mailto:${data.email}" style="color: #0a58ca; text-decoration: none;">${data.email}</a></td>
            </tr>
            <tr>
              <td>Telefone</td>
              <td><a href="tel:${data.telefone.replace(/\D/g, '')}" style="color: #0a58ca; text-decoration: none;">${data.telefone}</a></td>
            </tr>
            <tr>
              <td>Departamento</td>
              <td>${departamento.label}</td>
            </tr>
            <tr>
              <td>Categoria</td>
              <td>${assuntoLabel}</td>
            </tr>
            <tr>
              <td>Data/Hora</td>
              <td>${timestamp}</td>
            </tr>
          </table>
          
          <div class="message-box">
            <strong style="color: #0a58ca; display: block; margin-bottom: 8px;">Mensagem:</strong>
            <div style="white-space: pre-wrap; word-wrap: break-word;">${data.mensagem}</div>
          </div>
        </div>
        
        <div class="footer">
          <p style="margin: 0;">Este email foi enviado automaticamente pelo formulário de contato do website.</p>
          <p style="margin: 5px 0 0 0;">OLV Internacional - Supply Chain Global</p>
        </div>
      </div>
    </body>
    </html>
  `;

    await transporter.sendMail({
      from: 'OLV Internacional <consultores@olvinternacional.com.br>',
      to: departamento.email,
      subject: `Nova Mensagem - ${departamento.label} - ${assuntoLabel}`,
      html,
      replyTo: data.email,
    });
    
    console.log('Email sent successfully to:', departamento.email);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function POST(req: Request) {
  try {
    const data: ContactFormData = await req.json();

    // Validação server-side
    if (!data.nome || !data.empresa || !data.email || !data.telefone || !data.departamento || !data.assunto || !data.mensagem) {
      return NextResponse.json(
        { success: false, error: 'Todos os campos obrigatórios devem ser preenchidos.' },
        { status: 400 }
      );
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, error: 'E-mail inválido.' },
        { status: 400 }
      );
    }

    // Enviar email
    try {
      await sendContactEmail(data);
    } catch (emailError) {
      console.error('Erro ao enviar email de contato:', emailError);
      // Não retornar erro para o usuário para evitar exposição de detalhes do servidor
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.' 
    });
  } catch (err) {
    console.error('Erro na API de contato:', err);
    return NextResponse.json(
      { success: false, error: 'Erro ao processar sua solicitação. Por favor, tente novamente.' },
      { status: 500 }
    );
  }
}

