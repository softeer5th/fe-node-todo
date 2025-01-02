export function generateDate (today) {
    return today.getFullYear() +
	'-' + ( (today.getMonth()+1) < 9 ? "0" + (today.getMonth()+1) : (today.getMonth()+1) )+
	'-' + ( (today.getUTCDate()) < 9 ? "0" + (today.getUTCDate()) : (today.getUTCDate()) );
}