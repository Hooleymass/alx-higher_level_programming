import random

# Generate a random signed number between -10000 and 10000
number = random.randint(-10000, 10000)

# Function to get the last digit of a number
def get_last_digit(number):
    absolute_number = abs(number)
    last_digit = absolute_number % 10
    return last_digit

# Get the last digit of the number
last_digit = get_last_digit(number)

# Check the last digit
if last_digit > 5:
    result = "is greater than 5"
elif last_digit == 0:
    result = "is 0"
else:
    result = "is less than 6 and not 0"

# Print the result
print(f"Last digit of {number} is {last_digit} and {result}")

