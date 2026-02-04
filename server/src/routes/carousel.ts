import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

const router = Router();

// Validation schema
const carouselItemSchema = z.object({
    imageUrl: z.string().url(),
    altText: z.string().min(1),
    eventTitle: z.string().optional(),
    eventDate: z.string().transform((str) => new Date(str)).optional(),
    isActive: z.boolean().default(true),
});

// GET /api/carousel (Public)
router.get('/', async (req, res) => {
    try {
        const items = await prisma.carouselItem.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch carousel items' });
    }
});

// POST /api/carousel (Admin)
router.post('/', async (req, res) => {
    try {
        const data = carouselItemSchema.parse(req.body);
        const item = await prisma.carouselItem.create({
            data
        });
        res.status(201).json(item);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.errors });
        } else {
            res.status(500).json({ error: 'Failed to create carousel item' });
        }
    }
});

// PUT /api/carousel/:id (Admin)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = carouselItemSchema.partial().parse(req.body);
        const item = await prisma.carouselItem.update({
            where: { id: parseInt(id) },
            data
        });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update carousel item' });
    }
});

// DELETE /api/carousel/:id (Admin)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.carouselItem.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete carousel item' });
    }
});

export default router;
