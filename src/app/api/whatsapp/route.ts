import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, name, email, phone, service } = body;

    // Número do WhatsApp da OLV Internacional
    const whatsappNumber = '551126751446';
    
    // Mensagem padrão
    const defaultMessage = `Olá! Sou ${name || 'interessado'} e gostaria de saber mais sobre ${service || 'os serviços da OLV Internacional'}.`;
    
    // Mensagem personalizada se fornecida
    const finalMessage = message || defaultMessage;
    
    // Informações adicionais
    const contactInfo = `\n\n📧 Email: ${email || 'Não informado'}\n📱 Telefone: ${phone || 'Não informado'}`;
    
    // URL do WhatsApp com mensagem codificada
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(finalMessage + contactInfo)}`;

    return NextResponse.json({
      success: true,
      whatsappUrl,
      message: 'URL do WhatsApp gerada com sucesso'
    });

  } catch (error) {
    console.error('Erro na API WhatsApp:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno do servidor' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Número do WhatsApp da OLV Internacional
  const whatsappNumber = '551126751446';
  
  // Mensagem padrão para contato direto
  const defaultMessage = 'Olá! Gostaria de saber mais sobre os serviços da OLV Internacional.';
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return NextResponse.json({
    success: true,
    whatsappUrl,
    phone: '+55 11 2675-1446',
    message: 'URL do WhatsApp para contato direto'
  });
} 