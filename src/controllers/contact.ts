import { RequestHandler } from "express";
import { contactCreate } from "../valueObjects/contact-create";
import {
    createContact,
    findAllContacts,
    findContactById,
    deleteContact,
    findContactByEmail,
    getDashboardStats
} from "../services/contact";

export const create: RequestHandler = async (req, res) => {
    try {
        const data = contactCreate.safeParse(req.body);
        if (!data.success) {
            res.status(400).json({ error: data.error.flatten().fieldErrors });
            return;
        }

        const existingContact = await findContactByEmail(data.data.email);
        if (existingContact) {
            res.status(409).json({ error: "Email já cadastrado" });
            return;
        }

        const contact = await createContact(
            data.data.name,
            data.data.email,
            data.data.phone,
            data.data.doubt
        );

        res.status(201).json({ contact });
    } catch (error) {
        console.error('Create contact error:', error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}

export const getAll: RequestHandler = async (req, res) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const search = req.query.search as string | undefined;

        const result = await findAllContacts(page, limit, search);
        res.json(result);
    } catch (error) {
        console.error('Get all contacts error:', error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}

export const getById: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await findContactById(id);
        if (!contact) {
            res.status(404).json({ error: "Contato não encontrado" });
            return;
        }

        res.json({ contact });
    } catch (error) {
        console.error('Get contact by id error:', error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}

export const remove: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await findContactById(id);
        if (!contact) {
            res.status(404).json({ error: "Contato não encontrado" });
            return;
        }

        await deleteContact(id);

        res.json({ message: "Contato removido com sucesso" });
    } catch (error) {
        console.error('Remove contact error:', error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}

export const dashboard: RequestHandler = async (req, res) => {
    try {
        const stats = await getDashboardStats();
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}
