import cv2

def pixelate_image(input_path, output_path, pixel_size):
    # Read the image
    print("Input Path:", input_path)
    image = cv2.imread(input_path)
    
    # Get the height and width of the image
    height, width = image.shape[:2]

    print("height is - ", height)
    print("Width is - ", width)
    print("type of height and width is - ", type(height), type(width))

    print("hello and welcome boo")
    #test
    if image is not None:
        print('variable is not None')
        print(image.shape)
    else:
        print('variable is None')           

    # Resize the image to a smaller size
    small_image = cv2.resize(image, (width // pixel_size, height // pixel_size), interpolation=cv2.INTER_LINEAR)

    # Resize the small image back to the original size
    pixelated_image = cv2.resize(small_image, (width, height), interpolation=cv2.INTER_NEAREST)

    # Save the pixelated image
    cv2.imwrite(output_path, pixelated_image)

