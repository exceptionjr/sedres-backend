import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
import { sendOtpEmail } from "../lib/mailtrap";

dotenv.config();

async function testMailtrapConnection() {
    console.log("🔄 Testando conexão com o Mailtrap...\n");

    const token = process.env.MAILTRAP_TOKEN;
    const testInboxId = process.env.MAILTRAP_TEST_INBOX_ID;
    const senderEmail = process.env.MAILTRAP_SENDER_EMAIL || "hello@demomailtrap.co";
    const senderName = process.env.MAILTRAP_SENDER_NAME || "SEDRES";

    // Verificar variáveis de ambiente
    console.log("📋 Verificando variáveis de ambiente:");
    console.log(`   MAILTRAP_TOKEN: ${token ? "✅ Configurado" : "❌ NÃO CONFIGURADO"}`);
    console.log(`   MAILTRAP_TEST_INBOX_ID: ${testInboxId ? "✅ Configurado" : "⚠️  Não configurado (opcional)"}`);
    console.log(`   MAILTRAP_SENDER_EMAIL: ${senderEmail}`);
    console.log(`   MAILTRAP_SENDER_NAME: ${senderName}`);
    console.log("");

    if (!token) {
        console.error("❌ Erro: MAILTRAP_TOKEN não está definida nas variáveis de ambiente");
        console.log("\n📝 Certifique-se de que você tem um arquivo .env com a variável MAILTRAP_TOKEN");
        console.log("   Exemplo: MAILTRAP_TOKEN=\"seu_token_aqui\"");
        console.log("\n💡 Você pode obter o token em: https://mailtrap.io/api-tokens");
        process.exit(1);
    }

    // Usar o email do proprietário da conta Mailtrap (necessário para domínios demo)
    const testEmail = process.env.MAILTRAP_ACCOUNT_EMAIL || "test@example.com";

    if (testEmail === "test@example.com") {
        console.log("⚠️  AVISO: Usando domínio demo (demomailtrap.co)");
        console.log("   Com domínios demo, você só pode enviar emails para o email da sua conta Mailtrap.");
        console.log("   Configure MAILTRAP_ACCOUNT_EMAIL no .env com o email da sua conta.\n");
        process.exit(1);
    }

    try {
        // Gerar um código OTP de teste
        const testOtpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const testUserName = "Usuário Teste";

        console.log("📧 Enviando email de teste com template OTP estilizado...");
        console.log(`   Para: ${testEmail}`);
        console.log(`   Código OTP: ${testOtpCode}`);
        console.log(`   Nome: ${testUserName}`);
        console.log("");

        const result = await sendOtpEmail(testEmail, testOtpCode, testUserName);

        if (result) {
            console.log("\n✅ Email OTP enviado com sucesso!");
            console.log("\n💡 Dica: Verifique sua caixa de entrada para ver o email estilizado.");
            console.log("   O email deve conter:");
            console.log("   - Header com logo SEDRES");
            console.log("   - Saudação personalizada");
            console.log("   - Código OTP em destaque");
            console.log("   - Aviso de expiração (30 minutos)");
            console.log("   - Aviso de segurança");
        } else {
            console.error("\n❌ Falha ao enviar email OTP");
            process.exit(1);
        }

    } catch (error) {
        console.error("❌ Erro ao conectar/enviar email via Mailtrap:\n");

        if (error instanceof Error) {
            console.error(`   Erro: ${error.message}`);
        }

        process.exit(1);
    }
}

testMailtrapConnection();
