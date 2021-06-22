module.exports = function(plop) {
    // create your generators here
    plop.setGenerator('component', {
        description: 'Create a React component',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Name of your component?',
        }],
        actions: [{
                type: 'add',
                path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.jsx',
                templateFile: 'templates/components/component.js.hbs',
            },
            {
                type: 'add',
                path: 'src/components/{{pascalCase name}}/__tests__/{{pascalCase name}}.test.jsx',
                templateFile: 'templates/components/component-module.test.hbs',
            },
            {
                type: 'add',
                path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.module.css',
                templateFile: 'templates/components/module.css.hbs',
            },
            {
                type: 'add',
                path: 'src/components/{{pascalCase name}}/README.md',
                templateFile: 'templates/components/component-README.md.hbs',
            },
            {
                type: 'add',
                path: 'src/components/{{pascalCase name}}/package.json',
                templateFile: 'templates/components/component-package.json.hbs',
            },
        ],
    });

    plop.setGenerator('common_component', {
        description: 'Create a reusable component',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Name of your common component?',
        }],
        actions: [{
                type: 'add',
                path: 'src/components/common/{{pascalCase name}}/{{pascalCase name}}.jsx',
                templateFile: 'templates/components/common-module.js.hbs',
            },
            {
                type: 'add',
                path: 'src/components/common/__tests__/{{pascalCase name}}.test.jsx',
                templateFile: 'templates/components/common-module.test.hbs',
            },
            {
                type: 'add',
                path: 'src/components/common/{{pascalCase name}}/styles.module.css',
                templateFile: 'templates/components/module.css.hbs',
                skipIfExists: true,
            },
        ],
    });
    plop.setGenerator('page', {
        description: 'Create a Pymestari page, which use in route (App.jsx)',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'page Name',
        }],
        actions: [{
                type: 'add',
                path: 'src/pages/{{pascalCase name}}/{{pascalCase name}}Page.jsx',
                templateFile: 'templates/pages/page.js.hbs',
            },
            {
                type: 'add',
                path: 'src/pages/{{pascalCase name}}/__tests__/{{pascalCase name}}Page.test.jsx',
                templateFile: 'templates/pages/page-module.test.hbs',
            },
            {
                type: 'add',
                path: 'src/pages/{{pascalCase name}}/{{pascalCase name}}Page.module.css',
                templateFile: 'templates/components/module.css.hbs',
            },
            {
                type: 'add',
                path: 'src/pages/{{pascalCase name}}/README.md',
                templateFile: 'templates/pages/page-README.md.hbs',
            },
            {
                type: 'add',
                path: 'src/pages/{{pascalCase name}}/package.json',
                templateFile: 'templates/pages/page-package.json.hbs',
            },
        ],
    });

    plop.setGenerator('redux', {
      description:
        'Create a redux action folder (Includes action, reducer and types files)',
      prompts: [
        {
          type: 'input',
          name: 'redux',
          message: 'Your redux folder name (without suffix action)'
        }
      ],
      actions: [
        {
          // Add an action file for new created action
          type: 'add',
          path: 'src/store/{{pascalCase redux}}/action.js',
          templateFile: 'templates/redux/actions.js.hbs',
          skipIfExists: true
        },
        {
          // Add an reducer file for new created action
          type: 'add',
          path: 'src/store/{{pascalCase redux}}/reducers.js',
          templateFile: 'templates/redux/reducers.js.hbs',
          skipIfExists: true
        },
        {
          type: 'add',
          path: 'src/store/index.js',
          skipIfExists: true
        },
        {
          // Add an reducer file to store
          type: 'append',
          path: 'src/store/index.js',
          pattern: `/* Import reducers */`,
          template: `import {{pascalCase redux}}Reducer from './{{pascalCase redux}}/reducers.js';`
        },
        {
          // Add an reducer file to store
          type: 'append',
          path: 'src/store/index.js',
          pattern: `/** combine reducer */`,
          template: `{{lowerCase redux}}: {{pascalCase redux}}Reducer,`
        }
      ]
    });
    plop.setGenerator('action_type', {
      description: 'Create an action type in actionType.js file',
      prompts: [
        {
          type: 'input',
          name: 'action',
          message: 'Your action name'
        }
      ],
      actions: [
        {
          type: 'add',
          path: 'src/store/actionType.js',
          templateFile: 'templates/redux/actionType.js.hbs',
          skipIfExists: true
        },
        {
          type: 'append',
          path: 'src/store/actionType.js',
          pattern: `// Add new Type here`,
          template: `export const {{constantCase action}} = {{constantCase action}};`
        }
      ]
    });
};