
export default  async function fetchCocktail(url){
    let request = await fetch(url);
    try{
        let response = await request.json();
        return response;
    } catch (err) {
        return false; 
    }
};


