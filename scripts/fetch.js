
export  async function fetchCocktail(url){
    let request = await fetch(url);
    console.log(request);
    try{
        let response = await request.json();
        return response;
    } catch (err) {
        return false; 
    }
};


