// geting areaes & categories & recipes*************************************
// ***********************************************************************
var mealsArea = document.querySelector("#meals_area");
var categoriesGrid = document.querySelector("#categories-grid");
var recipesGrid = document.querySelector("#recipes-grid");
// serach about recipes by input & areas & categoreis***************************
// ***********************************************************
var searchInput = document.querySelector("#search-input");
var AllRecipes = [];
display();
searchInput.addEventListener("input", function () {
  var searchValue = searchInput.value.toLowerCase();
  var searchCards = "";
  for (var i = 0; i < AllRecipes.length; i++) {
    var ingFound = false;
    for (var j = 0; j < AllRecipes[i].ingredients.length; j++) {
      if (AllRecipes[i].ingredients[j].ingredient.includes(searchValue)) {
        ingFound = true;
      }
    }
    if (
      AllRecipes[i].name.includes(searchValue) ||
      (AllRecipes[i].area != null &&
        AllRecipes[i].area.includes(searchValue)) ||
      ingFound == true
    ) {
      searchCards += `  <div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="52772"
              data-index="${i}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src=${AllRecipes[i].thumbnail}
                  alt="Teriyaki Chicken Casserole"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${AllRecipes[i].category}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                     ${AllRecipes[i].area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${AllRecipes[i].name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${AllRecipes[i].instructions}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${AllRecipes[i].category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${AllRecipes[i].area}
                  </span>
                </div>
              </div>
            </div>`;
    }
  }
  recipesGrid.innerHTML = searchCards;
});
// Featching area endpoint***************************
// *************************************
var usedAreas;
async function getAllAreas() {
  var response = await fetch(
    "https://nutriplan-api.vercel.app/api/meals/areas",
  );

  var areas = await response.json();
  console.log(areas.results);
  usedAreas = areas.results;
  DispalyAreas();
}
// Diasplay area ***************************
// *************************************
function DispalyAreas() {
  var area = `<button
              class="px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap hover:bg-emerald-700 transition-all"
            >
              All Recipes
            </button>`;
  for (var i = 0; i < 10; i++) {
    area += `<button
    data-area="${usedAreas[i].name}"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
            >
              ${usedAreas[i].name}
            </button>`;
  }
  mealsArea.innerHTML = area;
}
// featching categories ***************************
// *************************************
var allCategories;
async function getCategories() {
  var response = await fetch(
    "https://nutriplan-api.vercel.app/api/meals/categories",
  );
  var categories = await response.json();
  console.log(categories.results);
  allCategories = categories.results;
  DisplayCategories();
}
// Diasplay categories ***************************
// *************************************
function DisplayCategories() {
  var categoryCard = "";
  for (var i = 0; i < allCategories.length; i++) {
    categoryCard += `<div
              class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
              data-category="${allCategories[i].category}"
            >
              <div class="flex items-center gap-2.5">
                <div
                  class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
                >
                  <i class="fa-solid fa-drumstick-bite"></i>
                </div>
                <div>
                  <h3  class="text-sm font-bold text-gray-900">${allCategories[i].name}</h3>
                </div>
              </div>
            </div>`;
  }
  categoriesGrid.innerHTML = categoryCard;
}
// featching recipes **************************
// ****************************************************
var cardErea;
async function getAllRecipes() {
  var response = await fetch(
    "https://nutriplan-api.vercel.app/api/meals/random?count=25",
  );
  var Recipes = await response.json();
  console.log(Recipes.results);
  AllRecipes = Recipes.results;
  DisplayRecipes();
}
// display recipes **************************
// ****************************************************

