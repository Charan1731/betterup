
import type { Request, Response } from "express";
import { prismaClient } from "db/client";
import { z } from "zod";

const getValidatorDetailsSchema = z.object({
  publicKey: z.string(),
});

export const getValidatorDetails = async (req: Request, res: Response) => {
  try {
    const validatedParams = getValidatorDetailsSchema.parse(req.params);
    const { publicKey } = validatedParams;

    const validator = await prismaClient.validator.findFirst({
      where: {
        publicKey: publicKey,
      },
      include: {
        ticks: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 20, // Limit to the last 20 ticks
          include: {
            website: true, // Include website information
          },
        },
      },
    });

    if (!validator) {
      return res.status(404).json({ message: "Validator not found" });
    }

    res.status(200).json({ 
        message: "Validator details fetched successfully",
        data: validator 
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Invalid request parameters",
        errors: error.errors,
      });
    }

    console.error("Error fetching validator details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addValidator = async (req: Request, res: Response) => {
  try {

    const { publicKey,ip,location } = req.body;

    const response = await prismaClient.validator.create({
      data: {
        publicKey,
        location,
        ip,
        pendingSol: 0,
      }
    })

    if(!response){
      return res.status(400).json({ message: "Failed to add validator" });
    }

    res.status(201).json({
      message: "Validator added successfully",
      data: response
    })
    return;
    
  } catch (error) {
    console.error(error);
  }
}
