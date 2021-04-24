const env = new nunjucks.Environment();

export function getRefs(context) {
    const refs = {};
    const $els = (context || document.body).querySelectorAll('[data-ref]');

    $els.forEach(function ($el) {
        const name = $el.getAttribute('data-ref');
        refs[name] = $el;
    });

    return refs;
}

export function render(template, context, parent) {
    parent.innerHTML = env.render(template, context);
    return getRefs(parent);
}
