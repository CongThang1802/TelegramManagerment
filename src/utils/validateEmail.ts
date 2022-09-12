export function ValidateEmail(email:string){
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}