import { CarouselImage, Announcement, Event } from '@/types/pulsepoint';

const BASE_URL = 'http://localhost:3000/api';

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${BASE_URL}${url}`, options);
    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorBody}`);
    }
    // Handle 204 No Content
    if (response.status === 204) {
        return {} as T;
    }
    return response.json();
}

export const api = {
    carousel: {
        getAll: () => fetchJson<CarouselImage[]>('/carousel'),
        create: (data: Omit<CarouselImage, 'id' | 'uploadDate'>) =>
            fetchJson<CarouselImage>('/carousel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }),
        update: (id: string | number, data: Partial<CarouselImage>) =>
            fetchJson<CarouselImage>(`/carousel/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }),
        delete: (id: string | number) =>
            fetchJson<void>(`/carousel/${id}`, {
                method: 'DELETE',
            }),
    },
    announcements: {
        getAll: () => fetchJson<Announcement[]>('/announcements'),
        create: (data: Omit<Announcement, 'id' | 'createdAt'>) =>
            fetchJson<Announcement>('/announcements', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }),
        update: (id: string | number, data: Partial<Announcement>) =>
            fetchJson<Announcement>(`/announcements/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }),
        delete: (id: string | number) =>
            fetchJson<void>(`/announcements/${id}`, {
                method: 'DELETE',
            }),
    },
    events: {
        getAll: () => fetchJson<Event[]>('/events'),
        create: (data: Omit<Event, 'id'>) =>
            fetchJson<Event>('/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }),
        update: (id: string | number, data: Partial<Event>) =>
            fetchJson<Event>(`/events/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }),
        delete: (id: string | number) =>
            fetchJson<void>(`/events/${id}`, {
                method: 'DELETE',
            }),
    },
};
