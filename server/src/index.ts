import express from 'express';
import cors from 'cors';
import { prisma } from './lib/prisma';
import carouselRoutes from './routes/carousel';
import announcementRoutes from './routes/announcement';
import eventRoutes from './routes/event';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/carousel', carouselRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/events', eventRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('PulsePoint API is running');
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


