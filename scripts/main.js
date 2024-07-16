


// FUNCTION DEFINITIONS  
function getEnable(callback) {
    chrome.storage.local.get('enable', function(result) {
      var enableValue = result.enable;
      if (typeof enableValue === 'undefined') {
        // If the value is not set, default to false
        enableValue = false;
      }
      callback(enableValue);
    });
  }

  function getSelectedColor(callback) {
    chrome.storage.local.get('selectedColor', function(result) {
      var selectedColor = result.selectedColor;
      if (typeof selectedColor === 'undefined') {
        // If the value is not set, default to false
        selectedColor = "BW-Light";
      }
      callback(selectedColor);
    });
  }


  function getremoveImages(callback) {
    chrome.storage.local.get('removeImages', function(result) {
      var removeImagesValue = result.removeImages;
      if (typeof removeImagesValue === 'undefined') {
        // If the value is not set, default to false
        removeImagesValue = false;
      }
      callback(removeImagesValue);
    });
  }


// FUNCTION DECLARATIONS

//   This function checks options have been enabled
getEnable(function(enableValue) {

    // If the function is enabled then activate changes
    if(enableValue == true){
        
        //   This function checks options have been enabled
        getSelectedColor(function(selectedColor) {

        // If the function is enabled then activate changes
        if(selectedColor == "BW-Light"){
            // print("BW-Light")
            set_to_bw_light()

        }else if(selectedColor == "BW-Dark"){
            // print("BW-Dark")
            set_to_bw_dark()
        }else if(selectedColor == "Increase-Contrast"){
            // print("Increase-Contrast")
            increaseContrast()
        }else{
            // print("No valid selected color defaulting to BW-Dark")
            print(selectedColor)
            set_to_bw_light()
        }
});


    }
});

getremoveImages(function(removeImagesValue) {
    if(removeImagesValue == true){

        getSelectedColor(function(selectedColor) {

            // If the function is enabled then activate changes
            if(selectedColor == "BW-Light"){
                // print("BW-Light")
                set_images_to_white()

            }else if(selectedColor == "BW-Dark"){
                // print("BW-Dark")
                set_images_to_black()
            }else if(selectedColor == "Increase-Contrast"){
                // print("Increase-Contrast")
                set_images_to_white()
            }else{
                // print("No valid selected color defaulting to BW-Dark")
                print(selectedColor)
                set_images_to_white()
            }
    });

    }
  });








// BW-Light

function set_to_bw_light(){
// gets an array of all the elements on that game
var allElements = document.querySelectorAll('*');

// Iterate through each element
for (var i = 0; i < allElements.length; i++) {

    // gets the css style of the element
    var computedStyle = window.getComputedStyle(allElements[i]);

    // gets the rgb values of the color
    var rgbColor = computedStyle.getPropertyValue('color');

    // Gets the RGB components
    var rgbComponents = rgbColor.match(/\d+/g);
    // Convert the RGB components to hexadecimal
    var hexColor = '#' + ((1 << 24) + (parseInt(rgbComponents[0]) << 16) + (parseInt(rgbComponents[1]) << 8) + parseInt(rgbComponents[2])).toString(16).slice(1);


    // gets the rgb values of the background color
    var rgbBackgroundColor = computedStyle.getPropertyValue('background-color');

    // Parse the RGB components
    var rgbPropertyComponents = rgbColor.match(/\d+/g);

    // Convert the RGB components to hexadecimal
    var hexBackgroundColor = '#' + ((1 << 24) + (parseInt(rgbPropertyComponents[0]) << 16) + (parseInt(rgbPropertyComponents[1]) << 8) + parseInt(rgbPropertyComponents[2])).toString(16).slice(1);


    // console.log("Background Color =", hexBackgroundColor);

    // changes the colors to be clearly distinguistable
    allElements[i].style.color = "#0E0E0E";
    allElements[i].style.backgroundColor = "#eeeeee";
    allElements[i].style.borderColor = "#0E0E0E";
    allElements[i].style.accentColor = "#eeeeee";

}

}




// BW-Dark

