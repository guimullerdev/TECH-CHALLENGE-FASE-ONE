export default function (plop) {
    plop.setGenerator('module', {
        description: 'Gera um módulo completo seguindo DDD',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Nome do módulo (ex: customers):',
            },
        ],
        actions: [
            // domain
            {
                type: 'add',
                path: 'src/modules/{{kebabCase name}}/domain/entities/{{kebabCase name}}.entity.ts',
                templateFile: 'plop-templates/domain/entity.hbs',
            },
            {
                type: 'add',
                path: 'src/modules/{{kebabCase name}}/domain/repositories/{{kebabCase name}}.repository.ts',
                templateFile: 'plop-templates/domain/repository.hbs',
            },

            // application
            {
                type: 'add',
                path: 'src/modules/{{kebabCase name}}/application/dto/create-{{kebabCase name}}.dto.ts',
                templateFile: 'plop-templates/application/create-dto.hbs',
            },
            {
                type: 'add',
                path: 'src/modules/{{kebabCase name}}/application/use-cases/create-{{kebabCase name}}.use-case.ts',
                templateFile: 'plop-templates/application/use-case.hbs',
            },

            // infrastructure
            {
                type: 'add',
                path: 'src/modules/{{kebabCase name}}/infrastructure/mappers/{{kebabCase name}}.mapper.ts',
                templateFile: 'plop-templates/infrastructure/mapper.hbs',
            },
            {
                type: 'add',
                path: 'src/modules/{{kebabCase name}}/infrastructure/repositories/{{kebabCase name}}.prisma.repository.ts',
                templateFile: 'plop-templates/infrastructure/prisma-repository.hbs',
            },

            // presentation
            {
                type: 'add',
                path: 'src/modules/{{kebabCase name}}/presentation/{{kebabCase name}}.controller.ts',
                templateFile: 'plop-templates/presentation/controller.hbs',
            },
            {
                type: 'add',
                path: 'src/modules/{{kebabCase name}}/presentation/{{kebabCase name}}.module.ts',
                templateFile: 'plop-templates/presentation/module.hbs',
            },
        ],
    });
}