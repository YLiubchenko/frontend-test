export interface ITagItem {
    id: string;
    name: string;
    category: string;
    value: string | number;
    inputs?: string;
}


export const getTags = async ():Promise<ITagItem[]> =>{

    const res:Response = await fetch('https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete')

    if(res.ok){
        return await res.json()
    }

    throw new Error('Tags could not be fetched');
}
