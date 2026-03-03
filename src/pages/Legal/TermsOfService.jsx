import React, { useState } from 'react';
import LegalPageLayout from '../../components/LegalPageLayout/LegalPageLayout';

const TermsOfService = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const sections = [
        {
            id: 'aceitacao',
            title: '1. Aceitação dos Termos',
            content: (
                <>
                    <p>
                        Bem-vindo à <strong>GOTOUR</strong>. Estes Termos de Serviço ("Termos") representam um
                        contrato legalmente vinculativo entre si (o "Utilizador") e a GOTOUR Inc. Ao aceder à
                        nossa aplicação, registar uma conta ou utilizar os nossos serviços de planeamento e
                        agendamento de viagens, declara ter lido, compreendido e estar totalmente em acordo com
                        condições aqui estabelecidas.
                    </p>
                    <p>
                        Se não concordar com alguma destas disposições, solicitamos que não utilize os nossos serviços.
                    </p>
                </>
            )
        },
        {
            id: 'descricao',
            title: '2. Descrição do Serviço',
            content: (
                <>
                    <p>
                        A GOTOUR disponibiliza uma plataforma digital voltada a facilitar o planeamento de viagens.
                        Isto inclui a descoberta de destinos (utilizando inteligência artificial), organização de
                        roteiros personalizados, pesquisa de hotéis, voos, experiências locais e gestão centralizada
                        de itinerários.
                    </p>
                    <div className="legal-info-box">
                        <p>Importante: A GOTOUR atua, na maioria das vezes, como intermediária entre si e
                            fornecedores terceiros (companhias aéreas, hotéis).</p>
                    </div>
                </>
            )
        },
        {
            id: 'condicoes',
            title: '3. Condições de Uso',
            content: (
                <>
                    <p>
                        O acesso aos serviços requer o registo de uma conta com informações verdadeiras, atualizadas e completas.
                        A manutenção da confidencialidade das credenciais de acesso é da inteira responsabilidade do Utilizador.
                    </p>
                    <p>
                        O Utilizador compromete-se a:
                    </p>
                    <ul>
                        <li>Ter pelo menos 18 anos de idade completos para efetuar reservas.</li>
                        <li>Não utilizar a aplicação para fins fraudulentos, ilegais ou não autorizados.</li>
                        <li>Não submeter conteúdo ofensivo, discriminatório ou que viole direitos de terceiros nas áreas da comunidade ou avaliações.</li>
                        <li>Não partilhar as palavras-passe ou tokens OTP gerados para o acesso de terceiros.</li>
                    </ul>
                </>
            )
        },
        {
            id: 'responsabilidades',
            title: '4. Responsabilidades do Utilizador',
            content: (
                <>
                    <p>
                        Quaisquer atividades desenvolvidas na conta GOTOUR são atribuídas ao seu respetivo titular. A GOTOUR não
                        se responsabiliza por eventuais perdas financeiras ou acessos não autorizados decorrentes da negligência
                        do utilizador em proteger o seu dispositivo ou palavras-passe. É igualmente responsabilidade do
                        Utilizador garantir a validade dos documentos de identificação necessários para as viagens
                        (Passaportes, Vistos).
                    </p>
                </>
            )
        },
        {
            id: 'propriedade',
            title: '5. Propriedade Intelectual',
            content: (
                <>
                    <p>
                        Todos os elementos gráficos, designs, código-fonte, algoritmos, logótipos e interfaces contidos na
                        plataforma GOTOUR são propriedade exclusiva ou licenciada pela GOTOUR Inc., e encontram-se protegidos
                        por legislações de direitos de autor, marcas e propriedade intelectual internacional.
                    </p>
                    <p>
                        Não é permitido o uso não autorizado de data mining, robots ou métodos automatizados equivalentes para
                        recolher informações da plataforma.
                    </p>
                </>
            )
        },
        {
            id: 'pagamentos',
            title: '6. Pagamentos, Reservas e Cancelamentos',
            content: (
                <>
                    <p>
                        <strong>Pagamentos:</strong> Todas as tarifas apresentadas estão sujeitas a imposto e disponibilidade e apenas
                        são asseguradas após o processamento bem-sucedido do pagamento.
                    </p>
                    <p>
                        <strong>Políticas de Fornecedores:</strong> Uma vez que a GOTOUR age como plataforma agregadora, as
                        condições de cancelamento, reembolso e modificação das reservas estão integralmente sujeitas
                        às políticas estipuladas por cada fornecedor (A companhia aérea, hotel, etc.).
                    </p>
                    <p>
                        <strong>Taxas de Serviço GOTOUR:</strong> Reservamo-nos o direito de aplicar taxas administrativas não-reembolsáveis
                        ao intermediar a emissão de bilhetes ou resoluções logísticas complexas.
                    </p>
                </>
            )
        },
        {
            id: 'modificacoes',
            title: '7. Modificações no Serviço',
            content: (
                <>
                    <p>
                        Temos a missão de estar em constante inovação. Deste modo, a GOTOUR pode suspender, descontinuar ou
                        fazer evoluir qualquer extensão da plataforma ou parceiros integrados com ou sem aviso prévio. Não
                        seremos responsabilizados perante o Utilizador ou qualquer terceiro por essas modificações de software.
                    </p>
                </>
            )
        },
        {
            id: 'lei',
            title: '8. Lei Aplicável e Resolução de Disputas',
            content: (
                <>
                    <p>
                        Estes Termos serão regidos e interpretados em conformidade com as leis do país sede da GOTOUR (e,
                        nos limites da sua aplicabilidade, direitos europeus do consumidor). Qualquer disputa que seja emergente
                        relacionada a estes Termos será submetida de forma voluntária aos tribunais da jurisdição sede.
                    </p>
                </>
            )
        },
        {
            id: 'contato',
            title: '9. Contacto e Suporte',
            content: (
                <>
                    <p>
                        Caso necessite de suporte legal referente aos nossos Termos de Serviço ou deseje denunciar uma infração,
                        o nosso departamento jurídico e de apoio ao cliente está disponível através de:
                    </p>
                    <p>
                        <strong>Email Oficial de Suporte:</strong> legal@gotour.com<br />
                        <strong>Telefone Internacional:</strong> +351 210 000 000
                    </p>
                </>
            )
        },
    ];

    const filteredSections = sections.filter(section => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return section.title.toLowerCase().includes(query) ||
            section.id.toLowerCase().includes(query);
    });

    return (
        <LegalPageLayout
            title="Termos de Serviço"
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
                    <p>Nenhum termo encontrado para "{searchQuery}". Tente pesquisar por palavras como "Direitos", "Pagamentos" ou "Cancelamentos".</p>
                </div>
            )}
        </LegalPageLayout>
    );
};

export default TermsOfService;
