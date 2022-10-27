Package.describe({
  name: 'thaysang:mdb',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'Auto create collection database',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/thaysang/mdb.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('2.8.0');
  api.use('ecmascript');
  api.use('mongo');
  api.use('dburles:mongo-collection-instances@0.3.6');
  api.mainModule('mdb.js');
});
