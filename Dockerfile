FROM node:current-alpine
COPY package*.json ./

# Bundle app source
COPY . ./
RUN npm install 

RUN adduser -D -S user1

# RUN mkdir -p ./node_modules && chown -R node:node /home/node/app

# Install app dependencies




#RUN npm install

# COPY --chown=node:node . .

EXPOSE 3000

USER user1

CMD [ "npm" , "start" ]