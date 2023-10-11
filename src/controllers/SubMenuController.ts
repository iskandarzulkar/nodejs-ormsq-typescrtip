import {Request, Response} from "express";
import SubMenu from "../db/models/submenu";
import Helper from "../helper/Helper";



const CreateSubMenu = async(req: Request, res:Response):Promise<Response> =>{
    try {
        const { 
            name, 
            masterMenuId, 
            url, 
            title,
            icon,
            ordering,
			isTargetSelf
        } = req.body;

		const submenu = await SubMenu.create({
            name, 
            masterMenuId, 
            url, 
            title,
            icon,
            ordering,
            isTargetSelf,
			active: true
		});

        return res.status(200).send(Helper.ResponseData(201, "Created", null, submenu))
    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null))
    }
};

const GetListSubMenu = async (req: Request, res:Response):Promise<Response> =>{
    try {
        const submenu = await SubMenu.findAll({
            where:{
                active          : true
            }
        })

        return res.status(200).send(Helper.ResponseData(200, "Ok", null, submenu))
    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null))
    }
};

const GetAllSubMenu = async(req: Request, res:Response):Promise<Response> =>{
    try {
		const submenu = await SubMenu.findAll();

		return res.status(200).send(Helper.ResponseData(200, "Ok", null, submenu));
	} catch (error:any) {
		return res.status(500).send(Helper.ResponseData(500, "", error, null));
	}
};

const GetDetailSubMenu = async (req: Request, res:Response):Promise<Response> =>{
    try {
        const { id } = req.params;

		const submenu = await SubMenu.findOne({
			where: {
				id : id,
				active : true
			}
		});

		if (!submenu) {
			return res.status(404).send(Helper.ResponseData(404, "NotFound", null, null));
		}

		return res.status(200).send(Helper.ResponseData(200, "OK", null, submenu));
    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null))
    }
};

const UpdateSubMenu = async (req: Request, res:Response):Promise<Response> =>{
    try {
        const { id } = req.params;
		const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } = req.body;

		const submenu = await SubMenu.findOne({
			where: {
				id: id,
				active: true
			}
		});

		if (!submenu) {
			return res.status(404).send(Helper.ResponseData(404, "NotFound", null, null));
		}

		submenu.name            = name;
		submenu.masterMenuId    = masterMenuId;
		submenu.url             = url;
		submenu.title           = title;
		submenu.icon            = icon;
		submenu.ordering        = ordering;
		submenu.isTargetSelf    = isTargetSelf;

		await submenu.save();
        return res.status(200).send(Helper.ResponseData(200, "Updated", null, null));
    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null))
    }
};

const SoftDeleteSubMenu  = async (req: Request, res:Response):Promise<Response> =>{
    try {
        const { id } = req.params;

		const submenu = await SubMenu.findOne({
			where: {
				id: id,
				active: true
			}
		});

		if (!submenu) {
			return res.status(404).send(Helper.ResponseData(404, "NotFound", null, null));
		}

		submenu.active = false;

		return res.status(200).send(Helper.ResponseData(200, "Removed", null, null));
    } catch (error:any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null))
    }
};


const DeletePermanentSubMenu = async(req:Request, res:Response):Promise<Response> => {
	try {
		const { id } = req.params;

		const submenu = await SubMenu.findOne({
			where: {
				id: id,
				active: true
			}
		});

		if (!submenu) {
			return res.status(404).send(Helper.ResponseData(404, "NotFound", null, null));
		}

		await submenu.destroy();
		return res.status(200).send(Helper.ResponseData(200, "Removed", null, null));
	} catch (error:any) {
		return res.status(500).send(Helper.ResponseData(500, "", error, null));
	}
};


export default {CreateSubMenu, GetListSubMenu, GetAllSubMenu, GetDetailSubMenu, UpdateSubMenu, SoftDeleteSubMenu, DeletePermanentSubMenu}