function DisplayRecipes() {
  var recipeCard = "";
  for (var i = 0; i < AllRecipes.length; i++) {
    if (AllRecipes[i].area == null) {
      cardErea = "public";
    } else {
      cardErea = AllRecipes[i].area;
    }
    recipeCard += `  <div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="52772"
              data-index="${i}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src=${AllRecipes[i].thumbnail}
                  alt="Teriyaki Chicken Casserole"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${AllRecipes[i].category}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${cardErea}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${AllRecipes[i].name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${AllRecipes[i].instructions}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${AllRecipes[i].category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${cardErea}
                  </span>
                </div>
              </div>
            </div>`;
  }
  recipesGrid.innerHTML = recipeCard;
  getRecipeDetails();
}
// Filtring metods*************************
// ******************************************
async function areaFilter() {
  var areaBtns = mealsArea.querySelectorAll("button");
  for (var i = 0; i < areaBtns.length; i++) {
    areaBtns[i].addEventListener("click", function () {
      if (this === areaBtns[0]) {
        getAllRecipes();
      } else {
        var filterdArea = this.dataset.area;
        var areaCard = "";
        for (var i = 0; i < AllRecipes.length; i++) {
          if (filterdArea == AllRecipes[i].area) {
            areaCard += `  <div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="52772"
              data-index="${i}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src=${AllRecipes[i].thumbnail}
                  alt="Teriyaki Chicken Casserole"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${AllRecipes[i].category}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                     ${AllRecipes[i].area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${AllRecipes[i].name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${AllRecipes[i].instructions}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${AllRecipes[i].category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${AllRecipes[i].area}
                  </span>
                </div>
              </div>
            </div>`;
          }
        }
        if (areaCard === "") {
          recipesGrid.innerHTML = `
    <div class="flex flex-col items-center justify-center py-16 text-center">
      
      <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <i class="fa-solid fa-magnifying-glass text-3xl text-gray-400"></i>
      </div>

      <p class="text-2xl text-gray-600 max-w-md">
        No recipes found. Try a different search term.
      </p>

    </div>
  `;
        } else {
          recipesGrid.innerHTML = areaCard;
        }
      }
    });
  }
}
async function typeFilter() {
  var TypeBtn = categoriesGrid.querySelectorAll(".category-card");

  for (var i = 0; i < TypeBtn.length; i++) {
    TypeBtn[i].addEventListener("click", function () {
      var filteredType = this.querySelector("h3").textContent;
      var typeCards = "";

      for (var j = 0; j < AllRecipes.length; j++) {
        if (filteredType == AllRecipes[j].category) {
          typeCards += `  <div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="52772"
              data-index="${j}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src=${AllRecipes[j].thumbnail}
                  alt="Teriyaki Chicken Casserole"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${AllRecipes[j].category}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                     ${AllRecipes[j].area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${AllRecipes[j].name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${AllRecipes[j].instructions}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${AllRecipes[j].category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${AllRecipes[j].area}
                  </span>
                </div>
              </div>
            </div>`;
        }
      }

      //   recipesGrid.innerHTML = typeCards;
      if (typeCards === "") {
        recipesGrid.innerHTML = `
    <div class="flex flex-col items-center justify-center py-16 text-center">
      
      <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <i class="fa-solid fa-magnifying-glass text-3xl text-gray-400"></i>
      </div>

      <p class="text-2xl text-gray-600 max-w-md">
        No recipes found. Try a different search term.
      </p>

    </div>
  `;
      } else {
        recipesGrid.innerHTML = typeCards;
      }
    });
  }
}
// displaying************************************
// ******************************************
async function display() {
  await getAllAreas();
  await getCategories();
  await getAllRecipes();
  await areaFilter();
  await typeFilter();
}
// *****************************************************************
// get recipe details****************************************************
var Rimage = document.querySelector("#Rimage");
var Rcategory = document.querySelector("#Rcategory");
var Rerea = document.querySelector("#Rerea");
var lastLetter = document.querySelector("#lastLetter");
var Rname = document.querySelector("#Rname");
var IngredientsLength = document.querySelector("#Ingredients-length");
var IngredientsGrid = document.querySelector("#IngredientsGrid");
var instructionsGrid = document.querySelector("#instructionsGrid");
var youtupeFrame = document.querySelector("iframe");
var currentRecipe;
async function getNutritionFacts(recipe) {
  try {
    var ingredients = recipe.ingredients.map(function (item) {
      return item.measure + " " + item.ingredient;
    });

    var response = await fetch(
      "https://nutriplan-api.vercel.app/api/nutrition/analyze",
      {
        method: "POST",

        headers: {
          "x-api-key": "YMh7GruTkdeU3tKDtMLg1iQswonYM0lNVGUGQTrI",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          recipeName: recipe.name,
          ingredients: ingredients,
        }),
      },
    );

    var result = await response.json();

    console.log("Nutrition Facts:", result);

    if (!result.success) {
      console.log("Nutrition API Error:", result.error);
      return;
    }

    var nutrition = result.data.perServing;
    var servings = result.data.servings;

    // Calories
    document.querySelector("#nutrition-calories").textContent =
      nutrition.calories || 0;

    document.querySelector("#nutrition-total-calories").textContent =
      `Total: ${(nutrition.calories || 0) * servings} cal`;

    // Protein
    var protein = nutrition.protein || 0;

    document.querySelector("#nutrition-protein").textContent = `${protein}g`;

    document.querySelector("#protein-bar").style.width =
      Math.min((protein / 50) * 100, 100) + "%";

    // Carbs
    var carbs = nutrition.carbs || 0;

    document.querySelector("#nutrition-carbs").textContent = `${carbs}g`;

    document.querySelector("#carbs-bar").style.width =
      Math.min((carbs / 275) * 100, 100) + "%";

    // Fat
    var fat = nutrition.fat || 0;

    document.querySelector("#nutrition-fat").textContent = `${fat}g`;

    document.querySelector("#fat-bar").style.width =
      Math.min((fat / 78) * 100, 100) + "%";

    // Fiber
    var fiber = nutrition.fiber || 0;

    document.querySelector("#nutrition-fiber").textContent = `${fiber}g`;

    document.querySelector("#fiber-bar").style.width =
      Math.min((fiber / 28) * 100, 100) + "%";

    // Sugar
    var sugar = nutrition.sugar || 0;

    document.querySelector("#nutrition-sugar").textContent = `${sugar}g`;

    document.querySelector("#sugar-bar").style.width =
      Math.min((sugar / 50) * 100, 100) + "%";

    // Vitamins & Minerals
    document.querySelector("#vitamin-a").textContent =
      `${nutrition.vitaminA || 0}%`;

    document.querySelector("#vitamin-c").textContent =
      `${nutrition.vitaminC || 0}%`;

    document.querySelector("#calcium").textContent =
      `${nutrition.calcium || 0}%`;

    document.querySelector("#iron").textContent = `${nutrition.iron || 0}%`;
  } catch (error) {
    console.log("Nutrition Error:", error);
  }
}
function getRecipeDetails() {
  if (recipesGrid.dataset.detailsBound === "true") {
    return;
  }

  recipesGrid.dataset.detailsBound = "true";

  recipesGrid.addEventListener("click", function (event) {
    var recipeCard = event.target.closest(".recipe-card");
    if (!recipeCard) {
      return;
    }
    var currentIndex = Number(recipeCard.dataset.index);
    currentRecipe = AllRecipes[currentIndex];
    console.log(currentRecipe);

    if (!currentRecipe) {
      return;
    }

    Rimage.src = currentRecipe.thumbnail;
    Rcategory.innerHTML = currentRecipe.category;
    Rerea.innerHTML = currentRecipe.area || "public";
    lastLetter.innerHTML = currentRecipe.name.split(" ").pop();
    Rname.innerHTML = currentRecipe.name;
    IngredientsLength.innerHTML = currentRecipe.ingredients.length;

    var IngredientsCols = "";

    for (var i = 0; i < currentRecipe.ingredients.length; i++) {
      IngredientsCols += `
        <div
          class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
        >
          <input
            type="checkbox"
            class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
          />
          <span class="text-gray-700">
            <span class="font-medium text-gray-900">${currentRecipe.ingredients[i].measure}</span>
            ${currentRecipe.ingredients[i].ingredient}
          </span>
        </div>`;
    }

    IngredientsGrid.innerHTML = IngredientsCols;

    var instructions = "";

    for (var i = 0; i < currentRecipe.instructions.length; i++) {
      instructions += `
        <div
          class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <div
            class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
          >
            ${i + 1}
          </div>
          <p class="text-gray-700 leading-relaxed pt-2">
            ${currentRecipe.instructions[i]}
          </p>
        </div>`;
    }

    instructionsGrid.innerHTML = instructions;

    if (currentRecipe.youtube) {
      var videoId = currentRecipe.youtube.split("v=")[1];
      youtupeFrame.src = videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : currentRecipe.youtube;
    }
    getNutritionFacts(currentRecipe);
    showSection("meal-details");
    window.location.hash = "meal-details";
  });
}

// =====================================================
// SEARCH BY NAME
// =====================================================

var barCodeGrid = document.querySelector("#products-grid");
var productsInput = document.querySelector("#product-search-input");
var searhByproductValue;
var productsByName = [];

async function getProductByName(productName) {
  var response = await fetch(
    `https://nutriplan-api.vercel.app/api/products/search?q=${productName}&page=1&limit=24`,
  );

  var products = await response.json();

  console.log(products.results);

  productsByName = products.results;

  DisplayByproductName();
}

