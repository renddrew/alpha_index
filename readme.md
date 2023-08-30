# Alpha Index Page Scroll


## Overview

Code that provides a dynamic way to index and scroll through webpage content based on alphabetic categorization of headings. When users click on a particular letter in the index, the page will smoothly scroll to sections whose headings start with that letter.

## Demo

Check out the live demo of the project here: [Demo](https://renddrew.github.io/alpha_index/)

## Features

1. **Fixed Header**: A header that remains at the top of the page regardless of scrolling. This is achieved using the `position: fixed` CSS property.

2. **Dynamic Alphabetical Index**: Located just below the header, this sticky index has letters from 'A' to 'Z' and an 'All' option. Each letter links to sections of content starting with that letter.

3. **Content Filtering**: When a letter is clicked, only sections beginning with that letter are displayed. Clicking on 'All' shows all the sections.

4. **Smooth Scrolling**: When you click on a letter with associated content, the page smoothly scrolls to the first section with a heading that starts with that letter.

## How to Use

To integrate the `AlphaIndex` function into your webpage, follow these steps:

1. **Include the JavaScript**: Ensure that the necessary JavaScript code (including the `AlphaIndex` function definition) is either linked or embedded in your HTML.

2. **Initialize the Function**: Add the following script to initialize the `AlphaIndex` function once your content has loaded:

    ```javascript
    <script>
        // Usage
        document.addEventListener("DOMContentLoaded", function () {
          new AlphaIndex({
            contentSelector: ".content",
            headings: ["h2", "h3", "h4"],
            indexTargetSelector: "#alphIndex-links",
            offsetHeight: 190, // Example offset height for a fixed header
          });
        });
    </script>
    ```

3. **Customize**: You can customize the behavior of the `AlphaIndex` function by modifying the parameters:

   - `contentSelector`: The CSS selector of the content to index.
   - `headings`: An array of heading elements (like "h2", "h3", etc.) to be indexed.
   - `indexTargetSelector`: The CSS selector of the container where the generated index should be inserted.
   - `offsetHeight`: The offset from the top of the viewport (useful if you have fixed headers or other elements at the top of the page).


## How It Works

- **Generating Slugs**: The `alphaListGenerateSlug()` function is used to convert headings into URL-friendly slugs.
  
- **Building the Index**: The script scans the content for headings (`h2`, `h3`, `h4`) and maps them to their starting letter. This map is used to generate clickable letters in the alphabetic index.

- **Content Filtering**: When a letter in the index is clicked, the script hides all content sections. Then, it displays only those sections that begin with the clicked letter. Clicking the 'All' option will display all sections.

- **Smooth Scrolling**: When a letter with associated content is clicked, the page uses the `window.scrollTo()` method with the 'smooth' behavior to navigate to the first section associated with that letter.

## Limitations

- The current implementation is based on English alphabets and might need modifications to support other languages or scripts.

## Conclusion

The Alpha Index Page Scroll is a user-friendly way to navigate long content pages, especially when the content can be categorized alphabetically.
