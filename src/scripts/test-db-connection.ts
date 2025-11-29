import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

async function testDatabaseConnection() {
    console.log('🔄 Testando conexão com o banco de dados PostgreSQL (Supabase)...\n');

    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        console.error('❌ Erro: DATABASE_URL não está definida nas variáveis de ambiente');
        console.log('\n📝 Certifique-se de que você tem um arquivo .env com a variável DATABASE_URL');
        console.log('   Exemplo: DATABASE_URL="postgresql://usuario:senha@host:porta/database"');
        process.exit(1);
    }

    // Mascarar a senha na URL para exibição segura
    const maskedUrl = connectionString.replace(/:([^:@]+)@/, ':****@');
    console.log(`📡 Tentando conectar em: ${maskedUrl}\n`);

    const pool = new Pool({ connectionString });

    try {
        // Testar conexão básica
        const client = await pool.connect();
        console.log('✅ Conexão estabelecida com sucesso!\n');

        // Testar query simples
        const timeResult = await client.query('SELECT NOW() as current_time');
        console.log(`🕐 Horário do servidor: ${timeResult.rows[0].current_time}`);

        // Verificar versão do PostgreSQL
        const versionResult = await client.query('SELECT version()');
        console.log(`📦 Versão do PostgreSQL: ${versionResult.rows[0].version.split(',')[0]}`);

        // Verificar banco de dados atual
        const dbResult = await client.query('SELECT current_database() as db_name');
        console.log(`🗄️  Banco de dados: ${dbResult.rows[0].db_name}`);

        // Verificar usuário atual
        const userResult = await client.query('SELECT current_user as username');
        console.log(`👤 Usuário conectado: ${userResult.rows[0].username}`);

        // Listar tabelas existentes
        const tablesResult = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_type = 'BASE TABLE'
            ORDER BY table_name
        `);

        console.log('\n📋 Tabelas existentes no schema public:');
        if (tablesResult.rows.length === 0) {
            console.log('   (nenhuma tabela encontrada - execute as migrations primeiro)');
        } else {
            tablesResult.rows.forEach((row) => {
                console.log(`   - ${row.table_name}`);
            });
        }

        // Liberar cliente
        client.release();
        console.log('\n✅ Teste de conexão concluído com sucesso!');

    } catch (error) {
        console.error('❌ Erro ao conectar ao banco de dados:\n');

        if (error instanceof Error) {
            // Mensagens de erro comuns e suas soluções
            if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
                console.error('   Problema: Não foi possível resolver o endereço do host');
                console.error('   Solução: Verifique se a URL do Supabase está correta');
            } else if (error.message.includes('password authentication failed')) {
                console.error('   Problema: Falha na autenticação');
                console.error('   Solução: Verifique se a senha no DATABASE_URL está correta');
            } else if (error.message.includes('connection refused') || error.message.includes('ECONNREFUSED')) {
                console.error('   Problema: Conexão recusada');
                console.error('   Solução: Verifique se o servidor está acessível e a porta está correta');
            } else if (error.message.includes('timeout')) {
                console.error('   Problema: Timeout na conexão');
                console.error('   Solução: Verifique sua conexão de rede ou firewall');
            } else if (error.message.includes('SSL')) {
                console.error('   Problema: Erro de SSL');
                console.error('   Solução: Adicione ?sslmode=require ou ?sslmode=no-verify na DATABASE_URL');
            } else {
                console.error(`   Erro: ${error.message}`);
            }
        }

        process.exit(1);
    } finally {
        await pool.end();
    }
}

testDatabaseConnection();
