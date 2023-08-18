import { axiosPrivate } from "./axios";

export const createSkill = async (data, config) => {
    let res = await axiosPrivate.post("/skill/create", data, config);
    return res.data;
}

export const updateSkill = async (data, config) => {
    let res = await axiosPrivate.post("/skill/update", data, config);
    return res.data
}

export const deleteSkill = async (skillId) => {
    let res = await axiosPrivate.post("/skill/delete", skillId);
    return res.data;
}
export const createProject = async (data, config) => {
    let res = await axiosPrivate.post("/project/create", data, config);
    return res.data;
}

export const updateProject = async (data, config) => {
    let res = await axiosPrivate.post("/project/update", data, config);
    return res.data
}

export const deleteProject = async (projectId) => {
    let res = await axiosPrivate.post("/project/delete", projectId);
    return res.data;
}
export const getSkills = async () => {
    let res = await axiosPrivate.get("/skill/getskills");
    return res.data;
}
export const getProjects = async () => {
    let res = await axiosPrivate.get("/project/getlist");
    return res.data;
}
export const loginAPI = async (data) => {
    let res = await axiosPrivate.post("/admin/login", data);
    return res.data;
}
export const getproject = async (projectId) => {
    let res = await axiosPrivate.post("/project/getproject", projectId);
    return res.data;
}
export const getskill = async (skillId) => {
    let res = await axiosPrivate.post("/skill/getskill", skillId);
    return res.data;
}