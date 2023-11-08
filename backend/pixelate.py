import cv2

def pixelate_image(input_path, output_path, pixel_size):
    # Read the image
    image = cv2.imread(input_path)
    
    # Get the height and width of the image
    height, width = image.shape[:2]

    # Resize the image to a smaller size
    small_image = cv2.resize(image, (width // pixel_size, height // pixel_size), interpolation=cv2.INTER_LINEAR)

    # Resize the small image back to the original size
    pixelated_image = cv2.resize(small_image, (width, height), interpolation=cv2.INTER_NEAREST)

    # Save the pixelated image
    cv2.imwrite(output_path, pixelated_image)

# Example usage
input_image_path = "images/input.jpg"  # Replace with the path to your input image
output_image_path = "images/pixelated_image.jpg"  # Replace with the desired output path
pixel_size = 6  # Adjust this value to control the pixelation level

pixelate_image(input_image_path, output_image_path, pixel_size)
