module.exports = {
    ci: {
        collect: {
            url: ['http://localhost:3000/', 'http://localhost:3000/detail/1'],
            numberOfRuns: 2,
        },
        assert: {
            assertions: {
                'categories:performance': ['error', { minScore: 0.9 }],
                'categories:accessibility': ['error', { minScore: 0.9 }],
                'categories:best-practices': ['error', { minScore: 0.9 }],
                'categories:seo': ['error', { minScore: 0.9 }],
            },
        },
    },
};
