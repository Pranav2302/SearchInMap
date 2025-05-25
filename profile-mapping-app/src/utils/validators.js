const validateProfileData = (data) => {
    const errors = {};

    if (!data.name || data.name.trim() === '') {
        errors.name = 'Name is required';
    }

    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Valid email is required';
    }

    if (!data.location || data.location.trim() === '') {
        errors.location = 'Location is required';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

const validateSearchQuery = (query) => {
    return query && query.trim().length > 0;
};

export { validateProfileData, validateSearchQuery };