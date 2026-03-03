import React, { useState } from 'react';
import LegalPageLayout from '../../components/LegalPageLayout/LegalPageLayout';

const PrivacyPolicy = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const sections = [
        {
            id: 'intro',
            title: '1. Introdução',
            content: (
                <>
                    <p>A GOTOUR é uma plataforma digital de turismo dedicada à descoberta de destinos, planeamento de viagens e gestão de reservas.</p>
                    <p>A presente Política de Privacidade descreve de forma transparente como recolhemos, utilizamos, armazenamos e protegemos os dados pessoais dos utilizadores que acedem ao nosso website e aplicação.</p>
                    <p>Ao utilizar os serviços da GOTOUR, o utilizador declara que leu, compreendeu e concorda com as práticas aqui descritas.</p>
                </>
            )
        },
        {
            id: 'dados-recolhidos',
            title: '2. Dados Pessoais Recolhidos',
            content: (
                <>
                    <p>A GOTOUR pode recolher as seguintes categorias de dados:</p>

                    <strong>2.1 Dados fornecidos diretamente pelo utilizador</strong>
                    <ul>
                        <li>Nome completo</li>
                        <li>Endereço de email</li>
                        <li>Número de telemóvel</li>
                        <li>Nacionalidade</li>
                        <li>Data de nascimento</li>
                        <li>Informações de faturação</li>
                    </ul>

                    <strong>2.2 Dados recolhidos automaticamente</strong>
                    <ul>
                        <li>Endereço IP</li>
                        <li>Tipo de dispositivo</li>
                        <li>Sistema operativo</li>
                        <li>Navegador utilizado</li>
                        <li>Páginas visitadas</li>
                        <li>Preferências de navegação</li>
                    </ul>

                    <strong>2.3 Dados provenientes de autenticação via Google</strong>
                    <p>Caso o utilizador opte por iniciar sessão através da conta Google, a GOTOUR poderá receber:</p>
                    <ul>
                        <li>Nome associado à conta Google</li>
                        <li>Endereço de email</li>
                        <li>Fotografia de perfil</li>
                        <li>Identificador único da conta Google</li>
                    </ul>
                    <p>A GOTOUR não tem acesso à palavra-passe do utilizador nem à sua conta Google além das informações autorizadas.</p>
                </>
            )
        },
        {
            id: 'finalidade',
            title: '3. Finalidade do Tratamento',
            content: (
                <>
                    <p>Os dados pessoais são utilizados exclusivamente para:</p>
                    <ul>
                        <li>Criar e gerir contas de utilizador</li>
                        <li>Processar reservas e pagamentos</li>
                        <li>Personalizar recomendações de destinos</li>
                        <li>Melhorar funcionalidades e segurança</li>
                        <li>Comunicar atualizações importantes</li>
                        <li>Cumprir obrigações legais</li>
                    </ul>
                    <p>Os dados obtidos através do login Google são utilizados apenas para autenticação e identificação segura do utilizador.</p>
                </>
            )
        },
        {
            id: 'partilha',
            title: '4. Partilha de Dados',
            content: (
                <>
                    <p>A GOTOUR não vende, aluga ou comercializa dados pessoais.</p>
                    <p>Poderá ocorrer partilha limitada nas seguintes situações:</p>
                    <ul>
                        <li>Parceiros de viagem (hotéis, companhias aéreas, operadores turísticos) exclusivamente para execução de reservas</li>
                        <li>Prestadores tecnológicos (cloud, processamento de pagamento, análise de dados)</li>
                        <li>Cumprimento de obrigação legal ou ordem judicial</li>
                    </ul>
                </>
            )
        },
        {
            id: 'cookies',
            title: '5. Cookies e Tecnologias Semelhantes',
            content: (
                <>
                    <p>Utilizamos cookies para:</p>
                    <ul>
                        <li>Garantir funcionamento técnico do site</li>
                        <li>Melhorar desempenho</li>
                        <li>Analisar tráfego</li>
                        <li>Personalizar experiência</li>
                    </ul>
                    <p>O utilizador pode gerir preferências através das configurações do navegador.</p>
                </>
            )
        },
        {
            id: 'seguranca',
            title: '6. Segurança da Informação',
            content: (
                <>
                    <p>A GOTOUR implementa medidas técnicas e organizacionais adequadas para proteger dados contra:</p>
                    <ul>
                        <li>Acesso não autorizado</li>
                        <li>Alteração</li>
                        <li>Perda</li>
                        <li>Divulgação indevida</li>
                    </ul>
                    <p>As transmissões sensíveis são protegidas por encriptação SSL.</p>
                </>
            )
        },
        {
            id: 'direitos',
            title: '7. Direitos do Utilizador',
            content: (
                <>
                    <p>Nos termos da legislação aplicável, o utilizador pode:</p>
                    <ul>
                        <li>Solicitar acesso aos seus dados</li>
                        <li>Corrigir informações incorretas</li>
                        <li>Solicitar eliminação</li>
                        <li>Opor-se ao tratamento</li>
                        <li>Solicitar portabilidade</li>
                    </ul>
                    <p>Pedidos podem ser feitos através do contacto oficial abaixo.</p>
                </>
            )
        },
        {
            id: 'retencao',
            title: '8. Retenção de Dados',
            content: (
                <>
                    <p>Os dados pessoais são mantidos apenas pelo período necessário para:</p>
                    <ul>
                        <li>Cumprimento contratual</li>
                        <li>Obrigações legais</li>
                        <li>Finalidades legítimas da plataforma</li>
                    </ul>
                </>
            )
        },
        {
            id: 'alteracoes',
            title: '9. Alterações à Política',
            content: (
                <>
                    <p>A GOTOUR reserva-se o direito de atualizar esta Política sempre que necessário. Alterações relevantes serão comunicadas na plataforma.</p>
                </>
            )
        },
        {
            id: 'contacto',
            title: '10. Contacto Oficial',
            content: (
                <>
                    <p>Para questões relacionadas com privacidade:</p>
                    <p>
                        <strong>Email:</strong> privacidade@gotour.com<br />
                        <strong>Suporte Geral:</strong> suporte@gotour.com
                    </p>
                </>
            )
        }
    ];

    const filteredSections = sections.filter(section => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return section.title.toLowerCase().includes(query) ||
            section.id.toLowerCase().includes(query);
    });

    return (
        <LegalPageLayout
            title="Política de Privacidade"
            lastUpdated="Março de 2026"
            onSearch={setSearchQuery}
        >
            {filteredSections.map(section => (
                <div key={section.id} className="legal-section">
                    <h2>{section.title}</h2>
                    {section.content}
                </div>
            ))}

            {filteredSections.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#6B7280' }}>
                    <p>Nenhum tópico encontrado para "{searchQuery}". Tente usar outros termos.</p>
                </div>
            )}
        </LegalPageLayout>
    );
};

export default PrivacyPolicy;
