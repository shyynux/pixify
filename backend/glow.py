import cv2
import numpy as np

def add_glowy_border(input_path, output_path, pixel_size, glow_intensity):
    # Read the image
    image = cv2.imread(input_path)

    # Create a mask for the object you want to enhance
    mask = cv2.inRange(image, (0, 0, 0), (0, 0, 0))  # Define a mask for the object

    # Apply a Gaussian blur to the mask to create the "glow" effect
    mask = cv2.GaussianBlur(mask, (glow_intensity, glow_intensity), 0)

    # Create an inverse mask
    inverse_mask = cv2.bitwise_not(mask)

    # Convert the image to grayscale
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Combine the inverse mask with the grayscale image to create a shiny border
    shiny_border = cv2.add(gray_image, inverse_mask)

    # Merge the shiny border with the original image
    result = cv2.merge((shiny_border, shiny_border, shiny_border))

    # Save the resulting image
    cv2.imwrite(output_path, result)

# Example usage
input_image_path = "images/input.jpg"  # Replace with the path to your input image
output_image_path = "images/glowy_border_image.jpg"  # Replace with the desired output path
pixel_size = 10  # Adjust this value to control the pixelation level
glow_intensity = 15  # Adjust this value to control the glow intensity

add_glowy_border(input_image_path, output_image_path, pixel_size, glow_intensity)