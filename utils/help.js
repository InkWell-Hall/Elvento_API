// utils/advertFilters.js
export const buildAdvertFilter = (userId, advertId, category, price, name, subCategory) => {
    const filter = { user: userId };

    if (advertId) filter._id = advertId;
    if (category) filter.category = new RegExp(`^${category}$`, 'i');
    if (subCategory) filter.subCategory = new RegExp(`^${subCategory}$`, 'i');
    if (name) filter.name = new RegExp(name, 'i'); // partial match
    if (price) filter.price = Number(price); // convert to number if stored as number

    return filter;
};
