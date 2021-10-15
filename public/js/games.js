const sliderMin = document.getElementById('sliderMin');
const sliderMax = document.getElementById('sliderMax');
const sliderValue = document.getElementById('sliderValue');
const sliders = [sliderMin, sliderMax];
sliderValue.innerHTML = 'Years: all';

for (let i = 0; i < sliders.length; i += 1) {
  sliders[i].oninput = () => {
    if (sliderMin.value === 2015 && sliderMax.value === 2030) {
      sliderValue.innerHTML = 'Years: all';
    } else {
      sliderValue.innerHTML = `Years: ${sliderMin.value}-${sliderMax.value}`;
    }
  };
}
