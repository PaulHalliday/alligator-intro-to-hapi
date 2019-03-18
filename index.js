const Hapi = require('hapi');
const Good = require('good');
const GoodConsole = require('good-console');

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

const consoleLogging = {
  plugin: require('good'),
  options: {
    ops: {
      interval: 1000
    },
    reporters: {
      consoleReporter: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ response: '*', log: '*' }]
        },
        { module: 'good-console' },
        'stdout'
      ]
    }
  }
};

const start = async () => {
  await server.register([consoleLogging, require('inert')]);

  await server.start();
};

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return h.file('./index.html');
  }
});

start();
