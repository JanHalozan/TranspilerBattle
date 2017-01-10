# docker build -t transpiler-battle .
# docker run -p 1337:1337 -it --rm -v /Users/janhalozan/Work/GitHub/TranspilerBattle/:/usr/app/ --name transpiler-battle transpiler-battle

FROM node:7.4.0

# RUN apt-get update && \
#     apt-get install -y -qq

RUN npm install -g pm2@latest
RUN pm2 install coffeescript

COPY . /usr/app
WORKDIR /usr/app
RUN npm install

CMD ["pm2", "start", "src/main.coffee", "--no-daemon"]
