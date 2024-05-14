import { supabase, successNotification, errorNotification } from "../main";

document.addEventListener('DOMContentLoaded', async () => {
    // Define the cocktail variable in a higher scope
    let cocktail;

    // Base URL for cocktail images
    const cocktailImageUrl = "https://hiyluoiecwditapzngvr.supabase.co/storage/v1/object/public/Cocktail/";

    // Load data functionality
    async function getDatas() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');

            // Get specific cocktail by id
            let { data: fetchedCocktail, error } = await supabase
                .from('post')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error("Error fetching cocktail details:", error);
                return;
            }

            cocktail = fetchedCocktail; // Assign the fetched cocktail to the cocktail variable

            // Generate HTML for cocktail details
            let container = `
                <div class="info" data-id="${cocktail.id}">
                    <div class="user">
                        <img src="assets/imgs/zoe.jpg" alt="User Profile Image">
                        <span class="username">Reonest</span>
                    </div>
                    <div class="recipe">
                        <img src="${cocktailImageUrl}${cocktail.image_path}" alt="${cocktail.cocktail_name}">
                        <div class="card-info">
                            <h3>${cocktail.cocktail_name}</h3>
                        </div>
                    </div>
                </div>

                <section class="ingredients" id="ingredients">
                    <div class="container">
                        <div class="top-heading">Ingredients</div>
                        <ul>
                            ${cocktail.ingredients.split('\n').map(ingredient => `<li>${ingredient.trim()}</li>`).join('')}
                        </ul>
                    </div>
                </section>

                <section class="procedure" id="procedure">
                    <div class="container">
                        <div class="top-heading">Procedures</div>
                        <ol>
                            ${cocktail.procedures.split('\n').map(step => `<li>${step.trim()}</li>`).join('')}
                        </ol>
                    </div>
                </section>`;

            // Assign container to the element
            document.getElementById("detail").innerHTML = container;
        } catch (error) {
            console.error("Error in getDatas function:", error);
        }
    }

    // Call the getDatas function to load data
    getDatas();
    async function favoriteCocktail(post_id, image_path, cocktail_name) {
        try {
            // Insert a new record into the favorites table
            const { data, error } = await supabase
                .from('favorites')
                .insert([
                    { 
                        post_id: post_id,
                        image_path: image_path,
                        cocktail_name: cocktail_name, // Insert cocktail_name field
                        // user_id: userId // Insert user_id field
                    }
                ]);
    
            if (error) {
                console.error('Error favoriting cocktail:', error.message);
                return null;
            }
    
            if (data) {
                console.log('Cocktail favorited successfully!');
                return data;
            }
        } catch (error) {
            console.error('Error favoriting cocktail:', error.message);
            return null;
        }
    }
    

// Get the user ID from local storage
const userId = localStorage.getItem("auth_id");

// Add event listener to the star icon for favoriting
const starIcon = document.getElementById('star-icon');

starIcon.addEventListener('click', async () => {
    try {
        // Ensure cocktail is defined before attempting to favorite
        if (!cocktail) {
            console.error('No cocktail data available');
            return;
        }

        // Call getDatas function to ensure cocktail data is available
        await getDatas();

        // Call the favoriteCocktail function to favorite the cocktail
        await favoriteCocktail(cocktail.id, cocktail.image_path, cocktail.cocktail_name); 

        // Optionally, update the UI to reflect that the cocktail has been favorited
        starIcon.classList.add('favorited');

        // Optionally, display a success notification
        successNotification('Saved to Favorites');
    } catch (error) {
        console.error('Error favoriting cocktail:', error);
        // Optionally, display an error notification
        errorNotification('Failed to save to favorites. Please try again.');
    }
});


// Call the getDatas function to load data
document.addEventListener('DOMContentLoaded', async () => {
    await getDatas();
});
});