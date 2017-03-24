// The default rules for plurals in Russian are no doubt mysterious and beautiful. Unfortunately, our translations only
// support two plural forms; anything else would return a "missing" label.
export default {
    rtl: false,

    pluralForm: function(count) {
        if (count === 1) { return 'one'; }
        return 'other';
    }
};
