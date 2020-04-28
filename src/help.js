import moment from 'moment'
export const formatUser = (email , userName , img , token , msgs = []) => ({
    email,
    userName,
    img,
    msgs,
    token
})

export const formatMsg = (text , date , from, to) => ({
    text,
    date,
    from,
    to
})
export function sortByDate (arr1 = []) {
    // let arr = []
    // var i = 0, j = 0;
    // while(i < arr1.length && j < arr2.length) {
    //     if(arr1[i].date > arr2[j].date) {
    //         arr.push(arr1[i++])
    //     } else {
    //         arr.push(arr2[j++])
    //     }
    // }
    // while(i < arr1.length) {
    //     arr.push(arr1[i++])
    // }
    // while(j < arr2.length) {
    //     arr.push(arr2[j++])
    // }
    // console.warn(arr)
    // return arr
    return arr1.sort((a , b) => a.date > b.date)
}