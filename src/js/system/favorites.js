// Import necessary functions and variables from main.js
import { supabase, successNotification, errorNotification } from "../main";

// Base URL for cocktail images
const cocktailImageUrl = "https://hiyluoiecwditapzngvr.supabase.co/storage/v1/object/public/Cocktail/";

async function getDatas() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        // Query favorites by user ID instead of favorite ID
        const userId = localStorage.getItem("auth_id");
        let { data: favorites, error } = await supabase
            .from('favorites')
            .select('*')
            

        if (error) {
            console.error("Error fetching favorites:", error);
            return;
        }

        // Generate HTML for each favorite cocktail
        let container = '';
        favorites.forEach(favorite => {
            container += `
                <div class="col-6 col-md-3 py-3" data-id="${favorite.id}">
                    <div class="card">
                        <img src="${cocktailImageUrl}${favorite.image_path}" alt="">
                        <div class="card-info">
                            <h3>${favorite.cocktail_name}</h3>
                            
                        </div>
                    </div>
                </div>`;
        });

        // Assign container to the element
        document.getElementById("favoriteItems").innerHTML = container;
    } catch (error) {
        console.error("Error in getDatas function:", error);
    }
}

// Call the getDatas function to load data
document.addEventListener('DOMContentLoaded', async () => {
    await getDatas();
});
