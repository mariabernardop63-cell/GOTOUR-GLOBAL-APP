import React, { useState } from 'react';
import LegalPageLayout from '../../components/LegalPageLayout/LegalPageLayout';

const PrivacyPolicy = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const sections = [
        {
            id: 'intro',
            title: '1. Introdução e Objetivo',
            content: (
                <>
                    <p>
                        A <strong>GOTOUR</strong> está fortemente comprometida em proteger a privacidade e os dados pessoais
                        dos nossos utilizadores. Esta Política de Privacidade explica de forma clara e transparente como
                        recolhemos, utilizamos, partilhamos e protegemos as suas informações quando utiliza a nossa plataforma,
                        aplicação móvel e serviços de planeamento de viagens.
                    </p>
                    <p>
                        Ao aceder ou utilizar os serviços da GOTOUR, concorda com as práticas descritas nesta política.
                        Recomendamos a leitura atenta de todo o documento para compreender os seus direitos.
                    </p>
                </>
            )
        },
        {
            id: 'coleta',
            title: '2. Recolha de Dados Pessoais',
            content: (
                <>
                    <p>
                        A GOTOUR recolhe informações que nos fornece diretamente e dados recolhidos automaticamente durante
                        a utilização da nossa plataforma:
                    </p>
                    <ul>
                        <li><strong>Dados de Registo:</strong> Nome, endereço de email, número de telemóvel, data de nascimento e nacionalidade.</li>
                        <li><strong>Dados de Viagem:</strong> Destinos de interesse, histórico de reservas, preferências de alojamento e datas de viagem.</li>
                        <li><strong>Dados de Pagamento:</strong> Informações de faturação e detalhes de cartão de crédito (processados de forma segura por prestadores externos).</li>
                        <li><strong>Dados de Utilização:</strong> Endereço IP, tipo de dispositivo, sistema operativo, páginas visitadas e interações com a aplicação.</li>
                    </ul>
                </>
            )
        },
        {
            id: 'uso',
            title: '3. Utilização das Informações',
            content: (
                <>
                    <p>
                        Os dados recolhidos são utilizados exclusivamente para melhorar a sua experiência e garantir
                        a prestação dos nossos serviços de excelência. Utilizamos as suas informações para:
                    </p>
                    <ul>
                        <li>Criar e gerir a sua conta na plataforma GOTOUR.</li>
                        <li>Personalizar recomendações de destinos e itinerários de viagem com base nas suas preferências.</li>
                        <li>Processar reservas, pagamentos e enviar confirmações ou atualizações de viagem importantes.</li>
                        <li>Melhorar continuamente a segurança, o design e as funcionalidades da nossa aplicação.</li>
                        <li>Enviar comunicações de marketing relevantes (apenas com o seu consentimento explícito).</li>
                    </ul>
                </>
            )
        },
        {
            id: 'compartilhamento',
            title: '4. Partilha de Dados',
            content: (
                <>
                    <p>
                        A GOTOUR valoriza a sua confiança. Não vendemos, alugamos ou comercializamos os seus dados pessoais
                        a terceiros. Contudo, podemos partilhar informações estritamente necessárias nas seguintes situações:
                    </p>
                    <ul>
                        <li><strong>Fornecedores de Serviços:</strong> Companhias aéreas, hotéis e operadores turísticos necessários para concluir a sua reserva.</li>
                        <li><strong>Prestadores de Serviços Tecnológicos:</strong> Plataformas de alojamento em cloud, processadores de pagamento e ferramentas num contexto de análise de dados.</li>
                        <li><strong>Obrigação Legal:</strong> Em resposta a intimações ou ordens judiciais, para cumprir a legislação aplicável.</li>
                    </ul>
                </>
            )
        },
        {
            id: 'cookies',
            title: '5. Cookies e Tecnologias Semelhantes',
            content: (
                <>
                    <p>
                        Utilizamos cookies e tecnologias de rastreamento semelhantes para analisar tendências, administrar
                        o site, rastrear os movimentos dos utilizadores e recolher informações demográficas sobre a nossa base
                        de utilizadores no geral. Pode controlar a utilização de cookies ao nível do seu navegador individual,
                        mas se optar por desativar os cookies, isso pode limitar a utilização de certas funcionalidades na nossa plataforma.
                    </p>
                    <div className="legal-info-box">
                        <p>Dica: Pode gerir as suas preferências de cookies a qualquer momento através das Configurações da sua Conta GOTOUR.</p>
                    </div>
                </>
            )
        },
        {
            id: 'seguranca',
            title: '6. Segurança e Proteção de Dados',
            content: (
                <>
                    <p>
                        A GOTOUR implementa rigorosas medidas de segurança técnicas, administrativas e físicas projetadas para
                        proteger as suas informações pessoais contra acesso não autorizado, destruição, perda, alteração ou
                        divulgação. Todos os dados sensíveis transmitidos (como detalhes de cartões de crédito) são
                        encriptados utilizando tecnologia <em>Secure Socket Layer</em> (SSL).
                    </p>
                </>
            )
        },
        {
            id: 'direitos',
            title: '7. Os Seus Direitos',
            content: (
                <>
                    <p>
                        De acordo com o Regulamento Geral sobre a Proteção de Dados (RGPD) e leis de privacidade aplicáveis,
                        garantimos-lhe o direito total sobre a sua informação:
                    </p>
                    <ul>
                        <li>Acesso rápido a todos os dados pessoais que mantemos sobre si.</li>
                        <li>Retificação e atualização de informações incorretas ou incompletas.</li>
                        <li>Apagamento ("Direito ao esquecimento") dos seus dados dos nossos servidores.</li>
                        <li>Restrição e oposição ao processamento dos seus dados.</li>
                        <li>Portabilidade dos dados para outros serviços num formato estruturado.</li>
                    </ul>
                </>
            )
        },
        {
            id: 'alteracoes',
            title: '8. Alterações à Política',
            content: (
                <>
                    <p>
                        A GOTOUR reserva-se o direito de modificar esta Política de Privacidade periodicamente para refletir
                        alterações nas nossas práticas ou na regulamentação legal. Notificaremos os utilizadores sobre
                        quaisquer mudanças substanciais através de um aviso destacado na aplicação ou via email antes que
                        entrem em vigor.
                    </p>
                </>
            )
        },
        {
            id: 'contato',
            title: '9. Contacto',
            content: (
                <>
                    <p>
                        Se tiver questões, preocupações ou reclamações relativamente à nossa Política de Privacidade
                        ou ao tratamento dos seus dados, entre em contacto connosco através do endereço oficial de
                        apoio e privacidade:
                    </p>
                    <p>
                        <strong>Email:</strong> privacidade@gotour.com<br />
                        <strong>Morada Sede:</strong> Av. da Liberdade, 110, Lisboa, Portugal<br />
                        <strong>Encarregado de Proteção de Dados (DPO):</strong> dpo@gotour.com
                    </p>
                </>
            )
        },
    ];

    const filteredSections = sections.filter(section => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return section.title.toLowerCase().includes(query) ||
            section.id.toLowerCase().includes(query); // We search IDs just to catch keywords like "cookies"
    });

    return (
        <LegalPageLayout
            title="Política de Privacidade"
            lastUpdated="20 de Janeiro, 2026"
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
