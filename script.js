const apiKey = "3637c3fcb901473fad2cec9628704801";
const searchBtn = document.getElementById("search-btn");
const ingredientsInput = document.getElementById("ingredients");
const recipeResults = document.getElementById("recipe-results");

// Fetch recipes based on ingredients
async function fetchRecipes(ingredients) {
  try {
    // Build the API URL
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
      ingredients
    )}&number=9&apiKey=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const recipes = await response.json();

    // Display the recipes
    displayRecipes(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    recipeResults.innerHTML = `
      <p class="not-found">⚠️ Failed to fetch recipes. Please try again later.</p>
    `;
  }
}

// Display recipes in the UI
function displayRecipes(recipes) {
  recipeResults.innerHTML = "";

  if (recipes.length === 0) {
    recipeResults.innerHTML = `
      <p class="not-found">No recipes found. Try different ingredients.</p>
    `;
    return;
  }

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" />
      <div class="details">
        <h3>${recipe.title}</h3>
        <p>Used Ingredients: ${recipe.usedIngredientCount}</p>
        <p>Missed Ingredients: ${recipe.missedIngredientCount}</p>
      </div>
      <button onclick="alert('${recipe.title} added to favorites')">Save to Favorites</button>
    `;

    recipeResults.appendChild(recipeCard);
  });
}

// Search button click event
searchBtn.addEventListener("click", () => {
  const ingredients = ingredientsInput.value.trim();

  if (ingredients) {
    fetchRecipes(ingredients);
  } else {
    alert("⚠️ Please enter at least one ingredient.");
  }
});
