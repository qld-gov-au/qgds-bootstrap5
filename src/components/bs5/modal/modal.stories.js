// modal.stories.js
import { Modal } from './Modal.js';
import defaultdata from './modal.data.json';

//Load some buttons for modal footer
import { Button } from '../button/Button.js';

let buttonItems = [{    
  "variantClass": "btn-tertiary",
  "islink": true,
  "isdisabled": false,
  "iconClass": "",
  "href": "https://www.google.com",
  "label": "External link",
  "target": "_blank",
  "dataatts": false,
  "arialabel": false,
},{    
  "variantClass": "btn-secondary",
  "islink": false,
  "isdisabled": false,
  "iconClass": "",
  "href": "#",
  "label": "Cancel",
  "target": "",
  "dataatts": "data-bs-dismiss='modal'",
  "arialabel": "Close",
},
{    
  "variantClass": "btn-primary",
  "islink": false,
  "isdisabled": false,
  "iconClass": "",
  "href": "#",
  "label": "Confirm",
  "target": "",
  "dataatts": "data-bs-dismiss='modal'",
  "arialabel": "Confirm",
}];

defaultdata.footer.buttons = buttonItems.map((item) => { 
  return new Button(item).html;
});


export default {
  tags: [''],
  title: 'Components/Modal',
  render: (args) => new Modal(args).html,

  argTypes: {
    buttons: { 
      control: { disable: true },
    },
    modalSize: {
      name: "Size",
      description: `Set the size of the modal`,
      control: {
        type: "select",
        labels: {
          "modal-sm": "Small",
          "modal-default": "Default",
          "modal-lg": "Large",
          "modal-xl": "Extra Large",
        },
      },
      options: [
        "modal-sm",
        "modal-default",
        "modal-lg",
        "modal-xl",
      ],
    },
  },
};

/**
 * Default Modal (Extra Large, 1140px)
 */
export const Default = {
  args: {
    ...defaultdata,
    modalID: 'modal-example-default',
    modalLabel: 'Default modal example',
    modalSize: 'modal-xl',
    launchButtonLabel: 'Open default modal',
  },
};

/**
 * Small Modal (575px)
 */

export const SmallModal= {
  args: {
    ...defaultdata,
    modalID: 'modal-example-small',
    modalLabel: 'Small modal example',
    modalSize: 'modal-sm',
    launchButtonLabel: 'Open small modal',
  },
};


/**
 * Large Modal (800px)
 */
export const LargeModal = {
  args: {
    ...defaultdata,
    modalID: 'modal-example-large',
    modalLabel: 'Large modal example',
    modalSize: 'modal-lg',
    launchButtonLabel: 'Open large modal',
  },
};
