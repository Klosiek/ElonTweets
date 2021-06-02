const config = (plop) => {
  plop.setGenerator("Page", {
    description: "Page Component Generator",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Enter name: ",
      },
    ],
    actions: [
      {
        type: "addMany",
        base: "templates/page",
        destination: "src/pages/{{name}}",
        templateFiles: "templates/page/*.hbs",
        stripExtensions: ["hbs"],
        verbose: true,
      },
      "- - - - - - - - - - - - - - - - - - - -",
      "Page component created successfully!",
      "- - - - - - - - - - - - - - - - - - - -\n",
    ],
  });
};

module.exports = config;
