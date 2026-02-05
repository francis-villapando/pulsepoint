import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

const router = Router();

// Validation schema
const announcementSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    category: z.enum(['general', 'safety', 'maintenance', 'celebration']),
    isPinned: z.boolean().default(false),
});

// GET /api/announcements (Public - Non-archived only)
router.get('/', async (req, res) => {
    try {
        const announcements = await prisma.announcement.findMany({
            where: { isArchived: false },
            orderBy: [
                { isPinned: 'desc' },
                { createdAt: 'desc' }
            ]
        });
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch announcements' });
    }
});

// GET /api/announcements/archived (Admin)
router.get('/archived', async (req, res) => {
    try {
        const announcements = await prisma.announcement.findMany({
            where: { isArchived: true },
            orderBy: { updatedAt: 'desc' }
        });
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch archived announcements' });
    }
});

// POST /api/announcements (Admin)
router.post('/', async (req, res) => {
    try {
        const data = announcementSchema.parse(req.body);
        const announcement = await prisma.announcement.create({
            data
        });
        res.status(201).json(announcement);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.errors });
        } else {
            res.status(500).json({ error: 'Failed to create announcement' });
        }
    }
});

// PUT /api/announcements/:id (Admin)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = announcementSchema.partial().parse(req.body);
        const announcement = await prisma.announcement.update({
            where: { id: parseInt(id) },
            data
        });
        res.json(announcement);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update announcement' });
    }
});

// DELETE /api/announcements/:id (Admin - SOFT DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.announcement.update({
            where: { id: parseInt(id) },
            data: { isArchived: true }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to archive announcement' });
    }
});

// PUT /api/announcements/:id/restore (Admin)
router.put('/:id/restore', async (req, res) => {
    try {
        const { id } = req.params;
        const announcement = await prisma.announcement.update({
            where: { id: parseInt(id) },
            data: { isArchived: false }
        });
        res.json(announcement);
    } catch (error) {
        res.status(500).json({ error: 'Failed to restore announcement' });
    }
});

export default router;
