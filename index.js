// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;

var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'desiAppId_s70g0Fadsfsfe3nkl3r1ljosdfGswefo',
  masterKey: process.env.MASTER_KEY || 'desiAppMasterKey_vggAGE973ru30FwEADFksjdf', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337',  // Don't forget to change to https if needed
  oauth: {
   twitter: {
     consumer_key: "EkubAINYbaNQe7CXUYIGJApPD", // REQUIRED
     consumer_secret: "meq2D6pxa9mzjJrKUNIjIB3zVTjfHu9GQxMaid3U9cublCOwma" // REQUIRED
   },
   facebook: {
     appIds: "1658071874444909"
   }
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a web site.');
});

var port = process.env.PORT || 1337;
app.listen(port, function() {
    console.log('desifestMusic-PareServer running on port ' + port + '.');
});
