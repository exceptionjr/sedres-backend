import { MailtrapClient } from "mailtrap"
import "dotenv/config"

const TOKEN = process.env.MAILTRAP_TOKEN as string;

const client = new MailtrapClient({
    token: TOKEN,
});

const sender = {
    email: "hello@demomailtrap.co",
    name: "SEDRES",
};

export const sendEmail = async (to: string, subject: string, body: string) => {
    console.log("Enviando email para:", to);
    console.log("Token:", TOKEN ? "Configurado" : "NÃO CONFIGURADO");

    try {
        const result = await client.send({
            from: sender,
            to: [{ email: to }],
            subject,
            text: body,
            category: "OTP",
        });
        console.log("Email enviado com sucesso:", result);
        return true;
    } catch (err) {
        console.error("Erro ao enviar email:", err);
        return false;
    }
}

export const sendOtpEmail = async (to: string, code: string, userName?: string) => {
    console.log("Enviando email OTP para:", to);
    console.log("Token:", TOKEN ? "Configurado" : "NÃO CONFIGURADO");

    const subject = "Seu código de verificação - SEDRES";

    const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Código de Verificação</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f5;">
        <tr>
            <td style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 480px; margin: 0 auto;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="text-align: center; padding-bottom: 32px;">
                            <div style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 16px 32px; border-radius: 12px;">
                                <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">VIII SEDRES</h1>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Main Card -->
                    <tr>
                        <td>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                                <tr>
                                    <td style="padding: 40px 32px;">
                                        
                                        <!-- Icon -->
                                        <div style="text-align: center; margin-bottom: 24px;">
                                            <div style="display: inline-block; background-color: #eff6ff; border-radius: 50%; padding: 16px;">
                                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9H15V22H13V16H11V22H9V9H3V7H21V9Z" fill="#2563eb"/>
                                                </svg>
                                            </div>
                                        </div>
                                        
                                        <!-- Greeting -->
                                        <h2 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 600; color: #18181b; text-align: center;">
                                            ${userName ? `Olá, ${userName}!` : 'Olá!'}
                                        </h2>
                                        
                                        <p style="margin: 0 0 32px 0; font-size: 15px; line-height: 1.6; color: #52525b; text-align: center;">
                                            Use o código abaixo para confirmar sua identidade e acessar sua conta.
                                        </p>
                                        
                                        <!-- OTP Code Box -->
                                        <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px dashed #cbd5e1; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
                                            <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">
                                                Seu código de verificação
                                            </p>
                                            <div style="font-size: 36px; font-weight: 700; color: #1e293b; letter-spacing: 8px; font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;">
                                                ${code}
                                            </div>
                                        </div>
                                        
                                        <!-- Timer Warning -->
                                        <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 0 8px 8px 0; padding: 12px 16px; margin-bottom: 24px;">
                                            <p style="margin: 0; font-size: 13px; color: #92400e;">
                                                <strong>⏱️ Atenção:</strong> Este código expira em <strong>30 minutos</strong>.
                                            </p>
                                        </div>
                                        
                                        <!-- Security Notice -->
                                        <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px;">
                                            <p style="margin: 0; font-size: 13px; color: #64748b; text-align: center;">
                                                🔒 Se você não solicitou este código, ignore este email. Sua conta está segura.
                                            </p>
                                        </div>
                                        
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding-top: 32px; text-align: center;">
                            <p style="margin: 0 0 8px 0; font-size: 13px; color: #71717a;">
                                © ${new Date().getFullYear()} SEDRES. Todos os direitos reservados.
                            </p>
                            <p style="margin: 0; font-size: 12px; color: #a1a1aa;">
                                Este é um email automático. Por favor, não responda.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();

    const text = `
SEDRES - Código de Verificação

${userName ? `Olá, ${userName}!` : 'Olá!'}

Use o código abaixo para confirmar sua identidade e acessar sua conta:

══════════════════════════
    ${code}
══════════════════════════

⏱️ Este código expira em 30 minutos.

🔒 Se você não solicitou este código, ignore este email. Sua conta está segura.

---
© ${new Date().getFullYear()} SEDRES. Todos os direitos reservados.
Este é um email automático. Por favor, não responda.
    `.trim();

    try {
        const result = await client.send({
            from: sender,
            to: [{ email: to }],
            subject,
            text,
            html,
            category: "OTP",
        });
        console.log("Email OTP enviado com sucesso:", result);
        return true;
    } catch (err) {
        console.error("Erro ao enviar email OTP:", err);
        return false;
    }
}