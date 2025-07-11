This is the scss folder, that is converted to css for dist. 

To match pathing the folder is 'css' even though it should be 'scss'.

`/themes/qld-variables-theme.scss` is the additional variables file with the overriding theme palette or css variables. This would impact the main.scss to be bundled as a separate css output

DO NOT override the variables inside the object;
DO NOT override the variables which is predefined in bootstrap;
