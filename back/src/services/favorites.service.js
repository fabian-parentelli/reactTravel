import { favoriteRepository } from "../repositories/index.repositories.js";
import { FavoriteNotFound } from "../utils/exceptions.utils.js";

const save = async (favorite, { user }) => {
    const newFavorite = {};
    const fav = Object.values(favorite);
    const getfavoriteByUser = await favoriteRepository.getByUser(user._id);

    console.log(getfavoriteByUser);

    if (getfavoriteByUser) {
        newFavorite._id = getfavoriteByUser._id;
        newFavorite.userId = getfavoriteByUser.userId;
        newFavorite.products = [...fav];
        newFavorite.products = [...new Set(newFavorite.products)]
        const result = await favoriteRepository.update(newFavorite);
        return { status: 'success', result };
    } else {
        newFavorite.userId = user._id;
        newFavorite.products = [...fav];
        const result = await favoriteRepository.save(newFavorite);
        return { status: 'succes', result };
    };
};

const getUser = async ({ user }) => {
    const result = await favoriteRepository.getByUser(user._id);
    return result ?  { status: 'success', result } : {};
};

export { save, getUser };