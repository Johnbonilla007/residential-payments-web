module.exports = function (plop) {
  plop.setGenerator("file", {
    description: "Generar un nuevo archivo",
    prompts: [
      {
        type: "list",
        name: "fileType",
        message: "Tipo de archivo a generar:",
        choices: ["container", "component"],
      },
      {
        type: "list",
        name: "module",
        message: "Tipo de archivo a generar:",
        choices: ["Reports"],
      },
      {
        type: "input",
        name: "name",
        message: "Enter Folder Name Please:",
      },
    ],
    actions: function (data) {
      const actions = [];

      if (data.fileType === "container") {
        actions.push({
          type: "add",
          path: `src/container/${data.module}/{{properCase name}}/index.js`,
          templateFile: "plop-templates/container/index.js.hbs",
        });
        actions.push({
          type: "add",
          path: `src/container/${data.module}/{{properCase name}}/styles.js`,
          templateFile: "plop-templates/container/styles.js.hbs",
        });
        actions.push({
          type: "add",
          path: `src/container/${data.module}/{{properCase name}}/settings.js`,
          templateFile: "plop-templates/container/settings.js.hbs",
        });
        actions.push({
          type: "add",
          path: `src/container/${data.module}/{{properCase name}}/{{properCase name}}.Service.js`,
          templateFile: "plop-templates/container/service.js.hbs",
        });
      } else if (data.fileType === "component") {
        actions.push({
          type: "add",
          path: `src/components/{{properCase name}}/index.js`,
          templateFile: "plop-templates/component/index.hbs",
        });
        actions.push({
          type: "add",
          path: `src/components/{{properCase name}}/styles.js`,
          templateFile: "plop-templates/component/styles.hbs",
        });
        actions.push({
          type: "add",
          path: `src/components/{{properCase name}}/settings.js`,
          templateFile: "plop-templates/component/settings.hbs",
        });
        actions.push({
          type: "add",
          path: `src/components/{{properCase name}}.Service.js`,
          templateFile: "plop-templates/component/service.hbs",
        });
      }

      return actions;
    },
  });
};
