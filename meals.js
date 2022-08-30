const loadData = (search) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
}
const displayMeals = meals => {
    // console.log(meals)
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML = '';
    meals.forEach(meal => {
        // console.log(meal)
        const mealDiv = document.createElement('div')
        mealDiv.classList.add('col')
        mealDiv.innerHTML = `
        <div class="card">
        <img  src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 180)}</p>
            <button class="btn btn-warning w-100" onclick="loadMealDetails(${meal.idMeal})">Details</button>
        </div>
    </div>
        
        `
        mealsContainer.appendChild(mealDiv)
    });
}

const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    loadData(searchText)
}

const loadMealDetails = idMeal => {
    // console.log(idMeal)
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaymealDetails(data.meals[0]))
}

const displaymealDetails = meal => {
    console.log(meal)
    const detailContainer = document.getElementById('detail-container');
    detailContainer.innerHTML = '';
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('card')
    mealDiv.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h3 class="card-title">${meal.strMeal}</h3>
    <h5>Area: ${meal.strArea}</h5>
    <h6>Flavours: <span>${meal.strIngredient1}, ${meal.strIngredient3}, ${meal.strIngredient6}, ${meal.strIngredient10}, ${meal.strIngredient5}, ${meal.strIngredient11}, ${meal.strIngredient12} etc.</h6>
    <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
    <button class="btn w-100 btn-warning">Order Now</button>
  </div>
    `;
    detailContainer.appendChild(mealDiv)
}

loadData('')
// ('pizza')
// loadData('fish')