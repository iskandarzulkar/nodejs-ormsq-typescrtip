import {Request, Response} from "express";
import RoleMenuAccess from "../db/models/RoleMenuAccess";
import SubMenu from "../db/models/submenu";
import Role from "../db/models/Role";
import Helper from "../helper/Helper";

const CreateAccess = async(req: Request, res:Response):Promise<Response> =>{
    try {
        const { roleId, submenuId } = req.body;

		const access = await RoleMenuAccess.create({
			roleId, submenuId,
			active: true
		});

		return res.status(201).send(Helper.ResponseData(201, "Created", null, access));
    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null))
    }
};

const GetListAccess = async(req: Request, res:Response):Promise<Response> =>{
    try {
        const menu = await RoleMenuAccess.findAll({
			where: {
				active: true,
			},
			include: [
				{
					model: SubMenu,
					attributes: ['name']
				},
				{
					model: Role,
					attributes: ['roleName']
				}
			]
		});

		return res.status(200).send(Helper.ResponseData(200, "OK", null, menu));
    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null))
    }
};

const GetAllAccess = async(req: Request, res:Response):Promise<Response> =>{
    try {
        const menu = await RoleMenuAccess.findAll({
			include: [
				{
					model: SubMenu,
					attributes: ['name']
				},
				{
					model: Role,
					attributes: ['roleName']
				}
			]
		});

		return res.status(200).send(Helper.ResponseData(200, "OK", null, menu));
    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null))
    }
};

const GetDetailAccess = async(req: Request, res:Response):Promise<Response> =>{
    try {
        const { id } = req.params;
		const menu = await RoleMenuAccess.findOne({
			where: {
				id: id,
				active: true
			}
		});

		if (!menu) {
			return res.status(404).send(Helper.ResponseData(404, "NotFound", null, null));
		}
		return res.status(200).send(Helper.ResponseData(200, "OK", null, menu));

    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null))
    }
};

const UpdateAccess = async(req: Request, res:Response):Promise<Response> =>{
    try {
        const { id } = req.params;
		const { roleId, submenuId } = req.body;
		const menu = await RoleMenuAccess.findOne({
			where: {
				id: id,
				active: true
			}
		});

		if (!menu) {
			return res.status(404).send(Helper.ResponseData(404, "NotFound", null, null));
		}

		menu.roleId = roleId;
		menu.submenuId = submenuId;
		await menu.save();
        return res.status(200).send(Helper.ResponseData(200, "Updated", null, menu));
    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null))
    }
};

const SoftDeleteAccess = async(req: Request, res:Response):Promise<Response> =>{
    try {
        const { id } = req.params;
		const menu = await RoleMenuAccess.findOne({
			where: {
				id: id,
				active: true
			}
		});

		if (!menu) {
			return res.status(404).send(Helper.ResponseData(404, "NotFound", null, null));
		}

		menu.active = false;
		await menu.save();
		return res.status(200).send(Helper.ResponseData(200, "Updated", null, menu));
	

    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null))
    }
};

const DeletePermanentAccess = async(req: Request, res:Response):Promise<Response> =>{
    try {
        const { id } = req.params;

		const menu = await RoleMenuAccess.findOne({
			where: {
				id: id,
				active: true
			}
		});

		if (!menu) {
			return res.status(404).send(Helper.ResponseData(404, "NotFound", null, null));
		}

		await menu.destroy();
		return res.status(200).send(Helper.ResponseData(200, "Removed", null, null));

    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null))
    }
};






export default {CreateAccess, GetListAccess, GetAllAccess, GetDetailAccess, UpdateAccess, SoftDeleteAccess, DeletePermanentAccess }