// In-page cache of the user's options
const options = {};
const optionsForm = document.getElementById("optionsForm");

// Immediately persist options changes
optionsForm.enable.addEventListener("change", (event) => {
  options.enable = event.target.checked;
  setEnable(options.enable);
//   chrome.storage.sync.set({ options });
});

// Initialize the form with the user's option settings
getEnable(function(enableValue) {
    optionsForm.enable.checked = Boolean(enableValue);
  });


function setEnable(enableValue) {
    chrome.storage.local.set({ enable: enableValue }, function() {
      console.log('Value is set to ' + enableValue);
    });
  }

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

  const removeImagesForm = document.getElementById("removeImagesForm");
  const removeImagesVar = {};

// Immediately persist options changes
removeImagesForm.removeImages.addEventListener("change", (event) => {
  removeImagesVar.removeImages = event.target.checked;
  setremoveImages(removeImagesVar.removeImages);
//   chrome.storage.sync.set({ options });
});

  // Initialize the form with the user's remove images setting
getremoveImages(function(removeImagesValue) {
  removeImagesForm.removeImages.checked = Boolean(removeImagesValue);
});


function setremoveImages(removeImagesValue) {
  chrome.storage.local.set({ removeImages: removeImagesValue }, function() {
    console.log('Value is set to ' + removeImagesValue);
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


  


const colorsSelect = document.getElementById('colors');

document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.local.get('selectedColor', function(data) {
    if (data.selectedColor) {
      console.log('Selected color:', data.selectedColor);
      colorsSelect.value = data.selectedColor;
    }
    else {
      chrome.storage.local.set({ 'selectedColor': "BW-Light" });
      colorsSelect.value = "BW-Light";
      console.log('Default option chosen');
    }
  });
});

colorsSelect.addEventListener('change', function() {
  const selectedValue = colorsSelect.value;
  chrome.storage.local.set({ 'selectedColor': selectedValue });
  console.log('Selected value:', selectedValue);
  
});
