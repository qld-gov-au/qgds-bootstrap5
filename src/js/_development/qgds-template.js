import fs from "fs";
import mustache from "mustache";
import yaml from 'js-yaml';
import chalk from "chalk";


const YAMLpath = "../src/templates/templates.yml";

const QGDSTemplate = {

  partials: {
    header: fs.readFileSync(`../src/components/common/header/header.html`, { encoding: 'utf8' }),
    footer: fs.readFileSync(`../src/components/common/footer/footer.html`, { encoding: 'utf8' }),
  },

  make: function (options) {
    try {
      
      let YAMLdata = yaml.load( fs.readFileSync(YAMLpath, { encoding: 'utf8' }));
      let YAMLkeys = Object.keys(YAMLdata);
      let templateID = options.template;

      //Error if the template parameter is not defined or is not in the YAML file   
      if (!YAMLkeys.includes(templateID)) {
        console.error(chalk.red(`Template ID "${templateID}" has not been setup in the templates YAML file.`));
        return;
      }

      let template = {...YAMLdata[templateID], ...options}; 
      
      let components = {
        header: options.components?.header || this.partials.header,
        footer: options.components?.footer || this.partials.footer,
        ...options.components,
      };

      // Preps and compiles the body content from the "content" template (defined in YAML file)
      // {{ component }} tags within the template will be replaced with the component HTML.
      // A {{ component }} should be defined by the calling function.
      
      let contentfiles = Array.isArray(template.content) ? template.content : [template.content]; 
      
      let contentfilesCombined = contentfiles.map((file) => {
        return fs.readFileSync(file, { encoding: 'utf8' });
      }).join("\n");
      
      let content = mustache.render(contentfilesCombined, components || {});
      
      // Preps and compiles the page layout template (defined in YAML file)
      // {{ component }} tags within the template will be replaced with the component HTML.
      // A {{ component }} should be defined by the calling function.
      let layoutSource = this.readfile(template.layout);
      let compiledHTML = mustache.render(layoutSource, {
        components: components,
        content: content,
      });

      // Writes compiled HTML to the output file (defined in YAML file)

      let targetPath = template.outfile.split("/");
      targetPath.pop();
      
      console.log(targetPath.join(""));
      fs.mkdirSync(`../dist/${targetPath.join("/")}`, { recursive: true });
      fs.writeFileSync(`../dist/${template.outfile}`, compiledHTML);
      console.log(chalk.yellowBright(`\u2713 Built template /dist/${template.outfile}`));

    } catch (err) {
      console.error(chalk.red(err));
      return
    }
  },

  readfile: function (filePath) {
    return fs.readFileSync(filePath, { encoding: 'utf8' });
  },
  
};

export default QGDSTemplate;
