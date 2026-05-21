const fallbackParser = (query) => {
    const text = query.toLowerCase();
    let intentCategory = 'all';

    if (text.includes('hotel') || text.includes('hoteis') || text.includes('hotéis')) intentCategory = 'hotels';
    else if (text.includes('resort')) intentCategory = 'resorts';
    else if (text.includes('praia')) intentCategory = 'beaches';
    else if (text.includes('restaurante') || text.includes('comer') || text.includes('almoço')) intentCategory = 'restaurants';
    else if (text.includes('carro') || text.includes('alugu')) intentCategory = 'car-rental';
    else if (text.includes('voo') || text.includes('avião')) intentCategory = 'flights';
    else if (text.includes('villa') || text.includes('casa')) intentCategory = 'villas';
    else if (text.includes('hostel') || text.includes('mochileiro')) intentCategory = 'hostels';

    let maxPrice = null;
    const priceMatch = text.match(/(\d+)\s*(euros|usd|mts|meticais|€|\$)/i);
    if (priceMatch) maxPrice = parseInt(priceMatch[1], 10);

    return {
        intentCategory,
        abstractText: text,
        location: null,
        maxPrice,
        minDays: null,
        crossCategoryDividerText: 'Outras opções'
    };
};

export const extractSearchIntent = async (queryText) => {
    try {
        const response = await fetch('/api/ai-search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: queryText }),
        });

        if (!response.ok) {
            console.warn('AI search API error, using fallback');
            return fallbackParser(queryText);
        }

        const data = await response.json();
        return {
            intentCategory: data.intentCategory || 'all',
            abstractText: data.abstractText || queryText,
            maxPrice: data.maxPrice || null,
            minDays: data.minDays || null,
            location: data.location || null,
            crossCategoryDividerText: data.crossCategoryDividerText || 'Outras opções incríveis',
        };
    } catch (error) {
        console.error('AI Search Error:', error);
        return fallbackParser(queryText);
    }
};
