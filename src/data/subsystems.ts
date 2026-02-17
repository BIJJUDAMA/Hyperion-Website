import { Zap, Magnet, Box, Cpu, Wrench, type LucideIcon } from 'lucide-react';

export interface Subsystem {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    image?: string;
}

export const subsystemsData = {
    sectionNumber: '03',
    sectionLabel: 'Engineering',
    title: 'Subsystems',
    description: 'Our Hyperloop team is organized into specialized subsystems, each playing a crucial role in designing, building, and testing a safe and efficient pod.',
    items: [
        {
            id: 'propulsion',
            title: 'Propulsion',
            description: 'Responsible for generating thrust and controlling the acceleration and deceleration of the pod along the track.',
            icon: Zap,
            image: '',
        },
        {
            id: 'levitation',
            title: 'Levitation',
            description: 'Focuses on achieving stable, low-friction motion by developing efficient levitation and guidance mechanisms.',
            icon: Magnet,
            image: '',
        },
        {
            id: 'chassis',
            title: 'Chassis & Shell',
            description: 'Designs a lightweight yet strong structural frame and aerodynamic shell to ensure safety, stability, and performance.',
            icon: Box,
            image: '',
        },
        {
            id: 'electrical',
            title: 'Electrical',
            description: 'Handles power management, control systems, sensors, and communication between onboard components.',
            icon: Cpu,
            image: '',
        },
        {
            id: 'mechanical',
            title: 'Mechanical',
            description: 'Manages mechanical design, manufacturing, assembly, and smooth integration of all subsystems.',
            icon: Wrench,
            image: '',
        },
    ] as Subsystem[],
};
