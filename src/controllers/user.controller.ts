import httpStatus from "http-status";
import pick from "../utils/pick";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";
import { userService } from "../services";


const createUser = catchAsync(async(req, res) => {
    const {name, email, password, role} = req.body;
    const user = await userService.createUser(name, email, password, role);
    res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async(req, res) => {
    const filter = pick(req.query, ["name", "role"]);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const result = await userService.queryUsers(filter, options);
    res.send(result);
});

const getUser = catchAsync(async (req, res) => {
    const userId = parseInt(req.params.id, 10); // Parse the id as a number
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
    const userId = parseInt(req.params.userId, 10); 
    const user = await userService.updateUserById(userId, req.body);
    res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
    const userId = parseInt(req.params.userId, 10); 
    await userService.deleteUserById(userId);
    res.status(httpStatus.NO_CONTENT).send();
});
  
  export default {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
  };