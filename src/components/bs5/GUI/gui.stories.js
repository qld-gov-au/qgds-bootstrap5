import './gui.css';
export default {
    title: 'Core/Colours',
};

const colorVariables = {
    '--qld-color-default-color-light-background-default': '#ffffff',
    '--qld-color-default-color-light-background-default-shade': '#f5f5f5',
    '--qld-color-default-color-light-background-light': '#eff4f9',
    '--qld-color-default-color-light-background-light-shade': '#e5eef5',
    '--qld-color-default-color-light-background-alt': '#f4f4f4',
    '--qld-color-default-color-light-background-alt-shade': '#d6eff4',
    '--qld-color-default-color-light-border-default': '#ebebeb',
    '--qld-color-default-color-light-border-light': '#ccddee',
    '--qld-color-default-color-light-border-alt': '#6F8690',
    '--qld-color-default-color-light-action-primary': '#06658A',
    '--qld-color-default-color-light-action-primary-hover': '#161616',
    '--qld-color-default-color-light-action-secondary': '#009BAD',
    '--qld-color-default-color-light-action-secondary-hover': '#161616',
    '--qld-color-default-color-light-link-on-action': '#06658A',
    '--qld-color-default-color-light-link-default': '#046994',
    '--qld-color-default-color-light-link-visited': '#551A8B',
    '--qld-color-default-color-light-accent-design-accent': '#FFD559',
    '--qld-color-default-color-light-focus-default': '#02A2B5',
    '--qld-color-default-color-light-underline-default': '#1B88B7',
    '--qld-color-default-color-light-underline-default-hover': '#09549F',
    '--qld-color-default-color-light-underline-visited': '#8b63b0',
    '--qld-color-default-color-light-underline-visited-hover': '#551a8b',
    '--qld-color-default-color-light-text-default': '#333333',
    '--qld-color-default-color-light-text-lighter': '#636363',
    '--qld-color-default-color-light-text-heading': '#003549',
    '--qld-color-default-color-light-site-title': '#022A50',
    '--qld-color-default-color-light-crest-fill': '#022A50',
    '--qld-color-default-color-dark-background-default': '#046994',
    '--qld-color-default-color-dark-background-default-shade': '#005C84',
    '--qld-color-default-color-dark-background-alt': '#080707',
    '--qld-color-default-color-dark-background-alt-shade': '#161616',
    '--qld-color-default-color-dark-border-default': '#4A93B3',
    '--qld-color-default-color-dark-border-alt': '#09ACFE',
    '--qld-color-default-color-dark-action-primary': '#4A93B3',
    '--qld-color-default-color-dark-action-primary-hover': '#FFFFFF',
    '--qld-color-default-color-dark-action-secondary': '#FFD559',
};

const createColorPicker = (variable, color) => {
    const container = document.createElement('div');
    const input = document.createElement('input');
    const label = document.createElement('label');

    container.className = 'col-lg-4 col-sm-12 color-picker';
    label.innerText = variable;
    input.type = 'color';
    input.value = color;

    input.oninput = () => updateSelectedColors();
    container.appendChild(label);
    container.appendChild(input);
    return container;
};

const updateSelectedColors = () => {
    const colorPickers = document.querySelectorAll('.color-picker input');
    const selectedColors = {};
    colorPickers.forEach(picker => {
        const label = picker.previousSibling.innerText;
        selectedColors[label] = picker.value;
    });
    const cssVariablesText = Object.entries(selectedColors).map(([key, value]) => `${key}: ${value};`).join('\n');
    document.getElementById('selected-colors').innerText = cssVariablesText;
};

const createColorPickerGUI = () => {
    const container = document.createElement('div');
    const row = document.createElement('div');

    container.className = 'container';
    row.className = 'row';

    Object.entries(colorVariables).forEach(([variable, color]) => {
        const picker = createColorPicker(variable, color);
        row.appendChild(picker);
    });

    container.appendChild(row);
    
    const selectedColorsContainer = document.createElement('div');
    const selectedColorsPre = document.createElement('pre');
    const selectedColorsHeader = document.createElement('h4');

    selectedColorsContainer.className = 'container';
    selectedColorsHeader.innerText = 'Selected Colors:';
    selectedColorsPre.id = 'selected-colors';

    selectedColorsContainer.appendChild(selectedColorsHeader);
    selectedColorsContainer.appendChild(selectedColorsPre);
    container.appendChild(selectedColorsContainer);
    return container;
};

export const Overview = () => {
    const container = createColorPickerGUI();
    // Clear previous content in the story
    document.body.innerHTML = '';
    document.body.appendChild(container);
    return container;
};
