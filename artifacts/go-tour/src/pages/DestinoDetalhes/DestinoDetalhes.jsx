import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Share, Heart, ChevronRight, ChevronLeft, ChevronDown, Circle, Wifi, Tv, Wind, CarFront, ConciergeBell, CigaretteOff, Building, Sparkles, CheckCircle2, Key, MessageSquare, Map, Tag, Gift, ThumbsUp, Coffee, Umbrella, Shell, Waves, Sun, Anchor, Palmtree, Snowflake, Sofa, MonitorPlay, Navigation, Mic, Ticket, Wine, Headphones, CreditCard, Languages, ShieldCheck, ShoppingBag, Clock, Users, Music, Bath, Globe } from 'lucide-react';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import DrawerMenu from '../../components/DrawerMenu/DrawerMenu';
import FooterSection from '../Welcome/FooterSection/FooterSection';
import '../../components/HomeHeader/HomeFixedHeaderStyles.css';
import './DestinoDetalhes.css';
import mapPlaceholder from '../../assets/map_placeholder_4k.png';

import { MOCK_RECOMMENDED, MOCK_HOTELS, MOCK_RESTAURANTS } from '../../components/HomeSections/PlacesSections';
import { MOCK_APARTMENTS, MOCK_RESORTS, MOCK_GUESTHOUSES } from '../../components/HomeSections/LodgingSections';
import { 
    MOCK_EXPERIENCES, MOCK_ACTIVITIES, MOCK_EVENTS, MOCK_CULTURE, 
    MOCK_BEACHES, MOCK_NIGHTLIFE, MOCK_TRANSPORT, MOCK_CARRENTAL, 
    MOCK_FLIGHTS, MOCK_SHOPPING, UniversalCard, SectionWrapper 
} from '../../components/HomeSections/NewCategoriesSections';
import { useNavigation } from '../../context/NavigationContext';

