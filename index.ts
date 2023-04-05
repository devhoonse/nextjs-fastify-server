const fastify = require('fastify')();

/**
 * 현재 어플리케이션이 production 환경에서 동작 중인지 여부
 */
const isProduction = process.env.NODE_ENV === 'production';

// Fastify 서버에서 응답할 라우트 목록을 설정합니다.
fastify
  .register(require('@fastify/nextjs'), {
    dev: !isProduction
  }) // Next.js 플러그인을 적용합니다.
  .after(() => {

    // Next.js 에 위임할 라우트 목록입니다.
    fastify.next('/');
    fastify.next('/about');
    fastify.next('/greet/:user');

    // Next.js 로 위임하지 않고 직접 응답할 라우트 목록입니다.
    fastify.get('/contacts', (request, reply) => {
      reply.type('html')
        .send('<h1>Contacts Page</h1>');
    });
    fastify.get('/whoami', (request, reply) => {
      reply.type('json')
        .send({
          user: 'anonymous'
        });
    });
  });

// Fastify 서버의 서비스 포트를 설정하고 기동합니다.
fastify.listen(3000, (error, address) => {
  if (error) throw error;
  console.log('Fastify Server Listening on Port : ', address);
});
