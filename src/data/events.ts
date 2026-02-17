export interface EventItem {
    title: string;
    date: string;
    highlights: string[];
}

export const eventsData = {
    sectionNumber: '04',
    sectionLabel: 'Competition',
    title: 'Events',
    events: [
        {
            title: 'Global Hyperloop Competition 2025-26',
            date: '2025-26',
            highlights: [
                'Hosted by IIT Madras — a global platform advancing the Hyperloop vision in India.',
                'Brings together researchers, innovators, and student teams worldwide.',
                'Features tracks including Innoquest - Innovation Category, evaluating technical feasibility and real-world impact.',
                'Fosters innovation, knowledge exchange, and interdisciplinary research in high-speed transportation.',
            ],
        },
    ] as EventItem[],
};
