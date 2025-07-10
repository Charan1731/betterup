import type {Request, Response} from "express";
import { prismaClient } from "db/client";
import { z } from "zod";

const getWebsiteStatusSchema = z.object({
    websiteId: z.string().uuid("Invalid website ID format")
});

export const addWebsite =  async (req: Request, res: Response) => {
    const userId = req.userId!;

    const { url } = req.body;

    const result = await prismaClient.website.create({
        data:{
            userId,
            url,
        }
    })

    if(!result){
        res.status(400).json({
            message: "Failed to create website"
        })
        return;
    }

    res.status(201).json({
        message: "Website created successfully",
        data: result
    })

    return;
}

export const getWebsiteStatus =  async (req: Request, res: Response) => {
    try {
        const validatedQuery = getWebsiteStatusSchema.parse(req.query);
        const { websiteId } = validatedQuery;
        const userId = req.userId!;

        const data = await prismaClient.website.findFirst({
            where:{
                id: websiteId,
                userId: userId
            },
            include:{
                ticks: true
            }
        });

        if (!data) {
            res.status(404).json({
                message: "Website not found"
            });
            return;
        }

        res.status(200).json({
            message: "Website status retrieved successfully",
            data
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                message: "Invalid query parameters",
                errors: error.errors
            });
            return;
        }

        console.error("Error fetching website status:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const getWebsites = async (req: Request, res: Response) => {

    const userId = req.userId!;

    const response = await  prismaClient.website.findMany({
        where:{
            userId: userId,
            disabled: false
        },include:{
            ticks: true
        }
    })

    if(!response){
        res.status(404).json({
            message: "No websites found"
        })
        return;
    }

    res.status(200).json({
        message: "Websites retrieved successfully",
        data: response
    })

    return;
}


export const deleteWebsite = async (req: Request, res: Response) => {
    const userId = req.userId!;

    const websiteId = req.params.id;

    await prismaClient.website.update({
        where:{
            id: websiteId,
            userId: userId
        },
        data: {
            disabled: true
        }
    })

    res.status(200).json({
        message: "Website deleted successfully"
    })

    return;
}