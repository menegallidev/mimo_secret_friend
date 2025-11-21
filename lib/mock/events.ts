// lib/mock/events.ts
export type EventUser = {
    id: string;
    name: string;
    nickname?: string;
};

export type SecretFriendEvent = {
    id: string;
    name: string;
    description?: string;
    drawDate: string;   // ISO string
    meetupDate: string; // ISO string
    location: string;
    users: EventUser[];
    isUserInEvent: boolean; // se o usuário logado já está no evento
};

export const mockEvents: SecretFriendEvent[] = [
    {
        id: "1",
        name: "Natal da Firma 🎄",
        description: "Amigo secreto da galera do trabalho.",
        drawDate: "2025-12-05T20:00:00.000Z",
        meetupDate: "2025-12-20T22:00:00.000Z",
        location: "Casa do João",
        isUserInEvent: true,
        users: [
            { id: "u1", name: "Rafael Menegalli", nickname: "Rafa" },
            { id: "u2", name: "Ana Paula", nickname: "Aninha" },
            { id: "u3", name: "João Victor" },
        ],
    },
    {
        id: "2",
        name: "Amigos da Facul 🎁",
        description: "Clássico amigo secreto do grupo.",
        drawDate: "2025-12-10T20:00:00.000Z",
        meetupDate: "2025-12-18T22:00:00.000Z",
        location: "Bar do Zé",
        isUserInEvent: false,
        users: [
            { id: "u4", name: "Marcos Silva" },
            { id: "u5", name: "Luana Costa" },
        ],
    },
];
