export interface TeamMember {
    name: string;
    role: string;
    image?: string;
}

export const teamData = {
    sectionNumber: '06',
    sectionLabel: 'People',
    title: 'Our Team',
    members: [
        { name: 'Kirthivaasan K', role: 'Team Member', image: '' },
        { name: 'Yogesh Pandian R', role: 'Team Member', image: '' },
        { name: 'Samridhy Remesh', role: 'Team Member', image: '' },
        { name: 'Praveen Kumar K', role: 'Team Member', image: '' },
        { name: 'Saishree Ananth', role: 'Team Member', image: '' },
        { name: 'Deeksha Reddy Lakkam', role: 'Team Member', image: '' },
        { name: 'Ram Viyaas', role: 'Team Member', image: '' },
        { name: 'Minakshi Santosh', role: 'Team Member', image: '' },
        { name: 'Dharshan Ramakrishnan', role: 'Team Member', image: '' },
        { name: 'Suryathej V P', role: 'Team Member', image: '' },
        { name: 'Bhaskarashiss K', role: 'Team Member', image: '' },
        { name: 'Arihant Bhandari D', role: 'Team Member', image: '' },
    ] as TeamMember[],
    facultyCoordinators: [
        { name: 'Praveen Kumar', role: 'Faculty Coordinator', image: '' },
        { name: 'Prabhu S', role: 'Faculty Coordinator', image: '' },
    ] as TeamMember[],
};
