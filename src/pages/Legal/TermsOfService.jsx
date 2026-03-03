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
                    <p>Ao aceder ou utilizar a plataforma GOTOUR, o utilizador aceita integralmente os presentes Termos de Serviço.</p>
                    <p>Caso não concorde, deverá cessar a utilização imediatamente.</p>
                </>
            )
        },
        {
            id: 'descricao',
            title: '2. Descrição do Serviço',
            content: (
                <>
                    <p>A GOTOUR é uma plataforma digital que permite:</p>
                    <ul>
                        <li>Descoberta de destinos turísticos</li>
                        <li>Planeamento de viagens</li>
                        <li>Gestão de reservas</li>
                        <li>Acesso a ofertas e experiências personalizadas</li>
                    </ul>
                </>
            )
        },
        {
            id: 'registo',
            title: '3. Registo e Conta',
            content: (
                <>
                    <p>O utilizador compromete-se a:</p>
                    <ul>
                        <li>Fornecer informações verdadeiras</li>
                        <li>Manter confidencialidade da conta</li>
                        <li>Não partilhar credenciais</li>
                    </ul>
                    <p>A autenticação pode ser realizada por email ou através da conta Google.</p>
                </>
            )
        },
        {
            id: 'responsabilidade',
            title: '4. Responsabilidade do Utilizador',
            content: (
                <>
                    <p>É proibido:</p>
                    <ul>
                        <li>Utilizar a plataforma para fins ilegais</li>
                        <li>Interferir na segurança do sistema</li>
                        <li>Utilizar dados de outros utilizadores indevidamente</li>
                    </ul>
                </>
            )
        },
        {
            id: 'propriedade',
            title: '5. Propriedade Intelectual',
            content: (
                <>
                    <p>Todos os conteúdos da plataforma GOTOUR, incluindo marca, logotipo, design, textos e funcionalidades, são protegidos por legislação aplicável.</p>
                    <p>A reprodução não autorizada é proibida.</p>
                </>
            )
        },
        {
            id: 'pagamentos',
            title: '6. Pagamentos e Reservas',
            content: (
                <>
                    <p>Pagamentos processados através de parceiros externos seguem as respetivas políticas.</p>
                    <p>Cancelamentos e reembolsos dependem das condições do fornecedor da reserva.</p>
                </>
            )
        },
        {
            id: 'limitacao',
            title: '7. Limitação de Responsabilidade',
            content: (
                <>
                    <p>A GOTOUR atua como intermediária digital entre utilizadores e fornecedores turísticos.</p>
                    <p>Não se responsabiliza por falhas operacionais de parceiros externos.</p>
                </>
            )
        },
        {
            id: 'alteracoes',
            title: '8. Alterações ao Serviço',
            content: (
                <>
                    <p>A GOTOUR pode modificar funcionalidades ou suspender serviços para manutenção ou atualização.</p>
                </>
            )
        },
        {
            id: 'lei',
            title: '9. Lei Aplicável',
            content: (
                <>
                    <p>Estes Termos são regidos pela legislação aplicável no país de operação da GOTOUR.</p>
                </>
            )
        },
        {
            id: 'contacto',
            title: '10. Contacto',
            content: (
                <>
                    <p>
                        <strong>Email Oficial de Suporte:</strong> suporte@gotour.com
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
            title="Termos de Serviço"
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
                    <p>Nenhum termo encontrado para "{searchQuery}".</p>
                </div>
            )}
        </LegalPageLayout>
    );
};

export default TermsOfService;
