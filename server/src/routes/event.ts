import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

const router = Router();

// Validation schema
const eventSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    category: z.enum(['community', 'sports', 'education', 'culture', 'health']),
    date: z.string().transform((str) => new Date(str)),
    time: z.string().min(1),
    venue: z.string().min(1),
});

// GET /api/events (Public)
router.get('/', async (req, res) => {
    try {
        // Optional: Query params for filtering by date, etc.
        const events = await prisma.event.findMany({
            orderBy: { date: 'asc' }
        });
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// POST /api/events (Admin)
router.post('/', async (req, res) => {
    try {
        const data = eventSchema.parse(req.body);
        const event = await prisma.event.create({
            data
        });
        res.status(201).json(event);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error(error);
            res.status(400).json({ error: error.errors });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Failed to create event' });
        }
    }
});

// PUT /api/events/:id (Admin)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Note: z.string().transform... logic repeats if we use partial() blindly on schema with transform.
        // simpler to just use schema for partial validation if possible or handle date separately if needed.
        // For now, let's assume full update or handle partial manually if schema partial fails with transformers.
        // Zod's partial() effectively makes input optional, but transformers run *after* parsing.
        // However, if we pass a date string, it will be transformed.

        // Quick fix for partial schema with transformer:
        // Define a refined schema for partial updates if needed, but standard partial() usually works if input matches.
        const data = eventSchema.partial().parse(req.body);

        const event = await prisma.event.update({
            where: { id: parseInt(id) },
            data
        });
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update event' });
    }
});

// DELETE /api/events/:id (Admin)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.event.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete event' });
    }
});

export default router;