function DisplayByproductName() {
  var productsByNameCard = "";

  for (var i = 0; i < productsByName.length; i++) {
    productsByNameCard += `
      <div
        class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
        data-barcode="${productsByName[i].barcode}"
      >

        <div
          class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
        >

          <img
            class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            src="${productsByName[i].image || "src/images/pic.webp"}"
            alt="${productsByName[i].name}"
            loading="lazy"
          />

          <!-- Nutri-Score Badge -->
          <div
            class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
          >
            Nutri-Score ${productsByName[i].nutritionGrade || "?"}
          </div>

          <!-- NOVA Badge -->
          <div
            class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
            title="NOVA ${productsByName[i].novaGroup || "?"}"
          >
            ${productsByName[i].novaGroup || "?"}
          </div>

        </div>

        <div class="p-4">

          <p
            class="text-xs text-emerald-600 font-semibold mb-1 truncate"
          >
            ${productsByName[i].brand || ""}
          </p>

          <h3
            class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
          >
            ${productsByName[i].name}
          </h3>

          <div
            class="flex items-center gap-3 text-xs text-gray-500 mb-3"
          >
            <span>
              <i class="fa-solid fa-weight-scale mr-1"></i>
              ${productsByName[i].nutrients?.carbs ?? "N/A"}g
            </span>

            <span>
              <i class="fa-solid fa-fire mr-1"></i>
              ${productsByName[i].nutrients?.calories ?? "N/A"} kcal/100g
            </span>
          </div>

          <!-- Mini Nutrition -->
          <div class="grid grid-cols-4 gap-1 text-center">

            <div class="bg-emerald-50 rounded p-1.5">
              <p class="text-xs font-bold text-emerald-700">
                ${productsByName[i].nutrients?.protein ?? "N/A"}g
              </p>
              <p class="text-[10px] text-gray-500">Protein</p>
            </div>

            <div class="bg-blue-50 rounded p-1.5">
              <p class="text-xs font-bold text-blue-700">
                ${productsByName[i].nutrients?.carbs ?? "N/A"}g
              </p>
              <p class="text-[10px] text-gray-500">Carbs</p>
            </div>

            <div class="bg-purple-50 rounded p-1.5">
              <p class="text-xs font-bold text-purple-700">
                ${productsByName[i].nutrients?.fat ?? "N/A"}g
              </p>
              <p class="text-[10px] text-gray-500">Fat</p>
            </div>

            <div class="bg-orange-50 rounded p-1.5">
              <p class="text-xs font-bold text-orange-700">
                ${productsByName[i].nutrients?.sugar ?? "N/A"}g
              </p>
              <p class="text-[10px] text-gray-500">Sugar</p>
            </div>

          </div>

        </div>

      </div>`;
  }

  barCodeGrid.innerHTML = productsByNameCard;
}

var searchBtn = document.querySelector("#search-product-btn");

searchBtn.addEventListener("click", function () {
  searhByproductValue = productsInput.value.toLowerCase();

  if (searhByproductValue.trim() !== "") {
    getProductByName(searhByproductValue);
  }
});

productsInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searhByproductValue = productsInput.value.toLowerCase();

    if (searhByproductValue.trim() !== "") {
      getProductByName(searhByproductValue);
    }
  }
});

// =====================================================
// FILTER BY NUTRI SCORE
// =====================================================

var filterBtn = document.querySelectorAll(".filter_letter button");

for (var i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    var grade = this.dataset.grade;
    var filteredcard = "";

    for (var i = 0; i < productsByName.length; i++) {
      // ALL
      if (grade === "") {
        filteredcard += `
          <div
            class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
            data-barcode="${productsByName[i].barcode}"
          >

            <div
              class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
            >

              <img
                class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                src="${productsByName[i].image || "src/images/pic.webp"}"
                alt="${productsByName[i].name}"
                loading="lazy"
              />

              <div
                class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
              >
                Nutri-Score ${productsByName[i].nutritionGrade || "?"}
              </div>

              <div
                class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
              >
                ${productsByName[i].novaGroup || "?"}
              </div>

            </div>

            <div class="p-4">

              <p
                class="text-xs text-emerald-600 font-semibold mb-1 truncate"
              >
                ${productsByName[i].brand || ""}
              </p>

              <h3
                class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
              >
                ${productsByName[i].name}
              </h3>

              <div
                class="flex items-center gap-3 text-xs text-gray-500 mb-3"
              >
                <span>
                  <i class="fa-solid fa-weight-scale mr-1"></i>
                  ${productsByName[i].nutrients?.carbs ?? "N/A"}g
                </span>

                <span>
                  <i class="fa-solid fa-fire mr-1"></i>
                  ${productsByName[i].nutrients?.calories ?? "N/A"} kcal/100g
                </span>
              </div>

              <div class="grid grid-cols-4 gap-1 text-center">

                <div class="bg-emerald-50 rounded p-1.5">
                  <p class="text-xs font-bold text-emerald-700">
                    ${productsByName[i].nutrients?.protein ?? "N/A"}g
                  </p>
                  <p class="text-[10px] text-gray-500">Protein</p>
                </div>

                <div class="bg-blue-50 rounded p-1.5">
                  <p class="text-xs font-bold text-blue-700">
                    ${productsByName[i].nutrients?.carbs ?? "N/A"}g
                  </p>
                  <p class="text-[10px] text-gray-500">Carbs</p>
                </div>

                <div class="bg-purple-50 rounded p-1.5">
                  <p class="text-xs font-bold text-purple-700">
                    ${productsByName[i].nutrients?.fat ?? "N/A"}g
                  </p>
                  <p class="text-[10px] text-gray-500">Fat</p>
                </div>

                <div class="bg-orange-50 rounded p-1.5">
                  <p class="text-xs font-bold text-orange-700">
                    ${productsByName[i].nutrients?.sugar ?? "N/A"}g
                  </p>
                  <p class="text-[10px] text-gray-500">Sugar</p>
                </div>

              </div>

            </div>

          </div>
        `;
      }

      // FILTER BY GRADE
      else if (grade == productsByName[i].nutritionGrade) {
        filteredcard += `
          <div
            class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
            data-barcode="${productsByName[i].barcode}"
          >

            <div
              class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
            >

              <img
                class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                src="${productsByName[i].image || "src/images/pic.webp"}"
                alt="${productsByName[i].name}"
                loading="lazy"
              />

              <div
                class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
              >
                Nutri-Score ${productsByName[i].nutritionGrade || "?"}
              </div>

              <div
                class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
              >
                ${productsByName[i].novaGroup || "?"}
              </div>

            </div>

            <div class="p-4">

              <p
                class="text-xs text-emerald-600 font-semibold mb-1 truncate"
              >
                ${productsByName[i].brand || ""}
              </p>

              <h3
                class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
              >
                ${productsByName[i].name}
              </h3>

              <div
                class="flex items-center gap-3 text-xs text-gray-500 mb-3"
              >
                <span>
                  <i class="fa-solid fa-weight-scale mr-1"></i>
                  ${productsByName[i].nutrients?.carbs ?? "N/A"}g
                </span>

                <span>
                  <i class="fa-solid fa-fire mr-1"></i>
                  ${productsByName[i].nutrients?.calories ?? "N/A"} kcal/100g
                </span>
              </div>

              <div class="grid grid-cols-4 gap-1 text-center">

                <div class="bg-emerald-50 rounded p-1.5">
                  <p class="text-xs font-bold text-emerald-700">
                    ${productsByName[i].nutrients?.protein ?? "N/A"}g
                  </p>
                  <p class="text-[10px] text-gray-500">Protein</p>
                </div>

                <div class="bg-blue-50 rounded p-1.5">
                  <p class="text-xs font-bold text-blue-700">
                    ${productsByName[i].nutrients?.carbs ?? "N/A"}g
                  </p>
                  <p class="text-[10px] text-gray-500">Carbs</p>
                </div>

                <div class="bg-purple-50 rounded p-1.5">
                  <p class="text-xs font-bold text-purple-700">
                    ${productsByName[i].nutrients?.fat ?? "N/A"}g
                  </p>
                  <p class="text-[10px] text-gray-500">Fat</p>
                </div>

                <div class="bg-orange-50 rounded p-1.5">
                  <p class="text-xs font-bold text-orange-700">
                    ${productsByName[i].nutrients?.sugar ?? "N/A"}g
                  </p>
                  <p class="text-[10px] text-gray-500">Sugar</p>
                </div>

              </div>

            </div>

          </div>
        `;
      }
    }

    if (filteredcard === "") {
      barCodeGrid.innerHTML = `
        <div class="flex flex-col items-center justify-center py-16 text-center">

          <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <i class="fa-solid fa-magnifying-glass text-3xl text-gray-400"></i>
          </div>

          <p class="text-2xl text-gray-600 max-w-md">
            No products found
          </p>

          <p class="text-gray-400 mt-2">
            Try a different filter
          </p>

        </div>
      `;
    } else {
      barCodeGrid.innerHTML = filteredcard;
    }
  });
}

