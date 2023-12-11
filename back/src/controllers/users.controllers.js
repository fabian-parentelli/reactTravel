import * as userService from '../services/users.services.js';
import { UserNotFound } from '../utils/exceptions.utils.js';

const register = async (req, res) => {
    try {
        const result = await userService.register({ ...req.body });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof UserNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const login = async (req, res) => {
    try {
        const result = await userService.login({ ...req.body });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof UserNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getByEmail = async (req, res) => {
    const { user } = req.user;
    try {
        const result = await userService.getByEmail(user.email);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof UserNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const updateUser = async (req, res) => {
    const { user } = req.user;
    try {
        const result = await userService.updateUser(user._id, { ...req.body });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof UserNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const userRole = async (req, res) => {
    const { uId } = req.params;
    const { user } = req.user;
    try {
        const result = await userService.userRole(uId, user);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof UserNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getAll = async (req, res) => {
    try {
        const result = await userService.getAll();
        if (result) return res.sendSuccess(result);
    } catch (error) {
        if (error instanceof UserNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { register, login, getByEmail, updateUser, userRole, getAll };