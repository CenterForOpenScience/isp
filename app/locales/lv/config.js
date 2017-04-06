export default {
    rtl: false,

    pluralForm: function(count) {
        if (count === 1) { return 'one'; }
        return 'other';
    }
};
