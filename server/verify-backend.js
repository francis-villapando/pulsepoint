// Using global fetch (Node 18+)
// Actually newer node has fetch built-in.

const BASE_URL = 'http://localhost:3000/api';

async function verify() {
    console.log('Starting Backend Verification...');

    // 1. Health Check
    try {
        const health = await fetch('http://localhost:3000/health');
        console.log('Health Check:', health.status === 200 ? 'PASS' : 'FAIL');
    } catch (e) {
        console.error('Server not reachable. Make sure it is running.');
        process.exit(1);
    }

    // 2. Carousel CRUD
    console.log('\n--- Verifying Carousel ---');
    // Create
    const newCarousel = await (await fetch(`${BASE_URL}/carousel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            imageUrl: 'https://example.com/image.jpg',
            altText: 'Test Image',
            isActive: true
        })
    })).json();
    console.log('Create Carousel:', newCarousel.id ? 'PASS' : 'FAIL', newCarousel);

    // Get
    const carouselList = await (await fetch(`${BASE_URL}/carousel`)).json();
    console.log('Get Carousel:', carouselList.length > 0 ? 'PASS' : 'FAIL');

    // 3. Announcement CRUD
    console.log('\n--- Verifying Announcement ---');
    const newAnnouncement = await (await fetch(`${BASE_URL}/announcements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: 'Test Announcement',
            content: 'This is a test',
            category: 'general',
            isPinned: true
        })
    })).json();
    console.log('Create Announcement:', newAnnouncement.id ? 'PASS' : 'FAIL', newAnnouncement);

    // 4. Event CRUD
    console.log('\n--- Verifying Event ---');
    const newEvent = await (await fetch(`${BASE_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: 'Test Event',
            description: 'Event Description',
            category: 'community',
            date: new Date().toISOString(),
            time: '10:00 AM',
            venue: 'Town Hall'
        })
    })).json();
    console.log('Create Event:', newEvent.id ? 'PASS' : 'FAIL', newEvent);

}

verify();
