export interface ScheduleItem {
    id: number;
    date: string;
    title: string;
    location: string;
    description?: string;
}

export const mockSchedules: ScheduleItem[] = [
    {
        id: 1,
        date: '2025-12-24',
        title: 'Christmas Concert',
        location: 'Tokyo Opera City',
        description: 'A special night with classical masterpieces.'
    },
    {
        id: 2,
        date: '2026-01-15',
        title: 'New Year Recital',
        location: 'Suntory Hall, Blue Rose',
        description: 'Piano solo recital featuring Chopin and Liszt.'
    },
    {
        id: 3,
        date: '2026-03-03',
        title: 'Spring Gala',
        location: 'Yokohama Minato Mirai Hall',
        description: 'Guest appearance with the Yokohama Symphony Orchestra.'
    },
    {
        id: 4,
        date: '2025-10-10',
        title: 'Autumn Charity Event',
        location: 'Kyoto Concert Hall',
        description: 'Charity concert for music education.'
    }
];