function set_to_bw_dark(){
    // gets an array of all the elements on that game
    var allElements = document.querySelectorAll('*');
    
    // Iterate through each element
    for (var i = 0; i < allElements.length; i++) {
    
        // gets the css style of the element
        var computedStyle = window.getComputedStyle(allElements[i]);
    
        // gets the rgb values of the color
        var rgbColor = computedStyle.getPropertyValue('color');
    
        // Gets the RGB components
        var rgbComponents = rgbColor.match(/\d+/g);
        // Convert the RGB components to hexadecimal
        var hexColor = '#' + ((1 << 24) + (parseInt(rgbComponents[0]) << 16) + (parseInt(rgbComponents[1]) << 8) + parseInt(rgbComponents[2])).toString(16).slice(1);
    
    
        // gets the rgb values of the background color
        var rgbBackgroundColor = computedStyle.getPropertyValue('background-color');
    
        // Parse the RGB components
        var rgbPropertyComponents = rgbColor.match(/\d+/g);
    
        // Convert the RGB components to hexadecimal
        var hexBackgroundColor = '#' + ((1 << 24) + (parseInt(rgbPropertyComponents[0]) << 16) + (parseInt(rgbPropertyComponents[1]) << 8) + parseInt(rgbPropertyComponents[2])).toString(16).slice(1);
    
    
        // console.log("Background Color =", hexBackgroundColor);
    
        // changes the colors to be clearly distinguistable
        allElements[i].style.color = "#eeeeee";
        allElements[i].style.backgroundColor = "#0E0E0E";
        allElements[i].style.borderColor = "#eeeeee";
        allElements[i].style.accentColor = "#0E0E0E";
    
    }
    
    }

    function getLuminance(color) {
        const sRGB = color.map(function (v) {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return sRGB[0] * 0.2126 + sRGB[1] * 0.7152 + sRGB[2] * 0.0722;
    }
    
    function getContrastRatio(color1, color2) {
        const lum1 = getLuminance(color1);
        const lum2 = getLuminance(color2);
        const contrast = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
        return contrast.toFixed(2);
    }


function get_background_wrt_parent(parentColor, elementColor){
    var correctedColor = elementColor
    var contrast_ratio = getContrastRatio(color1= parentColor, color2=elementColor)
    // alert(contrast_ratio)
    // return [11,11,11]
    
    if((contrast_ratio < 3) && (contrast_ratio != 0)){
        parent_brightness = getLuminance(parentColor)
        element_brightness = getLuminance(elementColor)

        // alert("parent brightness = " + parent_brightness)

        // alert("element brightness = " + element_brightness)

        if(parent_brightness >= element_brightness){
            // If the parent is brighter than the element

            // alert("a")
            if((correctedColor[0] < 10) && (correctedColor[1] < 10) && (correctedColor[2] < 10)){
                // alert("h")
                return [correctedColor, false]
            }
            // alert("b")

            if(correctedColor[0] >= 10){
                correctedColor[0] =  correctedColor[0] - 10
            }

            // alert("c")

            if(correctedColor[1] >= 10){
                correctedColor[1] =  correctedColor[1] - 10
            }

            // alert("d")

            if(correctedColor[2] >= 10){
                correctedColor[2] =  correctedColor[2] - 10
            }

            // alert("e")

            // Checks to see if the correction worked if so return if not call the function recursively
            if((contrast_ratio > 3) && (contrast_ratio != 0)){
                // alert("f")
                return [correctedColor, true]
            }else{
                // alert("g")
                get_background_wrt_parent(parentColor, correctedColor)
            }
            

        }else{
            // If the element is brighter than the parent

            // alert("1")

            if((correctedColor[0] > 245) && (correctedColor[1] > 245) && (correctedColor[2] > 245)){
                return [correctedColor, false]
            }

            // alert("2")

            if(correctedColor[0] <= 245){
                correctedColor[0] =  correctedColor[0] + 10
            }

            // alert("3")

            if(correctedColor[1] <= 245){
                correctedColor[1] =  correctedColor[1] + 10
            }

            // alert("4")

            if(correctedColor[2] <= 245){
                correctedColor[2] =  correctedColor[2] + 10
            }

            // alert("5")


            // Checks to see if the correction worked if so return if not call the function recursively
            if((contrast_ratio > 3) && (contrast_ratio != 0)){
                // alert("6")
                return [correctedColor, true]
            }else{
                // alert("7")
                get_background_wrt_parent(parentColor, correctedColor)
            }

        }

    }

    return [correctedColor, true]
    
}



var total_index = 0

// change element background

function manage_element_colors(elementList, parentHadColor = false, parent_index=0){
    
    // Iterate through each element in the list
    for (var i = 0; i < elementList.length; i++) {
        total_index = total_index + 1
        // alert("looping current index = " + i + " had parent color= " + parentHadColor, )

        currentstyle = window.getComputedStyle(elementList[i])
        
        
        rgbString = currentstyle.backgroundColor;
        
        // This gets the numbers from the rgb value
        const startIndex = rgbString.indexOf('(') + 1;
        const endIndex = rgbString.indexOf(')');
        const numbersString = rgbString.substring(startIndex, endIndex);
        const numbers = numbersString.split(', ');
        const firstNumber = parseInt(numbers[0]);
        const secondNumber = parseInt(numbers[1]);
        const thirdNumber = parseInt(numbers[2]);
    
        // Convert the RGB components to hexadecimal
        var rgbBackgroundColor = [firstNumber, secondNumber, thirdNumber]
        

        if((parentHadColor == true)){

            p_currentstyle = window.getComputedStyle(document.querySelectorAll('*')[parent_index])
    
    
            p_rgbString = p_currentstyle.backgroundColor;
    
            // This gets the numbers from the rgb value
            const p_startIndex = p_rgbString.indexOf('(') + 1;
            const p_endIndex = p_rgbString.indexOf(')');
            const p_numbersString = p_rgbString.substring(p_startIndex, p_endIndex);
            const p_numbers = p_numbersString.split(', ');
            const p_firstNumber = parseInt(p_numbers[0]);
            const p_secondNumber = parseInt(p_numbers[1]);
            const p_thirdNumber = parseInt(p_numbers[2]);

            var parentColor = [p_firstNumber,p_secondNumber, p_thirdNumber]

            if(getContrastRatio(color1=  parentColor, color2= [0,0,0]) >= 4.5){

                elementList[i].style.borderColor = "#000000"

            }else{
                elementList[i].style.borderColor = "#ffffff"

            }
        
        }




        if (rgbString && rgbString !== 'rgba(0, 0, 0, 0)' && rgbString !== 'transparent') {


            if(getContrastRatio(color1= rgbBackgroundColor, color2= [0,0,0]) >= 4.5){

                elementList[i].style.color = "#000000"

            }else{
                elementList[i].style.color = "#ffffff"

            }

            if((parentHadColor == true)){

                p_currentstyle = window.getComputedStyle(document.querySelectorAll('*')[parent_index])
        
        
                p_rgbString = p_currentstyle.backgroundColor;
        
                // This gets the numbers from the rgb value
                const p_startIndex = p_rgbString.indexOf('(') + 1;
                const p_endIndex = p_rgbString.indexOf(')');
                const p_numbersString = p_rgbString.substring(p_startIndex, p_endIndex);
                const p_numbers = p_numbersString.split(', ');
                const p_firstNumber = parseInt(p_numbers[0]);
                const p_secondNumber = parseInt(p_numbers[1]);
                const p_thirdNumber = parseInt(p_numbers[2]);

                var parentColor = [p_firstNumber,p_secondNumber, p_thirdNumber]

                

                new_color_info = get_background_wrt_parent(parentColor, rgbBackgroundColor)

                if(getContrastRatio(color1=  new_color_info[0], color2= [0,0,0]) >= 4.5){

                    elementList[i].style.color = "#000000"
    
                }else{
                    elementList[i].style.color = "#ffffff"
    
                }

                if(getContrastRatio(color1=  new_color_info[0], color2= [0,0,0]) >= 4.5){

                    elementList[i].style.borderColor = "#000000"
    
                }else{
                    elementList[i].style.borderColor = "#ffffff"
    
                }


                if(new_color_info[1] == false){
                    // If you were not able to correct the ratio using just the element color and 
                    // must also change the parent

                    temp_info = [0,0,0]
                    temp_info[0] = new_color_info[0][0]
                    temp_info[1] = new_color_info[0][1]
                    temp_info[2] = new_color_info[0][2]


                        new_parent_color_info = get_background_wrt_parent(parentColor= temp_info, elementColor = parentColor)

                        var newParentHexBackgroundColor = '#' + ((1 << 24) + (parseInt(new_parent_color_info[0][0]) << 16) + (parseInt(new_parent_color_info[0][1]) << 8) + parseInt(new_parent_color_info[0][2])).toString(16).slice(1);
                
                        var allElements_again = document.querySelectorAll('*');
                        allElements_again[parent_index].style.backgroundColor = newParentHexBackgroundColor

                        if(getContrastRatio(color1= new_parent_color_info[0], color2= [0,0,0]) >= 4.5){

                            allElements_again[parent_index].style.color = "#000000"
            
                        }else{
                            allElements_again[parent_index].style.color = "#ffffff"
            
                        }

                        if(getContrastRatio(color1=  new_parent_color_info[0], color2= [0,0,0]) >= 4.5){

                            allElements_again[parent_index].style.borderColor = "#000000"
            
                        }else{
                            allElements_again[parent_index].style.borderColor = "#ffffff"
            
                        }
                    

                }

                

                var newHexBackgroundColor = '#' + ((1 << 24) + (parseInt(new_color_info[0][0]) << 16) + (parseInt(new_color_info[0][1]) << 8) + parseInt(new_color_info[0][2])).toString(16).slice(1);
                
                elementList[i].style.backgroundColor = newHexBackgroundColor
                // elementList[i].style.color = "#ffffff"
            }
            
                if (elementList[i].children.length > 0){
                    manage_element_colors(elementList[i].children, parentHadColor = true, parent_index=total_index)                 
                }else{

                }
            
            
        } else {
            // The background color is not set for the element
        }
        
    
    }

}

// Increase-Contrast

function increaseContrast(){
    // gets an array of all the elements on that game
    var allElements = document.querySelectorAll('*');
    total_index = 0
    manage_element_colors(allElements[0].children)


    
    }

    


    // Sets all images to white
    function set_images_to_white(){

        // This changes the color of the image elements
        
        const images = document.querySelectorAll('img');
        
        for (var i = 0; i < images.length; i++){
             // Create a canvas element
             const canvas = document.createElement('canvas');
             const ctx = canvas.getContext('2d');
         
             // Set canvas dimensions to match the image
             canvas.width = images[i].width;
             canvas.height = images[i].height;
         
             // Draw the images[i] onto the canvas
             ctx.drawImage(images[i], 0, 0);
         
             // Get the image data
             const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
             const data = imageData.data;
         
             // Iterate through each pixel
             for (let j = 0; j < data.length; j += 4) {
                 // Modify the color of each pixel (e.g., invert colors)

                     // changes all the images to white
                    data[j] = 238; // Red
                    data[j + 1] = 238; // Green
                    data[j + 2] = 238; // Blue
                       //  data[i + 3] = data[i+3];


             }
         
             // Put the modified image data back onto the canvas
             ctx.putImageData(imageData, 0, 0);
         
             // Replace the original image with the modified one
             images[i].parentNode.replaceChild(canvas, images[i]);
        }
        
        
        }


        // Sets all images to black
    function set_images_to_black(){

        // This changes the color of the image elements
        
        const images = document.querySelectorAll('img');
        
        for (var i = 0; i < images.length; i++){
             // Create a canvas element
             const canvas = document.createElement('canvas');
             const ctx = canvas.getContext('2d');
         
             // Set canvas dimensions to match the image
             canvas.width = images[i].width;
             canvas.height = images[i].height;
         
             // Draw the images[i] onto the canvas
             ctx.drawImage(images[i], 0, 0);
         
             // Get the image data
             const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
             const data = imageData.data;
         
             // Iterate through each pixel
             for (let j = 0; j < data.length; j += 4) {
                 // Modify the color of each pixel (e.g., invert colors)

                     // changes all the images to white
                    data[j] = 14; // Red
                    data[j + 1] = 14; // Green
                    data[j + 2] = 14; // Blue
                       //  data[i + 3] = data[i+3];


             }
         
             // Put the modified image data back onto the canvas
             ctx.putImageData(imageData, 0, 0);
         
             // Replace the original image with the modified one
             images[i].parentNode.replaceChild(canvas, images[i]);
        }
        
        
        }


        