// =====================================================
// SEARCH BY BARCODE
// =====================================================

var BarcodeInput = document.querySelector("#barcode-input");
var lookUpBtn = document.querySelector("#lookup-barcode-btn");
var searchValue;
var productResult = document.querySelector("#productResult");

BarcodeInput.addEventListener("input", function () {
  searchValue = BarcodeInput.value.toLowerCase();
});

lookUpBtn.addEventListener("click", function () {
  getProductByBarcode(searchValue);
});

BarcodeInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    getProductByBarcode(searchValue);
  }
});

var barCodeResult;

async function getProductByBarcode(barcode) {
  var response = await fetch(
    `https://nutriplan-api.vercel.app/api/products/barcode/${barcode}`,
  );

  var product = await response.json();

  console.log("*******************************************");
  console.log(product.result);

  barCodeResult = product.result;

  console.log("*******************************************");

  if (!barCodeResult) {
    productResult.innerHTML = "no Result By Id " + searchValue;

    barCodeGrid.innerHTML = `
      <div class="flex flex-col items-center justify-center py-16 text-center">

        <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
          <i class="fa-solid fa-box-open text-3xl text-gray-400"></i>
        </div>

        <p class="text-2xl text-gray-600 max-w-md">
          No products to display
        </p>

        <p class="text-gray-400 mt-2">
          Search for a product or browse by category
        </p>

      </div>
    `;

    return;
  }

  DisplayByBarCode();
}

function DisplayByBarCode() {
  var BarCodeCard = " ";

  productResult.innerHTML = "The Result By Id " + searchValue;

  BarCodeCard = `
    <div
      class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
      data-barcode="${barCodeResult.barcode}"
    >

      <div
        class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
      >

        <img
          class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
          src="${barCodeResult.image || "src/images/pic.webp"}"
          alt="${barCodeResult.name}"
          loading="lazy"
        />

        <div
          class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
        >
          Nutri-Score ${barCodeResult.nutritionGrade || "?"}
        </div>

        <div
          class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
        >
          ${barCodeResult.novaGroup || "?"}
        </div>

      </div>

      <div class="p-4">

        <p
          class="text-xs text-emerald-600 font-semibold mb-1 truncate"
        >
          ${barCodeResult.brand || ""}
        </p>

        <h3
          class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
        >
          ${barCodeResult.name}
        </h3>

        <div
          class="flex items-center gap-3 text-xs text-gray-500 mb-3"
        >

          <span>
            <i class="fa-solid fa-weight-scale mr-1"></i>
            ${barCodeResult.nutrients?.carbs ?? "N/A"}g
          </span>

          <span>
            <i class="fa-solid fa-fire mr-1"></i>
            ${barCodeResult.nutrients?.calories ?? "N/A"} kcal/100g
          </span>

        </div>

        <div class="grid grid-cols-4 gap-1 text-center">

          <div class="bg-emerald-50 rounded p-1.5">
            <p class="text-xs font-bold text-emerald-700">
              ${barCodeResult.nutrients?.protein ?? "N/A"}g
            </p>
            <p class="text-[10px] text-gray-500">Protein</p>
          </div>

          <div class="bg-blue-50 rounded p-1.5">
            <p class="text-xs font-bold text-blue-700">
              ${barCodeResult.nutrients?.carbs ?? "N/A"}g
            </p>
            <p class="text-[10px] text-gray-500">Carbs</p>
          </div>

          <div class="bg-purple-50 rounded p-1.5">
            <p class="text-xs font-bold text-purple-700">
              ${barCodeResult.nutrients?.fat ?? "N/A"}g
            </p>
            <p class="text-[10px] text-gray-500">Fat</p>
          </div>

          <div class="bg-orange-50 rounded p-1.5">
            <p class="text-xs font-bold text-orange-700">
              ${barCodeResult.nutrients?.sugar ?? "N/A"}g
            </p>
            <p class="text-[10px] text-gray-500">Sugar</p>
          </div>

        </div>

      </div>

    </div>
  `;

  barCodeGrid.innerHTML = BarCodeCard;
}

// =====================================================
// PRODUCT CATEGORIES
// =====================================================

var categoriesResArr = [];

async function productCategories() {
  var response = await fetch(
    `https://nutriplan-api.vercel.app/api/products/categories`,
  );

  var categoriesRes = await response.json();

  console.log("*******************************************");
  console.log(categoriesRes.results);

  categoriesResArr = categoriesRes.results;

  DisplayPRcategories();
}

