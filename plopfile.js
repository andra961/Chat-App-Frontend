module.exports = function (plop) {
  plop.setGenerator("component", {
    description: "Create a new React Component in the selected path",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is this component's name?",
      },
      {
        type: "input",
        name: "path",
        message: "What is this component's path?",
        default: "src/components",
      },
    ],
    actions: [
      {
        type: "add",
        path: "{{path}}/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "plop-templates/Component.tsx.hbs",
      },
      {
        type: "add",
        path: "{{path}}/{{pascalCase name}}/{{camelCase name}}.css",
        templateFile: "plop-templates/style.css.hbs",
      },
      {
        type: "add",
        path: "{{path}}/{{pascalCase name}}/index.ts",
        templateFile: "plop-templates/index.ts.hbs",
      },
    ],
  });
};
