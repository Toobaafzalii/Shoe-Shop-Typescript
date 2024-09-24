type Itoken = string
type Ipath = string
type Iparams = string

interface IuserData {
    username:string
    password:string
}

interface Ierror{
response: Iresponse 
}

interface Iresponse {
data: IerrorData
}

interface IerrorData {
    error: string
    message: Array<string>
    statuseCode: number
}

interface Ishoe {
 data: IShoeData
}

interface IshoeData{
    brand: string
    category: string
    colors: string
    gender: string
    id: number
    imageURL: string
    name: string
    pid: number
    price: number
    sizes: string
}


interface IallShoes {
    data : IallData
}



interface IallData {
    page: number
    perPage: number
    total: number
    totalPages: number
}
