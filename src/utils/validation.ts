export interface ValidationResult {
    valid: boolean;
    message?: string;
}

export const validateSearchQuery = (query: string): ValidationResult => {
    if (!query || query.trim().length === 0) {
        return { 
            valid: false, 
            message: 'Search term cannot be empty' 
        };
    }

    const trimmedQuery = query.trim();
    
    if (trimmedQuery.length < 2) {
        return { 
            valid: false, 
            message: 'Search term must be at least 2 characters' 
        };
    }

    if (trimmedQuery.length > 100) {
        return { 
            valid: false, 
            message: 'Search term is too long (max 100 characters)' 
        };
    }

    // Check for potentially malicious input
    const dangerousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i,
    ];

    for (const pattern of dangerousPatterns) {
        if (pattern.test(trimmedQuery)) {
            return { 
                valid: false, 
                message: 'Invalid search term' 
            };
        }
    }

    return { valid: true };
};

export const sanitizeSearchQuery = (query: string): string => {
    return query
        .trim()
        .replace(/[<>]/g, '') // Remove angle brackets
        .replace(/\s+/g, ' ') // Normalize whitespace
        .slice(0, 100); // Limit length
};

export const validateMovieId = (id: unknown): ValidationResult => {
    const numId = Number(id);
    
    if (isNaN(numId)) {
        return { 
            valid: false, 
            message: 'Invalid movie ID' 
        };
    }

    if (numId <= 0) {
        return { 
            valid: false, 
            message: 'Movie ID must be positive' 
        };
    }

    return { valid: true };
};

export const validatePageNumber = (page: unknown): ValidationResult => {
    const numPage = Number(page);
    
    if (isNaN(numPage)) {
        return { 
            valid: false, 
            message: 'Invalid page number' 
        };
    }

    if (numPage < 1) {
        return { 
            valid: false, 
            message: 'Page number must be at least 1' 
        };
    }

    if (numPage > 500) {
        return { 
            valid: false, 
            message: 'Page number exceeds maximum (500)' 
        };
    }

    return { valid: true };
};