const DestinoDetalhes = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { navigateBack } = useNavigation();
    const { state } = location;
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [activeFaq, setActiveFaq] = useState(null);

    useEffect(() => {
        // Scroll the overlay container (if rendered as overlay) or the window
        const overlay = document.querySelector('.details-overlay');
        if (overlay) {
            overlay.scrollTop = 0;
        } else {
            window.scrollTo(0, 0);
        }
    }, []);

    // Fallback if accessed directly without state
    const destination = state || {
        name: 'Destino Desconhecido',
        location: 'Moçambique',
        distance: 'Localização Desconhecida',
        rating: '4.69',
        price: '3.403',
        badge: 'Indisponível',
        category: 'Resort',
        image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=600&auto=format&fit=crop'
    };

    const mainCategory = destination.category || destination.type || destination.experience || 'Resort';
    const priceRaw = destination.price || destination.priceRange || destination.cost || '3.403';
    const sectionCat = destination.sectionCategory || 'Alojamentos';
    
    // Strict derived category inference
    let derivedCategory = sectionCat;
    if (destination.id) {
        if (destination.id.startsWith('rs')) derivedCategory = 'Resort';
        else if (destination.id.startsWith('ap')) derivedCategory = 'Apartamento';
        else if (destination.id.startsWith('gh')) derivedCategory = 'Guest House';
        else if (destination.id.startsWith('vl')) derivedCategory = 'Villa / Casa';
        else if (destination.id.startsWith('ld')) derivedCategory = 'Lodge';
        else if (destination.id.startsWith('ht') || destination.id.startsWith('h')) derivedCategory = 'Hotel';
        else if (destination.id.startsWith('ho')) derivedCategory = 'Hostel';
        else if (destination.id.startsWith('tr')) derivedCategory = 'Transporte';
        else if (destination.id.startsWith('cr') || destination.sectionCategory === 'Aluguer de Carros') derivedCategory = 'Aluguer de Carros';
        else if (destination.id.startsWith('fl') || destination.sectionCategory === 'Voos') derivedCategory = 'Voo';
        else if (destination.id.startsWith('sh') || destination.sectionCategory === 'Compras') derivedCategory = 'Compras';
        else if (destination.id.startsWith('nl') || destination.sectionCategory === 'Vida Noturna') derivedCategory = 'Vida Noturna';
        else if (destination.id.startsWith('bch') || destination.sectionCategory === 'Praias') derivedCategory = 'Praia / Ilha';
        else if (destination.id.startsWith('cul') || destination.sectionCategory === 'Cultura') derivedCategory = 'Cultura / Património';
        else if (destination.id.startsWith('evt') || destination.sectionCategory === 'Eventos') derivedCategory = 'Evento';
        else if (destination.id.startsWith('exp') || destination.sectionCategory === 'Experiências') derivedCategory = 'Experiência';
        else if (destination.id.startsWith('act') || destination.sectionCategory === 'Atividades') derivedCategory = 'Atividade';
        else if (destination.id.startsWith('rest') || destination.sectionCategory === 'Restaurantes') derivedCategory = 'Restaurante';
    }
    
    // Determine the array of matching similar items
    let relatedMocks = MOCK_RECOMMENDED;
    if (derivedCategory === 'Resort') relatedMocks = MOCK_RESORTS;
    else if (derivedCategory === 'Apartamento') relatedMocks = MOCK_APARTMENTS;
    else if (derivedCategory === 'Guest House') relatedMocks = MOCK_GUESTHOUSES;
    else if (derivedCategory === 'Hotel') relatedMocks = MOCK_HOTELS;
    else if (derivedCategory === 'Restaurante') relatedMocks = MOCK_RESTAURANTS;
    else if (derivedCategory === 'Experiência') relatedMocks = MOCK_EXPERIENCES;
    else if (derivedCategory === 'Atividade') relatedMocks = MOCK_ACTIVITIES;
    else if (derivedCategory === 'Evento') relatedMocks = MOCK_EVENTS;
    else if (derivedCategory === 'Cultura / Património') relatedMocks = MOCK_CULTURE;
    else if (derivedCategory === 'Praia / Ilha') relatedMocks = MOCK_BEACHES;
    else if (derivedCategory === 'Vida Noturna') relatedMocks = MOCK_NIGHTLIFE;
    else if (derivedCategory === 'Transporte') relatedMocks = MOCK_TRANSPORT;
    else if (derivedCategory === 'Aluguer de Carros') relatedMocks = MOCK_CARRENTAL;
    else if (derivedCategory === 'Voo') relatedMocks = MOCK_FLIGHTS;
    else if (derivedCategory === 'Compras') relatedMocks = MOCK_SHOPPING;

    // Filter out the current item itself from recommendations
    relatedMocks = relatedMocks.filter(m => m.id !== destination.id);

    // State Flags & Configuration
    const isBeach = derivedCategory === 'Praia / Ilha';
    const isAvailable = destination.badge !== 'Esgotado' && destination.status !== 'Indisponível';
    
    let ctaText = 'Reserve agora';
    let displayPrice = priceRaw.toString().includes('MT') ? priceRaw : `MT ${priceRaw}`;
    let priceSubText = 'Preço base (sujeito a alterações)';
    let availLabel = isAvailable ? 'Disponível' : 'Indisponíveis';
    let availColor = isAvailable ? '#10b981' : '#f43f5e';
    let availDate = '';
    let amenitiesTitle = 'Principais comodidades';
    let amenitiesList = [];
    let faqTitle = 'Perguntas Frequentes (Alojamento)';
    let faqList = [
        { q: "Quais as políticas de Cancelamento associadas ao Airbnb/Reserva?", a: "Pode cancelar gratuitamente até 48 horas após a reserva (se feita com antecedência). Para mais proteção recomendamos consultar a tarifa Flexível." },
        { q: "Qual o horário padrão de check-in e check-out?", a: "Normalmente o check-in ocorre a partir das 14h00 e o check-out até às 11h00. O anfitrião pode autorizar flutuações e late check-outs a pedido." },
        { q: "Há custos de limpeza (cleaning fee) associados à estadia?", a: "As taxas de limpeza estão calculadas de raiz na simulação da reserva caso existam, como dita a nova norma de transparência de plataformas como Airbnb ou Booking." },
        { q: "Posso levar animais de estimação (Pet-friendly)?", a: "Dependerá muito das descrições do Host. Recomendamos vivamente certificar-se na zona de 'Regras da Casa' para evitar coimas associadas a alergias." }
    ];

    // Parse category logic
    if (isBeach) {
        ctaText = 'Visitar';
        displayPrice = priceRaw === 'Grátis' ? 'Entrada Grátis' : `Entrada: ${priceRaw}`;
        priceSubText = 'Acesso ao local';
        amenitiesTitle = 'Infraestrutura disponível';
        amenitiesList = [
            { icon: Shell, text: 'Banheiros' },
            { icon: CarFront, text: 'Estacionamento' },
            { icon: Coffee, text: 'Restaurantes ou Quiosques' },
            { icon: Umbrella, text: 'Guarda-sóis' }
        ];
        faqTitle = 'Perguntas Frequentes (Turismo & Segurança)';
        faqList = [
            { q: "Qual a melhor época e altura para visitar o local?", a: "Aconselhamos meses secos. O portal do Clima Mundial dá um índice UV preciso. Nunca descure a proteção aos elementos nas épocas críticas do verão e da chuva tropical." },
            { q: "Esta localização detém de nadadores-salvadores vitais?", a: "As áreas populares e turísticas são maioritariamente cobertas pelos resgates marítimos e nadadores profissionais, contudo evite afastar-se derivado às rip tides silenciosas ou agitações imprevisíveis no alto mar." },
            { q: "Existem taxas aduaneiras ou impostos municipais?", a: "Raramente é abordada tarifa sobre o espaço por estar inerente à exploração de território natural. Determinadas reservas de corais podem reter uma pequena eco-taxa ao turismo solidário associada à conservação marinha." }
        ];
    } else if (sectionCat === 'Aluguer de Veículos') {
        ctaText = 'Alugar';
        amenitiesList = [
            { icon: Snowflake, text: 'Ar condicionado' },
            { icon: Sofa, text: 'Bancos em couro' },
            { icon: MonitorPlay, text: 'Tela multimídia' },
            { icon: Navigation, text: 'GPS integrado' }
        ];
        faqTitle = 'FAQ Aluguer (via RentalCars/Hertz)';
        faqList = [
            { q: "Afinal preciso de possuir uma carteira internacional?", a: "Como estrangeiro sim, frequentemente há exigência d'uma Permissão Internacional de Conduzir ao lado do titulo principal bem como Passaporte, nos balcões governamentais para as Rent-a-car operarem em leito seguro." },
            { q: "Sobre as proteções e riscos CDW, no que consistem as apólices?", a: "Por base providenciou-se as isenções sobre a responsabilidade civil primária. Contudo a franquia da viatura recomenda que efetive a protecções máximas Premium Cover nos balcões ou online de forma que pague a taxa Zero nos incidentes com painéis." },
            { q: "Sou alvo de multas caso passe da quilometragem da operadora?", a: "Regra geral a viatura engloba política de 'Quilómetros ilimitados'. Em casos de Exóticos ou Promoções Curto Prazo vigoram restrições que aplicam pêsamos financeiros por excedente contados pelo GPS." }
        ];
    } else if (sectionCat === 'Eventos') {
        availDate = isAvailable ? ' / 2026/07/29' : '';
        if (isAvailable) {
            priceSubText = 'Bilhetes ainda disponíveis';
        } else {
            priceSubText = 'Bilhetes indisponíveis';
        }
        amenitiesList = [
            { icon: Sofa, text: 'Lugar sentado ou pé' },
            { icon: Ticket, text: 'Backstage' },
            { icon: Wine, text: 'Open bar' },
            { icon: Mic, text: 'DJ ao vivo' },
            { icon: Coffee, text: 'Bebidas incluídas' }
        ];
        faqTitle = 'Perguntas Frequentes (via Tiqets / Tickadoo)';
        faqList = [
            { q: "O bilhete tem mesmo que estar digitalizado em formato impresso?", a: "Na nova era de Tiqets / Tickadoo só necessitará de possuir o ficheiro móvel legível. Cancele as impressões, basta iluminar devidamente a sua tela do smartphone nos leitores QR do Gate Entry do Evento." },
            { q: "Tenho proteção de reembolsos via promotoras na troca de ideias?", a: "Infelizmente no circuito Eventual as devoluções dependem d'um adiamento grave à margem da própria Organização central. O cancelamento espontâneo não induz a nenhum repasse integral para si nem créditos virtuais." },
            { q: "Quanto tempo antes das luzes eu devo figurar nas portas?", a: "Conforme indiciado pelas equipas de Ticketing, um avanço pragmático é apontar para a janela de 45 e 90 minutos iniciais a fim de passar os procedimentos de despistagem manual e controlo legal para a arena." }
        ];
    } else if (sectionCat === 'Restaurantes') {
        ctaText = 'Visitar';
        const cleanVal = priceRaw.toString().replace(/MT\$?\s?/ig, '').trim();
        displayPrice = `A partir de MT$ ${cleanVal}`;
        amenitiesList = [
            { icon: CarFront, text: 'Estacionamento' },
            { icon: Users, text: 'Ambiente familiar' },
            { icon: Heart, text: 'Ambiente romântico' },
            { icon: Music, text: 'Música ao vivo' },
            { icon: Wifi, text: 'Wi-Fi gratuito' },
            { icon: CreditCard, text: 'Pagamento por cartão' }
        ];
        faqTitle = 'Frequentes do Local (via Google Maps & TheFork)';
        faqList = [
            { q: "A minha presença é sujeita a uma Reserva Oficial?", a: "Na plataforma The Fork nota-se que em dias úteis os walk-in são fluídos. Mas no entanto os picos aos fins de semana pedem marcações estritas em avanço dada a sobrelotação constante assinalada pelos Insights da Google." },
            { q: "Este estabelecimento comporta diretrizes de culinária à base de plantas?", a: "Pelas avaliações sim, existe um empenho a compilar cartas dietéticas flexíveis dedicadas à comunidade com estilos orgânicos (Vegans / Glúten-Free), mantendo o zero de crueldade em áreas separadas da cozinha." },
            { q: "Existe exigência de traje, códigos como dress-code casual formal?", a: "Alguns dos Spots conceituados proíbem informalidades como sandálias, camisolas cavas ou vestuário da areia (beachwear). Prevalece a postura do Smart-Casual perante a estética do restaurante prestigiado no cômputo metropolitano." }
        ];
    } else if (sectionCat === 'Culturas' || sectionCat === 'Cultura e Património') {
        ctaText = 'Visitar';
        amenitiesList = [
            { icon: Map, text: 'Acesso guiado' },
            { icon: Bath, text: 'Banheiros disponíveis' },
            { icon: CarFront, text: 'Estacionamento' },
            { icon: Headphones, text: 'Autoguia disponível' },
            { icon: Languages, text: 'Informações multilíngues' }
        ];
        faqTitle = 'Perguntas Históricas (via Tiqets & Heritage)';
        faqList = [
            { q: "A imersão ao complexo é baseada em Guias de aúdio automatizadas?", a: "Os dados oficiais ditam que terá à disposição alambiques multimédia como AudioGuides e mapas visuais nas zonas frontais (lobby), caso o visitante persiga o formato Self-Guided à sua vontade num sem par de línguas traduzíveis." },
            { q: "Pode-se almejar a capturar o momento (Filmagens profissionais e flash)?", a: "Zonas cruciais do Património renegam ativamente a claridade de um Flash, pois este degrada arquivos de extrema ancestralidade. Gravações sem intuito de exploração retalhista por norma requer liberação das portarias." },
            { q: "Visitantes dependentes de recursos motrizes dispõem dum circuito livre?", a: "As políticas em sintonia à legislação para mobilidade civil asseguram provisões estruturais a utentes de cadeiras com patamares nivelados e zonas de asseio espaçosas, validado pela comissão municipal universal." }
        ];
    } else if (sectionCat === 'Vida Noturna') {
        ctaText = 'Visitar';
        const cleanVal = priceRaw.toString().replace(/MT\$?\s?/ig, '').trim();
        displayPrice = `A partir de MT$ ${cleanVal}`;
        amenitiesList = [
            { icon: Mic, text: 'DJ ao vivo' },
            { icon: Sparkles, text: 'Performances especiais' },
            { icon: Wine, text: 'Bar completo' },
            { icon: ShieldCheck, text: 'Segurança no local' }
        ];
        faqTitle = 'FAQ da Noite (Políticas e Requisitos)';
        faqList = [
            { q: "Como o Dress Code impera nos trâmites da porta (Door Policy)?", a: "Fóruns noturnos insistem no rigor cosmopolita. Calçado desportivo, bonés com abas e afins reduzem drasticamente as chances face aos Door Managers. Venha arrumado com uma camisa inteligente e evite frustrações para a sua noite de glória." },
            { q: "Zonas seccionadas ao Luxo e Garrafas (VIP Lounges Pessoais)?", a: "Secções camarote têm aluguer indexado e pedem consumo mínimo pré-estipulado (Minimum Spends). Recomendável ligar de antecipação aos RP's ou Relações Públicas do Clube a segurar a cabine noturna do seu agrado sem stress." },
            { q: "Existe restrição de barreiras geracionais rígida para a diversão?", a: "Plataformas apontam peremptoriamente para as idades cimeiras (normalidade assente nos +18/21 dependo das jurisdições alcoólicas) suportadas à vista do ID Card pessoal impostergável. Não transija sem levar os documentos para a valsa." }
        ];
    } else if (sectionCat === 'Compras & Serviços') {
        ctaText = 'Visitar';
        const cleanVal = priceRaw.toString().replace(/MT\$?\s?/ig, '').trim();
        displayPrice = `A partir de MT$ ${cleanVal}`;
        amenitiesList = [
            { icon: ShoppingBag, text: 'Roupas femininas' },
            { icon: ShoppingBag, text: 'Roupas masculinas' },
            { icon: ShoppingBag, text: 'Roupas infantis' },
            { icon: Clock, text: 'Aberto 24h' }
        ];
        faqTitle = 'Serviços & Políticas Locais';
        faqList = [
            { q: "Atividades de reembolso em escala VAT de país (Tax-Free)?", a: "A lojas de cariz High-End acoplam a emissão dos impressos aduaneiros (Tax Free / Global Blue) isentando as tributações nacionais no término do itinerário aquando dos serviços no Aeroporto oficial do país emissor." },
            { q: "Regimen de devolução comercial para itens sensíveis e etiquetas?", a: "Decreta os Direitos dos Mercadores prazos comensuráveis de 14 a contínuos 30 dias na íntegra apresentação da fatura-recibo legível. Contenção dos selos plásticos sem máculas faz o processo decorrer magicamente e sem litígios nos balcões de apoio." },
            { q: "Zonas protegidas para aparcamento das frotas dos consumidores?", a: "Ao aceder às zonas amplas do Centro verá sinalético tarifadas hora à hora em leito subterrâneo resguardado. Os analistas das áreas pedem contenção com exposições notórias de bagagens de luxo à janela do seu cockpit particular." }
        ];
    } else {
        // Defaults -> Alojamentos
        amenitiesList = [
            { icon: CarFront, text: 'Transfer (aeroporto)' },
            { icon: Wifi, text: 'Acesso Wi-Fi gratuito' },
            { icon: CigaretteOff, text: 'Quartos não fumadores' },
            { icon: ConciergeBell, text: 'Serviço de quartos' },
            { icon: CarFront, text: 'Estacionamento gratuito' }
        ];
    }

    // Gallery Logic
    const [activeImg, setActiveImg] = useState(0);
    const galleryImages = [
        destination.image,
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=600&auto=format&fit=crop'
    ];

    const destName = destination.name || destination.title || destination.company || 'Este Espaço';
    const displayCategory = derivedCategory !== 'Alojamentos' && derivedCategory !== 'Resultados' ? derivedCategory : mainCategory;

    return (
        <div className="dd-container">
            <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            <div className="home-fixed-header">
                <HomeHeader
                    onMenuClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    isDrawerOpen={isDrawerOpen}
                />
            </div>

            <div className="dd-content-wrapper home-scroll-content">
                
                {/* Top Nav Row */}
                <div className="dd-top-bar">
                    <button className="dd-back-btn" onClick={() => navigateBack()}>
                        <ArrowLeft size={18} strokeWidth={2.5}/>
                        Voltar
                    </button>
                    
                    <div className="dd-top-actions">
                        <button className="dd-action-btn">
                            <Share size={18} />
                            Partilhar
                        </button>
                        <button className="dd-action-btn">
                            <Heart size={18} />
                            Guardar
                        </button>
                    </div>
                </div>

                {/* ROW 1: IMAGES (L) vs META & PRICE (R) */}
                <div className="dd-hero-layout">
                    {/* LEFT COLUMN 1 */}
                    <div className="dd-left-column">
                        <div className="dd-main-image-wrap">
                            <img src={galleryImages[activeImg]} alt={destName} />
                        </div>
                        
                        <div className="dd-gallery-grid">
                            {galleryImages.map((img, index) => (
                                <div 
                                    className={`dd-gallery-thumb ${activeImg === index ? 'active' : ''}`}
                                    key={index}
                                    onClick={() => setActiveImg(index)}
                                >
                                    <img src={img} alt={`Gallery ${index}`} />
                                    {index === 2 && (
                                        <div className="dd-gallery-overlay">
                                            <span>+21 Imagens</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN 1 */}
                    <div className="dd-right-sticky-column">
                        <h1 className="dd-title-poppins">{destName}</h1>
                        
                        <div className="dd-location-avail-row">
                            <div className="dd-avail-pill">
                                <Circle size={10} fill={availColor} color={availColor} />
                                <span>{availLabel}{availDate}</span>
                            </div>

                            <span className="dd-dot-divider">•</span>
                            <span className="dd-category-text">{displayCategory}</span>
                            <span className="dd-dot-divider">•</span>

                            <div className="dd-country-flag">
                                <img src="https://flagcdn.com/w40/mz.png" alt="Moçambique" className="dd-flag-img" />
                                <span>Moçambique</span>
                            </div>

                            <span className="dd-dot-divider">•</span>

                            <div className="dd-gps-loc">
                                <MapPin size={16} color="#64748b" />
                                <span>{destination.location || destination.route || 'Maputo'}</span>
                            </div>
                        </div>

                        <div className="dd-rating-row">
                            <div className="dd-stars-group">
                                <Star size={16} fill="#0f172a" stroke="none" />
                                <Star size={16} fill="#0f172a" stroke="none" />
                                <Star size={16} fill="#0f172a" stroke="none" />
                                <Star size={16} fill="#0f172a" stroke="none" />
                                <Star size={16} color="#0f172a" strokeWidth={1.5} />
                            </div>
                            <div className="dd-reviews-text">
                                <span className="dd-rating-number">{destination.rating || '4,69'}</span>
                                <span className="dd-dot-divider">·</span>
                                <span className="dd-reviews-link">103 avaliações</span>
                            </div>
                        </div>

                        {/* CTA Reserve Block */}
                        <div className="dd-booking-card">
                            <div className="dd-booking-price-col">
                                <span className="dd-price-strong">{displayPrice}</span>
                                <span className="dd-price-label">{priceSubText}</span>
                            </div>
                            
                            <button className="dd-button-primary">
                                {ctaText}
                                <ChevronRight size={18} strokeWidth={3} />
                            </button>
                        </div>
                        
                        <div className="dd-section-divider"></div>

                        <h2 className="dd-section-title">{amenitiesTitle}</h2>
                        
                        <div className="dd-amenities-list">
                            {amenitiesList.map((amenity, idx) => {
                                const IconComponent = amenity.icon;
                                return (
                                    <div className="dd-amenity-row" key={idx}>
                                        <div className="dd-amenity-icon">
                                            <IconComponent size={24} strokeWidth={1.5} color="#1e293b" />
                                        </div>
                                        <span className="dd-amenity-text">{amenity.text}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="dd-nav-arrows" style={{marginTop: '24px'}}>
                            <button className="dd-nav-arrow-btn"><ChevronLeft size={22} /></button>
                            <span className="dd-nav-arrow-label">Próximo</span>
                            <button className="dd-nav-arrow-btn"><ChevronRight size={22} /></button>
                        </div>
                    </div>
                </div>

                <div className="dd-section-divider"></div>

                {/* ROW 2: SOBRE (L) vs MAPA (R) */}
                <div className="dd-hero-layout" style={{marginTop: '32px'}}>
                    <div className="dd-left-column">
                        <div className="dd-sobre-section" style={{marginTop: 0}}>
                            <h2 className="dd-sobre-title">Sobre {destName}</h2>
                            
                            <div className="dd-yellow-rating-row">
                                <div className="dd-stars-yellow">
                                    <Star size={18} fill="#facc15" color="#facc15" />
                                    <Star size={18} fill="#facc15" color="#facc15" />
                                    <Star size={18} fill="#facc15" color="#facc15" />
                                    <Star size={18} fill="#facc15" color="#facc15" />
                                    <Star size={18} fill="#facc15" color="#facc15" />
                                </div>
                                <div className="dd-yellow-rating-text">
                                    <span style={{fontWeight: 600}}>Pontuação: 4,69 de 5 estrelas.</span> 4,69 <span className="dd-dot-divider">·</span> <span className="dd-reviews-link">103 avaliações</span>
                                </div>
                            </div>

                            <div className="dd-sobre-text">
                                Situado numa localização privilegiada, este requintado {mainCategory.toLowerCase()} oferece a combinação perfeita entre o design de classe mundial e a tradicional hospitalidade. Criado para proporcionar memórias inesquecíveis, o espaço foi recentemente renovado para satisfazer os padrões internacionais mais rigorosos. Desfrute das paisagens exóticas e de um serviço de excelência, ideal tanto para momentos de lazer como para escapadinhas românticas.
                            </div>
                        </div>
                    </div>

                    <div className="dd-right-sticky-column">
                        <div className="dd-right-map-block" style={{marginBottom: 0}}>
                            <img 
                                src={mapPlaceholder} 
                                alt="Localização no mapa" 
                                className="dd-right-map-img"
                            />
                            <div className="dd-map-btn-container">
                                <button className="dd-btn-view-map-large">
                                    Mostrar no mapa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dd-section-divider"></div>

                {/* ROW 3: FAQ (L) vs PONTOS FORTES (R) */}
                <div className="dd-hero-layout" style={{marginTop: '32px'}}>
                    <div className="dd-left-column">
                        {/* PERGUNTAS FREQUENTES */}
                        <div className="dd-sobre-section" style={{marginTop: 0}}>
                            <h3 className="dd-section-title">{faqTitle}</h3>
                            
                            <div className="dd-faq-list">
                                {faqList.map((item, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`dd-faq-item ${activeFaq === idx ? 'dd-faq-active' : ''}`}
                                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                    >
                                        <div className="dd-faq-question">
                                            <span>{item.q}</span>
                                            <ChevronDown className="dd-faq-chevron" size={20} />
                                        </div>
                                        {activeFaq === idx && (
                                            <div className="dd-faq-answer">
                                                <p>{item.a}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="dd-right-sticky-column">
                        <div className="dd-vip-card" style={{marginBottom: 0}}>
                            <div className="dd-vip-badge-ribbon">
                                <Sparkles size={16} color="#0f172a" />
                                <span>{isBeach ? 'Ideal para um dia inesquecível' : 'Perfeito para estadia de 1 noite'}</span>
                            </div>
                            
                            <h3 className="dd-vip-title">{isBeach ? 'Destaques do local' : 'Destaques do alojamento'}</h3>

                            <div className="dd-vip-features-list">
                                {isBeach ? (
                                    <>
                                        <div className="dd-vip-feature-item">
                                            <div className="dd-vip-icon-wrapper">
                                                <Waves size={20} color="#0f172a" strokeWidth={1.5} />
                                            </div>
                                            <div className="dd-vip-text-wrapper">
                                                <span className="dd-vip-f-title">Águas Cristalinas</span>
                                                <span className="dd-vip-f-desc">Mar calmo e límpido, ideal para mergulho</span>
                                            </div>
                                        </div>
                                        
                                        <div className="dd-vip-feature-item">
                                            <div className="dd-vip-icon-wrapper">
                                                <Sun size={20} color="#0f172a" strokeWidth={1.5} />
                                            </div>
                                            <div className="dd-vip-text-wrapper">
                                                <span className="dd-vip-f-title">Clima Tropical</span>
                                                <span className="dd-vip-f-desc">Temperaturas agradáveis durante todo o ano</span>
                                            </div>
                                        </div>

                                        <div className="dd-vip-feature-item">
                                            <div className="dd-vip-icon-wrapper">
                                                <Anchor size={20} color="#0f172a" strokeWidth={1.5} />
                                            </div>
                                            <div className="dd-vip-text-wrapper">
                                                <span className="dd-vip-f-title">Desportos Aquáticos</span>
                                                <span className="dd-vip-f-desc">Snorkeling, kayak e passeios de barco</span>
                                            </div>
                                        </div>

                                        <div className="dd-vip-feature-item">
                                            <div className="dd-vip-icon-wrapper">
                                                <Palmtree size={20} color="#0f172a" strokeWidth={1.5} />
                                            </div>
                                            <div className="dd-vip-text-wrapper">
                                                <span className="dd-vip-f-title">Paisagem Paradisíaca</span>
                                                <span className="dd-vip-f-desc">Coqueiros, areia branca e pôr do sol único</span>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="dd-vip-feature-item">
                                            <div className="dd-vip-icon-wrapper">
                                                <MapPin size={20} color="#0f172a" strokeWidth={1.5} />
                                            </div>
                                            <div className="dd-vip-text-wrapper">
                                                <span className="dd-vip-f-title">Excelente Localização</span>
                                                <span className="dd-vip-f-desc">Pontuação excecional de 9,0 por hóspedes</span>
                                            </div>
                                        </div>
                                        
                                        <div className="dd-vip-feature-item">
                                            <div className="dd-vip-icon-wrapper">
                                                <Coffee size={20} color="#0f172a" strokeWidth={1.5} />
                                            </div>
                                            <div className="dd-vip-text-wrapper">
                                                <span className="dd-vip-f-title">Pequeno-almoço</span>
                                                <span className="dd-vip-f-desc">Opções Halal servidas diariamente</span>
                                            </div>
                                        </div>

                                        <div className="dd-vip-feature-item">
                                            <div className="dd-vip-icon-wrapper">
                                                <Building size={20} color="#0f172a" strokeWidth={1.5} />
                                            </div>
                                            <div className="dd-vip-text-wrapper">
                                                <span className="dd-vip-f-title">Vista Cidade</span>
                                                <span className="dd-vip-f-desc">Vista deslumbrante em todos quartos</span>
                                            </div>
                                        </div>

                                        <div className="dd-vip-feature-item">
                                            <div className="dd-vip-icon-wrapper">
                                                <CarFront size={20} color="#0f172a" strokeWidth={1.5} />
                                            </div>
                                            <div className="dd-vip-text-wrapper">
                                                <span className="dd-vip-f-title">Parque Gratuito</span>
                                                <span className="dd-vip-f-desc">Vaga exclusiva incluída na reserva</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <button className="dd-vip-btn-reserve">
                                {ctaText}
                                <ChevronRight size={18} strokeWidth={3} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows — FAQ */}
                <div className="dd-nav-arrows">
                    <button className="dd-nav-arrow-btn"><ChevronLeft size={22} /></button>
                    <span className="dd-nav-arrow-label">Próximo</span>
                    <button className="dd-nav-arrow-btn"><ChevronRight size={22} /></button>
                </div>

                <div className="dd-section-divider"></div>

                {/* ROW 3.5: EXPLORE LUGARES (SIMILAR ITEMS) */}
                <section className="hs-section" style={{marginBottom: 0, marginTop: '32px'}}>
                    <div className="hs-header">
                        <div className="hs-titles">
                            <h2 className="hs-title" style={{fontSize: '22px'}}>
                                {!['Transporte', 'Aluguer de Carros', 'Voo', 'Compras'].includes(derivedCategory) 
                                    ? 'Explore lugares parecidos' 
                                    : 'Também pode gostar'}
                            </h2>
                        </div>
                        <div className="hs-carousel-arrows">
                            <button className="hs-c-btn"><ChevronLeft size={20}/></button>
                            <button className="hs-c-btn"><ChevronRight size={20}/></button>
                        </div>
                    </div>
                    <div className="hs-scroll-container">
                        {relatedMocks.map(item => (
                            <UniversalCard 
                                key={item.id} 
                                item={{...item, sectionCategory: derivedCategory}} 
                                onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                    setTimeout(() => navigate('/destino-detalhes', { state: { ...item }, replace: true }), 150);
                                }} 
                            />
                        ))}
                    </div>
                </section>

                {/* Secção Divisora Global */}
                <div className="dd-section-divider"></div>

                {/* ROW 4: REVIEWS SECTION */}
                <div className="dd-reviews-section">
                    <h2 className="dd-reviews-main-title">Avaliações gerais</h2>
                    
                    {/* Painel Tático Luxuoso GoTour: Hero + Barras de Progresso */}
                    <div className="dd-reviews-header-block">
                        {/* Esquerda: O Troféu (Hero Score) */}
                        <div className="dd-hero-score-col">
                            <div className="dd-hero-medal">
                                <span className="dd-hero-score-number">4,9</span>
                            </div>
                            <div className="dd-hero-score-title">Excecional</div>
                            <div className="dd-hero-stars-row">
                                <Star size={18} fill="#0f172a" color="#0f172a" />
                                <Star size={18} fill="#0f172a" color="#0f172a" />
                                <Star size={18} fill="#0f172a" color="#0f172a" />
                                <Star size={18} fill="#0f172a" color="#0f172a" />
                                <Star size={18} fill="#0f172a" color="#0f172a" />
                            </div>
                            <div className="dd-hero-score-subtitle">Baseado em 103 avaliações</div>
                        </div>

                        {/* Direita: Barras Analíticas Verticais (Grid/List) */}
                        <div className="dd-progress-bars-col">
                            <div className="dd-progress-rule">
                                <span className="dd-prule-label">Limpeza</span>
                                <div className="dd-prule-track"><div className="dd-prule-fill" style={{width: '98%'}}></div></div>
                                <span className="dd-prule-score">5,0</span>
                            </div>
                            <div className="dd-progress-rule">
                                <span className="dd-prule-label">Exatidão do anúncio</span>
                                <div className="dd-prule-track"><div className="dd-prule-fill" style={{width: '95%'}}></div></div>
                                <span className="dd-prule-score">4,9</span>
                            </div>
                            <div className="dd-progress-rule">
                                <span className="dd-prule-label">Check-in</span>
                                <div className="dd-prule-track"><div className="dd-prule-fill" style={{width: '96%'}}></div></div>
                                <span className="dd-prule-score">4,9</span>
                            </div>
                            <div className="dd-progress-rule">
                                <span className="dd-prule-label">Comunicação</span>
                                <div className="dd-prule-track"><div className="dd-prule-fill" style={{width: '100%'}}></div></div>
                                <span className="dd-prule-score">5,0</span>
                            </div>
                            <div className="dd-progress-rule">
                                <span className="dd-prule-label">Localização</span>
                                <div className="dd-prule-track"><div className="dd-prule-fill" style={{width: '95%'}}></div></div>
                                <span className="dd-prule-score">4,9</span>
                            </div>
                            <div className="dd-progress-rule">
                                <span className="dd-prule-label">Custo-benefício</span>
                                <div className="dd-prule-track"><div className="dd-prule-fill" style={{width: '97%'}}></div></div>
                                <span className="dd-prule-score">5,0</span>
                            </div>
                        </div>
                    </div>

                    {/* Secção Divisora Interna das Reviews */}
                    <div className="dd-section-divider"></div>

                    {/* Grelha Dinâmica de Comentários */}
                    <div className="dd-reviews-grid">
                        
                        {/* Review 1 */}
                        <div className="dd-review-card">
                            <div className="dd-review-header">
                                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=64&h=64" alt="Johanne Oleah" className="dd-review-avatar" />
                                <div className="dd-review-author-info">
                                    <h4 className="dd-review-author-name">Johanne Oleah</h4>
                                    <span className="dd-review-author-meta">6 meses na GoTour</span>
                                </div>
                            </div>
                            <div className="dd-review-meta-row">
                                <div className="dd-review-stars">
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                </div>
                                <span className="dd-dot-divider">·</span>
                                <span className="dd-review-date-stay">dezembro de 2025 · Ficou algumas noites</span>
                            </div>
                            <p className="dd-review-text">
                                Este é um lar aconchegante longe de casa. Gostei da minha estadia no apartamento, e tinha tudo o que eu precisava como viajante solo. Lugar muito confortável e agradável. Há ...
                            </p>
                            <button className="dd-review-show-more">Mostrar mais</button>
                        </div>

                        {/* Review 2 */}
                        <div className="dd-review-card">
                            <div className="dd-review-header">
                                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt="Siphosethu" className="dd-review-avatar" />
                                <div className="dd-review-author-info">
                                    <h4 className="dd-review-author-name">Siphosethu</h4>
                                    <span className="dd-review-author-meta">East London, África do Sul</span>
                                </div>
                            </div>
                            <div className="dd-review-meta-row">
                                <div className="dd-review-stars">
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                </div>
                                <span className="dd-dot-divider">·</span>
                                <span className="dd-review-date-stay">dezembro de 2025 · Ficou algumas noites</span>
                            </div>
                            <p className="dd-review-text">
                                Que lugar lindo. O lugar era como descrito e parecia nas fotos. Peter e Kevin foram muito acolhedores e ajudaram sempre que foi necessário. A hospitalidade deles foi 100%, não tenho reclamações e ...
                            </p>
                            <button className="dd-review-show-more">Mostrar mais</button>
                        </div>

                        {/* Review 3 */}
                        <div className="dd-review-card">
                            <div className="dd-review-header">
                                <img src="https://images.unsplash.com/photo-1531123897727-8f129e1eb849?auto=format&fit=crop&w=64&h=64" alt="Nandi" className="dd-review-avatar" />
                                <div className="dd-review-author-info">
                                    <h4 className="dd-review-author-name">Nandi</h4>
                                    <span className="dd-review-author-meta">Boksburg, África do Sul</span>
                                </div>
                            </div>
                            <div className="dd-review-meta-row">
                                <div className="dd-review-stars">
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                </div>
                                <span className="dd-dot-divider">·</span>
                                <span className="dd-review-date-stay">dezembro de 2025 · Ficou algumas noites</span>
                            </div>
                            <p className="dd-review-text">
                                Que espaço bonito e tranquilo, realmente parece em casa e está perfeitamente localizado perto do centro de Sandton, é seguro e muito tranquilo. Tudo sobre o fim de semana foi ...
                            </p>
                            <button className="dd-review-show-more">Mostrar mais</button>
                        </div>

                        {/* Review 4 */}
                        <div className="dd-review-card">
                            <div className="dd-review-header">
                                <img src="https://images.unsplash.com/photo-1550525811-e5869dd03032?auto=format&fit=crop&w=64&h=64" alt="Manana" className="dd-review-avatar" />
                                <div className="dd-review-author-info">
                                    <h4 className="dd-review-author-name">Manana</h4>
                                    <span className="dd-review-author-meta">6 anos na GoTour</span>
                                </div>
                            </div>
                            <div className="dd-review-meta-row">
                                <div className="dd-review-stars">
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                </div>
                                <span className="dd-dot-divider">·</span>
                                <span className="dd-review-date-stay">novembro de 2025 · Ficou algumas noites</span>
                            </div>
                            <p className="dd-review-text">
                                Esta casa instantaneamente se tornou a calma e o conforto que eu precisava. O espaço era impecável, lindamente montado, tranquilo e privado; um verdadeiro santuário após ...
                            </p>
                            <button className="dd-review-show-more">Mostrar mais</button>
                        </div>
                        {/* Review 5 */}
                        <div className="dd-review-card">
                            <div className="dd-review-header">
                                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=64&h=64" alt="Carla" className="dd-review-avatar" />
                                <div className="dd-review-author-info">
                                    <h4 className="dd-review-author-name">Carla</h4>
                                    <span className="dd-review-author-meta">Cabo Verde</span>
                                </div>
                            </div>
                            <div className="dd-review-meta-row">
                                <div className="dd-review-stars">
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                </div>
                                <span className="dd-dot-divider">·</span>
                                <span className="dd-review-date-stay">outubro de 2025 · Ficou uma semana</span>
                            </div>
                            <p className="dd-review-text">
                                A localização é insuperável e o atendimento foi fenomenal. Pude descansar perfeitamente, o quarto estava extremamente bem decorado com vista para a costa. O café da manhã tem opções e ingredientes muito frescos...
                            </p>
                            <button className="dd-review-show-more">Mostrar mais</button>
                        </div>

                        {/* Review 6 */}
                        <div className="dd-review-card">
                            <div className="dd-review-header">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64" alt="Miguel" className="dd-review-avatar" />
                                <div className="dd-review-author-info">
                                    <h4 className="dd-review-author-name">Miguel</h4>
                                    <span className="dd-review-author-meta">Lisboa, Portugal</span>
                                </div>
                            </div>
                            <div className="dd-review-meta-row">
                                <div className="dd-review-stars">
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                    <Star size={11} fill="#0f172a" color="#0f172a" />
                                </div>
                                <span className="dd-dot-divider">·</span>
                                <span className="dd-review-date-stay">setembro de 2025 · Ficou algumas noites</span>
                            </div>
                            <p className="dd-review-text">
                                Tudo de perfeito. Desde o dia em que cheguei ao momento do checkout, eles ajudaram com todas as rotas e transfers necessários para a cidade. Super recomendo a todos o alojamento para férias prolongadas de verão...
                            </p>
                            <button className="dd-review-show-more">Mostrar mais</button>
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows — Reviews */}
                <div className="dd-nav-arrows">
                    <button className="dd-nav-arrow-btn"><ChevronLeft size={22} /></button>
                    <span className="dd-nav-arrow-label">Próximo</span>
                    <button className="dd-nav-arrow-btn"><ChevronRight size={22} /></button>
                </div>

            </div>

            {/* Premium Footer with removed CTA Banner */}
            <FooterSection hideBanner={true} />
        </div>
    );
};

export default DestinoDetalhes;
