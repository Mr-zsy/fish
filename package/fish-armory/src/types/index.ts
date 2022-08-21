interface MaterielType {
    name: string;
    img?: string;
    description?: string;
}

interface MaterielType {
    name: string;
    description?: string;
    children: MaterielType[]
}

interface MaterielGroup {
    groupName: string;
    children: MaterielType[];
}