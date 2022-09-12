export default function generate(plop) {
    plop.setGenerator('router', {
        description: 'Generate router',
        prompts: [
            {
                type: 'input',
                name: 'feature',
                message: 'What is the feature of the router?',
            },
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the router?',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/Routers/{{feature}}/{{name}}.route.ts',
                templateFile: '__generator/__templates/router/router.hbs',
            },
        ],
    });
}
