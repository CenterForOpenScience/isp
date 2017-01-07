/**
 * Utilities for working with ember-i18n locales
 *
 * Pulled from ember-i18n internals, which do not expose these functions directly
 *
  */


// Walk up configuration objects from most specific to least.
function walkConfigs(id, owner) {
    const appConfig = owner._lookupFactory(`locale:${id}/config`);
    if (appConfig) { return appConfig; }

    const addonConfig = owner._lookupFactory(`ember-i18n@config:${id}`);
    if (addonConfig) { return addonConfig; }

    const parentId = parentLocale(id);
    if (parentId) { return walkConfigs(parentId, owner); }
}

function parentLocale(id) {
    const lastDash = id.lastIndexOf('-');
    return lastDash > 0 ? id.substr(0, lastDash) : null;
}


export {walkConfigs};