var productCategoriesBtn = document.querySelector("#product-categories");

function DisplayPRcategories() {
  var catBtn = " ";

  for (var i = 0; i < categoriesResArr.length - 14; i++) {
    catBtn += `
      <button
        class="product-category-btn px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-emerald-200 transition-all"
        data-category="${categoriesResArr[i].name}"
      >
        <i class="fa-solid fa-cookie mr-1.5"></i>
        ${categoriesResArr[i].name}
      </button>
    `;
  }

  productCategoriesBtn.innerHTML = catBtn;

  var productCatBtn = document.querySelectorAll(".product-category-btn");

  for (var i = 0; i < productCatBtn.length; i++) {
    productCatBtn[i].addEventListener("click", function () {
      var category = this.dataset.category;

      getProductsByCategory(category);
    });
  }
}

var productsByCategory = [];

async function getProductsByCategory(category) {
  var response = await fetch(
    `https://nutriplan-api.vercel.app/api/products/category/${category.toLowerCase()}`,
  );

  var products = await response.json();

  console.log(products);

  productsByCategory = products.results;

  DisplayByCategory();
}

function DisplayByCategory() {
  var catFilterBtn = "";

  for (var i = 0; i < productsByCategory.length; i++) {
    catFilterBtn += `
      <div
        class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
        data-barcode="${productsByCategory[i].barcode}"
      >

        <div
          class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
        >

          <img
            class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            src="${productsByCategory[i].image || "src/images/pic.webp"}"
            alt="${productsByCategory[i].name}"
            loading="lazy"
          />

          <div
            class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
          >
            Nutri-Score ${productsByCategory[i].nutritionGrade || "?"}
          </div>

          <div
            class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
          >
            ${productsByCategory[i].novaGroup || "?"}
          </div>

        </div>

        <div class="p-4">

          <p
            class="text-xs text-emerald-600 font-semibold mb-1 truncate"
          >
            ${productsByCategory[i].brand || ""}
          </p>

          <h3
            class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
          >
            ${productsByCategory[i].name}
          </h3>

          <div
            class="flex items-center gap-3 text-xs text-gray-500 mb-3"
          >

            <span>
              <i class="fa-solid fa-weight-scale mr-1"></i>
              ${productsByCategory[i].nutrients?.carbs ?? "N/A"}g
            </span>

            <span>
              <i class="fa-solid fa-fire mr-1"></i>
              ${productsByCategory[i].nutrients?.calories ?? "N/A"} kcal/100g
            </span>

          </div>

          <div class="grid grid-cols-4 gap-1 text-center">

            <div class="bg-emerald-50 rounded p-1.5">
              <p class="text-xs font-bold text-emerald-700">
                ${productsByCategory[i].nutrients?.protein ?? "N/A"}g
              </p>
              <p class="text-[10px] text-gray-500">Protein</p>
            </div>

            <div class="bg-blue-50 rounded p-1.5">
              <p class="text-xs font-bold text-blue-700">
                ${productsByCategory[i].nutrients?.carbs ?? "N/A"}g
              </p>
              <p class="text-[10px] text-gray-500">Carbs</p>
            </div>

            <div class="bg-purple-50 rounded p-1.5">
              <p class="text-xs font-bold text-purple-700">
                ${productsByCategory[i].nutrients?.fat ?? "N/A"}g
              </p>
              <p class="text-[10px] text-gray-500">Fat</p>
            </div>

            <div class="bg-orange-50 rounded p-1.5">
              <p class="text-xs font-bold text-orange-700">
                ${productsByCategory[i].nutrients?.sugar ?? "N/A"}g
              </p>
              <p class="text-[10px] text-gray-500">Sugar</p>
            </div>

          </div>

        </div>

      </div>
    `;
  }

  barCodeGrid.innerHTML = catFilterBtn;
}

// =====================================================
// PRODUCT DETAILS MODAL
// =====================================================

var productModal = document.createElement("div");

productModal.className =
  "fixed inset-0 z-50 hidden bg-black/50 backdrop-blur-sm flex items-center justify-center p-4";

productModal.innerHTML = `
  <div
    id="product-modal-box"
    class="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
  >

    <div class="absolute top-4 right-4 flex items-center gap-2 z-10">
      <button
        id="close-product-modal"
        type="button"
        class="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all"
      >
        <i class="fa-solid fa-xmark"></i>
        Close
      </button>

      <button
        id="log-product-btn"
        type="button"
        class="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all"
      >
        <i class="fa-solid fa-clipboard-list mr-1"></i>
        Log This Food
      </button>
    </div>

    <div id="product-modal-content" class="p-6 pt-20"></div>

  </div>
`;

document.body.appendChild(productModal);

var productModalContent = document.querySelector("#product-modal-content");

var closeProductModal = document.querySelector("#close-product-modal");

var productModalBox = document.querySelector("#product-modal-box");

barCodeGrid.addEventListener("click", function (e) {
  var productCard = e.target.closest(".product-card");

  if (!productCard) {
    return;
  }

  var barcode = productCard.dataset.barcode;

  if (!barcode) {
    return;
  }

  getProductDetails(barcode);
});

function closeProductModalView() {
  productModal.classList.add("hidden");
}

closeProductModal.addEventListener("click", function () {
  closeProductModalView();
});

productModal.addEventListener("click", function (e) {
  if (e.target === productModal) {
    closeProductModalView();
  }
});

async function getProductDetails(barcode) {
  var response = await fetch(
    `https://nutriplan-api.vercel.app/api/products/barcode/${barcode}`,
  );

  var product = await response.json();

  if (!product.result) {
    return;
  }

  DisplayProductDetails(product.result);
}
var selectedProduct;

