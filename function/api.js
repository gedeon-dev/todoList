/**
 * 
 * @param {string} url 
 * @param {object} options 
 * @returns 
 */
export async function fetcJSON(url, options = {}){
    const headers = {Accept : 'application/jspn', ...options.headers}
    const r = await fetch(url, {...options, headers})
    if(r.ok){
        return r.json()
    }
    throw new Error('Erreur serveur', {cause : r})
}