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

async function sendContactEmail(data: ContactFormData, formData: FormData) {
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
    const port = Number(process.env.EMAIL_PORT) || 465;
    const isSSL = port === 465;
    
    // Configuração otimizada para HostGator
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: port,
      secure: isSSL, // true para porta 465 (SSL), false para 587 (TLS)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Configurações adicionais para compatibilidade com HostGator
      tls: {
        rejectUnauthorized: false, // Permite certificados auto-assinados
        minVersion: 'TLSv1.2'
      },
      connectionTimeout: 15000, // 15 segundos
      greetingTimeout: 15000,
      socketTimeout: 15000,
      debug: true, // Logs detalhados
      logger: true,
    });

    // Test connection com logs detalhados
    console.log('=== ATTEMPTING SMTP CONNECTION ===');
    console.log('Host:', process.env.EMAIL_HOST);
    console.log('Port:', port);
    console.log('Secure (SSL):', isSSL);
    console.log('User:', process.env.EMAIL_USER);
    
    try {
      await transporter.verify();
      console.log('✅ SMTP connection verified successfully');
    } catch (verifyError: any) {
      console.error('❌ SMTP verify failed:', verifyError.message);
      console.error('Full error:', JSON.stringify(verifyError, null, 2));
      throw new Error(`SMTP connection failed: ${verifyError.message}`);
    }

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

  // Preparar anexos
  const attachments: any[] = [];
  let anexoCount = 0;
  
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('anexo_') && value instanceof File) {
      const buffer = Buffer.from(await value.arrayBuffer());
      attachments.push({
        filename: value.name,
        content: buffer,
        contentType: value.type || 'application/octet-stream',
      });
      anexoCount++;
    }
  }

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
        .anexos-info { background: #e8f4fd; padding: 10px; border-left: 4px solid #22d3ee; margin: 10px 0; }
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
          
          ${anexoCount > 0 ? `
          <div class="anexos-info">
            <strong>📎 Anexos:</strong> ${anexoCount} arquivo(s) enviado(s)
          </div>
          ` : ''}
          
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

    console.log('Sending email with attachments:', anexoCount);
    
    await transporter.sendMail({
      from: 'OLV Internacional <consultores@olvinternacional.com.br>',
      to: departamento.email,
      subject: `Nova Mensagem - ${departamento.label} - ${assuntoLabel}${anexoCount > 0 ? ` (${anexoCount} anexo${anexoCount > 1 ? 's' : ''})` : ''}`,
      html,
      replyTo: data.email,
      attachments: attachments.length > 0 ? attachments : undefined,
    });
    
    console.log('✅ Email sent successfully to:', departamento.email);
    if (anexoCount > 0) {
      console.log(`📎 With ${anexoCount} attachment(s)`);
    }
  } catch (error: any) {
    console.error('❌ Error sending email:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Full error:', JSON.stringify(error, null, 2));
    throw error;
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // Extrair dados do formulário
    const data: ContactFormData = {
      nome: formData.get('nome') as string,
      empresa: formData.get('empresa') as string,
      email: formData.get('email') as string,
      telefone: formData.get('telefone') as string,
      departamento: formData.get('departamento') as string,
      assunto: formData.get('assunto') as string,
      mensagem: formData.get('mensagem') as string,
    };

    console.log('=== CONTACT FORM SUBMISSION ===');
    console.log('Data received:', JSON.stringify(data, null, 2));

    // Validação server-side
    if (!data.nome || !data.empresa || !data.email || !data.telefone || !data.departamento || !data.assunto || !data.mensagem) {
      console.error('Validation failed: Missing required fields');
      return NextResponse.json(
        { success: false, error: 'Todos os campos obrigatórios devem ser preenchidos.' },
        { status: 400 }
      );
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      console.error('Validation failed: Invalid email format');
      return NextResponse.json(
        { success: false, error: 'E-mail inválido.' },
        { status: 400 }
      );
    }

    console.log('Validation passed. Attempting to send email...');

    // Enviar email - BLOQUEANTE para capturar erros
    try {
      await sendContactEmail(data, formData);
      console.log('✅ EMAIL SENT SUCCESSFULLY!');
      return NextResponse.json({ 
        success: true, 
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.' 
      });
    } catch (emailError: any) {
      console.error('❌ EMAIL SENDING FAILED:', emailError);
      console.error('Error details:', {
        code: emailError.code,
        message: emailError.message,
        command: emailError.command
      });
      
      // Mensagem de erro mais específica
      let errorMessage = 'Erro ao enviar email. ';
      
      if (emailError.code === 'EAUTH') {
        errorMessage += 'Falha de autenticação. Verifique usuário e senha.';
      } else if (emailError.code === 'ECONNECTION') {
        errorMessage += 'Não foi possível conectar ao servidor SMTP.';
      } else if (emailError.code === 'ETIMEDOUT') {
        errorMessage += 'Timeout ao conectar. Tente novamente.';
      } else {
        errorMessage += 'Tente novamente em alguns instantes.';
      }
      
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 500 }
      );
    }
  } catch (err: any) {
    console.error('Contact API error', err);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