var logProductBtn = document.querySelector("#log-product-btn");
function DisplayProductDetails(product) {
  selectedProduct = product;
  var ingredients = product.ingredients || "No ingredients available";

  productModalContent.innerHTML = `

    <div class="grid grid-cols-1 md:grid-cols-[170px_1fr] gap-6">

      <div class="flex justify-center">

        <img
          class="w-40 h-40 object-contain rounded-xl bg-gray-100"
          src="${product.image || "src/images/pic.webp"}"
          alt="${product.name || "Product"}"
        />

      </div>

      <div>

        <p class="text-emerald-600 font-semibold mb-2">
          ${product.brand || "Unknown brand"}
        </p>

        <h2 class="text-2xl font-bold text-gray-900 mb-3">
          ${product.name || "Unknown product"}
        </h2>

        <p class="text-gray-500 mb-4">
          ${product.quantity || ""}
        </p>

        <div class="flex gap-3">

          <div class="px-4 py-2 rounded-xl bg-red-100">
            <p class="text-2xl font-bold text-red-600">
              ${product.nutritionGrade || "?"}
            </p>
            <p class="text-xs text-gray-500">
              Nutri-Score
            </p>
          </div>

          <div class="px-4 py-2 rounded-xl bg-orange-100">
            <p class="text-2xl font-bold text-orange-600">
              ${product.novaGroup || "?"}
            </p>
            <p class="text-xs text-gray-500">
              NOVA
            </p>
          </div>

        </div>

      </div>

    </div>

    <div class="mt-6 bg-emerald-50 rounded-2xl p-6">

      <h3 class="text-xl font-bold text-gray-900 mb-6">
        <i class="fa-solid fa-chart-pie text-emerald-600 mr-2"></i>
        Nutrition Facts
        <span class="text-sm font-normal text-gray-500">
          (per 100g)
        </span>
      </h3>

      <div class="text-center mb-6">
        <p class="text-5xl font-bold text-gray-900">
          ${product.nutrients?.calories ?? "N/A"}
        </p>
        <p class="text-gray-500">Calories</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="text-center">
          <p class="text-2xl font-bold text-emerald-600">
            ${product.nutrients?.protein ?? "N/A"}g
          </p>
          <p class="text-sm text-gray-500">Protein</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-blue-600">
            ${product.nutrients?.carbs ?? "N/A"}g
          </p>
          <p class="text-sm text-gray-500">Carbs</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-purple-600">
            ${product.nutrients?.fat ?? "N/A"}g
          </p>
          <p class="text-sm text-gray-500">Fat</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-orange-600">
            ${product.nutrients?.sugar ?? "N/A"}g
          </p>
          <p class="text-sm text-gray-500">Sugar</p>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-emerald-200">
        <div class="text-center">
          <p class="text-xl font-bold text-gray-900">
            ${product.nutrients?.saturatedFat ?? "N/A"}g
          </p>
          <p class="text-sm text-gray-500">Saturated Fat</p>
        </div>
        <div class="text-center">
          <p class="text-xl font-bold text-gray-900">
            ${product.nutrients?.fiber ?? "N/A"}g
          </p>
          <p class="text-sm text-gray-500">Fiber</p>
        </div>
        <div class="text-center">
          <p class="text-xl font-bold text-gray-900">
            ${product.nutrients?.salt ?? "N/A"}g
          </p>
          <p class="text-sm text-gray-500">Salt</p>
        </div>
      </div>

    </div>

    <div class="mt-6 bg-gray-50 rounded-2xl p-6">
      <h3 class="text-xl font-bold text-gray-900 mb-4">
        <i class="fa-solid fa-list text-gray-600 mr-2"></i>
        Ingredients
      </h3>

      <p class="text-gray-700 leading-relaxed">
        ${Array.isArray(ingredients) ? ingredients.join(", ") : ingredients}
      </p>
    </div>
  `;

  productModal.classList.remove("hidden");
}

logProductBtn.addEventListener("click", function () {
  if (!selectedProduct) {
    return;
  }

  var loggedProduct = {
    name: selectedProduct.name,
    image: selectedProduct.image,

    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),

    calories: selectedProduct.nutrients?.calories || 0,
    protein: selectedProduct.nutrients?.protein || 0,
    carbs: selectedProduct.nutrients?.carbs || 0,
    fat: selectedProduct.nutrients?.fat || 0,
    fiber: selectedProduct.nutrients?.fiber || 0,
  };

  foodLog.push(loggedProduct);

  localStorage.setItem("foodLog", JSON.stringify(foodLog));

  displayFoodLog();

  closeProductModalView();

  console.log("Logged Product:", loggedProduct);
  console.log("Food Log:", foodLog);
});
// =====================================================
// NAVIGATION BETWEEN PAGES
// =====================================================

var navLinks = document.querySelectorAll(".nav-link");
var searchFiltersSection = document.querySelector("#search-filters-section");
var mealCategoriesSection = document.querySelector("#meal-categories-section");
var allRecipesSection = document.querySelector("#all-recipes-section");
var mealDetailsSection = document.querySelector("#meal-details");
var productsSection = document.querySelector("#products-section");
var foodlogSection = document.querySelector("#foodlog-section");
var headerTitle = document.querySelector("#header h1");
var headerDescription = document.querySelector("#header p");
var backToMealsBtn = document.querySelector("#back-to-meals-btn");

function showSection(sectionName) {
  searchFiltersSection.style.display = "none";
  mealCategoriesSection.style.display = "none";
  allRecipesSection.style.display = "none";
  mealDetailsSection.style.display = "none";
  productsSection.style.display = "none";
  foodlogSection.style.display = "none";

  if (sectionName === "meals") {
    searchFiltersSection.style.display = "block";
    mealCategoriesSection.style.display = "block";
    allRecipesSection.style.display = "block";
    headerTitle.innerHTML = "Meals & Recipes";
    headerDescription.innerHTML =
      "Discover delicious and nutritious recipes tailored for you";
  }

  if (sectionName === "meal-details") {
    mealDetailsSection.style.display = "block";
    headerTitle.innerHTML = "Meal Details";
    headerDescription.innerHTML =
      "Explore ingredients, instructions, and recipe details";
  }

  if (sectionName === "products") {
    productsSection.style.display = "block";
    headerTitle.innerHTML = "Product Scanner";
    headerDescription.innerHTML =
      "Search for packaged food products and view nutrition information";
  }

  if (sectionName === "foodlog") {
    foodlogSection.style.display = "block";
    headerTitle.innerHTML = "Daily Food Log";
    headerDescription.innerHTML =
      "Track and monitor your daily nutrition intake";
  }
}

function setActiveNav(activeLink) {
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove("bg-emerald-50", "text-emerald-700");
    navLinks[i].classList.add("text-gray-600", "hover:bg-gray-50");

    var navText = navLinks[i].querySelector("span");

    if (navText) {
      navText.classList.remove("font-semibold");
      navText.classList.add("font-medium");
    }
  }

  activeLink.classList.remove("text-gray-600", "hover:bg-gray-50");
  activeLink.classList.add("bg-emerald-50", "text-emerald-700");

  var activeText = activeLink.querySelector("span");

  if (activeText) {
    activeText.classList.remove("font-medium");
    activeText.classList.add("font-semibold");
  }
}

for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function (e) {
    e.preventDefault();

    var navText = this.querySelector("span").textContent.trim();

    if (navText === "Meals & Recipes") {
      showSection("meals");
      window.location.hash = "home";
    } else if (navText === "Product Scanner") {
      showSection("products");
      window.location.hash = "products";
    } else if (navText === "Food Log") {
      showSection("foodlog");
      window.location.hash = "foodlog";
    }

    setActiveNav(this);
  });
}

