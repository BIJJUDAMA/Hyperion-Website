export interface TeamMember {
    name: string;
    role: string;
    image?: string;
    linkedin?: string;
}

export const teamData = {
    sectionNumber: '06',
    sectionLabel: 'People',
    title: 'Our Team',
    members: [
        {
            name: 'Kirthivaasan K',
            role: 'Team Captain',
            image: '/team/Kirthivaasan.jpeg',
            linkedin: 'https://www.linkedin.com/in/kirthivaasan-k-9a9580346',
        },
        {
            name: 'Arihant Bhandari D',
            role: 'Team Manager · Management & Finance',
            image: '/team/Arihant Bhandari D.jpg',
            linkedin: 'https://www.linkedin.com/in/arihant-bhandari-7a7398357',
        },
        {
            name: 'Yogesh Pandian R',
            role: 'Propulsion Lead',
            image: '/team/Yogesh Pandian R.jpg',
        },
        {
            name: 'Minakshi Santosh',
            role: 'Levitation Lead',
            image: '/team/Minakshi.jpg',
            linkedin: 'https://www.linkedin.com/in/minakshi-santosh-86566232b',
        },
        {
            name: 'Bhaskarashiss K',
            role: 'Mechanical — Suspension',
            image: '/team/Ashiss.JPG',
            linkedin: 'https://www.linkedin.com/in/bhaskharashiss-k-371840335',
        },
        {
            name: 'Praveen Kumar K',
            role: 'Mechanical — Brake · Chassis',
            image: '/team/Praveen Kumar K .JPG',
            linkedin: 'https://www.linkedin.com/in/praveen-kumar-k-506301326',
        },
        {
            name: 'Dharshan Ramakrishnan',
            role: 'Electrical Lead',
            image: '/team/Dharsan.JPG',
        },
        {
            name: 'Ram Viyaas',
            role: 'Controls & Automation Lead',
            image: '/team/RAMVIYAAS (1).jpg',
            linkedin: 'https://www.linkedin.com/in/ramviyaas',
        },
        {
            name: 'Saishree Ananth',
            role: 'Research — Airlocks',
            image: '/team/Saishree Ananth.jpeg',
        },
        {
            name: 'Samridhy Remesh',
            role: 'Research — Materials & Vacuum',
            image: '/team/Samridhy Remesh_.jpg',
            linkedin: 'https://www.linkedin.com/in/samridhy-remesh-b7022a338',
        },
        {
            name: 'Deeksha Reddy Lakkam',
            role: 'Research — Business',
            image: '/team/Deeksha.jpg',
            linkedin: 'https://www.linkedin.com/in/deeksha-reddy-lakkam-837732378',
        },
        {
            name: 'Suryathej V P',
            role: 'Team Member',
            image: '/team/Suryathej.jpg',
            linkedin: 'https://www.linkedin.com/in/suryathejvp',
        },
    ] as TeamMember[],
    facultyCoordinators: [
        { name: 'Dr. Prabhu S', role: 'Team Faculty Advisor', image: '/team/Dr. Prabhu S.jpg' },
        { name: 'Dr. Vaira Vignesh R', role: 'Materials & Manufacturing', image: '/team/Dr Vaira Vignesh R.jpg' },
        { name: 'Dr. Praveenkumar N', role: 'Propulsion', image: '/team/Dr Praveenkumar N.jpg' },
        { name: 'Dr. Mohanranjan S R', role: 'Control Systems', image: '/team/Dr Mohanranjan S R.jpg' },
    ] as TeamMember[],
};
