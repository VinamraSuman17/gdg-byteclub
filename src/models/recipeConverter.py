import pandas as pd

# Load the conversion CSV file
csv_file = "/content/baking_ingredients_conversion.csv" 
df = pd.read_csv(csv_file)

# Convert the CSV data into a dictionary
conversion_dict = {}
for _, row in df.iterrows():
    ingredient = row['Ingredient'].strip().lower()
    conversion_dict[ingredient] = {
        "cup": row["1 Cup (g)"],
        "tbsp": row["1 Tbsp (g)"],
        "tsp": row["1 Tsp (g)"]
    }

# Function to convert recipe to grams
def convert_recipe_to_grams(recipe, conversion_dict):
    converted_recipe = []
    
    for ingredient, amount, unit in recipe:
        ingredient_lower = ingredient.strip().lower()
        if ingredient_lower in conversion_dict and unit in conversion_dict[ingredient_lower]:
            grams = amount * conversion_dict[ingredient_lower][unit]
            converted_recipe.append((ingredient, grams, "g"))
        else:
            converted_recipe.append((ingredient, "Conversion not available", ""))
    
    return converted_recipe

# Ask the user for their recipe
recipe_in_cups = []
while True:
    ingredient = input("Enter ingredient name (or type 'done' to finish): ").strip()
    if ingredient.lower() == 'done':
        break
    
    amount = float(input(f"Enter amount of {ingredient}: "))
    unit = input("Enter unit (cup/tbsp/tsp): ").strip().lower()
    
    recipe_in_cups.append((ingredient, amount, unit))

# Convert the user-input recipe to grams
converted_recipe = convert_recipe_to_grams(recipe_in_cups, conversion_dict)

# Display the converted recipe
print("\nConverted Recipe:")
for item in converted_recipe:
    print(f"{item[0]}: {item[1]} {item[2]}")