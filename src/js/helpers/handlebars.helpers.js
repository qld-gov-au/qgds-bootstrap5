export default function handlebarsHelpers (Handlebars) {
    Handlebars.registerHelper("contains", function(needle, haystack, options) {
        needle = Handlebars.escapeExpression(needle);
        haystack = Handlebars.escapeExpression(haystack);
        return (haystack.indexOf(needle) > -1) ? options.fn(this) : options.inverse(this);
    });
}