if (backToMealsBtn) {
  backToMealsBtn.addEventListener("click", function () {
    showSection("meals");
    window.location.hash = "home";
  });
}

function openPageFromHash() {
  var hash = window.location.hash;

  if (hash === "#products") {
    showSection("products");
    setActiveNav(navLinks[1]);
  } else if (hash === "#foodlog") {
    showSection("foodlog");
    setActiveNav(navLinks[2]);
  } else {
    showSection("meals");
    setActiveNav(navLinks[0]);
  }
}

window.addEventListener("hashchange", openPageFromHash);

openPageFromHash();
productCategories();

console.log("FOOD LOG JS LOADED");

var foodLog = JSON.parse(localStorage.getItem("foodLog")) || [];
var loggedItems = document.querySelector("#logged-items-list");
var loggedItemsCount = document.querySelector("#logged-items-count");
var clearFoodLog = document.querySelector("#clear-foodlog");
function displayFoodLog() {
  loggedItemsCount.innerHTML = `Logged Items (${foodLog.length})`;

  if (foodLog.length > 0) {
    clearFoodLog.style.display = "block";
  } else {
    clearFoodLog.style.display = "none";
  }

  var loggedCard = "";

  if (foodLog.length === 0) {
    loggedItems.innerHTML = `
      <div class="text-center py-8 text-gray-500">
        <i class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"></i>
        <p class="font-medium">No meals logged today</p>
        <p class="text-sm">
          Add meals from the Meals page or scan products
        </p>
      </div>
    `;

    return;
  }

  for (var i = 0; i < foodLog.length; i++) {
    loggedCard += `
      <div class="bg-gray-50 rounded-xl p-3 flex items-center justify-between">

        <div class="flex items-center gap-4">

          <div class="w-16 h-16 rounded-xl bg-gray-200 flex items-center justify-center overflow-hidden">
            ${
              foodLog[i].image
                ? `<img src="${foodLog[i].image}" class="w-full h-full object-cover">`
                : `<i class="fa-solid fa-utensils text-gray-400 text-xl"></i>`
            }
          </div>

          <div>
            <h4 class="font-semibold text-gray-900">
              ${foodLog[i].name}
            </h4>

            <p class="text-sm text-gray-500">
              1 serving
              <span class="mx-1">•</span>
              <span class="text-emerald-600">Recipe</span>
            </p>

            <p class="text-sm text-gray-400">
              ${foodLog[i].time || ""}
            </p>
          </div>

        </div>

        <div class="flex items-center gap-4">

          <div class="text-center">
            <p class="font-bold text-emerald-600 text-lg">
              ${foodLog[i].calories || 0}
            </p>
            <p class="text-xs text-gray-500">kcal</p>
          </div>

          <span class="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-sm">
            ${foodLog[i].protein || 0}g P
          </span>

          <span class="px-3 py-1 rounded-lg bg-yellow-50 text-yellow-600 text-sm">
            ${foodLog[i].carbs || 0}g C
          </span>

          <span class="px-3 py-1 rounded-lg bg-red-50 text-red-600 text-sm">
            ${foodLog[i].fat || 0}g F
          </span>

          <i  data-index="${i}" class="delete-food fa-solid fa-trash text-gray-400 cursor-pointer"></i>

        </div>

      </div>
    `;
  }

  loggedItems.innerHTML = loggedCard;
  var deleteButtons = document.querySelectorAll(".delete-food");
  for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function () {
      var index = Number(this.dataset.index);

      foodLog.splice(index, 1);

      localStorage.setItem("foodLog", JSON.stringify(foodLog));

      displayFoodLog();
    });
  }
}
clearFoodLog.addEventListener("click", function () {
  foodLog = [];

  localStorage.setItem("foodLog", JSON.stringify(foodLog));

  displayFoodLog();
});
var logMealBtn = document.querySelector("#log-meal-btn");

async function logMeal() {
  var loggedMeal = {
    name: currentRecipe.name,
    image: currentRecipe.thumbnail,
    category: currentRecipe.category,
    area: currentRecipe.area,
    lastLetter: currentRecipe.name.split(" ").pop(),

    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  // Convert ingredients objects to strings
  var ingredients = currentRecipe.ingredients.map(function (item) {
    return item.measure + " " + item.ingredient;
  });

  console.log("Ingredients sent to API:", ingredients);

  try {
    var response = await fetch(
      "https://nutriplan-api.vercel.app/api/nutrition/analyze",
      {
        method: "POST",

        headers: {
          "x-api-key": "YMh7GruTkdeU3tKDtMLg1iQswonYM0lNVGUGQTrI",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          recipeName: currentRecipe.name,
          ingredients: ingredients,
        }),
      },
    );

    var result = await response.json();

    console.log("Nutrition API Result:", result);

    // Stop if API failed
    if (!result.success) {
      console.log("Nutrition API failed:", result.error);

      return;
    }

    // Add nutrition data
    loggedMeal.calories = result.data.perServing.calories;
    loggedMeal.protein = result.data.perServing.protein;
    loggedMeal.fat = result.data.perServing.fat;
    loggedMeal.carbs = result.data.perServing.carbs;
    loggedMeal.fiber = result.data.perServing.fiber;

    // Add meal to food log
    foodLog.push(loggedMeal);

    // Save food log
    localStorage.setItem("foodLog", JSON.stringify(foodLog));

    // Display food log
    displayFoodLog();

    console.log("Food Log:", foodLog);
  } catch (error) {
    console.log("Error:", error);
  }
}

logMealBtn.addEventListener("click", logMeal);
displayFoodLog();
// ==============================
// Display Food Log Items
// ==============================

function showLoggedItems() {
  var cartona = "";

  if (foodLog.length === 0) {
    loggedItems.innerHTML = `
      <div class="text-center py-8 text-gray-500">
        <i
          class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"
        ></i>
        <p class="font-medium">No meals logged today</p>
        <p class="text-sm">
          Add meals from the Meals page or scan products
        </p>
      </div>
    `;

    document.querySelector("#logged-items-count").textContent =
      "Logged Items (0)";

    document.querySelector("#clear-foodlog").style.display = "none";

    return;
  }

  for (var i = 0; i < foodLog.length; i++) {
    var item = foodLog[i];

    cartona += `
      <div class="flex items-center justify-between bg-gray-50 rounded-xl p-3 border border-gray-200">

        <div class="flex items-center gap-3">

          <div class="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
            <i class="fa-solid fa-utensils text-emerald-600"></i>
          </div>

          <div>
            <p class="font-semibold text-gray-900">
              ${item.name || item.recipeName || item.title}
            </p>

            <p class="text-sm text-gray-500">
              ${item.calories || 0} kcal
            </p>
          </div>

        </div>

        <button
          class="remove-food-btn text-red-500 hover:text-red-600"
          data-index="${i}"
        >
          <i class="fa-solid fa-trash"></i>
        </button>

      </div>
    `;
  }

  loggedItems.innerHTML = cartona;

  document.querySelector("#logged-items-count").textContent =
    `Logged Items (${foodLog.length})`;

  document.querySelector("#clear-foodlog").style.display = "block";
}

