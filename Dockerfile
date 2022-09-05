FROM node:16 AS ui-build
WORKDIR /
COPY client/ ./client/
RUN cd client && npm install && npm run build

FROM node:16 AS server-build
WORKDIR /usr/src/app
ENV NODE_ENV='production'
#should not have to copy the entire client folder but prodConsts doesnt work if
#I only copy build and I dont care enough to fix it right now
COPY --from=ui-build /client ./client
COPY server/ ./server/
RUN cd server && npm install

EXPOSE 8080

CMD ["node", "./server/server.js"]