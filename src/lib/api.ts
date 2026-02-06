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
        getArchived: () => fetchJson<CarouselImage[]>('/carousel/archived'),
        create: (data: Omit<CarouselImage, 'id' | 'uploadDate' | 'createdAt'>) =>
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
        restore: (id: string | number) =>
            fetchJson<CarouselImage>(`/carousel/${id}/restore`, {
                method: 'PUT',
            }),
    },
    announcements: {
        getAll: () => fetchJson<Announcement[]>('/announcements'),
        getArchived: () => fetchJson<Announcement[]>('/announcements/archived'),
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
        restore: (id: string | number) =>
            fetchJson<Announcement>(`/announcements/${id}/restore`, {
                method: 'PUT',
            }),
    },
    events: {
        getAll: () => fetchJson<Event[]>('/events'),
        getArchived: () => fetchJson<Event[]>('/events/archived'),
        create: (data: Omit<Event, 'id' | 'createdAt'>) =>
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
        restore: (id: string | number) =>
            fetchJson<Event>(`/events/${id}/restore`, {
                method: 'PUT',
            }),
    },
};