// ==============================
// Remove One Item
// ==============================

loggedItems.addEventListener("click", function (e) {
  var button = e.target.closest(".remove-food-btn");

  if (!button) {
    return;
  }

  var index = Number(button.dataset.index);

  foodLog.splice(index, 1);

  localStorage.setItem("foodLog", JSON.stringify(foodLog));

  showLoggedItems();
});

// ==============================
// Clear All
// ==============================

document.querySelector("#clear-foodlog").addEventListener("click", function () {
  foodLog = [];

  localStorage.setItem("foodLog", JSON.stringify(foodLog));

  showLoggedItems();
});

// ==============================
// Nutrition
// ==============================

function calculateNutrition() {
  var calories = 0;
  var protein = 0;
  var carbs = 0;
  var fat = 0;

  for (var i = 0; i < foodLog.length; i++) {
    calories += Number(foodLog[i].calories) || 0;
    protein += Number(foodLog[i].protein) || 0;
    carbs += Number(foodLog[i].carbs) || 0;
    fat += Number(foodLog[i].fat) || 0;
  }

  return {
    calories: calories,
    protein: protein,
    carbs: carbs,
    fat: fat,
  };
}

// ==============================
// Update Nutrition Progress
// ==============================

function updateNutrition() {
  var nutrition = calculateNutrition();

  var cards = document.querySelectorAll("#foodlog-today-section .grid > div");

  cards[0].querySelector("span:last-child").textContent =
    `${nutrition.calories} / 2000 kcal`;

  cards[0].querySelector(".bg-emerald-500").style.width =
    Math.min((nutrition.calories / 2000) * 100, 100) + "%";

  cards[1].querySelector("span:last-child").textContent =
    `${nutrition.protein} / 50 g`;

  cards[1].querySelector(".bg-blue-500").style.width =
    Math.min((nutrition.protein / 50) * 100, 100) + "%";

  
  cards[2].querySelector("span:last-child").textContent =
    `${nutrition.carbs} / 250 g`;

  cards[2].querySelector(".bg-amber-500").style.width =
    Math.min((nutrition.carbs / 250) * 100, 100) + "%";

  cards[3].querySelector("span:last-child").textContent =
    `${nutrition.fat} / 65 g`;

  cards[3].querySelector(".bg-purple-500").style.width =
    Math.min((nutrition.fat / 65) * 100, 100) + "%";
}

// ==============================
// Date
// ==============================

function displayFoodLogDate() {
  var today = new Date();

  var options = {
    weekday: "long",
    month: "short",
    day: "numeric",
  };

  document.querySelector("#foodlog-date").textContent =
    today.toLocaleDateString("en-US", options);
}
function displayWeeklyChart() {
  var weeklyChart = document.querySelector("#weekly-chart");

  var today = new Date();
  var day = today.getDay();

  // Monday = 0 ... Sunday = 6
  var monday = new Date(today);
  monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));
  monday.setHours(0, 0, 0, 0);

  var days = [];

  for (var i = 0; i < 7; i++) {
    var date = new Date(monday);
    date.setDate(monday.getDate() + i);

    days.push(date);
  }

  var cartona = `
    <div class="grid grid-cols-7 gap-2 w-full">
  `;

  for (var i = 0; i < days.length; i++) {
    var currentDate = days[i];

    var dayName = currentDate.toLocaleDateString("en-US", {
      weekday: "short",
    });

    var dateNumber = currentDate.getDate();

    var totalCalories = 0;
    var itemsCount = 0;

    for (var j = 0; j < foodLog.length; j++) {
      var item = foodLog[j];

      var itemDate = item.date || item.loggedAt || item.createdAt;

      var itemCalories =
        Number(item.calories) || Number(item.nutrition?.calories) || 0;

      if (!itemDate) {
        itemDate = new Date();
      } else {
        itemDate = new Date(itemDate);
      }

      if (
        itemDate.getFullYear() === currentDate.getFullYear() &&
        itemDate.getMonth() === currentDate.getMonth() &&
        itemDate.getDate() === currentDate.getDate()
      ) {
        totalCalories += itemCalories;
        itemsCount++;
      }
    }

    var isToday = currentDate.toDateString() === today.toDateString();

    cartona += `
      <div
        class="text-center py-2 px-2 rounded-2xl ${
          isToday ? "bg-indigo-100" : ""
        }"
      >

        <p class="text-sm text-gray-500 mb-1">
          ${dayName}
        </p>

        <p class="text-lg font-medium text-gray-900 mb-4">
          ${dateNumber}
        </p>

        <p
          class="text-xl font-bold ${
            totalCalories > 0 ? "text-emerald-600" : "text-gray-300"
          }"
        >
          ${totalCalories}
        </p>

        <p
          class="text-sm ${
            totalCalories > 0 ? "text-emerald-500" : "text-gray-300"
          }"
        >
          kcal
        </p>

        <p class="text-xs text-gray-400 mt-2">
          ${itemsCount} items
        </p>

      </div>
    `;
  }

  cartona += `</div>`;

  weeklyChart.innerHTML = cartona;

  weeklyChart.className =
    "min-h-64 bg-white rounded-xl flex items-center justify-center";
}
function updateWeeklyStats() {
  var weeklyAverage = document.querySelector("#weekly-average");
  var weeklyTotalItems = document.querySelector("#weekly-total-items");
  var daysOnGoal = document.querySelector("#days-on-goal");

  var totalCalories = 0;
  var totalItems = foodLog.length;

  for (var i = 0; i < foodLog.length; i++) {
    totalCalories += Number(foodLog[i].calories) || 0;
  }

  var average = totalCalories / 7;

  weeklyAverage.textContent = Math.round(average) + " kcal";
  weeklyTotalItems.textContent = totalItems + " items";

  var goalDays = 0;

  if (totalCalories >= 2000) {
    goalDays = 1;
  }

  daysOnGoal.textContent = goalDays + " / 7";
}

updateWeeklyStats();
// ==============================
// Run
// ==============================
displayWeeklyChart();
showLoggedItems();
updateNutrition();
displayFoodLogDate();
